import { getContentBySection } from "@/lib/api";

export default async function BottomBanner() {
  const content = await getContentBySection("bottom-banner");

  if (!content) {
    console.log("BottomBanner: no content returned");
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div
        className="relative rounded-2xl overflow-hidden bg-yellow-400 min-h-[280px] flex items-center"
        style={
          content.image
            ? { backgroundImage: `url(${content.image})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        <div className="ml-auto mr-8 md:mr-16 text-right">
          {content.badge && (
            <p className="font-display text-lg font-bold text-[--ink]">{content.badge}</p>
          )}
          {content.title && (
            <p className="font-display text-5xl md:text-6xl font-black text-[--signal] leading-none">
              {content.title}
            </p>
          )}
          {content.description && (
            <p className="mt-3 font-semibold text-[--ink]">{content.description}</p>
          )}
          {content.contactLine && (
            <p className="text-sm text-[--ink]/70">{content.contactLine}</p>
          )}
          {content.ctaText && (
            
              href={content.ctaLink || "#"}
              className="inline-block mt-4 bg-white text-[--ink] font-semibold px-6 py-2.5 rounded-lg hover:bg-[--ink] hover:text-white transition"
            >
              {content.ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
