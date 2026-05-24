import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SiteLayout } from "./components/SiteLayout";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { ProtectedRoute } from "./components/dashboard/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { LoginPage } from "./page/auth/login";
import { AdminDashboardPage } from "./page/admin/dashboard";
import { AdminStudentsPage } from "./page/admin/students";
import { AdminTeachersPage } from "./page/admin/teachers";
import { AdminAssignmentsPage } from "./page/admin/assignments";
import { AdminAttendancePage } from "./page/admin/attendance";
import { AdminResultsPage } from "./page/admin/results";
import { AdminAnnouncementsPage } from "./page/admin/announcements";
import { AdminUsersPage } from "./page/admin/users";
import { TeacherDashboardPage } from "./page/teacher/dashboard";
import { TeacherStudentsPage } from "./page/teacher/students";
import { TeacherAttendancePage } from "./page/teacher/attendance";
import { TeacherResultsPage } from "./page/teacher/results";
import { TeacherAnnouncementsPage } from "./page/teacher/announcements";
import { StudentDashboardPage } from "./page/student/dashboard";
import { StudentAttendancePage } from "./page/student/attendance";
import { StudentResultsPage } from "./page/student/results";
import { StudentAnnouncementsPage } from "./page/student/announcements";
import { HomePage } from "./page/home.jsx";
import { AboutPage } from "./page/about.jsx";
import { AdmissionsPage } from "./page/admissions.jsx";
import { FacilitiesPage } from "./page/facilities.jsx";
import { GalleryPage } from "./page/gallery.jsx";
import { ContactPage } from "./page/contact.jsx";

const queryClient = new QueryClient();

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold text-ink">404</h1>
        <p className="mt-2 text-ink/70">Page not found.</p>
      </div>
    </div>
  );
}

function RedirectByRole() {
  const { user } = useAuth();

  if (!user?.role) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (user.role === "teacher") {
    return <Navigate to="/teacher/dashboard" replace />;
  }
  if (user.role === "student") {
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />

          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="admissions" element={<AdmissionsPage />} />
            <Route path="facilities" element={<FacilitiesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "teacher", "student"]} />}>
            <Route path="portal" element={<RedirectByRole />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="admin" element={<DashboardLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="teachers" element={<AdminTeachersPage />} />
              <Route path="assignments" element={<AdminAssignmentsPage />} />
              <Route path="attendance" element={<AdminAttendancePage />} />
              <Route path="results" element={<AdminResultsPage />} />
              <Route path="announcements" element={<AdminAnnouncementsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="teacher" element={<DashboardLayout />}>
              <Route path="dashboard" element={<TeacherDashboardPage />} />
              <Route path="students" element={<TeacherStudentsPage />} />
              <Route path="attendance" element={<TeacherAttendancePage />} />
              <Route path="results" element={<TeacherResultsPage />} />
              <Route path="announcements" element={<TeacherAnnouncementsPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="student" element={<DashboardLayout />}>
              <Route path="dashboard" element={<StudentDashboardPage />} />
              <Route path="attendance" element={<StudentAttendancePage />} />
              <Route path="results" element={<StudentResultsPage />} />
              <Route path="announcements" element={<StudentAnnouncementsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
