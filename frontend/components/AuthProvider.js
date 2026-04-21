"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "vastraai_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch (_error) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isReady,
      login(nextAuth) {
        setUser(nextAuth.user);
        setToken(nextAuth.token);
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      },
      logout() {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      },
    }),
    [isReady, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
