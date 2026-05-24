import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { StatGrid } from "../../components/dashboard/StatGrid";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function TeacherDashboardPage() {
  const request = useAuthedApi();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/api/teacher/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, [request]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-slate-500">Loading dashboard...</p>;

  return (
    <div className="space-y-4">
      <StatGrid
        stats={[
          { label: "Assigned Students", value: data.studentCount ?? 0 },
          { label: "Attendance Records", value: data.attendanceCount ?? 0 },
          { label: "Results Entries", value: data.resultCount ?? 0 },
          { label: "Classes", value: data.teacher?.assignedClasses?.length ?? 0 },
        ]}
      />

      <Panel title="Your Class and Subject Assignments">
        <p className="text-sm font-semibold text-slate-700">Classes</p>
        <ul className="mb-3 list-disc pl-5 text-sm text-slate-600">
          {(data.teacher?.assignedClasses || []).map((item) => (
            <li key={item._id}>{item.name} {item.section}</li>
          ))}
        </ul>
        <p className="text-sm font-semibold text-slate-700">Subjects</p>
        <ul className="list-disc pl-5 text-sm text-slate-600">
          {(data.teacher?.assignedSubjects || []).map((item) => (
            <li key={item._id}>{item.name} ({item.code})</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
