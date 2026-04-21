"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: "occasion",
    title: "Where are you going?",
    buttonLabel: "Next",
    options: [
      { label: "Wedding", icon: "\u{1F389}" },
      { label: "Office", icon: "\u{1F454}" },
      { label: "Casual", icon: "\u{1F60E}" },
      { label: "Date", icon: "\u2764\uFE0F" },
      { label: "Party", icon: "\u{1F57A}" },
    ],
  },
  {
    id: "budget",
    title: "What's your budget?",
    buttonLabel: "Next",
    options: [
      { label: "\u20B91000 - \u20B92000" },
      { label: "\u20B92000 - \u20B95000" },
      { label: "\u20B95000+" },
    ],
  },
  {
    id: "styleVibe",
    title: "What's your style vibe?",
    buttonLabel: "Next",
    options: [
      { label: "Minimal" },
      { label: "Trendy" },
      { label: "Traditional" },
      { label: "Bold" },
    ],
  },
  {
    id: "colorPreference",
    title: "Pick your color mood",
    buttonLabel: "Generate My Style",
    options: [
      { label: "Dark", icon: "\u26AB" },
      { label: "Light", icon: "\u26AA" },
      { label: "Vibrant", icon: "\u{1F308}" },
    ],
  },
];

export default function StylePageView() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPhase, setStepPhase] = useState("in");
  const [pressedOption, setPressedOption] = useState("");
  const [answers, setAnswers] = useState({
    occasion: "",
    budget: "",
    styleVibe: "",
    colorPreference: "",
  });

  const step = steps[currentStep];
  const totalSteps = steps.length;
  const selectedValue = answers[step.id];
  const progressValue = ((currentStep + 1) / totalSteps) * 100;
  const isTransitioning = stepPhase === "out";

  function handleSelect(value) {
    setPressedOption(`${step.id}-${value}`);
    setAnswers((current) => ({
      ...current,
      [step.id]: value,
    }));

    window.setTimeout(() => {
      setPressedOption("");
    }, 150);
  }

  function moveStep(nextStep) {
    setStepPhase("out");

    window.setTimeout(() => {
      setCurrentStep(nextStep);
      setStepPhase("in");
    }, 180);
  }

  function handleNext() {
    if (!selectedValue || isTransitioning) {
      return;
    }

    if (currentStep === totalSteps - 1) {
      setStepPhase("out");
      window.setTimeout(() => {
        router.push("/upload");
      }, 180);
      return;
    }

    moveStep(currentStep + 1);
  }

  function handleBack() {
    if (currentStep === 0 || isTransitioning) {
      return;
    }

    moveStep(currentStep - 1);
  }

  return (
    <section className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_top_left,rgba(108,59,255,0.07),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(108,59,255,0.08),transparent_24%),linear-gradient(180deg,#ffffff_0%,#F8F7FF_100%)] px-6 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        <aside className="hidden h-full overflow-hidden rounded-[2.25rem] bg-[radial-gradient(circle_at_top,#efe8ff_0%,#dbcfff_32%,#c2afff_58%,#8b68ff_100%)] p-8 text-white shadow-[0_24px_70px_rgba(108,59,255,0.22)] lg:flex lg:min-h-[620px] lg:flex-col lg:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              VastraAI Quiz
            </p>
            <h2 className="brand-font mt-6 text-4xl leading-tight font-semibold">
              Build a look that fits the moment.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-white/80">
              Answer a few quick questions and let the app shape a styling
              direction that feels personal, polished, and wearable.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/20 bg-white/16 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                Current Focus
              </p>
              <p className="mt-3 text-2xl font-semibold">{step.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] border border-white/20 bg-white/12 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-white/65">
                  Progress
                </p>
                <p className="mt-3 text-3xl font-semibold">
                  {currentStep + 1}/{totalSteps}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/20 bg-white/12 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-white/65">
                  Selected
                </p>
                <p className="mt-3 text-lg font-semibold">
                  {selectedValue || "Pick one"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="rounded-[2.25rem] border border-white/80 bg-white px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="text-center">
            <p className="text-sm font-medium text-[#888888]">
              Step {currentStep + 1} of {totalSteps}
            </p>

            <div className="mx-auto mt-5 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-slate-100 shadow-inner">
              <div
                className="h-full rounded-full bg-[#6C3BFF] transition-all duration-500 ease-out"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>

          <div
            key={step.id}
            className={`mt-14 text-center ${
              stepPhase === "out" ? "quiz-step-out" : "quiz-step-in"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Style Quiz
            </p>
            <h1 className="brand-font text-[30px] leading-tight font-bold text-black sm:text-[32px]">
              {step.title}
            </h1>

            <div className="mx-auto mt-10 grid max-w-2xl gap-3">
              {step.options.map((option) => {
                const isSelected = selectedValue === option.label;
                const isPressed = pressedOption === `${step.id}-${option.label}`;

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelect(option.label)}
                    className={`flex w-full items-center justify-between rounded-xl border px-6 py-5 text-left transition-all duration-200 ${
                      isSelected
                        ? "scale-[1.01] border-[#6C3BFF] bg-[#F3F0FF] shadow-[0_12px_28px_rgba(108,59,255,0.14)]"
                        : "border-[#E5E5E5] bg-white hover:scale-[1.02] hover:border-[#6C3BFF] hover:bg-white hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                    } ${isPressed ? "quiz-option-press" : ""}`}
                    disabled={isTransitioning}
                  >
                    <span className="flex items-center gap-3 text-base font-medium text-slate-700 sm:text-lg">
                      <span>{option.label}</span>
                    </span>
                    {option.icon ? (
                      <span
                        className="ml-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-2xl"
                        aria-hidden="true"
                      >
                        {option.icon}
                      </span>
                    ) : (
                      <span className="ml-6 h-10 w-10" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || isTransitioning}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedValue || isTransitioning}
              className="rounded-[10px] bg-[#6C3BFF] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(108,59,255,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#5A2EE6] disabled:cursor-not-allowed disabled:bg-[#CFC2FF] disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              {step.buttonLabel === "Next"
                ? "Next \u2192"
                : step.buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
