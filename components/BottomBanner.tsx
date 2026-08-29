import { getContentBySection } from "@/lib/api";

const FEATURES = [
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Free Shipping",
    desc: "Free shipping on all US order or order above $200",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "24X7 Support",
    desc: "Contact us 24 hours live support, 7 days in a week",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Regular Discounts",
    desc: "You can enjoy regular offers so stay connected",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Payment Secure",
    desc: "Contact us 24 hours live support, 7 days in a week",
  },
];

export default async function BottomBanner() {
  const content = await getContentBySection("bottom-banner");

  if (!content) {
    console.log("BottomBanner: no content returned");
    return null;
  }

  const badge = content.badge || "FREE";
  const title = content.title || "DELIVERY";
  const description = content.description || "ON ORDERS OVER 5000 BDT";
  const contactLine = content.contactLine || "ANYWHERE IN BANGLADESH";
  const ctaText = content.ctaText || "Order Now";
  const ctaLink = content.ctaLink || "#";

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-8 font-sans">
      {/* 4 Feature Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center justify-center space-y-2"
          >
            <div className="p-3 bg-blue-50/50 rounded-full mb-1">
              {item.icon}
            </div>
            <h4 className="font-bold text-slate-800 text-base">{item.title}</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Main Yellow Promo Banner */}
      <div
        className="relative rounded-3xl overflow-hidden bg-[#F8C648] min-h-[340px] flex items-center shadow-sm"
        style={
          content.image
            ? {
                backgroundImage: `url(${content.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Yellow/White Overlay graphic accents */}
        <div className="absolute top-6 left-1/4 w-8 h-8 rounded-full border-4 border-white/60 pointer-events-none" />
        <div className="absolute bottom-6 right-1/3 w-16 h-16 rounded-full border-4 border-white/40 pointer-events-none" />

        {/* Banner Content Container */}
        <div className="w-full max-w-6xl mx-auto px-8 md:px-16 flex justify-end">
          <div className="text-left md:w-1/2 space-y-3 relative z-10">
            {badge && (
              <p className="font-bold text-slate-800 text-lg md:text-xl tracking-wider uppercase leading-none">
                {badge}
              </p>
            )}

            {title && (
              <h2 className="font-black text-4xl sm:text-5xl md:text-6xl text-blue-600 tracking-tight leading-tight uppercase">
                {title}
              </h2>
            )}

            <div className="pt-2 space-y-1">
              {description && (
                <p className="font-extrabold text-slate-800 text-sm md:text-base tracking-wide uppercase">
                  {description}
                </p>
              )}

              {contactLine && (
                <p className="text-xs font-medium text-slate-600 tracking-wider uppercase">
                  {contactLine}
                </p>
              )}
            </div>

            {ctaText && (
              <div className="pt-3">
                <a
                  href={ctaLink}
                  className="inline-block bg-[#FCD770] hover:bg-white text-slate-900 font-bold text-xs px-6 py-2.5 rounded-md shadow-sm border border-amber-300 transition-colors duration-200"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}