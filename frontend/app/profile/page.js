export const metadata = {
  title: "Profile",
  description:
    "Manage your VastraAI account, styling preferences, and personal fashion history from your profile.",
};

export default function ProfilePage() {
  return (
    <section className="flex min-h-[calc(100vh-11rem)] w-full items-center px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Profile
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          Manage your account, preferences, and saved style history.
        </h1>
      </div>
    </section>
  );
}
