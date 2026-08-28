"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[--paper]/90 backdrop-blur border-b border-[--line]">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          TechNova<span className="text-[--signal]">.</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[--steel]">
          <Link href="/" className="hover:text-[--ink] transition">Home</Link>
        </nav>
        <Link href="/cart" className="relative font-medium text-sm">
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-4 bg-[--signal] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
