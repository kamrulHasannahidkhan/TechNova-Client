"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { getDepartments } from "@/lib/api";
import {
  Sparkles,
  Search,
  ShoppingBag,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ChevronDown,
  Grid,
} from "lucide-react";

export default function Header() {
  const { items } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const [query, setQuery] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [deptOpen, setDeptOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  const openDept = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDeptOpen(true);
  };

  const scheduleCloseDept = () => {
    closeTimer.current = setTimeout(() => setDeptOpen(false), 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--paper)] border-b border-[var(--line)] backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-3">
        {/* Top Navbar Bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-sans text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)] hover:opacity-80 transition-opacity shrink-0"
          >
            Tech<span className="text-blue-600">Nova</span>
            <span className="text-blue-600">.</span>
          </Link>

          {/* Search Input (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-md relative"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or departments..."
              className="w-full bg-[var(--surface-subtle)] text-[var(--ink)] placeholder:text-[var(--steel)] border border-[var(--line)] rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <Search className="w-4 h-4 text-[var(--steel)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {session?.user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:text-blue-600 transition-colors px-2 py-1.5 rounded-lg"
                >
                  <User className="w-4 h-4 text-[var(--steel)]" />
                  <span>{session.user.name?.split(" ")[0] || "Account"}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1 text-xs sm:text-sm font-medium text-[var(--steel)] hover:text-rose-500 transition-colors p-1.5 rounded-lg"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:text-blue-600 transition-colors px-3 py-2 rounded-xl"
                >
                  <LogIn className="w-4 h-4 text-[var(--steel)]" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-[var(--ink)] hover:bg-[var(--surface-subtle)] border border-transparent hover:border-[var(--line)] transition-all flex items-center justify-center"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[var(--ink)]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearch} className="flex sm:hidden relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[var(--surface-subtle)] text-[var(--ink)] placeholder:text-[var(--steel)] border border-[var(--line)] rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:border-blue-500 transition"
          />
          <Search className="w-4 h-4 text-[var(--steel)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </form>

        {/* Navigation Link Items */}
        <nav className="flex items-center gap-6 text-sm font-medium text-[var(--ink)] overflow-x-auto pt-1 pb-0.5 border-t border-[var(--line)]/50">
          {/* Hover Department Menu */}
          <div
            className="relative"
            onMouseEnter={openDept}
            onMouseLeave={scheduleCloseDept}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap text-sm font-semibold"
            >
              <Grid className="w-4 h-4 text-blue-600" />
              <span>Departments</span>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--steel)]" />
            </button>

            {deptOpen && departments.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[var(--paper)] border border-[var(--line)] rounded-2xl shadow-xl py-2 z-50 backdrop-blur-lg">
                {departments.map((d: any) => (
                  <Link
                    key={d._id}
                    href={`/department/${d._id}`}
                    className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface-subtle)] hover:text-blue-600 transition-colors"
                  >
                    {d.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/"
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            href="/new-arrivals"
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            New Arrivals
          </Link>
          <Link
            href="/exclusive"
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Exclusive
          </Link>
          <Link
            href="/best-sellers"
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Best Sellers
          </Link>
        </nav>
      </div>
    </header>
  );
}