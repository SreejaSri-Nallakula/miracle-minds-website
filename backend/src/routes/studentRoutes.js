import { Router } from "express";

import { protect, allowRoles } from "../middleware/auth.js";
import {
  getStudentDashboard,
  getMyAttendance,
  getMyResults,
  listAnnouncementsForStudent,
} from "../controllers/studentController.js";

export const studentRoutes = Router();

studentRoutes.use(protect, allowRoles("student"));

studentRoutes.get("/dashboard", getStudentDashboard);
studentRoutes.get("/attendance", getMyAttendance);
studentRoutes.get("/results", getMyResults);
studentRoutes.get("/announcements", listAnnouncementsForStudent);
