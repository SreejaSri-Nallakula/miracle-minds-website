import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function StudentAnnouncementsPage() {
  const request = useAuthedApi();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/api/student/announcements")
      .then((res) => setItems(res.data || []))
      .catch((err) => setError(err.message));
  }, [request]);

  return (
    <Panel title="Announcements">
      {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="rounded-md border border-slate-200 p-3">
            <p className="font-medium text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-600">{item.body}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
