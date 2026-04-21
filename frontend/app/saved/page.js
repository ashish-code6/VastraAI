export const metadata = {
  title: "Saved Looks",
  description:
    "View and organize your saved outfits, fashion ideas, and styling inspiration inside VastraAI.",
};

export default function SavedPage() {
  return (
    <section className="flex min-h-[calc(100vh-11rem)] w-full items-center px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Saved
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          Keep your favorite outfits, ideas, and references organized.
        </h1>
      </div>
    </section>
  );
}
