import { getContentBySection } from "@/lib/api";
import Link from "next/link";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline = content?.description || "Checked, boxed, tested — before it ships.";

  return (
    <footer className="relative border-t border-[--line] bg-[#0B0F17] text-slate-200 mt-24 overflow-hidden">
      {/* Background Tech Glow & Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Trust Badges Bar (High-Conversion Electronics Bar) */}
      <div className="border-b border-[--line]/60 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-[--signal] font-mono-spec text-lg">⚡</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Express Delivery</p>
              <p className="text-xs text-[--steel]">Fast & insured dispatch</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-[--signal] font-mono-spec text-lg">🛡️</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Official Warranty</p>
              <p className="text-xs text-[--steel]">100% authentic products</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-[--signal] font-mono-spec text-lg">🔄</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Easy Returns</p>
              <p className="text-xs text-[--steel]">Hassle-free replacement</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-[--signal] font-mono-spec text-lg">🔒</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Secure Checkout</p>
              <p className="text-xs text-[--steel]">Encrypted payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Tagline Section */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <p className="font-display font-extrabold text-2xl tracking-wider text-white">
                TechNova<span className="text-[--signal] animate-pulse">.</span>
              </p>
              <span className="text-[10px] font-mono-spec bg-[--signal]/10 text-[--signal] border border-[--signal]/30 px-2 py-0.5 rounded-full uppercase tracking-widest">
                VERIFIED STORE
              </span>
            </div>
            <p className="text-sm text-[--steel] leading-relaxed max-w-sm mb-6">
              {tagline}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs font-mono-spec">
            <span className="text-[--steel]">SYSTEM STATUS:</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              All Systems Operational
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Shop Column */}
          <div>
            <p className="font-mono-spec text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              SHOP
            </p>
            <ul className="text-sm flex flex-col gap-3 text-[--steel]">
              <li>
                <Link 
                  href="/cart" 
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span className="text-[--signal]">›</span> Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <p className="font-mono-spec text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              SUPPORT
            </p>
            <ul className="text-sm flex flex-col gap-3 text-[--steel]">
              <li>
                <Link 
                  href="#" 
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span className="text-[--signal]">›</span> Returns
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span className="text-[--signal]">›</span> Warranty
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span className="text-[--signal]">›</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Gateways Column */}
          <div>
            <p className="font-mono-spec text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              PAY WITH
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-spec">
              {["bKash", "Nagad", "Rocket", "SSLCommerz"].map((gateway) => (
                <div 
                  key={gateway}
                  className="px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-slate-300 hover:border-[--signal] hover:text-white transition-colors duration-200 text-center"
                >
                  {gateway}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[--line]/60 bg-black/40 py-6 text-center font-mono-spec text-xs text-[--steel]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} TechNova. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] tracking-widest text-[--steel]/60 uppercase">
            Designed for High-Performance Tech Commerce
          </p>
        </div>
      </div>
    </footer>
  );
}