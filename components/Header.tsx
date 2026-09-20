"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User as UserIcon, Menu, X, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const { user } = useAuth();

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Exclusive", href: "/exclusive" },
    { label: "Best Sellers", href: "/best-sellers" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-3.5 sm:px-6 py-2.5 sm:py-3.5">
        {/* Brand Logo - Electric Teal Accent Dot */}
        <Link
          href="/"
          className="font-display text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-ink group flex items-center gap-0.5 shrink-0"
        >
          TechNova
          <span className="text-signal group-hover:text-cyan-glow transition-colors">
            .
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-ink font-semibold"
                    : "text-steel hover:text-signal"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-signal rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Controls & Cart */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 text-sm font-medium shrink-0">
          {user ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-ink hover:text-signal px-2 sm:px-3 py-1.5 rounded-xl hover:bg-surface-subtle transition max-w-[120px] sm:max-w-none"
            >
              <UserIcon className="w-4 h-4 text-steel shrink-0" />
              <span className="hidden sm:inline truncate">
                {user.name.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 lg:gap-2">
              <Link
                href="/signin"
                className="text-steel hover:text-ink px-2.5 lg:px-3 py-1.5 transition text-xs lg:text-sm whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-cta text-white px-3 lg:px-4 py-2 rounded-xl text-xs font-semibold hover:bg-cta-hover active:scale-95 transition shadow-sm whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Cart Icon & Electric Teal Badge */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative p-2 rounded-xl text-ink hover:bg-surface-subtle transition active:scale-95 shrink-0"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-signal text-white text-[10px] font-mono-spec font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-steel hover:text-ink hover:bg-surface-subtle transition shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-paper px-4 sm:px-6 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1 transition-colors ${
                  pathname === link.href
                    ? "text-signal font-semibold"
                    : "text-steel hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!user && (
            <div className="pt-4 border-t border-line flex flex-col gap-2.5">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-line text-ink font-semibold text-sm hover:bg-surface-card transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-cta text-white font-semibold text-sm flex items-center justify-center gap-1 hover:bg-cta-hover transition"
              >
                Sign Up
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}