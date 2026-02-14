"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = { email: string; name: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string, returnTo?: string) => void;
  signup: (name: string, email: string, password: string, returnTo?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthReady: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "chhavi_craft_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
    setMounted(true);
  }, []);

  const login = useCallback(
    (email: string, _password: string, returnTo?: string) => {
      const u = { email, name: email.split("@")[0] };
      setUser(u);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch {}
      router.push(returnTo || "/dashboard");
    },
    [router]
  );

  const signup = useCallback(
    (name: string, email: string, _password: string, returnTo?: string) => {
      const u = { email, name: name.trim() || email.split("@")[0] };
      setUser(u);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch {}
      router.push(returnTo || "/dashboard");
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAuthReady: mounted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
