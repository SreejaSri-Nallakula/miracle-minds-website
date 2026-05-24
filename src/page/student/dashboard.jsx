import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { StatGrid } from "../../components/dashboard/StatGrid";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function StudentDashboardPage() {
  const request = useAuthedApi();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/api/student/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, [request]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-slate-500">Loading dashboard...</p>;

  return (
    <div className="space-y-4">
      <StatGrid
        stats={[
          { label: "Attendance Entries", value: data.attendanceCount ?? 0 },
          { label: "Results", value: data.resultCount ?? 0 },
          { label: "Class", value: data.student?.classId?.name || "-" },
          { label: "Section", value: data.student?.classId?.section || "-" },
        ]}
      />

      <Panel title="Basic Info">
        <p className="text-sm text-slate-700">Name: {data.student?.userId?.fullName}</p>
        <p className="text-sm text-slate-700">Roll Number: {data.student?.rollNumber}</p>
        <p className="text-sm text-slate-700">Admission Number: {data.student?.admissionNumber}</p>
      </Panel>
    </div>
  );
}
