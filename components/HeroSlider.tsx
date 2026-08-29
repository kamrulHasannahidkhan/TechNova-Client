"use client";
import { useEffect, useState, useCallback } from "react";

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
    <section className="relative bg-gradient-to-br from-[#0b1220] via-[#0f1a33] to-[#0b1220] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8 items-center min-h-[420px]">
        <div className="relative z-10">
          {slide.badge && (
            <span className="inline-block bg-yellow-400 text-[--ink] font-display font-bold text-sm px-3 py-1.5 rounded mb-4">
              {slide.badge}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-white whitespace-pre-line">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="mt-4 text-white/70 max-w-md">{slide.description}</p>
          )}
          {slide.ctaText && (
           <a 
              href={slide.ctaLink || "#"}
              className="inline-block mt-6 bg-[--signal] text-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-[--ink] transition"
            >
              {slide.ctaText}
            </a>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          {slide.discountText && (
            <div className="absolute -top-2 right-4 bg-yellow-400 text-[--ink] font-display font-black text-center px-4 py-3 rounded-lg -rotate-6 shadow-lg z-20">
              <span className="block text-xs leading-none">UP TO</span>
              <span className="block text-2xl leading-tight">{slide.discountText}</span>
              <span className="block text-xs leading-none">DISCOUNT</span>
            </div>
          )}
          {slide.image ? (
            <img
              src={slide.image}
              alt={slide.title}
              className="max-h-[320px] w-auto object-contain drop-shadow-2xl rounded-xl"
            />
          ) : (
            <div className="w-full h-64 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-sm">
              Add a product image from Site Content
            </div>
          )}
        </div>
      </div>

      {list.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[--signal]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
