import { getContentBySection } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

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

  // Extracted discount value safely
  const formattedDiscount = discountText.replace(/[^0-9%]/g, "") || discountText;

  return (
    <section className="relative bg-gradient-to-br from-[#0b1220] via-[#0f1a33] to-[#0b1220] overflow-hidden rounded-3xl my-4 mx-auto max-w-7xl shadow-2xl border border-slate-800">
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Grid */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center min-h-[420px]">
        
        {/* Left Information Column */}
        <div className="relative z-10 space-y-4">
          
          {/* Offer Badge */}
          {badge && (
            <div className="inline-block bg-amber-400 text-slate-950 font-display text-xs md:text-sm font-black px-3.5 py-1 rounded-md uppercase tracking-wider shadow-md">
              {badge}
            </div>
          )}

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-white whitespace-pre-line drop-shadow-sm">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-slate-300 text-sm md:text-base max-w-md leading-relaxed">
              {description}
            </p>
          )}

          {/* Primary CTA & Contact details */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            {ctaText && (
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center bg-[--signal] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-amber-400 hover:text-slate-950 transition-all duration-200 shadow-lg hover:shadow-amber-400/20"
              >
                {ctaText}
              </Link>
            )}

            {contactLine && (
              <p className="font-mono-spec text-sm text-amber-400 font-bold flex items-center gap-1.5">
                <span className="text-base">📞</span> {contactLine}
              </p>
            )}
          </div>
        </div>

        {/* Right Showcase Column */}
        <div className="relative flex items-center justify-center py-6">
          
          {/* Discount Ribbon Tag */}
          {discountText && (
            <div className="absolute -top-4 right-4 md:right-8 bg-amber-400 text-slate-950 font-display font-black text-center px-4 py-3 rounded-xl -rotate-6 shadow-2xl z-20 border border-amber-300">
              <span className="block text-[10px] uppercase font-bold tracking-wider leading-none text-slate-800">
                UP TO
              </span>
              <span className="block text-2xl md:text-3xl font-black leading-tight my-0.5">
                {formattedDiscount}
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-wider leading-none text-slate-800">
                DISCOUNT
              </span>
            </div>
          )}

          {/* Product Showcase Image */}
          {productImage ? (
            <div className="relative w-full h-[280px] md:h-[340px] flex items-center justify-center">
              <Image
                src={productImage}
                alt={title.replace("\n", " ")}
                fill
                priority
                className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-full h-64 rounded-2xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
              <span className="text-2xl">⚡</span>
              <span>Add a product image from Site Content</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button Bar */}
      {ctaText && (
        <div className="absolute bottom-4 right-6 z-20 hidden sm:block">
          <Link
            href={ctaLink}
            className="bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-white transition-colors duration-200 shadow-lg"
          >
            <span>➔</span> {ctaText === "Shop Now" ? "Order Now" : ctaText}
          </Link>
        </div>
      )}
    </section>
  );
}