"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const { items } = useCart();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[--paper]/90 backdrop-blur-md border-b border-[--line] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[--ink] flex items-center gap-1 group"
        >
          <span>TechNova</span>
          <span className="text-[--signal] text-2xl transition-transform group-hover:scale-125 inline-block">
            .
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[--steel]">
          <Link
            href="/"
            className="hover:text-[--ink] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[--signal] after:transition-all"
          >
            Home
          </Link>
          <Link
            href="/new-arrivals"
            className="hover:text-[--ink] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[--signal] after:transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[--signal]" /> New Arrivals
          </Link>
          <Link
            href="/exclusive"
            className="hover:text-[--ink] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[--signal] after:transition-all"
          >
            Exclusive
          </Link>
          <Link
            href="/best-sellers"
            className="hover:text-[--ink] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[--signal] after:transition-all"
          >
            Best Sellers
          </Link>
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="flex items-center gap-2 hover:text-[--signal] transition text-[--ink] bg-[--line]/40 px-3 py-1.5 rounded-full border border-[--line]"
              >
                <div className="w-6 h-6 rounded-full bg-[--signal] text-white flex items-center justify-center text-xs font-bold uppercase">
                  {session.user.name ? session.user.name.charAt(0) : "U"}
                </div>
                <span className="hidden sm:inline font-semibold">
                  {session.user.name?.split(" ")[0]}
                </span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign out"
                className="hover:text-[--signal] text-[--steel] transition p-1.5 rounded-lg hover:bg-[--line]/50"
              >
                <LogOut className="w-4 h-4" />
                <span className="sr-only">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/signin"
                className="hover:text-[--signal] text-[--steel] transition px-2 py-1.5 flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[--ink] text-white px-4 py-2 rounded-xl hover:bg-[--signal] transition-all shadow-sm font-medium flex items-center gap-1.5 active:scale-95"
              >
                <UserPlus className="w-4 h-4" /> Sign Up
              </Link>
            </div>
          )}

          {/* Cart Icon & Counter */}
          <Link
            href="/cart"
            className="relative p-2 text-[--ink] hover:text-[--signal] transition rounded-xl hover:bg-[--line]/40"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[--signal] text-white text-[11px] font-bold rounded-full min-w-[20px] h-[20px] px-1 flex items-center justify-center shadow-sm animate-in zoom-in-50">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[--ink] hover:text-[--signal] transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[--line] bg-[--paper] px-6 py-5 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3.5 text-base font-medium text-[--steel]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[--ink] transition"
            >
              Home
            </Link>
            <Link
              href="/new-arrivals"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[--ink] transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[--signal]" /> New Arrivals
            </Link>
            <Link
              href="/exclusive"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[--ink] transition"
            >
              Exclusive
            </Link>
            <Link
              href="/best-sellers"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[--ink] transition"
            >
              Best Sellers
            </Link>
          </nav>

          {!session?.user && (
            <div className="pt-4 border-t border-[--line] flex flex-col gap-2.5">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl border border-[--line] text-center text-sm font-semibold text-[--ink] hover:bg-[--line]/30 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[--ink] text-white text-center text-sm font-semibold hover:bg-[--signal] transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}