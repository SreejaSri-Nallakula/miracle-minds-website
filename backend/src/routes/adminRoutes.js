import { Router } from "express";

import { protect, allowRoles } from "../middleware/auth.js";
import {
  getAdminDashboard,
  createStudent,
  listStudents,
  updateStudent,
  deleteStudent,
  createTeacher,
  listTeachers,
  updateTeacher,
  assignClassSubject,
  createOrUpdateAttendance,
  listAttendance,
  addOrUpdateResult,
  listResults,
  postAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  listUsers,
  createUser,
  updateUser,
} from "../controllers/adminController.js";

export const adminRoutes = Router();

adminRoutes.use(protect, allowRoles("admin"));

adminRoutes.get("/dashboard", getAdminDashboard);

adminRoutes.post("/students", createStudent);
adminRoutes.get("/students", listStudents);
adminRoutes.patch("/students/:id", updateStudent);
adminRoutes.delete("/students/:id", deleteStudent);

adminRoutes.post("/teachers", createTeacher);
adminRoutes.get("/teachers", listTeachers);
adminRoutes.patch("/teachers/:id", updateTeacher);

adminRoutes.post("/assignments", assignClassSubject);

adminRoutes.post("/attendance", createOrUpdateAttendance);
adminRoutes.get("/attendance", listAttendance);

adminRoutes.post("/results", addOrUpdateResult);
adminRoutes.get("/results", listResults);

adminRoutes.post("/announcements", postAnnouncement);
adminRoutes.patch("/announcements/:id", updateAnnouncement);
adminRoutes.delete("/announcements/:id", deleteAnnouncement);

adminRoutes.get("/users", listUsers);
adminRoutes.post("/users", createUser);
adminRoutes.patch("/users/:id", updateUser);
