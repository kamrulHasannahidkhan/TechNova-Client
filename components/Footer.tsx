import { getContentBySection } from "@/lib/api";
import Link from "next/link";
import { Zap, MapPin, Phone, Mail, Play, Apple } from "lucide-react";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline =
    content?.description ||
    "TechNova: Your one-stop shop for Arduino, Raspberry Pi, sensors, modules, 3D printers, drones, and more. High-quality electronics for hobbyists and professionals.";

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm mt-16 font-sans border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Column 1: Brand Info & App Badges */}
        <div className="lg:col-span-1 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-6 h-6 text-blue-500 fill-blue-500" />
              <div>
                <span className="font-sans font-black text-lg text-white tracking-wide block leading-none">
                  TechNova<span className="text-blue-500">.</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-mono">
                  Stay Innovative
                </span>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 pt-2">
            <a
              href="#"
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white px-3 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Play className="w-4 h-4 text-blue-500 fill-blue-500" />
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                  Get it on
                </div>
                <div className="text-xs font-semibold leading-none text-white">
                  Google Play
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white px-3 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Apple className="w-4 h-4 text-white fill-white" />
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                  Download on
                </div>
                <div className="text-xs font-semibold leading-none text-white">
                  App Store
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Column 2: Category */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-800">
            Category
          </h3>
          <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
            <li>
              <Link href="/category/components" className="hover:text-blue-400 transition-colors">
                Components
              </Link>
            </li>
            <li>
              <Link href="/category/accessories" className="hover:text-blue-400 transition-colors">
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/category/microcontrollers" className="hover:text-blue-400 transition-colors">
                Microcontrollers
              </Link>
            </li>
            <li>
              <Link href="/category/3d-printers" className="hover:text-blue-400 transition-colors">
                3D Printers
              </Link>
            </li>
            <li>
              <Link href="/category/rc-hobby" className="hover:text-blue-400 transition-colors">
                RC Hobby
              </Link>
            </li>
            <li>
              <Link href="/category/diy-robot" className="hover:text-blue-400 transition-colors">
                DIY Robot
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-800">
            Company
          </h3>
          <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-blue-400 transition-colors">
                Warranty Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-blue-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/project" className="hover:text-blue-400 transition-colors">
                Project
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Account */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-800">
            Account
          </h3>
          <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
            <li>
              <Link href="/signin" className="hover:text-blue-400 transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-blue-400 transition-colors">
                View Cart
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-blue-400 transition-colors">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-blue-400 transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/payments" className="hover:text-blue-400 transition-colors">
                Payments
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact & Socials */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-dashed border-slate-800">
            Contact
          </h3>
          <ul className="space-y-3 text-slate-400 text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>New eskaton road Dhaka postal code 1217</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span>+88001606586207 </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span>+8801813335789 </span>
            </li>
            
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span></span>
            </li>
          </ul>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-2 mt-6">
            {["f", "yt", "ig", "in", "X", "p"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center text-xs font-bold text-slate-300 transition-all active:scale-90"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Legal & Payment Bar */}
      <div className="border-t border-slate-800/80 bg-slate-900/60 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-blue-500 font-semibold">TechNova.Com.BD</span> all rights reserved.
          </p>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-1.5 font-bold text-[10px]">
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-pink-500 rounded italic font-black">
              bkash
            </span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-orange-400 rounded">
              nogod 
            </span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-purple-400 rounded">
              Rocket
            </span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-amber-400 rounded">
              UPay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}