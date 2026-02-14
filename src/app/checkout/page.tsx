"use client";

import { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiUserLine, RiUserFollowLine } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const checkoutSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

type CheckoutValues = {
  email: string;
  name: string;
  phone: string;
  address: string;
};

export default function CheckoutPage() {
  const { items, total, placeOrder } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const isPlacingOrder = useRef(false);

  useEffect(() => {
    if (items.length === 0 && !isPlacingOrder.current && typeof window !== "undefined") {
      router.push("/cart");
    }
  }, [items.length, router]);

  const initialValues: CheckoutValues = {
    email: user?.email ?? "",
    name: user?.name ?? "",
    phone: "",
    address: "06, Rohtak Flyover, near Detailing Street, Model Town, Sonipat, Haryana 131001",
  };

  const handlePlaceOrder = (values: CheckoutValues) => {
    isPlacingOrder.current = true;
    const order = placeOrder({
      email: values.email,
      name: values.name,
      phone: values.phone,
      address: values.address,
      isGuest: !isAuthenticated,
    });
    if (order) {
      router.push("/checkout/success");
    }
  };

  if (items.length === 0 && !isPlacingOrder.current) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
        >
          <RiArrowLeftLine className="h-4 w-4" />
          Back to cart
        </Link>

        <h1 className="font-display text-2xl font-normal text-[var(--foreground)] sm:text-3xl">
          Checkout
        </h1>

        {/* Guest or Login */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/5 px-4 py-3">
              <RiUserFollowLine className="h-5 w-5 text-[var(--accent)]" />
              <span className="text-sm font-medium text-[var(--foreground)]">
                Logged in as {user?.email}
              </span>
            </div>
          ) : (
            <>
              <Link
                href="/login?returnTo=/checkout"
                className="flex items-center gap-3 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                <RiUserFollowLine className="h-5 w-5" />
                Log in to your account
              </Link>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                <RiUserLine className="h-5 w-5 text-[var(--muted)]" />
                <span className="text-sm font-medium text-[var(--muted)]">
                  Continue as guest
                </span>
              </div>
            </>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Checkout form */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Contact & shipping
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handlePlaceOrder}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="mt-6 space-y-5">
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
                    <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
                      Full name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                    <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)]">
                      Phone
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 89509 62636"
                      className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                    <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[var(--foreground)]">
                      Shipping address
                    </label>
                    <Field
                      id="address"
                      name="address"
                      as="textarea"
                      rows={3}
                      placeholder="Your delivery address"
                      className="mt-2 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                    <ErrorMessage name="address" component="p" className="mt-1 text-sm text-red-600" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[var(--accent)] px-6 py-4 text-base font-semibold text-white hover:opacity-90 disabled:opacity-70"
                  >
                    Place order
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Order summary */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Order summary</h2>
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-[var(--foreground)]">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-[var(--foreground)]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[var(--border)] pt-6">
              <div className="flex justify-between text-base font-semibold text-[var(--foreground)]">
                <span>Total</span>
                <span className="text-[var(--accent)]">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
