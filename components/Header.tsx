"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { items } = useCart();
  const { user } = useAuth();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[--paper]/90 backdrop-blur border-b border-[--line]">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          TechNova<span className="text-[--signal]">.</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[--steel]">
          <Link href="/" className="hover:text-[--ink] transition">Home</Link>
          <Link href="/new-arrivals" className="hover:text-[--ink] transition">New Arrivals</Link>
          <Link href="/exclusive" className="hover:text-[--ink] transition">Exclusive</Link>
          <Link href="/best-sellers" className="hover:text-[--ink] transition">Best Sellers</Link>
        </nav>
        <div className="flex items-center gap-4 text-sm font-medium">
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
          <Link href="/cart" className="relative">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-[--signal] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
