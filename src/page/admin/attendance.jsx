import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

const initialForm = { studentId: "", classId: "", date: "", status: "present", remarks: "" };

export function AdminAttendancePage() {
  const request = useAuthedApi();
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await request("/api/admin/attendance");
    setRecords(res.data || []);
  }

  useEffect(() => {
    load().catch((err) => setMessage(err.message));
  }, []);

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/admin/attendance", { method: "POST", body: form });
      setForm(initialForm);
      await load();
      setMessage("Attendance saved");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Add or Update Attendance">
        <form onSubmit={submit} className="grid gap-2 md:grid-cols-2">
          <input required value={form.studentId} onChange={(event) => setForm((prev) => ({ ...prev, studentId: event.target.value }))} placeholder="studentId" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <input required value={form.classId} onChange={(event) => setForm((prev) => ({ ...prev, classId: event.target.value }))} placeholder="classId" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <input required type="date" value={form.date} onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="present">present</option>
            <option value="absent">absent</option>
            <option value="late">late</option>
          </select>
          <input value={form.remarks} onChange={(event) => setForm((prev) => ({ ...prev, remarks: event.target.value }))} placeholder="remarks" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Save</button>
        </form>
      </Panel>

      <Panel title="Attendance Records">
        {message ? <p className="mb-2 text-sm text-slate-700">{message}</p> : null}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600"><th className="py-2">Student</th><th>Status</th><th>Date</th><th>Marked By</th></tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row._id} className="border-t">
                  <td className="py-2">{row.studentId?.userId?.fullName || row.studentId?._id}</td>
                  <td className="capitalize">{row.status}</td>
                  <td>{row.date ? new Date(row.date).toLocaleDateString() : "-"}</td>
                  <td>{row.markedBy?.fullName || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
