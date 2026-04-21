export const metadata = {
  title: "Login",
  description:
    "Log in to VastraAI to access your personal style dashboard, saved looks, and AI-powered outfit recommendations.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-11rem)] w-full items-center px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Login
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          Access your VastraAI workspace securely.
        </h1>
      </div>
    </section>
  );
}
