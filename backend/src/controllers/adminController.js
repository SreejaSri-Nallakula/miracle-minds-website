import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { User } from "../models/User.js";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";
import { ClassModel } from "../models/Class.js";
import { Subject } from "../models/Subject.js";
import { Attendance } from "../models/Attendance.js";
import { Result } from "../models/Result.js";
import { Announcement } from "../models/Announcement.js";

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const [studentCount, teacherCount, classCount, todayAttendance, resultCount, recentAnnouncements] =
    await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      ClassModel.countDocuments(),
      Attendance.countDocuments({
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }),
      Result.countDocuments(),
      Announcement.find().sort({ createdAt: -1 }).limit(5),
    ]);

  return successResponse(res, {
    studentCount,
    teacherCount,
    classCount,
    todayAttendance,
    resultCount,
    recentAnnouncements,
  });
});

export const createStudent = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    password,
    admissionNumber,
    rollNumber,
    classId,
    parentName,
    parentPhone,
    dateOfBirth,
  } = req.body;

  const user = await User.create({ fullName, email, password, role: "student" });
  const student = await Student.create({
    userId: user._id,
    admissionNumber,
    rollNumber,
    classId,
    parentName,
    parentPhone,
    dateOfBirth,
  });

  return successResponse(res, { user, student }, "Student created", 201);
});

export const listStudents = asyncHandler(async (req, res) => {
  const students = await Student.find()
    .populate("userId", "fullName email role isActive")
    .populate("classId", "name section academicYear")
    .sort({ createdAt: -1 });

  return successResponse(res, students, "Students fetched");
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);

  if (!student) {
    return errorResponse(res, "Student not found", 404);
  }

  const updatableFields = ["admissionNumber", "rollNumber", "classId", "parentName", "parentPhone", "dateOfBirth"];
  for (const field of updatableFields) {
    if (req.body[field] !== undefined) {
      student[field] = req.body[field];
    }
  }
  await student.save();

  if (student.userId) {
    await User.findByIdAndUpdate(student.userId, {
      ...(req.body.fullName ? { fullName: req.body.fullName } : {}),
      ...(req.body.email ? { email: req.body.email } : {}),
      ...(req.body.isActive !== undefined ? { isActive: req.body.isActive } : {}),
    });
  }

  return successResponse(res, student, "Student updated");
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return errorResponse(res, "Student not found", 404);
  }

  await User.findByIdAndDelete(student.userId);
  return successResponse(res, null, "Student deleted");
});

export const createTeacher = asyncHandler(async (req, res) => {
  const { fullName, email, password, employeeId, qualification } = req.body;

  const user = await User.create({ fullName, email, password, role: "teacher" });
  const teacher = await Teacher.create({ userId: user._id, employeeId, qualification });

  return successResponse(res, { user, teacher }, "Teacher created", 201);
});

export const listTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find()
    .populate("userId", "fullName email role isActive")
    .populate("assignedClasses", "name section academicYear")
    .populate("assignedSubjects", "name code")
    .sort({ createdAt: -1 });

  return successResponse(res, teachers, "Teachers fetched");
});

export const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    return errorResponse(res, "Teacher not found", 404);
  }

  const updatableFields = ["employeeId", "qualification"];
  for (const field of updatableFields) {
    if (req.body[field] !== undefined) {
      teacher[field] = req.body[field];
    }
  }
  await teacher.save();

  await User.findByIdAndUpdate(teacher.userId, {
    ...(req.body.fullName ? { fullName: req.body.fullName } : {}),
    ...(req.body.email ? { email: req.body.email } : {}),
    ...(req.body.isActive !== undefined ? { isActive: req.body.isActive } : {}),
  });

  return successResponse(res, teacher, "Teacher updated");
});

export const assignClassSubject = asyncHandler(async (req, res) => {
  const { teacherId, classId, subjectId } = req.body;

  const [teacher, classDoc, subject] = await Promise.all([
    Teacher.findById(teacherId),
    ClassModel.findById(classId),
    Subject.findById(subjectId),
  ]);

  if (!teacher || !classDoc || !subject) {
    return errorResponse(res, "Teacher/Class/Subject not found", 404);
  }

  if (!teacher.assignedClasses.map(String).includes(String(classId))) {
    teacher.assignedClasses.push(classId);
  }
  if (!teacher.assignedSubjects.map(String).includes(String(subjectId))) {
    teacher.assignedSubjects.push(subjectId);
  }

  subject.classId = classId;
  subject.assignedTeacher = teacherId;

  await Promise.all([teacher.save(), subject.save()]);
  return successResponse(res, { teacher, subject }, "Class and subject assigned");
});

export const createOrUpdateAttendance = asyncHandler(async (req, res) => {
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
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return successResponse(res, attendance, "Attendance upserted");
});

export const listAttendance = asyncHandler(async (req, res) => {
  const { classId, studentId, date } = req.query;

  const filter = {};
  if (classId) filter.classId = classId;
  if (studentId) filter.studentId = studentId;
  if (date) filter.date = new Date(date);

  const records = await Attendance.find(filter)
    .populate({ path: "studentId", populate: { path: "userId", select: "fullName" } })
    .populate("classId", "name section")
    .populate("markedBy", "fullName role")
    .sort({ date: -1 });

  return successResponse(res, records, "Attendance fetched");
});

export const addOrUpdateResult = asyncHandler(async (req, res) => {
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

  return successResponse(res, result, "Result upserted");
});

export const listResults = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.query;
  const filter = {};
  if (classId) filter.classId = classId;
  if (studentId) filter.studentId = studentId;

  const results = await Result.find(filter)
    .populate({ path: "studentId", populate: { path: "userId", select: "fullName" } })
    .populate("subjectId", "name code")
    .populate("classId", "name section")
    .sort({ createdAt: -1 });

  return successResponse(res, results, "Results fetched");
});

export const postAnnouncement = asyncHandler(async (req, res) => {
  const { title, body, targetRoles } = req.body;

  const announcement = await Announcement.create({
    title,
    body,
    targetRoles: Array.isArray(targetRoles) && targetRoles.length ? targetRoles : ["teacher", "student"],
    createdBy: req.user._id,
  });

  return successResponse(res, announcement, "Announcement posted", 201);
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const announcement = await Announcement.findByIdAndUpdate(
    id,
    {
      ...(req.body.title ? { title: req.body.title } : {}),
      ...(req.body.body ? { body: req.body.body } : {}),
      ...(req.body.targetRoles ? { targetRoles: req.body.targetRoles } : {}),
    },
    { new: true },
  );

  if (!announcement) {
    return errorResponse(res, "Announcement not found", 404);
  }

  return successResponse(res, announcement, "Announcement updated");
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const announcement = await Announcement.findByIdAndDelete(id);

  if (!announcement) {
    return errorResponse(res, "Announcement not found", 404);
  }

  return successResponse(res, null, "Announcement deleted");
});

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("fullName email role isActive createdAt").sort({ createdAt: -1 });
  return successResponse(res, users, "Users fetched");
});

export const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const user = await User.create({ fullName, email, password, role });
  return successResponse(res, user, "User created", 201);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return errorResponse(res, "User not found", 404);
  }

  if (req.body.fullName !== undefined) user.fullName = req.body.fullName;
  if (req.body.email !== undefined) user.email = req.body.email;
  if (req.body.role !== undefined) user.role = req.body.role;
  if (req.body.isActive !== undefined) user.isActive = req.body.isActive;
  if (req.body.password) user.password = req.body.password;

  await user.save();
  return successResponse(res, user, "User updated");
});
