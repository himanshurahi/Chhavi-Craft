"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { RiSettings3Line } from "react-icons/ri";

const settingsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().matches(/^[0-9\s-]+$/, "Invalid phone").optional(),
  address: Yup.string().optional(),
});

type SettingsValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function DashboardSettingsPage() {
  const { user } = useAuth();

  const initialValues: SettingsValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "06, Rohtak Flyover, near Detailing Street, Model Town, Sonipat, Haryana 131001",
  };

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--foreground)]">
        <RiSettings3Line className="h-6 w-6" />
        Settings
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Manage your profile and preferences
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={settingsSchema}
        enableReinitialize
        onSubmit={(values) => {
          // In a real app, would call API
          console.log("Settings saved:", values);
          alert("Settings saved!");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8 max-w-xl space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
                Full name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
              <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)]">
                Phone
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="089509 62636"
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
              <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-[var(--foreground)]">
                Address
              </label>
              <Field
                id="address"
                name="address"
                as="textarea"
                rows={3}
                placeholder="Your delivery address"
                className="mt-2 w-full resize-none rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
              <ErrorMessage name="address" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
            >
              Save settings
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
