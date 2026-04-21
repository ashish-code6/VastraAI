"use client";

import { useMemo, useState } from "react";

const outfits = [
  {
    name: "Royal Wedding Kurta Look",
    reason:
      "This color complements your skin tone and fits a wedding vibe with a polished, festive finish.",
    price: "\u20B91999 - \u20B93499",
    tags: ["Best Match \u2B50", "Trending \u{1F525}"],
    shopUrl: "/saved",
    palette: ["#6C3BFF", "#DCCFFF", "#F4EDFf"],
  },
  {
    name: "Modern Office Smart Set",
    reason:
      "The structure feels sharp and confident while keeping the palette clean enough for daily office wear.",
    price: "\u20B92499 - \u20B93999",
    tags: ["Work Ready \u{1F4BC}", "Budget Friendly \u{1F4B0}"],
    shopUrl: "/saved",
    palette: ["#1F2937", "#CBD5E1", "#F8FAFC"],
  },
  {
    name: "Soft Minimal Evening Fit",
    reason:
      "This look keeps the silhouette effortless and elevated, making it ideal for a relaxed but stylish outing.",
    price: "\u20B91799 - \u20B92999",
    tags: ["Minimal \u2728", "Easy Style \u{1F90D}"],
    shopUrl: "/saved",
    palette: ["#A78BFA", "#F5F3FF", "#E9D5FF"],
  },
];

export default function ResultsPageView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedItems, setSavedItems] = useState({});
  const [animating, setAnimating] = useState(false);

  const outfit = outfits[currentIndex];
  const isSaved = Boolean(savedItems[outfit.name]);

  function advanceOutfit() {
    setAnimating(true);

    window.setTimeout(() => {
      setCurrentIndex((value) => (value + 1) % outfits.length);
      setAnimating(false);
    }, 220);
  }

  function toggleSave() {
    setSavedItems((current) => ({
      ...current,
      [outfit.name]: !current[outfit.name],
    }));
  }

  const visualStyle = useMemo(
    () => ({
      background: `linear-gradient(160deg, ${outfit.palette[0]} 0%, ${outfit.palette[1]} 54%, ${outfit.palette[2]} 100%)`,
    }),
    [outfit.palette],
  );

  return (
    <section className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_top_left,rgba(108,59,255,0.07),transparent_24%),linear-gradient(180deg,#ffffff_0%,#F8F7FF_100%)] px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#6C3BFF]">
            Your Style Result
          </p>
          <h1 className="brand-font mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI-picked outfits for your vibe
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Thoughtfully matched looks designed to fit your occasion, style
            preference, and budget.
          </p>
        </div>

        <article
          className={`mt-10 rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-all duration-200 sm:p-8 ${
            animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          <div
            className="relative overflow-hidden rounded-[1.5rem] p-6 shadow-[0_20px_50px_rgba(108,59,255,0.14)]"
            style={visualStyle}
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0))]" />
            <div className="relative flex min-h-[320px] items-end justify-center rounded-[1.25rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.48),rgba(255,255,255,0.08)_52%,rgba(255,255,255,0)_100%)]">
              <div className="absolute left-5 top-5 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                Outfit Preview
              </div>
              <div className="relative flex h-[240px] w-[190px] items-end justify-center">
                <div className="absolute top-0 h-16 w-16 rounded-full bg-[#F8DCC8]" />
                <div className="absolute top-12 h-16 w-20 rounded-t-[40px] bg-[#F8DCC8]" />
                <div
                  className="absolute top-24 h-24 w-32 rounded-[1.75rem]"
                  style={{ backgroundColor: outfit.palette[0] }}
                />
                <div className="absolute top-28 -left-1 h-20 w-7 rounded-full bg-[#F8DCC8]" />
                <div className="absolute top-28 -right-1 h-20 w-7 rounded-full bg-[#F8DCC8]" />
                <div className="absolute top-[170px] h-[4.5rem] w-28 rounded-t-[1rem] bg-white/88" />
                <div className="absolute bottom-0 left-[50px] h-20 w-9 rounded-t-full bg-slate-700/80" />
                <div className="absolute bottom-0 right-[50px] h-20 w-9 rounded-t-full bg-slate-700/80" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {outfit.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F3F0FF] px-4 py-2 text-sm font-medium text-[#6C3BFF]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              {outfit.name}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              {outfit.reason}
            </p>
            <p className="mt-5 text-base font-semibold text-slate-800">
              {outfit.price}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={toggleSave}
              className={`inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
                isSaved
                  ? "border-[#6C3BFF] bg-[#F3F0FF] text-[#6C3BFF]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
              }`}
            >
              {isSaved ? "\u2665 Saved" : "\u2661 Save"}
            </button>

            <a
              href={outfit.shopUrl}
              className="inline-flex items-center justify-center rounded-xl bg-[#6C3BFF] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(108,59,255,0.20)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#5A2EE6]"
            >
              Shop
            </a>

            <button
              type="button"
              onClick={advanceOutfit}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:scale-[1.02] hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
            >
              Next
            </button>
          </div>
        </article>

        <div className="mt-6 text-center text-sm text-slate-500">
          Option {currentIndex + 1} of {outfits.length}
        </div>
      </div>
    </section>
  );
}
