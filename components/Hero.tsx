import { getContentBlocksBySection } from "@/lib/api";
import HeroSlider from "./HeroSlider";
import { Sparkles } from "lucide-react";

export default async function Hero() {
  let slides = [];

  try {
    slides = (await getContentBlocksBySection("hero")) || [];
  } catch (error) {
    console.error("Failed to load hero content blocks:", error);
  }

  // Graceful fallback display if no slides are found
  if (!slides || slides.length === 0) {
    return (
      <section className="relative w-full overflow-hidden bg-slate-900 py-20 sm:py-28 text-white text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-300 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" /> Premium Collection
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Welcome to TechNova
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Discover cutting-edge gadgets, flagship smartphones, and exclusive tech accessories curated for you.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      <HeroSlider slides={slides} />
    </section>
  );
}