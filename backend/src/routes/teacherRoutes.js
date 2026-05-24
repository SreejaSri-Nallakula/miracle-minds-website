import { Router } from "express";

import { protect, allowRoles } from "../middleware/auth.js";
import {
  getTeacherDashboard,
  getAssignedStudents,
  upsertAttendanceByTeacher,
  upsertResultByTeacher,
  listAnnouncementsForTeacher,
} from "../controllers/teacherController.js";

export const teacherRoutes = Router();

teacherRoutes.use(protect, allowRoles("teacher"));

teacherRoutes.get("/dashboard", getTeacherDashboard);
teacherRoutes.get("/students", getAssignedStudents);
teacherRoutes.post("/attendance", upsertAttendanceByTeacher);
teacherRoutes.post("/results", upsertResultByTeacher);
teacherRoutes.get("/announcements", listAnnouncementsForTeacher);
