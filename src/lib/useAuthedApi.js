import { useCallback } from "react";

import { useAuth } from "../context/AuthContext";
import { apiRequest } from "./apiClient";

export function useAuthedApi() {
  const { token, logout } = useAuth();

  const request = useCallback(
    async (path, options = {}) => {
      try {
        return await apiRequest(path, { ...options, token });
      } catch (error) {
        if (error.message.toLowerCase().includes("unauthorized") || error.message.toLowerCase().includes("invalid token")) {
          logout();
        }
        throw error;
      }
    },
    [token, logout],
  );

  return request;
}
