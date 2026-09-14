"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

type User = { id: string; name: string; email: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("auth_token");
    if (saved) {
      setToken(saved);
      fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${saved}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((u) => {
          if (u) setUser({ id: u._id, name: u.name, email: u.email });
          else {
            localStorage.removeItem("auth_token");
            setToken(null);
          }
        })
        .finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Login failed" };
    localStorage.setItem("auth_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return {};
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Registration failed" };
    localStorage.setItem("auth_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return {};
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isReady, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
