import Image from "next/image";
import Link from "next/link";
import { getContentBySection } from "@/lib/api";

interface BannerContent {
  title?: string;
  badge?: string;
  description?: string;
  contactLine?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

export default async function BottomBanner() {
  const content: BannerContent | null = await getContentBySection("bottom-banner");

  if (!content) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div className="relative rounded-2xl overflow-hidden bg-yellow-400 min-h-[280px] flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 py-10 shadow-sm">
        
        {/* Decorative Background Elements */}
        <div 
          aria-hidden="true" 
          className="absolute top-6 left-6 w-16 h-16 rounded-full border-4 border-white/40 pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -bottom-6 -right-6 md:bottom-6 md:right-24 w-24 h-24 rounded-full bg-yellow-300/50 pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-6 right-6 md:top-10 md:right-24 grid grid-cols-3 gap-1.5 pointer-events-none opacity-70"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
          ))}
        </div>

        {/* Visual Content Section */}
        <div className="relative z-10 w-full md:flex-1 flex items-center justify-center">
          {content.image ? (
            <div className="relative w-full h-[200px] sm:h-[240px]">
              <Image
                src={content.image}
                alt={content.title ? `Illustration for ${content.title}` : "Banner illustration"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          ) : (
            <div className="w-40 h-40 rounded-xl border-2 border-dashed border-[--ink]/20 bg-white/20 flex items-center justify-center text-[--ink]/50 text-xs font-medium text-center px-4">
              Add an illustration from Site Content
            </div>
          )}
        </div>

        {/* Text & Action Section */}
        <div className="relative z-10 w-full md:flex-1 text-center md:text-right">
          {content.badge && (
            <p className="font-display text-lg sm:text-xl font-bold text-[--ink] tracking-wide">
              {content.badge}
            </p>
          )}

          {content.title && (
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[--signal] leading-tight md:leading-none mt-1">
              {content.title}
            </h2>
          )}

          {content.description && (
            <p className="mt-3 font-semibold text-[--ink] text-base sm:text-lg leading-relaxed">
              {content.description}
            </p>
          )}

          {content.contactLine && (
            <p className="text-sm text-[--ink]/80 mt-1 font-medium">
              {content.contactLine}
            </p>
          )}

          {content.ctaText && (
            <Link
              href={content.ctaLink || "#"}
              className="inline-flex items-center justify-center mt-6 bg-white text-[--ink] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[--ink] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--ink] transition-all duration-200"
            >
              {content.ctaText}
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}