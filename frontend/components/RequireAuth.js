"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children, redirectTo = "/login" }) {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isReady, redirectTo, router]);

  if (!isReady) {
    return (
      <section className="flex min-h-[calc(100vh-5.5rem)] items-center justify-center px-6 py-12">
        <p className="text-sm text-slate-500">Loading...</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="flex min-h-[calc(100vh-5.5rem)] items-center justify-center px-6 py-12">
        <p className="text-sm text-slate-500">Redirecting to login...</p>
      </section>
    );
  }

  return children;
}
