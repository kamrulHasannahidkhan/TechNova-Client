import { getContentBySection } from "@/lib/api";
import Link from "next/link";
import { Zap, MapPin, Phone, Mail, Play, Apple } from "lucide-react";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline =
    content?.description ||
    "TechNova: Your one-stop shop for Arduino, Raspberry Pi, sensors, modules, 3D printers, drones, and more. High-quality electronics for hobbyists and professionals.";

  return (
    <footer className="bg-paper text-steel text-sm mt-16 font-sans border-t border-line">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Column 1: Brand Info & App Badges */}
        <div className="lg:col-span-1 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-6 h-6 text-signal fill-signal" />
              <div>
                <span className="font-display font-bold text-lg text-ink tracking-wide block leading-none">
                  TechNova<span className="text-signal">.</span>
                </span>
                <span className="text-[10px] text-steel/80 tracking-wider font-mono-spec">
                  Stay Innovative
                </span>
              </div>
            </div>
          </div>

          <p className="text-steel text-xs leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 pt-2">
            <a
              href="#"
              className="flex items-center gap-2.5 bg-surface-card hover:bg-surface-subtle border border-line text-ink px-3 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Play className="w-4 h-4 text-signal fill-signal" />
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-steel font-mono-spec">
                  Get it on
                </div>
                <div className="text-xs font-semibold leading-none text-ink">
                  Google Play
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 bg-surface-card hover:bg-surface-subtle border border-line text-ink px-3 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Apple className="w-4 h-4 text-ink fill-ink" />
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-steel font-mono-spec">
                  Download on
                </div>
                <div className="text-xs font-semibold leading-none text-ink">
                  App Store
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Column 2: Category */}
        <div>
          <h3 className="text-ink font-semibold text-base mb-4 pb-2 border-b border-dashed border-line">
            Category
          </h3>
          <ul className="space-y-2.5 text-steel text-xs font-medium">
            <li>
              <Link href="/category/components" className="hover:text-signal transition-colors">
                Components
              </Link>
            </li>
            <li>
              <Link href="/category/accessories" className="hover:text-signal transition-colors">
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/category/microcontrollers" className="hover:text-signal transition-colors">
                Microcontrollers
              </Link>
            </li>
            <li>
              <Link href="/category/3d-printers" className="hover:text-signal transition-colors">
                3D Printers
              </Link>
            </li>
            <li>
              <Link href="/category/rc-hobby" className="hover:text-signal transition-colors">
                RC Hobby
              </Link>
            </li>
            <li>
              <Link href="/category/diy-robot" className="hover:text-signal transition-colors">
                DIY Robot
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-ink font-semibold text-base mb-4 pb-2 border-b border-dashed border-line">
            Company
          </h3>
          <ul className="space-y-2.5 text-steel text-xs font-medium">
            <li>
              <Link href="/about" className="hover:text-signal transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-signal transition-colors">
                Warranty Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-signal transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-signal transition-colors">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/project" className="hover:text-signal transition-colors">
                Project
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-signal transition-colors">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Account */}
        <div>
          <h3 className="text-ink font-semibold text-base mb-4 pb-2 border-b border-dashed border-line">
            Account
          </h3>
          <ul className="space-y-2.5 text-steel text-xs font-medium">
            <li>
              <Link href="/signin" className="hover:text-signal transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-signal transition-colors">
                View Cart
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-signal transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-signal transition-colors">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-signal transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/payments" className="hover:text-signal transition-colors">
                Payments
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact & Socials */}
        <div>
          <h3 className="text-ink font-semibold text-base mb-4 pb-2 border-b border-dashed border-line">
            Contact
          </h3>
          <ul className="space-y-3 text-steel text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-signal shrink-0 mt-0.5" />
              <span>Shop 440 & 441, 3rd Floor, Farmview SuperMarket, Farmgate, Dhaka 1215</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-signal shrink-0" />
              <span>+8801717062205 (Info)</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-signal shrink-0" />
              <span>+8801641757175 (Store)</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-signal shrink-0" />
              <span>+8801919646416 (Delivery)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-signal shrink-0" />
              <span>info@electronics.com.bd</span>
            </li>
          </ul>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-2 mt-6">
            {["f", "yt", "ig", "in", "X", "p"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-7 h-7 rounded-full bg-surface-subtle border border-line hover:bg-signal hover:text-white hover:border-signal flex items-center justify-center text-xs font-bold text-steel transition-all active:scale-90"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Legal & Payment Bar */}
      <div className="border-t border-line bg-surface-subtle py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-signal font-semibold">TechNova.Com.BD</span> all rights reserved.
          </p>

          {/* Payment Cards Badges */}
          <div className="flex flex-wrap items-center gap-1.5 font-bold text-[10px]">
            <span className="px-2 py-1 bg-surface-card border border-line text-blue-900 rounded italic font-black">
              bkash
            </span>
            <span className="px-2 py-1 bg-surface-card border border-line text-green-700 rounded">
              nogod 
            </span>
            <span className="px-2 py-1 bg-surface-card border border-line text-red-600 rounded">
              Rocket
            </span>
            <span className="px-2 py-1 bg-surface-card border border-line text-blue-700 rounded">
              UPay
            </span>
           
          </div>
        </div>
      </div>
    </footer>
  );
}