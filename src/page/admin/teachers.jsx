import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  employeeId: "",
  qualification: "",
};

export function AdminTeachersPage() {
  const request = useAuthedApi();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  async function loadTeachers() {
    const res = await request("/api/admin/teachers");
    setTeachers(res.data || []);
  }

  useEffect(() => {
    loadTeachers().catch((err) => setError(err.message));
  }, []);

  async function createTeacher(event) {
    event.preventDefault();
    setError("");
    try {
      await request("/api/admin/teachers", { method: "POST", body: form });
      setForm(initialForm);
      await loadTeachers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function editTeacher(teacher) {
    const fullName = window.prompt("Full name", teacher.userId?.fullName || "");
    if (!fullName) return;
    await request(`/api/admin/teachers/${teacher._id}`, { method: "PATCH", body: { fullName } });
    await loadTeachers();
  }

  return (
    <div className="space-y-4">
      <Panel title="Add Teacher">
        <form onSubmit={createTeacher} className="grid gap-2 md:grid-cols-2">
          {Object.keys(initialForm).map((field) => (
            <input
              key={field}
              required={["fullName", "email", "password", "employeeId"].includes(field)}
              value={form[field]}
              onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
              placeholder={field}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          ))}
          <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
            Create Teacher
          </button>
        </form>
      </Panel>

      <Panel title="Teachers List">
        {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Employee ID</th>
                <th>Qualification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="border-t">
                  <td className="py-2">{teacher.userId?.fullName}</td>
                  <td>{teacher.userId?.email}</td>
                  <td>{teacher.employeeId}</td>
                  <td>{teacher.qualification}</td>
                  <td>
                    <button onClick={() => editTeacher(teacher)} className="text-blue-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
