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
    const timer = setInterval(next, 2000);
    return () => clearInterval(timer);
  }, [next, list.length]);

  const slide = list[index];

  return (
    <section className="relative w-full max-w-[100rem] mx-auto px-2 md:px-4">
      <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[520px]">
        {list.map((s, i) => (
          <div
            key={s._id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={
              s.image
                ? { backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { background: "linear-gradient(to bottom right, #0b1220, #0f1a33, #0b1220)" }
            }
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 z-10" />

        <div className="relative z-20 max-w-3xl px-6 md:px-12 py-14 md:py-20">
          {slide.badge && (
            <span className="inline-block bg-yellow-400 text-black font-display font-bold text-sm px-3 py-1.5 rounded mb-4">
              {slide.badge}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-white whitespace-pre-line">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="mt-4 text-white/80 max-w-md">{slide.description}</p>
          )}
          {slide.discountText && (
            <div className="inline-block mt-4 bg-yellow-400 text-black font-display font-black px-4 py-2 rounded-lg -rotate-2 shadow-lg">
              UP TO {slide.discountText} OFF
            </div>
          )}
          {slide.ctaText && (
            <div>
             <a 
                href={slide.ctaLink || "#"}
                className="inline-block mt-6 bg-[--signal] text-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-[--ink] transition"
              >
                {slide.ctaText}
              </a>
            </div>
          )}
        </div>

        {list.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-30"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-30"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
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
      </div>
    </section>
  );
}
