import { useEffect, useState } from "react";

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

export function AdminResultsPage() {
  const request = useAuthedApi();
  const [results, setResults] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await request("/api/admin/results");
    setResults(res.data || []);
  }

  useEffect(() => {
    load().catch((err) => setMessage(err.message));
  }, []);

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/admin/results", {
        method: "POST",
        body: {
          ...form,
          marksObtained: Number(form.marksObtained),
          maxMarks: Number(form.maxMarks),
        },
      });
      setForm(initialForm);
      await load();
      setMessage("Result saved");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Add or Update Result">
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
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Save Result</button>
        </form>
      </Panel>

      <Panel title="Results List">
        {message ? <p className="mb-2 text-sm text-slate-700">{message}</p> : null}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600"><th className="py-2">Student</th><th>Subject</th><th>Exam</th><th>Marks</th></tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row._id} className="border-t">
                  <td className="py-2">{row.studentId?.userId?.fullName || row.studentId?._id}</td>
                  <td>{row.subjectId?.name || row.subjectId?._id}</td>
                  <td>{row.examName}</td>
                  <td>{row.marksObtained}/{row.maxMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
