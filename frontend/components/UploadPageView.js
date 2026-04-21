"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPageView() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function updatePreview(file) {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    updatePreview(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    updatePreview(file);
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleContinue() {
    if (!previewUrl) {
      return;
    }

    router.push("/analyzing");
  }

  return (
    <section className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_top_left,rgba(108,59,255,0.07),transparent_24%),linear-gradient(180deg,#ffffff_0%,#F8F7FF_100%)] px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="text-center">
          <h1 className="brand-font text-[28px] font-bold tracking-tight text-slate-900 sm:text-[30px]">
            Upload Your Photo
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            So we can personalize your style
          </p>
        </div>

        <div className="mt-10">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={openFilePicker}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200 ${
              dragActive
                ? "border-[#6C3BFF] bg-[#F6F2FF]"
                : "border-[#6C3BFF]/35 bg-[#FCFAFF] hover:border-[#6C3BFF] hover:bg-[#F8F4FF]"
            }`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F0FF] text-3xl text-[#6C3BFF]">
              ↑
            </span>
            <p className="mt-5 text-lg font-medium text-slate-800">
              Click or drag image here
            </p>
            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG, or WEBP works best
            </p>
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          {previewUrl ? (
            <div className="fade-up flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="h-56 w-56 rounded-[1.5rem] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
              />
              <p className="mt-4 text-sm font-medium text-slate-500">
                Preview ready
              </p>
            </div>
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-[1.5rem] border border-slate-200 bg-slate-50 text-sm text-slate-400">
              Image preview
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!previewUrl}
            className="rounded-xl bg-[#6C3BFF] px-8 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(108,59,255,0.20)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#5A2EE6] disabled:cursor-not-allowed disabled:bg-[#CFC2FF] disabled:shadow-none disabled:hover:scale-100"
          >
            Generate My Style
          </button>
        </div>
      </div>
    </section>
  );
}
