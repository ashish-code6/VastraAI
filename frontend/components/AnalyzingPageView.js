"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const messages = [
  "Analyzing your look...",
  "Detecting your style...",
  "Matching colors with your skin tone...",
  "Finding best outfits for you...",
];

export default function AnalyzingPageView() {
  const router = useRouter();
  const [progress, setProgress] = useState(12);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          return 100;
        }

        const increment = value < 60 ? 8 : value < 90 ? 5 : 2;
        return Math.min(100, value + increment);
      });
    }, 900);

    const messageTimer = window.setInterval(() => {
      setMessageIndex((value) => (value + 1) % messages.length);
    }, 1600);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push("/results");
    }, 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [progress, router]);

  const statusLabel = useMemo(() => {
    if (progress < 35) {
      return "Analyzing";
    }

    if (progress < 75) {
      return "Matching";
    }

    if (progress < 100) {
      return "Refining";
    }

    return "Done";
  }, [progress]);

  return (
    <section className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_top,rgba(108,59,255,0.09),transparent_24%),linear-gradient(180deg,#ffffff_0%,#F8F7FF_100%)] px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F3F0FF]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D8CAFF] border-t-[#6C3BFF]" />
        </div>

        <h1 className="brand-font mt-8 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Analyzing your style...
        </h1>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#6C3BFF] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>{statusLabel}</span>
          <span>{progress}%</span>
        </div>

        <div className="mt-10 min-h-8">
          <p
            key={messageIndex}
            className="quiz-step-in text-lg font-medium text-slate-700"
          >
            {messages[messageIndex]}
          </p>
        </div>
      </div>
    </section>
  );
}
