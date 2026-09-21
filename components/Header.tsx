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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Brand Logo + Nav Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-sans text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)] hover:opacity-80 transition-opacity shrink-0"
          >
            <span className="text-White-600">Tech</span>
            <span className="text-orange-600">Nova</span>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[var(--ink)]">
           
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
             {/* Departments Dropdown */}
<div
  className="relative"
  onMouseEnter={openDept}
  onMouseLeave={scheduleCloseDept}
>
  <button
    type="button"
    className="flex items-center gap-1.5 hover:text-blue-500 transition-colors whitespace-nowrap text-sm font-semibold py-2"
  >
    <Grid className="w-4 h-4 text-blue-500" />
    <span>Departments</span>
    <ChevronDown className="w-3.5 h-3.5 text-[var(--steel)]" />
  </button>

  {/* Refined Popover Grid */}
  {deptOpen && departments.length > 0 && (
    <div className="absolute left-0 top-full mt-1 min-w-[280px] max-w-[380px] bg-[var(--surface-card)] border border-[var(--line)] rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {departments.map((d: any) => (
          <Link
            key={d._id}
            href={`/department/${d._id}`}
            className="group flex flex-col items-center text-center p-2 rounded-xl hover:bg-[var(--surface-subtle)] transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-[var(--line)] group-hover:border-blue-500 group-hover:scale-105 shadow-sm transition-all duration-200 flex items-center justify-center p-1">
              {d.image ? (
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-xs font-bold text-slate-700">
                  {d.title?.charAt(0)}
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] font-medium text-[var(--ink)] leading-tight group-hover:text-blue-500 transition-colors line-clamp-2">
              {d.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>


          </nav>
        </div>

        {/* Right Section: Compact Search Bar + Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Inline Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative hidden sm:flex items-center w-48 md:w-60 lg:w-64"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-[var(--surface-subtle)] text-[var(--ink)] placeholder:text-[var(--steel)] border border-[var(--line)] rounded-xl px-3.5 py-1.5 pl-9 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <Search className="w-3.5 h-3.5 text-[var(--steel)] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* User Sign In/Up or Account */}
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

          {/* Cart Icon Button */}
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
    </header>
  );
}