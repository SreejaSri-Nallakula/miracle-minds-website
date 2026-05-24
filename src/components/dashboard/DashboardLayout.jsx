import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, GraduationCap, Presentation, ClipboardList, CalendarCheck, BarChart3, Megaphone, UserCog, Menu, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const roleMenus = {
  admin: [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/students", label: "Students", icon: GraduationCap },
    { to: "/admin/teachers", label: "Teachers", icon: Presentation },
    { to: "/admin/assignments", label: "Assignments", icon: ClipboardList },
    { to: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/admin/results", label: "Results", icon: BarChart3 },
    { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { to: "/admin/users", label: "Users", icon: UserCog },
  ],
  teacher: [
    { to: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/teacher/students", label: "Students", icon: GraduationCap },
    { to: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/teacher/results", label: "Results", icon: BarChart3 },
    { to: "/teacher/announcements", label: "Announcements", icon: Megaphone },
  ],
  student: [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/student/results", label: "Results", icon: BarChart3 },
    { to: "/student/announcements", label: "Announcements", icon: Megaphone },
  ],
};

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const menuItems = roleMenus[user?.role] || [];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-slate-100">
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className={`fixed left-4 top-4 z-40 rounded-lg bg-slate-900 p-2.5 text-white shadow-lg md:hidden ${menuOpen ? "hidden" : ""}`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-slate-900 p-4 text-slate-100 transition-transform duration-300 ease-in-out md:translate-x-0 md:flex ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=2" alt="logo" className="h-12 object-contain" loading="eager" />
            <img src="/SchlName.png?v=2" alt="SchlName" className="h-24 object-contain" loading="lazy" />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">{user?.role} panel</h2>
        <nav className="mt-3 flex-1 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-amber-400 text-slate-900" : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 border-t border-slate-700 pt-4">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-900/20 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="min-h-screen md:ml-64">
        <div className="p-4 lg:p-6 pt-16 md:pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
