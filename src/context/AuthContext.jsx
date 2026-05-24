import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { apiRequest, getStoredToken, setStoredToken } from "../lib/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    setStoredToken("");
  }, []);

  const fetchMe = useCallback(
    async (activeToken) => {
      if (!activeToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest("/api/auth/me", { token: activeToken });
        setUser(response?.data?.user || null);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    },
    [logout],
  );

  useEffect(() => {
    fetchMe(token);
  }, [fetchMe, token]);

  const login = useCallback(async (email, password) => {
    const response = await apiRequest("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });

    const nextToken = response?.data?.token || "";
    const nextUser = response?.data?.user || null;

    setToken(nextToken);
    setUser(nextUser);
    setStoredToken(nextToken);

    return nextUser;
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
