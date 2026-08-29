import { getContentBySection } from "@/lib/api";

export default async function Hero() {
  const content = await getContentBySection("hero");

  const badge = content?.badge || "SPECIAL OFFER!";
  const title = content?.title || "Gear that\nearns its specs.";
  const description = content?.description;
  const discountText = content?.discountText || "UP TO 30% OFF";
  const ctaText = content?.ctaText || "Shop Now";
  const ctaLink = content?.ctaLink || "#";
  const contactLine = content?.contactLine;
  const productImage = content?.image;

  return (
    <section className="relative bg-gradient-to-br from-[#0b1220] via-[#0f1a33] to-[#0b1220] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8 items-center min-h-[420px]">
        <div className="relative z-10">
          <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{badge}</p>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-[--signal] whitespace-pre-line">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-white/70 max-w-md">{description}</p>
          )}
          
            href={ctaLink}
            className="inline-block mt-6 bg-[--signal] text-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-[--ink] transition"
          >
            {ctaText}
          </a>
          {contactLine && (
            <p className="mt-8 font-mono-spec text-sm text-yellow-400 font-bold">{contactLine}</p>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          {discountText && (
            <div className="absolute -top-2 right-4 bg-yellow-400 text-[--ink] font-display font-black text-center px-4 py-3 rounded-lg -rotate-6 shadow-lg z-20">
              <span className="block text-xs leading-none">UP TO</span>
              <span className="block text-2xl leading-tight">{discountText.replace(/[^0-9%]/g, "") || discountText}</span>
              <span className="block text-xs leading-none">DISCOUNT</span>
            </div>
          )}
          {productImage ? (
            <img
              src={productImage}
              alt={title}
              className="max-h-[320px] w-auto object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="w-full h-64 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-sm">
              Add a product image from Site Content
            </div>
          )}
        </div>
      </div>

      {ctaText && (
        
          href={ctaLink}
          className="absolute bottom-6 right-6 bg-yellow-400 text-[--ink] font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-white transition"
        >
          → {ctaText === "Shop Now" ? "Order Now" : ctaText}
        </a>
      )}
    </section>
  );
}
