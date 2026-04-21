"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/style", label: "Style" },
  { href: "/saved", label: "Saved" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = false;
  const authItems = isAuthenticated
    ? [
        { href: "/profile", label: "Profile", isButton: false },
        { href: "/logout", label: "Logout", isButton: false },
      ]
    : [
        { href: "/login", label: "Login", isButton: false },
        { href: "/signup", label: "Signup", isButton: true },
      ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-[0_10px_30px_rgba(148,163,184,0.14)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="VastraAI logo"
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="brand-font text-2xl font-semibold tracking-tight text-slate-700">
            Vastra<span className="text-[#6C3BFF]">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 pb-1 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-[#6C3BFF] text-[#6C3BFF]"
                    : "border-transparent text-slate-600 hover:text-[#6C3BFF]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-[#6C3BFF]"
              >
                Profile
              </Link>
              <button
                type="button"
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-[#6C3BFF]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-[#6C3BFF]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[#6C3BFF] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5a2fe0]"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200/80 px-6 py-3 md:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b-2 pb-1 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-[#6C3BFF] text-[#6C3BFF]"
                      : "border-transparent text-slate-600 hover:text-[#6C3BFF]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {authItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.isButton
                    ? "rounded-full bg-[#6C3BFF] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5a2fe0]"
                    : "text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-[#6C3BFF]"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
