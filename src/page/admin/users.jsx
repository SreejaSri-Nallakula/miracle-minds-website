import { useEffect, useState } from "react";

import { Panel } from "../../components/dashboard/Panel";
import { useAuthedApi } from "../../lib/useAuthedApi";

const initialForm = { fullName: "", email: "", password: "", role: "student" };

export function AdminUsersPage() {
  const request = useAuthedApi();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await request("/api/admin/users");
    setUsers(res.data || []);
  }

  useEffect(() => {
    load().catch((err) => setMessage(err.message));
  }, []);

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await request("/api/admin/users", { method: "POST", body: form });
      setForm(initialForm);
      await load();
      setMessage("User created");
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function editUser(user) {
    const fullName = window.prompt("Full name", user.fullName || "");
    if (!fullName) return;
    await request(`/api/admin/users/${user._id}`, { method: "PATCH", body: { fullName } });
    await load();
  }

  return (
    <div className="space-y-4">
      <Panel title="Create User Account">
        <form onSubmit={submit} className="grid gap-2 md:grid-cols-2">
          <input required value={form.fullName} onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))} placeholder="fullName" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <input required type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="email" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <input required type="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} placeholder="password" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <select value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="admin">admin</option>
            <option value="teacher">teacher</option>
            <option value="student">student</option>
          </select>
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Create User</button>
        </form>
      </Panel>

      <Panel title="User Accounts">
        {message ? <p className="mb-2 text-sm text-slate-700">{message}</p> : null}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600"><th className="py-2">Name</th><th>Email</th><th>Role</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2">{user.fullName}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>{user.isActive ? "Yes" : "No"}</td>
                  <td><button onClick={() => editUser(user)} className="text-blue-600">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
