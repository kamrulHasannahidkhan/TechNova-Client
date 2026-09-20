import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getContentBySection } from "@/lib/api";

interface BannerContent {
  image?: string;
  badge?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default async function BottomBanner() {
  const content: BannerContent | null = await getContentBySection("bottom-banner");

  if (!content?.image) return null;

  const hasText = Boolean(
    content.badge || content.title || content.description || content.ctaText
  );

  const BannerInner = (
    <div className="group relative w-full aspect-[21/9] sm:aspect-[2.5/1] md:aspect-[3/1] rounded-3xl overflow-hidden bg-surface-card border border-line shadow-xl">
      {/* Optimized Background Image */}
      <Image
        src={content.image}
        alt={content.title || "Promotional Banner"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Gradient Overlay for Text Readability */}
      {hasText && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-surface-dark/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/70 via-transparent to-transparent z-10" />

          {/* Banner Content Body */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 max-w-xl z-20 flex flex-col items-start">
            {content.badge && (
              <span className="inline-flex items-center gap-1.5 font-mono-spec text-xs md:text-sm text-cyan-glow font-bold tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                {content.badge}
              </span>
            )}

            {content.title && (
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                {content.title}
              </h2>
            )}

            {content.description && (
              <p className="text-slate-200 text-xs sm:text-sm md:text-base mt-2 leading-relaxed line-clamp-2 max-w-md">
                {content.description}
              </p>
            )}

            {content.ctaText && (
              <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-cta text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl group-hover:bg-cta-hover transition-colors duration-300 shadow-md">
                {content.ctaText}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {content.ctaLink ? (
        <Link href={content.ctaLink} className="block">
          {BannerInner}
        </Link>
      ) : (
        BannerInner
      )}
    </section>
  );
}