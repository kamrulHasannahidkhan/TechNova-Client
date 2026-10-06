"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { getDepartments, searchProducts } from "@/lib/api";
import {
  Sparkles,
  Search,
  ShoppingBag,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Grid,
  MoreVertical,
  X,
} from "lucide-react";

export default function Header() {
  const { items } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const [query, setQuery] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [deptOpen, setDeptOpen] = useState(false);
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setSuggestOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await searchProducts(query.trim());
      setSuggestions(results.slice(0, 6));
      setSuggestOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSuggestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
      setSuggestOpen(false);
      setMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a192f] border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
        
        {/* Left Side: Empty spacer on mobile to keep TechNova centered / Desktop Nav items */}
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="lg:hidden w-10 h-10" />

          {/* Desktop Brand Logo */}
          <Link
            href="/"
            className="hidden lg:flex font-sans text-2xl font-black tracking-tight text-white hover:opacity-80 transition-opacity shrink-0 items-center"
          >
            <span className="text-white">Tech</span>
            <span className="text-orange-500">Nova</span>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
            <Link
              href="/"
              className="hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/new-arrivals"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              New Arrivals
            </Link>
            <Link
              href="/exclusive"
              className="hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              Exclusive
            </Link>
            <Link
              href="/best-sellers"
              className="hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              Best Sellers
            </Link>

            {/* Desktop Departments Dropdown */}
            <div
              className="relative"
              onMouseEnter={openDept}
              onMouseLeave={scheduleCloseDept}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors whitespace-nowrap text-sm font-semibold py-2"
              >
                <Grid className="w-4 h-4 text-blue-500" />
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {deptOpen && departments.length > 0 && (
                <div className="absolute left-0 top-full mt-1 min-w-[280px] max-w-[380px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {departments.map((d: any) => (
                      <Link
                        key={d._id}
                        href={`/department/${d._id}`}
                        className="group flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-800/60 transition-all duration-200"
                      >
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-slate-700 group-hover:border-blue-500 group-hover:scale-105 shadow-sm transition-all duration-200 flex items-center justify-center p-1">
                          {d.image ? (
                            <img
                              src={d.image}
                              alt={d.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-bold text-slate-800">
                              {d.title?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[11px] font-medium text-slate-200 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
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

        {/* Center: Mobile Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:hidden flex items-center">
          <Link
            href="/"
            className="font-sans text-xl font-black tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            <span className="text-white">Tech</span>
            <span className="text-orange-500">Nova</span>
          </Link>
        </div>

        {/* Right Side: 3-Dots Button on Mobile / Full Actions on Desktop */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Modified 3-Dots Button (Mobile/Tablet Right Side) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 active:scale-95 transition-all duration-200 shadow-sm"
            aria-label="Toggle options menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-orange-500" />
            ) : (
              <MoreVertical className="w-5 h-5 text-slate-200" />
            )}
          </button>

          {/* Desktop Right Actions (Search + Auth + Cart) */}
          <div className="hidden lg:flex items-center gap-3">
            <div ref={searchBoxRef} className="relative w-48 md:w-60 lg:w-64">
              <form onSubmit={handleSearch} className="relative flex items-center w-full">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setSuggestOpen(true)}
                  placeholder="Search..."
                  className="w-full bg-slate-900/90 text-slate-100 placeholder:text-slate-500 border border-slate-800 rounded-xl px-3.5 py-1.5 pl-9 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </form>

              {suggestOpen && suggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-1 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl max-h-80 overflow-y-auto">
                  {suggestions.map((p: any) => (
                    <Link
                      key={p._id}
                      href={`/department/${p.department?._id}/${p._id}`}
                      onClick={() => setSuggestOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800/60 transition-colors"
                    >
                      {p.images?.[0] && (
                        <img src={p.images[0]} alt="" className="w-9 h-9 object-contain rounded bg-white border border-slate-700 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm text-slate-200 truncate">{p.name}</p>
                        <p className="text-xs text-slate-400">৳{p.price?.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={(e) => { e.preventDefault(); handleSearch(e); }}
                    className="w-full text-left px-3 py-2 text-sm text-blue-400 font-medium hover:bg-slate-800/60 transition-colors border-t border-slate-800 mt-1"
                  >
                    See all results for &quot;{query}&quot;
                  </button>
                </div>
              )}
            </div>

            {session?.user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors px-2 py-1.5 rounded-lg"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{session.user.name?.split(" ")[0] || "Account"}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-100 transition-colors"
              >
                <LogIn className="w-3 h-3" />
                <span>Login</span>
              </Link>
            )}

            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all flex items-center justify-center"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-200" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {count}
                </span>
              )}
            </Link>
          </div>

        </div>

      </div>

      {/* Mobile Drawer (Menu) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Search Bar inside Drawer */}
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-950 text-slate-100 placeholder:text-slate-500 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-200 border-t border-slate-800/80 pt-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-400 transition-colors py-1"
            >
              Home
            </Link>
            <Link
              href="/new-arrivals"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors py-1"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              New Arrivals
            </Link>
            <Link
              href="/exclusive"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-400 transition-colors py-1"
            >
              Exclusive
            </Link>
            <Link
              href="/best-sellers"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-400 transition-colors py-1"
            >
              Best Sellers
            </Link>

            {/* Accordion Departments */}
            <div>
              <button
                type="button"
                onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
                className="flex items-center justify-between w-full text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Grid className="w-4 h-4 text-blue-500" />
                  Departments
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDeptOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileDeptOpen && departments.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2 pl-4 border-l border-slate-800">
                  {departments.map((d: any) => (
                    <Link
                      key={d._id}
                      href={`/department/${d._id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-1.5 text-xs text-slate-300 hover:text-blue-400 rounded-lg hover:bg-slate-800/50"
                    >
                      {d.image && (
                        <img src={d.image} alt="" className="w-6 h-6 object-contain rounded bg-white p-0.5" />
                      )}
                      <span className="truncate">{d.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* User Account & Cart inside Drawer */}
          <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{session.user.name?.split(" ")[0] || "Account"}</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-xl shadow-md transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({count})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}