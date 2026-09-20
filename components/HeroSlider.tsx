"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

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
    slides.length > 0
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
      className="relative w-full max-w-[100rem] mx-auto px-2 md:px-4 py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden min-h-[460px] md:min-h-[560px] bg-slate-950 border border-line/50 shadow-2xl flex items-center">
        {/* Background Layer with Next.js Image Optimization */}
        {list.map((s, i) => (
          <div
            key={s._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
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
              <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            )}

            {/* Dark Gradient Overlay for High Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

            {/* Content Container */}
            <div className="relative z-20 max-w-2xl px-8 md:px-16 py-16 flex flex-col items-start justify-center min-h-[460px] md:min-h-[560px]">
              {s.badge && (
                <span className="inline-flex items-center gap-1.5 bg-accent-gold text-slate-950 font-display font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                  {s.badge}
                </span>
              )}

              {s.title && (
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight text-white whitespace-pre-line drop-shadow-sm">
                  {s.title}
                </h1>
              )}

              {s.description && (
                <p className="mt-4 text-base md:text-lg text-slate-300 max-w-lg leading-relaxed">
                  {s.description}
                </p>
              )}

              {s.discountText && (
                <div className="mt-5 inline-block bg-amber-400 text-slate-950 font-display font-black text-sm md:text-base px-4 py-2 rounded-xl -rotate-2 shadow-xl border border-amber-300">
                  UP TO {s.discountText} OFF
                </div>
              )}

              {s.ctaText && (
                <div className="mt-8">
                  <Link
                    href={s.ctaLink || "#"}
                    className="inline-flex items-center gap-2 bg-signal text-white px-7 py-3.5 rounded-2xl font-semibold text-sm hover:bg-white hover:text-slate-950 active:scale-95 transition-all shadow-lg hover:shadow-xl"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all z-30 active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all z-30 active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30 px-4 py-2 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-signal" : "w-2 bg-white/40 hover:bg-white/70"
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