import Link from "next/link";
import { getContentBySection } from "@/lib/api";

export default async function BottomBanner() {
  const content = await getContentBySection("bottom-banner");
  if (!content?.image) return null;

  const hasText = content.badge || content.title || content.description || content.ctaText;

  const inner = (
    <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden">
      <img
        src={content.image}
        alt={content.title || "Promotion"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {hasText && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 md:p-8 max-w-lg">
            {content.badge && (
              <p className="font-mono-spec text-xs md:text-sm text-[--signal] font-bold tracking-widest mb-1">
                {content.badge}
              </p>
            )}
            {content.title && (
              <p className="font-display text-2xl md:text-4xl font-black text-white leading-tight">
                {content.title}
              </p>
            )}
            {content.description && (
              <p className="text-white/80 text-sm md:text-base mt-1">{content.description}</p>
            )}
            {content.ctaText && (
              <span className="inline-block mt-3 bg-white text-black font-semibold text-sm px-5 py-2 rounded-lg">
                {content.ctaText}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      {content.ctaLink ? <Link href={content.ctaLink}>{inner}</Link> : inner}
    </section>
  );
}
