import { getContentBySection } from "@/lib/api";
import Link from "next/link";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline = content?.description || "TechNova: Your one-stop shop for Arduino, Raspberry Pi, sensors, modules, 3D printers, drones, and more. High-quality electronics for hobbyists and professionals.";

  return (
    <footer className="bg-[#121824] text-slate-300 text-sm mt-16 font-sans border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Column 1: Brand Info & App Badges */}
        <div className="lg:col-span-1 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-400 font-bold text-2xl">⚡</span>
              <div>
                <span className="font-bold text-lg text-white tracking-wide block leading-none">
                  TechNova<span className="text-emerald-400">.</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider">Stay Innovative</span>
              </div>
            </div>
          </div>
          
          <p className="text-slate-400 text-xs leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 pt-2">
            <a href="#" className="flex items-center gap-2 bg-[#1c2434] hover:bg-[#253046] border border-slate-700/60 text-white px-3 py-2 rounded-lg transition-colors">
              <span className="text-xl">▶</span>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Get it on</div>
                <div className="text-xs font-semibold leading-none">Google Play</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 bg-[#1c2434] hover:bg-[#253046] border border-slate-700/60 text-white px-3 py-2 rounded-lg transition-colors">
              <span className="text-xl">🍎</span>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Download on</div>
                <div className="text-xs font-semibold leading-none">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* Column 2: Category */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-700/60">
            Category
          </h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><Link href="/category/components" className="hover:text-emerald-400 transition-colors">Components</Link></li>
            <li><Link href="/category/accessories" className="hover:text-emerald-400 transition-colors">Accessories</Link></li>
            <li><Link href="/category/microcontrollers" className="hover:text-emerald-400 transition-colors">Microcontrollers</Link></li>
            <li><Link href="/category/3d-printers" className="hover:text-emerald-400 transition-colors">3D Printers</Link></li>
            <li><Link href="/category/rc-hobby" className="hover:text-emerald-400 transition-colors">RC Hobby</Link></li>
            <li><Link href="/category/diy-robot" className="hover:text-emerald-400 transition-colors">DIY Robot</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-700/60">
            Company
          </h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About us</Link></li>
            <li><Link href="/warranty" className="hover:text-emerald-400 transition-colors">Warranty Policy</Link></li>
            <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of use</Link></li>
            <li><Link href="/project" className="hover:text-emerald-400 transition-colors">Project</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact us</Link></li>
          </ul>
        </div>

        {/* Column 4: Account */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-700/60">
            Account
          </h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><Link href="/signin" className="hover:text-emerald-400 transition-colors">Sign In</Link></li>
            <li><Link href="/cart" className="hover:text-emerald-400 transition-colors">View Cart</Link></li>
            <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/returns" className="hover:text-emerald-400 transition-colors">Return Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link></li>
            <li><Link href="/payments" className="hover:text-emerald-400 transition-colors">Payments</Link></li>
          </ul>
        </div>

        {/* Column 5: Contact & Socials */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-700/60">
            Contact
          </h3>
          <ul className="space-y-3 text-slate-400 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-slate-500 mt-0.5">📍</span>
              <span>Shop 440 & 441, 3rd Floor, Farmview SuperMarket, Farmgate, Dhaka 1215</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">💬</span>
              <span>+8801717062205 (Info)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">💬</span>
              <span>+8801641757175 (Store)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">💬</span>
              <span>+8801919646416 (Delivery)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">✉️</span>
              <span>info@electronics.com.bd</span>
            </li>
          </ul>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-2 mt-6">
            {["f", "yt", "ig", "in", "X", "p"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-7 h-7 rounded-full bg-[#1c2434] hover:bg-emerald-500 hover:text-white flex items-center justify-center text-xs font-bold text-slate-300 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Legal & Payment Bar */}
      <div className="border-t border-slate-800 bg-[#0e131d] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright © {new Date().getFullYear()} <span className="text-amber-500 font-semibold">TechNova.Com.BD</span> all rights reserved.
          </p>

          {/* Payment Cards Badges */}
          <div className="flex flex-wrap items-center gap-1.5 font-bold text-[10px]">
            <span className="px-2 py-1 bg-white text-blue-900 rounded italic font-black">VISA</span>
            <span className="px-2 py-1 bg-white text-red-600 rounded">mastercard</span>
            <span className="px-2 py-1 bg-white text-blue-600 rounded italic">PayPal</span>
            <span className="px-2 py-1 bg-white text-pink-700 rounded">Skrill</span>
            <span className="px-2 py-1 bg-white text-blue-800 rounded">maestro</span>
            <span className="px-2 py-1 bg-white text-blue-500 rounded">VISA Electron</span>
          </div>
        </div>
      </div>
    </footer>
  );
}