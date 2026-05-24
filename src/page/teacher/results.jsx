import { useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

const initialForm = {
  studentId: "",
  classId: "",
  subjectId: "",
  examName: "",
  marksObtained: "",
  maxMarks: "",
  remarks: "",
};

export function TeacherResultsPage() {
  const request = useAuthedApi();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/teacher/results", {
        method: "POST",
        body: {
          ...form,
          marksObtained: Number(form.marksObtained),
          maxMarks: Number(form.maxMarks),
        },
      });
      setForm(initialForm);
      setMessage("Marks saved");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <Panel title="Add or Update Student Marks">
      <form onSubmit={submit} className="grid gap-2 md:grid-cols-2">
        {Object.keys(initialForm).map((field) => (
          <input
            key={field}
            required={field !== "remarks"}
            value={form[field]}
            onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
            placeholder={field}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        ))}
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Save Marks</button>
      </form>
      {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
    </Panel>
  );
}
