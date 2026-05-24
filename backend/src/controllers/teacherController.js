import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";
import { Attendance } from "../models/Attendance.js";
import { Result } from "../models/Result.js";
import { Announcement } from "../models/Announcement.js";

async function getTeacherByUser(userId) {
  return Teacher.findOne({ userId }).populate("assignedClasses", "name section academicYear").populate("assignedSubjects", "name code");
}

export const getTeacherDashboard = asyncHandler(async (req, res) => {
  const teacher = await getTeacherByUser(req.user._id);
  const classIds = teacher?.assignedClasses?.map((c) => c._id) || [];

  const [studentCount, attendanceCount, resultCount] = await Promise.all([
    Student.countDocuments({ classId: { $in: classIds } }),
    Attendance.countDocuments({ classId: { $in: classIds } }),
    Result.countDocuments({ classId: { $in: classIds } }),
  ]);

  return successResponse(res, { teacher, studentCount, attendanceCount, resultCount }, "Teacher dashboard fetched");
});

export const getAssignedStudents = asyncHandler(async (req, res) => {
  const teacher = await getTeacherByUser(req.user._id);
  const classIds = teacher?.assignedClasses?.map((c) => c._id) || [];

  const students = await Student.find({ classId: { $in: classIds } })
    .populate("userId", "fullName email")
    .populate("classId", "name section academicYear")
    .sort({ createdAt: -1 });

  return successResponse(res, students, "Assigned students fetched");
});

export const upsertAttendanceByTeacher = asyncHandler(async (req, res) => {
  const { studentId, classId, date, status, remarks } = req.body;

  const attendance = await Attendance.findOneAndUpdate(
    { studentId, date: new Date(date) },
    {
      studentId,
      classId,
      date: new Date(date),
      status,
      remarks,
      markedBy: req.user._id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return successResponse(res, attendance, "Attendance saved");
});

export const upsertResultByTeacher = asyncHandler(async (req, res) => {
  const { studentId, classId, subjectId, examName, marksObtained, maxMarks, remarks } = req.body;

  const result = await Result.findOneAndUpdate(
    { studentId, subjectId, examName },
    {
      studentId,
      classId,
      subjectId,
      examName,
      marksObtained,
      maxMarks,
      remarks,
      gradedBy: req.user._id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return successResponse(res, result, "Result saved");
});

export const listAnnouncementsForTeacher = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({ targetRoles: { $in: ["teacher"] } }).sort({ createdAt: -1 });
  return successResponse(res, announcements, "Announcements fetched");
});
