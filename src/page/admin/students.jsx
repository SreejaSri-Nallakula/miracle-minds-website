import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  admissionNumber: "",
  rollNumber: "",
  classId: "",
  parentName: "",
  parentPhone: "",
};

export function AdminStudentsPage() {
  const request = useAuthedApi();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  async function loadStudents() {
    const res = await request("/api/admin/students");
    setStudents(res.data || []);
  }

  useEffect(() => {
    loadStudents().catch((err) => setError(err.message));
  }, []);

  async function createStudent(event) {
    event.preventDefault();
    setError("");
    try {
      await request("/api/admin/students", { method: "POST", body: form });
      setForm(initialForm);
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  async function editStudent(student) {
    const fullName = window.prompt("Full name", student.userId?.fullName || "");
    if (!fullName) return;
    await request(`/api/admin/students/${student._id}`, { method: "PATCH", body: { fullName } });
    await loadStudents();
  }

  async function removeStudent(student) {
    if (!window.confirm(`Delete ${student.userId?.fullName || "student"}?`)) return;
    await request(`/api/admin/students/${student._id}`, { method: "DELETE" });
    await loadStudents();
  }

  return (
    <div className="space-y-4">
      <Panel title="Add Student">
        <form onSubmit={createStudent} className="grid gap-2 md:grid-cols-2">
          {Object.keys(initialForm).map((field) => (
            <input
              key={field}
              required={["fullName", "email", "password", "admissionNumber", "rollNumber", "classId"].includes(field)}
              value={form[field]}
              onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
              placeholder={field}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          ))}
          <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
            Create Student
          </button>
        </form>
      </Panel>

      <Panel title="Students List">
        {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Admission</th>
                <th>Roll</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="py-2">{student.userId?.fullName}</td>
                  <td>{student.userId?.email}</td>
                  <td>{student.admissionNumber}</td>
                  <td>{student.rollNumber}</td>
                  <td className="space-x-2">
                    <button onClick={() => editStudent(student)} className="text-blue-600">
                      Edit
                    </button>
                    <button onClick={() => removeStudent(student)} className="text-red-600">
                      Delete
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
