import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function AdminAnnouncementsPage() {
  const request = useAuthedApi();
  const [dashboardAnnouncements, setDashboardAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", targetRoles: "teacher,student" });
  const [message, setMessage] = useState("");

  async function load() {
    const res = await request("/api/admin/dashboard");
    setDashboardAnnouncements(res.data?.recentAnnouncements || []);
  }

  useEffect(() => {
    load().catch((err) => setMessage(err.message));
  }, []);

  async function createAnnouncement(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/admin/announcements", {
        method: "POST",
        body: {
          title: form.title,
          body: form.body,
          targetRoles: form.targetRoles.split(",").map((item) => item.trim()).filter(Boolean),
        },
      });
      setForm({ title: "", body: "", targetRoles: "teacher,student" });
      await load();
      setMessage("Announcement posted");
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function editAnnouncement(item) {
    const title = window.prompt("Title", item.title || "");
    if (!title) return;
    await request(`/api/admin/announcements/${item._id}`, { method: "PATCH", body: { title } });
    await load();
  }

  async function removeAnnouncement(item) {
    if (!window.confirm("Delete announcement?")) return;
    await request(`/api/admin/announcements/${item._id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-4">
      <Panel title="Post Announcement">
        <form onSubmit={createAnnouncement} className="space-y-2">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="title"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            value={form.body}
            onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
            placeholder="announcement"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={form.targetRoles}
            onChange={(event) => setForm((prev) => ({ ...prev, targetRoles: event.target.value }))}
            placeholder="targetRoles ex: teacher,student"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Post</button>
        </form>
      </Panel>

      <Panel title="Recent Announcements">
        {message ? <p className="mb-2 text-sm text-slate-700">{message}</p> : null}
        <ul className="space-y-2">
          {dashboardAnnouncements.map((item) => (
            <li key={item._id} className="rounded-md border border-slate-200 p-3">
              <p className="font-medium text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-600">{item.body}</p>
              <div className="mt-2 space-x-2 text-sm">
                <button onClick={() => editAnnouncement(item)} className="text-blue-600">Edit</button>
                <button onClick={() => removeAnnouncement(item)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
