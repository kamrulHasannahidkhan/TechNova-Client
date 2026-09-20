"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { items } = useCart();
  const { user } = useAuth();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/exclusive", label: "Exclusive" },
    { href: "/best-sellers", label: "Best Sellers" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[--paper]/90 backdrop-blur border-b border-[--line]">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          TechNova<span className="text-[--signal]">.</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-[--steel]">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[--ink] transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <Link href="/account" className="hover:text-[--signal] transition">
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <>
                <Link href="/signin" className="hover:text-[--signal] transition">Sign In</Link>
                <Link
                  href="/signup"
                  className="bg-[--ink] text-white px-3.5 py-1.5 rounded-lg hover:bg-[--signal] transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <Link href="/cart" className="relative">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-[--signal] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <span className={`block w-5 h-0.5 bg-[--ink] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[--ink] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[--ink] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[--line] bg-[--paper] px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[--ink] py-1"
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-[--line] my-1" />
          {user ? (
            <Link href="/account" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[--ink] py-1">
              My Account
            </Link>
          ) : (
            <>
              <Link href="/signin" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[--ink] py-1">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[--ink] py-1">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
