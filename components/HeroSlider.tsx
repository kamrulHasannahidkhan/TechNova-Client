"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";

type Slide = {
  _id: string;
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  discountText?: string;
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const list =
    slides && slides.length > 0
      ? slides
      : [
          {
            _id: "fallback",
            badge: "SPECIAL OFFER!",
            title: "Gear that\nearns its specs.",
            description:
              "Every listing here is checked, boxed, and tested before it ships.",
            ctaText: "Shop Now",
            ctaLink: "/shop",
          },
        ];

  const next = useCallback(
    () => setIndex((i) => (i + 1) % list.length),
    [list.length]
  );
  const prev = () => setIndex((i) => (i - 1 + list.length) % list.length);

  useEffect(() => {
    if (list.length <= 1 || isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, list.length, isPaused]);

  return (
    <section
      className="relative w-full max-w-[100rem] mx-auto px-3 sm:px-6 py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden min-h-[480px] md:min-h-[580px] bg-slate-950 border border-slate-800 shadow-2xl flex items-center">
        {/* Background Layer with Next.js Image Optimization */}
        {list.map((s, i) => (
          <div
            key={s._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {s.image ? (
              <Image
                src={s.image}
                alt={s.title || "Slider Background"}
                fill
                priority={i === 0}
                className="object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
            )}

            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20 z-10" />

            {/* Content Container */}
            <div className="relative z-20 max-w-2xl px-6 sm:px-12 md:px-16 py-12 flex flex-col items-start justify-center min-h-[480px] md:min-h-[580px]">
              {s.badge && (
                <span className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 shadow-lg shadow-amber-400/20">
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  {s.badge}
                </span>
              )}

              {s.title && (
                <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white whitespace-pre-line drop-shadow-md">
                  {s.title}
                </h1>
              )}

              {s.description && (
                <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-lg leading-relaxed font-normal">
                  {s.description}
                </p>
              )}

              {s.discountText && (
                <div className="mt-5 inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm md:text-base px-4 py-2 rounded-xl -rotate-2 shadow-xl border border-amber-300">
                  UP TO {s.discountText} OFF
                </div>
              )}

              {s.ctaText && (
                <div className="mt-8">
                  <Link
                    href={s.ctaLink || "#"}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95"
                  >
                    {s.ctaText}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {list.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center transition-all z-30 active:scale-90 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center transition-all z-30 active:scale-90 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-blue-500 shadow-sm shadow-blue-500/50"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}