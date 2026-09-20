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
    <div className="group relative w-full aspect-[3/1] sm:aspect-[4/1] md:aspect-[5/1] min-h-[180px] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface-card border border-line shadow-lg">
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
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/80 via-surface-dark/20 to-transparent z-10" />

          {/* Banner Content Body */}
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 z-20 flex flex-col justify-center items-start max-w-xl">
            {content.badge && (
              <span className="inline-flex items-center gap-1.5 font-mono-spec text-[10px] sm:text-xs text-cyan-glow font-bold tracking-widest uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                {content.badge}
              </span>
            )}

            {content.title && (
              <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                {content.title}
              </h2>
            )}

            {content.description && (
              <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-normal line-clamp-1 sm:line-clamp-2 max-w-md">
                {content.description}
              </p>
            )}

            {content.ctaText && (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-cta text-white font-semibold text-xs px-4 py-2 rounded-xl group-hover:bg-cta-hover transition-colors duration-300 shadow-md">
                {content.ctaText}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
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