import { useEffect, useState } from "react";
import { useAuthedApi } from "../../lib/useAuthedApi";
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Megaphone,
  TrendingUp,
  Clock,
} from "lucide-react";

// ── Design tokens (exact match to about.jsx) ─────────────────────────────────
const NAVY      = "#0f2557";
const TERRA     = "#c55a3f";
const BG        = "#f4f5f8";
const TEXT_MID  = "#555568";
const TEXT_SOFT = "#6b6b80";

// ── Stat card definitions ─────────────────────────────────────────────────────
const STATS = [
  { key: "studentCount",    label: "Students",         Icon: Users,         accent: NAVY,  iconBg: "#eef1f8" },
  { key: "teacherCount",    label: "Teachers",         Icon: GraduationCap, accent: TERRA, iconBg: "#fdf0ec" },
  { key: "classCount",      label: "Classes",          Icon: BookOpen,      accent: NAVY,  iconBg: "#eef1f8" },
  { key: "todayAttendance", label: "Today Attendance", Icon: CalendarCheck, accent: TERRA, iconBg: "#fdf0ec" },
];

// ── Skeleton pulse block ──────────────────────────────────────────────────────
function Skeleton({ className = "" }) {
  return (
    <div
      className={`rounded animate-pulse ${className}`}
      style={{ background: "#e4e6ee" }}
    />
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, Icon, accent, iconBg, loading }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden flex"
      style={{ boxShadow: "0 1px 5px rgba(15,37,87,.08)" }}
    >
      {/* Left accent bar */}
      <div className="w-[5px] shrink-0" style={{ background: accent }} />

      <div className="flex-1 flex items-center gap-3 px-4 py-4 sm:px-5 sm:py-5">
        {/* Icon badge */}
        <div
          className="rounded-lg flex items-center justify-center shrink-0 w-10 h-10 sm:w-11 sm:h-11"
          style={{ background: iconBg }}
        >
          <Icon style={{ color: accent }} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </div>

        {/* Value + label */}
        <div className="min-w-0">
          {loading ? (
            <>
              <Skeleton className="h-7 w-16 mb-1" />
              <Skeleton className="h-2.5 w-20" />
            </>
          ) : (
            <>
              <p
                className="font-serif font-bold leading-none mb-[5px] text-[24px] sm:text-[28px] md:text-[30px]"
                style={{ color: NAVY }}
              >
                {(value ?? 0).toLocaleString()}
              </p>
              <p
                className="uppercase font-medium text-[9.5px] sm:text-[10.5px] tracking-[1.8px]"
                style={{ color: TEXT_SOFT }}
              >
                {label}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Attendance insight card ───────────────────────────────────────────────────
function AttendanceCard({ data, loading }) {
  const pct =
    data?.studentCount
      ? Math.round((data.todayAttendance / data.studentCount) * 100)
      : 0;

  return (
    <div
      className="min-w-0 bg-white rounded-xl overflow-hidden flex"
      style={{ boxShadow: "0 1px 5px rgba(15,37,87,.08)" }}
    >
      <div className="w-[5px] shrink-0" style={{ background: NAVY }} />
      <div className="flex-1 p-4 sm:p-5 md:p-6">
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="rounded-lg flex items-center justify-center w-9 h-9 shrink-0"
            style={{ background: "#eef1f8" }}
          >
            <TrendingUp style={{ color: NAVY }} className="w-[17px] h-[17px]" />
          </div>
          <h3
            className="font-serif font-semibold text-[15px] sm:text-[16px] md:text-[17px]"
            style={{ color: NAVY }}
          >
            Attendance Rate
          </h3>
        </div>

        {loading ? (
          <>
            <Skeleton className="h-10 w-24 mb-2" />
            <Skeleton className="h-3 w-40" />
          </>
        ) : (
          <>
            <p
              className="font-serif font-bold leading-none mb-1 text-[34px] sm:text-[38px]"
              style={{ color: TERRA }}
            >
              {pct}
              <span className="text-[18px] sm:text-[20px]">%</span>
            </p>
            <p className="text-[12px] sm:text-[13px]" style={{ color: TEXT_SOFT }}>
              {data.todayAttendance ?? 0} of {data.studentCount ?? 0} students present
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Announcements panel ───────────────────────────────────────────────────────
function AnnouncementsPanel({ items = [], loading }) {
  return (
    <div
      className="min-w-0 bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: "0 1px 5px rgba(15,37,87,.08)" }}
    >
      {/* Panel header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-100">
        <div
          className="rounded-lg flex items-center justify-center w-8 h-8 shrink-0"
          style={{ background: "#fdf0ec" }}
        >
          <Megaphone style={{ color: TERRA }} className="w-4 h-4" />
        </div>
        <p className="font-medium text-[13px] sm:text-sm" style={{ color: NAVY }}>
          Recent Announcements
        </p>
      </div>

      {/* Body */}
      <ul className="divide-y divide-slate-100">
        {loading ? (
          [1, 2, 3].map((n) => (
            <li key={n} className="flex items-start gap-3 px-4 sm:px-5 py-4">
              <div
                className="mt-1.5 shrink-0 w-2 h-2 rounded-full"
                style={{ background: "#e4e6ee" }}
              />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </li>
          ))
        ) : items.length === 0 ? (
          <li className="px-5 py-8 text-center text-[13px]" style={{ color: TEXT_SOFT }}>
            No announcements yet.
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item._id}
              className="flex items-start gap-3 px-4 sm:px-5 py-4"
            >
              <div
                className="mt-[7px] shrink-0 w-[7px] h-[7px] rounded-full"
                style={{ background: TERRA }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="font-medium text-[13px] sm:text-[13.5px] leading-snug mb-0.5"
                  style={{ color: NAVY }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[12px] sm:text-[12.5px] leading-[1.65]"
                  style={{ color: TEXT_MID }}
                >
                  {item.body}
                </p>
              </div>
              {item.time && (
                <div
                  className="shrink-0 flex items-center gap-1 text-[10.5px] mt-0.5 whitespace-nowrap"
                  style={{ color: TEXT_SOFT }}
                >
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function AdminDashboardPage() {
  const request = useAuthedApi();
  const [data,  setData]  = useState(null);
  const [error, setError] = useState("");

  const loading = !data && !error;

  useEffect(() => {
    request("/api/admin/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, [request]);

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: BG }}
      >
        <p className="text-sm text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ background: BG }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden
                   px-4 pt-8 pb-8
                   sm:px-8 sm:pt-12 sm:pb-10
                   md:px-12 md:pt-14 md:pb-12
                   lg:px-16"
        style={{ background: NAVY }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)",
          }}
        />
        <div className="relative w-full max-w-none">
          {/* Eyebrow */}
          <p
            className="flex items-center gap-2 uppercase font-medium mb-3 text-[9.5px] sm:text-[10.5px] tracking-[2.5px]"
            style={{ color: "#93a8d0" }}
          >
            <span className="block h-[1.5px] w-6 sm:w-8 shrink-0" style={{ background: TERRA }} />
            Miracle Minds Primary School
          </p>

          <h1
            className="font-serif font-bold leading-tight mb-2
                       text-[22px] sm:text-[30px] md:text-[36px] lg:text-[40px]"
          >
            Admin Dashboard
          </h1>

          <p
            className="font-light leading-[1.75] text-[12.5px] sm:text-[14px] md:text-[15px]"
            style={{ color: "#c7d4ee" }}
          >
            Live overview of school activity — students, staff, classes, and attendance.
          </p>

          <div
            className="rounded-full mt-5 sm:mt-6 w-9 h-[3px] sm:w-11"
            style={{ background: TERRA }}
          />
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div
        className="w-full
                   px-4 pt-5 pb-10
                   sm:px-6 sm:pt-8 sm:pb-12
                   md:px-8 md:pt-10 md:pb-14
                   lg:px-10"
      >

        {/* Stat grid — 2 cols on mobile, 4 cols on md+ */}
        <div className="grid gap-3 grid-cols-2 xl:grid-cols-4 mb-4">
          {STATS.map(({ key, label, Icon, accent, iconBg }) => (
            <StatCard
              key={key}
              label={label}
              value={data?.[key]}
              Icon={Icon}
              accent={accent}
              iconBg={iconBg}
              loading={loading}
            />
          ))}
        </div>

        {/* Attendance + Announcements — stacked on mobile, side-by-side on lg */}
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] items-start">
          <AttendanceCard data={data} loading={loading} />
          <AnnouncementsPanel
            items={data?.recentAnnouncements}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
}