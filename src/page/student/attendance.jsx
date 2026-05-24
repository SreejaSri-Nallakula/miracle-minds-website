import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function StudentAttendancePage() {
  const request = useAuthedApi();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/api/student/attendance")
      .then((res) => setItems(res.data || []))
      .catch((err) => setError(err.message));
  }, [request]);

  return (
    <Panel title="My Attendance">
      {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600"><th className="py-2">Date</th><th>Status</th><th>Class</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="py-2">{item.date ? new Date(item.date).toLocaleDateString() : "-"}</td>
                <td className="capitalize">{item.status}</td>
                <td>{item.classId?.name} {item.classId?.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
