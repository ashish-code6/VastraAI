import Link from "next/link";

const highlights = [
  {
    title: "AI Styling",
    description:
      "Get outfit suggestions that match your shape, mood, and personal style.",
  },
  {
    title: "Virtual Try-On",
    description:
      "Preview how pieces come together before you decide on a look.",
  },
  {
    title: "Smart Shopping",
    description:
      "Move from inspiration to shopping with less searching and guesswork.",
  },
];

export default function HomePage() {
  const isAuthenticated = false;
  const primaryHref = isAuthenticated ? "/style" : "/login";

  return (
    <div className="bg-[#F8F7FF]">
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="max-w-2xl">
            <p className="fade-up text-sm font-medium uppercase tracking-[0.26em] text-[#6C3BFF]">
              Personal Style, Simplified
            </p>
            <h1 className="brand-font fade-up mt-5 text-5xl leading-tight font-semibold tracking-tight text-slate-800 sm:text-6xl">
              A clean way to discover what looks best on you.
            </h1>
            <p className="fade-up mt-6 max-w-xl text-lg leading-8 text-slate-600">
              VastraAI helps you explore outfits, refine your fashion choices,
              and build confidence in what you wear without the usual clutter.
            </p>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-xl bg-[#6C3BFF] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(108,59,255,0.22)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#5A2EE6]"
              >
                Start Styling
              </Link>
              <Link
                href="/saved"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-medium text-slate-700 transition-colors duration-300 hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
              >
                Explore Saved Looks
              </Link>
            </div>
          </div>

          <div className="fade-up">
            <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_20px_50px_rgba(148,163,184,0.12)]">
              <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#ffffff_0%,#f5f1ff_100%)] p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Style Preview
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-800">
                      Minimal elegance, made personal
                    </h2>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-[#6C3BFF]" />
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#F3EEFF] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6C3BFF]">
                      Palette
                    </p>
                    <div className="mt-4 flex gap-3">
                      <span className="h-10 w-10 rounded-full bg-[#6C3BFF]" />
                      <span className="h-10 w-10 rounded-full bg-[#E8DEFF]" />
                      <span className="h-10 w-10 rounded-full bg-[#D9C8FF]" />
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Vibe
                    </p>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      Clean layers, soft neutrals, confident fits.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Suggested Direction
                  </p>
                  <p className="mt-3 text-lg font-medium text-slate-700">
                    Modern, polished, and easy to wear every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-[0_14px_36px_rgba(148,163,184,0.10)]"
              >
                <h3 className="text-xl font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
