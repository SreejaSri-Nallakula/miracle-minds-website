import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const rolePath = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
};

export function LoginPage() {
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated && user?.role) {
    return <Navigate to={rolePath[user.role] || "/"} replace />;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const nextUser = await login(email, password);
      navigate(rolePath[nextUser?.role] || "/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e2e8f0,#f8fafc_45%,#ffffff)] px-4 py-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="grid md:grid-cols-2">
          <div className="bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Miracle Minds</p>
            <h1 className="mt-3 text-3xl font-bold">School Portal Login</h1>
            <p className="mt-3 text-sm text-slate-300">
              Use your Admin, Teacher, or Student credentials to access your dashboard.
            </p>
          </div>
          <div className="p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                  placeholder="******"
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
