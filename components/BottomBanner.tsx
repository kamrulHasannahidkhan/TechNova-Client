import { getContentBySection } from "@/lib/api";

export default async function BottomBanner() {
  const content = await getContentBySection("bottom-banner");
  if (!content) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div className="relative rounded-2xl overflow-hidden bg-yellow-400 min-h-[280px] flex items-center px-6 md:px-12 py-10">
        {/* decorative circles */}
        <div className="absolute top-6 left-6 w-16 h-16 rounded-full border-4 border-white/40" />
        <div className="absolute bottom-6 right-24 w-24 h-24 rounded-full bg-yellow-300/50" />
        <div className="absolute top-10 right-24 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          {content.image ? (
            <img
              src={content.image}
              alt={content.title || ""}
              className="max-h-[240px] w-auto object-contain drop-shadow-xl"
            />
          ) : (
            <div className="w-40 h-40 rounded-xl bg-white/20 flex items-center justify-center text-[--ink]/40 text-xs text-center px-4">
              Add an illustration from Site Content
            </div>
          )}
        </div>

        <div className="relative z-10 flex-1 text-right pl-6">
          {content.badge && (
            <p className="font-display text-xl font-bold text-[--ink]">{content.badge}</p>
          )}
          {content.title && (
            <p className="font-display text-4xl md:text-5xl font-black text-[--signal] leading-none mt-1">
              {content.title}
            </p>
          )}
          {content.description && (
            <p className="mt-3 font-semibold text-[--ink]">{content.description}</p>
          )}
          {content.contactLine && (
            <p className="text-sm text-[--ink]/70 mt-1">{content.contactLine}</p>
          )}
          {content.ctaText && (
            
              href={content.ctaLink || "#"}
              className="inline-block mt-5 bg-white text-[--ink] font-semibold px-6 py-2.5 rounded-lg hover:bg-[--ink] hover:text-white transition"
            >
              {content.ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
