import { getContentBySection } from "@/lib/api";
import Link from "next/link";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline = content?.description || "Checked, boxed, tested — before it ships.";

  return (
    <footer className="border-t border-[--line] mt-16 bg-[--surface-subtle] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display font-bold text-lg mb-3 tracking-tight">
            TechNova<span className="text-[--signal] animate-pulse">.</span>
          </p>
          <p className="text-sm text-[--steel] leading-relaxed max-w-xs">{tagline}</p>
        </div>

        <div>
          <p className="font-mono-spec text-xs font-semibold text-[--steel] mb-3 tracking-wider uppercase">
            SHOP
          </p>
          <ul className="text-sm flex flex-col gap-2.5">
            <li>
              <Link 
                href="/cart" 
                className="hover:text-[--signal] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[--signal] focus:ring-offset-2 rounded"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono-spec text-xs font-semibold text-[--steel] mb-3 tracking-wider uppercase">
            SUPPORT
          </p>
          <ul className="text-sm flex flex-col gap-2.5">
            <li>
              <Link 
                href="/returns" 
                className="hover:text-[--signal] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[--signal] focus:ring-offset-2 rounded"
              >
                Returns
              </Link>
            </li>
            <li>
              <Link 
                href="/warranty" 
                className="hover:text-[--signal] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[--signal] focus:ring-offset-2 rounded"
              >
                Warranty
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="hover:text-[--signal] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[--signal] focus:ring-offset-2 rounded"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono-spec text-xs font-semibold text-[--steel] mb-3 tracking-wider uppercase">
            PAY WITH
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs font-mono-spec">
            <span className="px-2 py-1 rounded bg-[--line]/20 text-[--steel] border border-[--line]">bKash</span>
            <span className="px-2 py-1 rounded bg-[--line]/20 text-[--steel] border border-[--line]">Nagad</span>
            <span className="px-2 py-1 rounded bg-[--line]/20 text-[--steel] border border-[--line]">Rocket</span>
            <span className="px-2 py-1 rounded bg-[--line]/20 text-[--steel] border border-[--line]">SSLCommerz</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[--line] py-4 text-center font-mono-spec text-xs text-[--steel]">
        © {new Date().getFullYear()} TechNova. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}