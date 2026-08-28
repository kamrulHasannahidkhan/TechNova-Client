import { getContentBySection } from "@/lib/api";

const SPECS = [
  "48H DELIVERY", "GENUINE WARRANTY", "COD AVAILABLE", "bKash · Nagad · Rocket",
  "48H DELIVERY", "GENUINE WARRANTY", "COD AVAILABLE", "bKash · Nagad · Rocket",
];

export default async function Hero() {
  const content = await getContentBySection("hero");

  const title = content?.title || "Gear that\nearns its specs.";
  const description = content?.description || "Every listing here is checked, boxed, and tested before it ships — no reused stock photos, no guessing.";
  const ctaText = content?.ctaText || "Shop now";
  const ctaLink = content?.ctaLink || "/cart";
  const bgImage = content?.image;

  return (
    <section
      className="relative border-b border-[--line] overflow-hidden"
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {bgImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
      )}

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
        <div>
          <p className="font-mono-spec text-xs tracking-widest mb-4 text-[--signal]">
            EL — ELECTRONICS CATALOG
          </p>
          <h1
            className={`font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight whitespace-pre-line ${
              bgImage ? "text-white" : "text-[--ink]"
            }`}
          >
            {title}
          </h1>
          <p className={`mt-5 text-lg max-w-md ${bgImage ? "text-white/80" : "text-[--steel]"}`}>
            {description}
          </p>
          <a
            href={ctaLink}
            className="inline-block mt-8 bg-[--signal] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white hover:text-[--ink] transition"
          >
            {ctaText}
          </a>
        </div>

        <div
          className={`rounded-2xl p-6 ${
            bgImage ? "bg-white/10 backdrop-blur-md border border-white/20" : "border border-[--line] bg-white/60"
          }`}
        >
          <p className={`font-mono-spec text-xs mb-3 ${bgImage ? "text-white/60" : "text-[--steel]"}`}>
            LIVE — TODAY
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap ticker-track w-max">
              {SPECS.map((s, i) => (
                <span key={i} className={`font-mono-spec text-sm ${bgImage ? "text-white" : "text-[--ink]"}`}>
                  {s} <span className="text-[--signal] mx-2">/</span>
                </span>
              ))}
            </div>
          </div>
          <div className={`mt-6 grid grid-cols-3 gap-4 font-mono-spec text-xs ${bgImage ? "text-white/60" : "text-[--steel]"}`}>
            <div><span className={`block text-2xl font-display ${bgImage ? "text-white" : "text-[--ink]"}`}>24/7</span>SUPPORT</div>
            <div><span className={`block text-2xl font-display ${bgImage ? "text-white" : "text-[--ink]"}`}>100%</span>VERIFIED</div>
            <div><span className={`block text-2xl font-display ${bgImage ? "text-white" : "text-[--ink]"}`}>7D</span>RETURN</div>
          </div>
        </div>
      </div>
    </section>
  );
}
