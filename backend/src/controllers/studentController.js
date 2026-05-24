import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { Student } from "../models/Student.js";
import { Attendance } from "../models/Attendance.js";
import { Result } from "../models/Result.js";
import { Announcement } from "../models/Announcement.js";

async function getStudentByUser(userId) {
  return Student.findOne({ userId }).populate("classId", "name section academicYear").populate("userId", "fullName email");
}

export const getStudentDashboard = asyncHandler(async (req, res) => {
  const student = await getStudentByUser(req.user._id);

  if (!student) {
    return errorResponse(res, "Student profile not found", 404);
  }

  const [attendanceCount, resultCount] = await Promise.all([
    Attendance.countDocuments({ studentId: student._id }),
    Result.countDocuments({ studentId: student._id }),
  ]);

  return successResponse(res, { student, attendanceCount, resultCount }, "Student dashboard fetched");
});

export const getMyAttendance = asyncHandler(async (req, res) => {
  const student = await getStudentByUser(req.user._id);
  if (!student) {
    return errorResponse(res, "Student profile not found", 404);
  }

  const attendance = await Attendance.find({ studentId: student._id })
    .populate("classId", "name section")
    .sort({ date: -1 });

  return successResponse(res, attendance, "Attendance fetched");
});

export const getMyResults = asyncHandler(async (req, res) => {
  const student = await getStudentByUser(req.user._id);
  if (!student) {
    return errorResponse(res, "Student profile not found", 404);
  }

  const results = await Result.find({ studentId: student._id })
    .populate("classId", "name section")
    .populate("subjectId", "name code")
    .sort({ createdAt: -1 });

  return successResponse(res, results, "Results fetched");
});

export const listAnnouncementsForStudent = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({ targetRoles: { $in: ["student"] } }).sort({ createdAt: -1 });
  return successResponse(res, announcements, "Announcements fetched");
});
