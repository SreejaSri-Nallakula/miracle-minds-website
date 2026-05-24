import { useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function AdminAssignmentsPage() {
  const request = useAuthedApi();
  const [form, setForm] = useState({ teacherId: "", classId: "", subjectId: "" });
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/admin/assignments", { method: "POST", body: form });
      setMessage("Assignment saved");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <Panel title="Assign Class and Subject">
      <form onSubmit={submit} className="grid gap-2 md:grid-cols-2">
        <input
          required
          value={form.teacherId}
          onChange={(event) => setForm((prev) => ({ ...prev, teacherId: event.target.value }))}
          placeholder="teacherId"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          required
          value={form.classId}
          onChange={(event) => setForm((prev) => ({ ...prev, classId: event.target.value }))}
          placeholder="classId"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          required
          value={form.subjectId}
          onChange={(event) => setForm((prev) => ({ ...prev, subjectId: event.target.value }))}
          placeholder="subjectId"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Save Assignment</button>
      </form>
      {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
    </Panel>
  );
}
