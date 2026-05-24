import { useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

const initialForm = { studentId: "", classId: "", date: "", status: "present", remarks: "" };

export function TeacherAttendancePage() {
  const request = useAuthedApi();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/teacher/attendance", { method: "POST", body: form });
      setForm(initialForm);
      setMessage("Attendance saved");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <Panel title="Mark or Update Attendance">
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
      {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
    </Panel>
  );
}
