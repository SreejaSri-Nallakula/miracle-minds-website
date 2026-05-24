import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

export function TeacherStudentsPage() {
  const request = useAuthedApi();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/api/teacher/students")
      .then((res) => setStudents(res.data || []))
      .catch((err) => setError(err.message));
  }, [request]);

  return (
    <Panel title="Assigned Students">
      {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600"><th className="py-2">Name</th><th>Email</th><th>Class</th><th>Roll</th></tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="py-2">{student.userId?.fullName}</td>
                <td>{student.userId?.email}</td>
                <td>{student.classId?.name} {student.classId?.section}</td>
                <td>{student.rollNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
