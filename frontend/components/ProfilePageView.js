"use client";

import { useMemo } from "react";
import { useAuth } from "./AuthProvider";

const preferencePills = [
  "Casual",
  "Minimal",
  "Streetwear",
  "Neutral Colors",
  "Comfort First",
];

const quickActions = [
  {
    title: "Change Password",
    description: "Update your account password",
    icon: "🔒",
  },
  {
    title: "Notification Settings",
    description: "Manage your preferences",
    icon: "🔔",
  },
  {
    title: "Delete Account",
    description: "Remove your account permanently",
    icon: "🗑️",
  },
];

const stats = [
  {
    label: "Looks Generated",
    value: "12",
    icon: "👤",
    accent: "text-[#7C4DFF]",
    bg: "bg-[#F3EEFF]",
  },
  {
    label: "Looks Saved",
    value: "8",
    icon: "♡",
    accent: "text-[#E95AA8]",
    bg: "bg-[#FFF0F8]",
  },
  {
    label: "Style Quizzes",
    value: "4",
    icon: "⭐",
    accent: "text-[#F59E0B]",
    bg: "bg-[#FFF7E8]",
  },
];

export default function ProfilePageView() {
  const { user, isAuthenticated } = useAuth();

  const firstName = useMemo(() => {
    if (!user?.name) {
      return "VastraAI User";
    }

    return user.name;
  }, [user]);

  const initials = useMemo(() => {
    if (!user?.name) {
      return "VA";
    }

    return user.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user]);

  return (
    <section className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_top_left,rgba(108,59,255,0.07),transparent_24%),linear-gradient(180deg,#ffffff_0%,#F8F7FF_100%)] px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,#F8F3FF_0%,#F7F5FF_58%,#FBFBFF_100%)] shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.9fr] lg:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="flex h-30 w-30 items-center justify-center rounded-full bg-[linear-gradient(145deg,#292B38_0%,#4A4D63_100%)] text-3xl font-semibold text-white shadow-[0_18px_40px_rgba(108,59,255,0.24)] ring-4 ring-white sm:h-32 sm:w-32">
                  {initials}
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#7C4DFF] text-sm text-white shadow-[0_10px_24px_rgba(124,77,255,0.35)] transition-transform duration-200 hover:scale-105"
                >
                  📷
                </button>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7C4DFF]">
                  Welcome Back 👋
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  {firstName}
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:text-lg">
                  {isAuthenticated
                    ? "Your style journey is just getting started ✨"
                    : "Log in to unlock personalized styling and saved looks."}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-white px-4 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                    ✉️ {user?.email || "Not logged in"}
                  </span>
                  <span className="rounded-full bg-[#ECFDF3] px-3 py-1.5 text-[#16A34A]">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.5rem] border border-white/80 bg-white/78 px-5 py-6 text-center shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg ${stat.accent} ${stat.bg}`}
                  >
                    {stat.icon}
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                👤 Account Details
              </h2>
              <button
                type="button"
                className="rounded-full bg-[#F3EEFF] px-4 py-2 text-sm font-medium text-[#7C4DFF] transition-colors duration-200 hover:bg-[#E9DEFF]"
              >
                ✎ Edit
              </button>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              <ProfileRow label="Full Name" value={user?.name || "Guest User"} />
              <ProfileRow
                label="Email Address"
                value={user?.email || "Not available"}
              />
              <ProfileRow label="Member Since" value="May 11, 2025" />
              <ProfileRow label="Account Type" value="Email OTP via Nodemailer" />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">
              ⚡ Quick Actions
            </h2>

            <div className="mt-6 space-y-4">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[1.25rem] border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-left transition-all duration-200 hover:border-[#E1D5FF] hover:bg-[#FAF7FF] hover:shadow-[0_14px_28px_rgba(124,77,255,0.08)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EEFF] text-lg text-[#7C4DFF]">
                      {action.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {action.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xl text-[#7C4DFF]">›</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">
              💜 Your Style Preferences
            </h2>
            <button
              type="button"
              className="rounded-full border border-[#E1D5FF] bg-[#FAF7FF] px-4 py-2 text-sm font-medium text-[#7C4DFF] transition-colors duration-200 hover:bg-[#F3EEFF]"
            >
              ↻ Retake Style Quiz
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {preferencePills.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-[#F3EEFF] px-4 py-2 text-sm font-medium text-[#7C4DFF]"
              >
                {pill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:items-center">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}
