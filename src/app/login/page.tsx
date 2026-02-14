"use client";

import { Suspense } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
});

function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  if (isAuthenticated) {
    router.push(returnTo);
    return null;
  }

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-md px-4 py-16 sm:py-24">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
          <h1 className="font-display text-2xl font-normal text-[var(--foreground)]">Log in</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter your details to access your account
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setStatus }) => {
              setStatus(null);
              const result = await login(values.email, values.password, returnTo);
              if (!result.ok && result.error) {
                const msg = result.error.errors?.email?.[0] ?? result.error.message;
                setStatus(msg);
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="mt-8 space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)]">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                {status && (
                  <p className="text-sm text-red-600">{status}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? "Logging in…" : "Log in"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            Don&apos;t have an account?{" "}
            <Link href={`/signup${returnTo !== "/dashboard" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`} className="font-medium text-[var(--accent)] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
