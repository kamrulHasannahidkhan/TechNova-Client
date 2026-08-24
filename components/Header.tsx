"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Electronics", href: "/#electronics" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[--paper]/80 backdrop-blur-md border-b border-[--line]/60 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="font-display text-2xl font-black tracking-tight text-[--ink] hover:opacity-90 transition"
        >
          TechNova<span className="text-[--signal]"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-150 relative py-1 ${
                  isActive 
                    ? "text-[--ink] font-semibold" 
                    : "text-[--steel] hover:text-[--ink]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[--signal] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Cart & Mobile Menu Toggle) */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            aria-label={`Shopping cart with ${count} items`}
            className="relative flex items-center justify-center p-2 rounded-full text-[--ink] hover:bg-[--line]/40 transition group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[--signal] text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm animate-in zoom-in-50">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[--ink] hover:bg-[--line]/40 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[--paper] border-b border-[--line] px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[--steel] hover:text-[--ink] transition py-1.5"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}