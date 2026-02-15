"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyGetUserQuery,
} from "@/store/authApi";
import type { ApiError } from "@/store/baseApi";

type User = { id?: number; email: string; name: string } | null;

const USER_STORAGE_KEY = "chhavi_craft_user";

type AuthContextType = {
  user: User;
  login: (email: string, password: string, returnTo?: string) => Promise<{ ok: boolean; error?: ApiError }>;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    returnTo?: string
  ) => Promise<{ ok: boolean; error?: ApiError }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAuthReady: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

function parseStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed?.email && parsed?.name) {
      return { id: parsed.id, email: parsed.email, name: parsed.name };
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [getUser] = useLazyGetUserQuery();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("chhavi_craft_token") : null;
    if (!token) {
      setUser(null);
      setMounted(true);
      return;
    }

    const storedUser = parseStoredUser();
    if (storedUser) setUser(storedUser);

    getUser()
      .unwrap()
      .then((res) => {
        setUser(res?.user ?? storedUser ?? null);
        setMounted(true);
      })
      .catch(() => {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("chhavi_craft_token");
          localStorage.removeItem(USER_STORAGE_KEY);
        }
        setMounted(true);
      });
  }, [getUser]);

  const login = useCallback(
    async (
      email: string,
      password: string,
      returnTo?: string
    ): Promise<{ ok: boolean; error?: ApiError }> => {
      try {
        const result = await loginMutation({ email, password }).unwrap();
        setUser(result.user);
        router.push(returnTo || "/dashboard");
        return { ok: true };
      } catch (err: unknown) {
        const e = err as { data?: ApiError; status?: number };
        return {
          ok: false,
          error: e?.data || { message: "Login failed" },
        };
      }
    },
    [loginMutation, router]
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string,
      returnTo?: string
    ): Promise<{ ok: boolean; error?: ApiError }> => {
      try {
        const result = await registerMutation({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }).unwrap();
        setUser(result.user);
        router.push(returnTo || "/dashboard");
        return { ok: true };
      } catch (err: unknown) {
        const e = err as { data?: ApiError; status?: number };
        return {
          ok: false,
          error: e?.data || { message: "Registration failed" },
        };
      }
    },
    [registerMutation, router]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Clear anyway on error (e.g. 401)
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("chhavi_craft_token");
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    setUser(null);
    router.push("/login");
  }, [logoutMutation, router]);

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
