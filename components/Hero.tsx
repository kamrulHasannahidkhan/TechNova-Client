import Link from "next/link";
import Image from "next/image";
import { getContentBySection } from "@/lib/api";

const SPECS = [
  "48H DELIVERY", "GENUINE WARRANTY", "COD AVAILABLE", "bKash · Nagad · Rocket",
  "48H DELIVERY", "GENUINE WARRANTY", "COD AVAILABLE", "bKash · Nagad · Rocket",
];

export default async function Hero() {
  const content = await getContentBySection("hero");

  const title = content?.title || "Gear that\nearns its specs.";
  const description =
    content?.description ||
    "Every listing here is checked, boxed, and tested before it ships — no reused stock photos, no guessing.";
  const ctaText = content?.ctaText || "Browse the lineup";
  const ctaLink = content?.ctaLink || "#electronics";
  const bgImage = content?.image;

  // Conditional text styling based on background image availability
  const textTitle = bgImage ? "text-white" : "text-[--ink]";
  const textBody = bgImage ? "text-white/80" : "text-[--steel]";
  const textMuted = bgImage ? "text-white/60" : "text-[--steel]";
  const cardStyles = bgImage
    ? "bg-white/10 backdrop-blur-md border border-white/20"
    : "border border-[--line] bg-white/60 backdrop-blur-sm";

  return (
    <section className="relative border-b border-[--line] overflow-hidden">
      {/* Optimized Background Image & Dark Overlay */}
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30 -z-10" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
        {/* Left Content */}
        <div>
          <p className="font-mono-spec text-xs tracking-widest mb-4 text-[--signal]">
            EL — ELECTRONICS CATALOG
          </p>
          <h1
            className={`font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight whitespace-pre-line ${textTitle}`}
          >
            {title}
          </h1>
          <p className={`mt-5 text-lg max-w-md ${textBody}`}>
            {description}
          </p>

          <Link
            href={ctaLink}
            className="inline-block mt-8 bg-[--signal] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white hover:text-[--ink] transition-colors duration-200 shadow-md"
          >
            {ctaText}
          </Link>
        </div>

        {/* Right Glass Card */}
        <div className={`rounded-2xl p-6 ${cardStyles}`}>
          <div className="flex items-center justify-between mb-3">
            <p className={`font-mono-spec text-xs ${textMuted}`}>
              LIVE — TODAY
            </p>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Marquee Ticker */}
          <div className="overflow-hidden relative w-full py-1">
            <div className="flex gap-8 whitespace-nowrap animate-marquee w-max">
              {SPECS.map((s, i) => (
                <span
                  key={i}
                  className={`font-mono-spec text-sm flex items-center ${
                    bgImage ? "text-white" : "text-[--ink]"
                  }`}
                >
                  {s} <span className="text-[--signal] ml-3">/</span>
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className={`mt-6 pt-4 border-t ${bgImage ? "border-white/20" : "border-[--line]/60"} grid grid-cols-3 gap-4 font-mono-spec text-xs ${textMuted}`}>
            <div>
              <span className={`block text-2xl font-display font-bold ${textTitle}`}>
                24/7
              </span>
              SUPPORT
            </div>
            <div>
              <span className={`block text-2xl font-display font-bold ${textTitle}`}>
                100%
              </span>
              VERIFIED
            </div>
            <div>
              <span className={`block text-2xl font-display font-bold ${textTitle}`}>
                7D
              </span>
              RETURN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}