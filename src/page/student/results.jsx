import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function StudentResultsPage() {
  const request = useAuthedApi();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/api/student/results")
      .then((res) => setItems(res.data || []))
      .catch((err) => setError(err.message));
  }, [request]);

  return (
    <Panel title="My Results">
      {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600"><th className="py-2">Subject</th><th>Exam</th><th>Marks</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="py-2">{item.subjectId?.name || "-"}</td>
                <td>{item.examName}</td>
                <td>{item.marksObtained}/{item.maxMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
