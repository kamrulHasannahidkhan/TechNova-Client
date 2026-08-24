import Link from "next/link";
import { getContentBySection } from "@/lib/api";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline =
    content?.description || "Checked, boxed, and tested before it ships — no stock photos, no guessing.";

  return (
    <footer className="relative border-t border-[--line] mt-24 bg-gradient-to-b from-[--paper] to-[--paper]/60 backdrop-blur-md">
      {/* Decorative Gradient Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[--signal] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[--line]/60">
          
          {/* Brand & Newsletter (Cols 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="font-display font-black text-2xl tracking-tight text-[--ink] inline-block hover:opacity-90 transition"
            >
              STORE<span className="text-[--signal]">.</span>
            </Link>
            <p className="text-sm text-[--steel] leading-relaxed max-w-sm">
              {tagline}
            </p>

            {/* Newsletter Subscription Form */}
            <div className="pt-2 max-w-sm">
              <label htmlFor="newsletter-email" className="block font-mono-spec text-xs text-[--steel] tracking-wider mb-2">
                JOIN THE LINEUP — GET UPDATES
              </label>
              <form className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="enter your email..."
                  className="w-full bg-white/70 border border-[--line] rounded-lg px-3.5 py-2 text-sm text-[--ink] placeholder:text-[--steel]/50 focus:outline-none focus:border-[--signal] transition"
                  required
                />
                <button
                  type="submit"
                  className="bg-[--ink] text-white px-4 py-2 rounded-lg font-mono-spec text-xs hover:bg-[--signal] transition shrink-0"
                >
                  JOIN
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links (Cols 6-12) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Shop Nav */}
            <div>
              <p className="font-mono-spec text-xs font-semibold text-[--steel] tracking-widest mb-4">
                CATALOG
              </p>
              <ul className="text-sm space-y-2.5">
                <li>
                  <Link href="/#electronics" className="text-[--ink] hover:text-[--signal] transition">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-[--ink] hover:text-[--signal] transition">
                    Your Cart
                  </Link>
                </li>
                <li>
                  <Link href="/#new" className="text-[--ink] hover:text-[--signal] transition">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support Nav */}
            <div>
              <p className="font-mono-spec text-xs font-semibold text-[--steel] tracking-widest mb-4">
                SUPPORT
              </p>
              <ul className="text-sm space-y-2.5">
                <li>
                  <Link href="/returns" className="text-[--ink] hover:text-[--signal] transition">
                    Returns & Refund
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="text-[--ink] hover:text-[--signal] transition">
                    7-Day Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[--ink] hover:text-[--signal] transition">
                    Contact Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Payment & Trust */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono-spec text-xs font-semibold text-[--steel] tracking-widest mb-4">
                PAYMENTS
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono-spec text-[--steel]">
                {["bKash", "Nagad", "Rocket", "COD", "Cards"].map((method) => (
                  <span 
                    key={method} 
                    className="bg-white/80 border border-[--line] rounded px-2 py-1 text-[--ink]"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono-spec text-[--steel]">
          <p>© {new Date().getFullYear()} STORE. ALL RIGHTS RESERVED.</p>
          
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-3 py-1 rounded-full text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEMS OPERATIONAL — DHAKA
          </div>
        </div>
      </div>
    </footer>
  );
}