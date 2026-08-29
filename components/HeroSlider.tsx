"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

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

  const list = slides.length > 0 ? slides : [
    {
      _id: "fallback",
      badge: "SPECIAL OFFER!",
      title: "Gear that\nearns its specs.",
      description: "Every listing here is checked, boxed, and tested before it ships.",
      ctaText: "Shop Now",
      ctaLink: "#",
    },
  ];

  const next = useCallback(() => setIndex((i) => (i + 1) % list.length), [list.length]);
  const prev = () => setIndex((i) => (i - 1 + list.length) % list.length);

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, list.length]);

  const slide = list[index];

  return (
    <section className="relative my-4 mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-[#0a1428] via-[#0f1f3d] to-[#080d1a] border border-slate-800 shadow-2xl overflow-hidden">
      {/* Dynamic Background Electronics Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Slide Container with Smooth Visual Transition */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 grid md:grid-cols-12 gap-8 items-center min-h-[440px]">
        
        {/* Left Info Column */}
        <div className="md:col-span-7 relative z-10 space-y-4">
          {slide.badge && (
            <span className="inline-block bg-amber-400 text-slate-950 font-display font-black text-xs md:text-sm px-3.5 py-1 rounded-md uppercase tracking-wider shadow-md">
              {slide.badge}
            </span>
          )}

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-white whitespace-pre-line drop-shadow-sm">
            {slide.title}
          </h1>

          {slide.description && (
            <p className="text-slate-300 text-sm md:text-base max-w-md leading-relaxed">
              {slide.description}
            </p>
          )}

          {slide.ctaText && (
            <div className="pt-2">
              <Link
                href={slide.ctaLink || "#"}
                className="inline-flex items-center justify-center bg-amber-400 text-slate-950 hover:bg-white hover:text-slate-950 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-amber-400/20"
              >
                {slide.ctaText}
              </Link>
            </div>
          )}
        </div>

        {/* Right Showcase Column */}
        <div className="md:col-span-5 relative flex items-center justify-center min-h-[280px]">
          {slide.discountText && (
            <div className="absolute -top-2 right-2 md:-right-2 bg-amber-400 text-slate-950 font-display font-black text-center px-4 py-2.5 rounded-xl -rotate-6 shadow-2xl z-20 border border-amber-300">
              <span className="block text-[10px] uppercase font-bold tracking-wider leading-none text-slate-800">
                UP TO
              </span>
              <span className="block text-2xl font-black leading-tight my-0.5">
                {slide.discountText}
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-wider leading-none text-slate-800">
                DISCOUNT
              </span>
            </div>
          )}

          {slide.image ? (
            <div className="relative w-full h-[260px] md:h-[320px]">
              <Image
                src={slide.image}
                alt={slide.title || "Product Banner"}
                fill
                priority
                className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)] transition-all duration-500 ease-in-out"
              />
            </div>
          ) : (
            <div className="w-full h-64 rounded-2xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
              <span className="text-3xl">⚡</span>
              <span>Add a product image from Site Content</span>
            </div>
          )}
        </div>
      </div>

      {/* Slider Controls */}
      {list.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
          >
            ›
          </button>

          {/* Navigation Pill Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-amber-400" : "w-2 bg-white/40 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}