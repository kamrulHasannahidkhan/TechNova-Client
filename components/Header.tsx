import Link from "next/link";
import { Sparkles, LogIn, UserPlus, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--paper)] border-b border-[var(--line)] backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="font-sans text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)] hover:opacity-80 transition-opacity"
        >
          TechNova<span className="text-blue-600">.</span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--ink)]">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="#new-arrivals" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            New Arrivals
          </Link>
          <Link href="/exclusive" className="hover:text-blue-600 transition-colors">
            Exclusive
          </Link>
          <Link href="/best-sellers" className="hover:text-blue-600 transition-colors">
            Best Sellers
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Sign In Link */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:text-blue-600 transition-colors px-3 py-2 rounded-xl"
          >
            <LogIn className="w-4 h-4 text-[var(--steel)]" />
            Sign In
          </Link>

          {/* Sign Up Button (High Contrast Solid Pill) */}
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-white" />
            Sign Up
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 rounded-xl text-[var(--ink)] hover:bg-[var(--surface-subtle)] border border-transparent hover:border-[var(--line)] transition-all"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[var(--ink)]" />
          </Link>
        </div>

      </div>
    </header>
  );
}