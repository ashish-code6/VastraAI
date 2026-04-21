"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AuthFormView({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const isSignup = mode === "signup";
  const nextPath = searchParams.get("next");
  const safeNextPath = nextPath?.startsWith("/") ? nextPath : "/profile";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const config = useMemo(
    () =>
      isSignup
        ? {
            title: "Create your VastraAI account",
            subtitle: "Sign up with email and verify using a one-time password",
            sendOtpPath: "/auth/signup/send-otp",
            verifyOtpPath: "/auth/signup/verify-otp",
            buttonLabel: "Create Account",
            alternateLabel: "Already have an account?",
            alternateHref: "/login",
            alternateCta: "Log in",
          }
        : {
            title: "Login to VastraAI",
            subtitle: "Use a one-time password to access your style dashboard",
            sendOtpPath: "/auth/login/send-otp",
            verifyOtpPath: "/auth/login/verify-otp",
            buttonLabel: "Login",
            alternateLabel: "New to VastraAI?",
            alternateHref: "/signup",
            alternateCta: "Create account",
          },
    [isSignup],
  );

  async function handleSendOtp(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}${config.sendOtpPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isSignup ? { name: name.trim(), email: email.trim() } : { email: email.trim() },
        ),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send OTP.");
      }

      setOtpSent(true);
      setMessage(data.message);
    } catch (requestError) {
      setError(requestError.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}${config.verifyOtpPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to verify OTP.");
      }

      login({
        user: data.user,
        token: data.token,
      });
      router.push(safeNextPath);
    } catch (requestError) {
      setError(requestError.message || "Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_top_left,rgba(108,59,255,0.07),transparent_22%),linear-gradient(180deg,#ffffff_0%,#F8F7FF_100%)] px-6 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[0.44fr_0.56fr]">
        <aside className="hidden rounded-[2.25rem] bg-[radial-gradient(circle_at_top,#efe8ff_0%,#dbcfff_35%,#a985ff_100%)] p-8 text-white shadow-[0_24px_70px_rgba(108,59,255,0.22)] lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Secure Access
          </p>
          <h2 className="brand-font mt-6 text-4xl leading-tight font-semibold">
            OTP-based authentication for a smoother sign in flow.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-white/80">
            We send a one-time code to your email, verify it, and bring you
            straight into your styling workspace without a password.
          </p>
          <div className="mt-10 space-y-4">
            <div className="rounded-[1.5rem] border border-white/20 bg-white/12 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold">1. Enter your email</p>
              <p className="mt-2 text-sm text-white/75">We send a secure one-time code.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/20 bg-white/12 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold">2. Verify the OTP</p>
              <p className="mt-2 text-sm text-white/75">Use the code to continue instantly.</p>
            </div>
          </div>
        </aside>

        <div className="rounded-[2.25rem] border border-white/80 bg-white px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-10 sm:py-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#6C3BFF]">
            {isSignup ? "Sign Up" : "Login"}
          </p>
          <h1 className="brand-font mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {config.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            {config.subtitle}
          </p>

          <form
            className="mt-10 space-y-5"
            onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
          >
            {isSignup ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#6C3BFF] focus:ring-4 focus:ring-[#6C3BFF]/10"
                  required
                  disabled={otpSent}
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#6C3BFF] focus:ring-4 focus:ring-[#6C3BFF]/10"
                required
                disabled={otpSent}
              />
            </label>

            {otpSent ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Enter OTP
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                  placeholder="6-digit code"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#6C3BFF] focus:ring-4 focus:ring-[#6C3BFF]/10"
                  required
                />
              </label>
            ) : null}

            {message ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#6C3BFF] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(108,59,255,0.20)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#5A2EE6] disabled:cursor-not-allowed disabled:bg-[#CFC2FF] disabled:hover:scale-100"
              >
                {loading
                  ? "Please wait..."
                  : otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
              </button>

              {otpSent ? (
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setMessage("");
                    setError("");
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
                >
                  Edit email
                </button>
              ) : null}
            </div>
          </form>

          <p className="mt-8 text-sm text-slate-500">
            {config.alternateLabel}{" "}
            <Link
              href={config.alternateHref}
              className="font-semibold text-[#6C3BFF] transition hover:text-[#5A2EE6]"
            >
              {config.alternateCta}
            </Link>
          </p>

          <p className="mt-3 text-xs leading-6 text-slate-400">
            Set `NEXT_PUBLIC_API_URL` in the frontend and SMTP credentials in
            `backend/.env` to use real email delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
