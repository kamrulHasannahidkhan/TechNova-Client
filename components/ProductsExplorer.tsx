"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images?: string[];
  createdAt?: string;
  department?: { _id: string; title: string };
};
type Department = { _id: string; title: string };

export default function ProductsExplorer({
  products,
  departments,
}: {
  products: Product[];
  departments: Department[];
}) {
  const highestPrice = useMemo(
    () => Math.max(0, ...products.map((p) => p.price || 0)),
    [products]
  );

  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [deptId, setDeptId] = useState("all");
  const [sort, setSort] = useState("latest");

  const countFor = (id: string) => products.filter((p) => p.department?._id === id).length;

  const visible = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (deptId !== "all") list = list.filter((p) => p.department?._id === deptId);

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else
      list = [...list].sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );

    return list;
  }, [products, maxPrice, deptId, sort]);

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
      {/* Filter sidebar */}
      <aside className="bg-[var(--surface-card)] border border-[var(--line)] rounded-2xl p-5">
        <h2 className="text-center font-semibold text-[var(--ink)] mb-4">Filter by Price</h2>

        <input
          type="range"
          min={0}
          max={highestPrice}
          step={Math.max(1, Math.round(highestPrice / 100))}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-sm font-semibold text-blue-600 mt-1">
          <span>৳0</span>
          <span>৳{maxPrice.toLocaleString()}</span>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--steel)] mt-6 pb-2 border-b border-[var(--line)]">
          Departments
        </h2>
        <ul className="mt-2 space-y-1">
          <li>
            <button
              onClick={() => setDeptId("all")}
              className={`w-full flex justify-between px-2 py-1.5 rounded-lg text-sm transition ${
                deptId === "all"
                  ? "bg-blue-600/10 text-blue-600 font-semibold"
                  : "text-[var(--ink)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              <span>All</span>
              <span className="font-semibold">{products.length}</span>
            </button>
          </li>
          {departments.map((d) => (
            <li key={d._id}>
              <button
                onClick={() => setDeptId(d._id)}
                className={`w-full flex justify-between px-2 py-1.5 rounded-lg text-sm text-left transition ${
                  deptId === d._id
                    ? "bg-blue-600/10 text-blue-600 font-semibold"
                    : "text-[var(--ink)] hover:bg-[var(--surface-subtle)]"
                }`}
              >
                <span>{d.title}</span>
                <span className="font-semibold">{countFor(d._id)}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[var(--steel)]">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-[var(--line)] bg-[var(--surface-card)] text-[var(--ink)] rounded-lg px-3 py-2"
          >
            <option value="latest">Sort by Latest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-20 border border-[var(--line)] rounded-2xl text-[var(--steel)] text-sm">
            No products match these filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {visible.map((p) => {
              const hasDiscount = Boolean(p.originalPrice && p.originalPrice > p.price);
              const pct =
                hasDiscount && p.originalPrice
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : null;

              return (
                <Link
                  key={p._id}
                  href={`/department/${p.department?._id}/${p._id}`}
                  className="group bg-[var(--surface-card)] border border-[var(--line)] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-square bg-white p-3">
                    {pct !== null && (
                      <span className="absolute top-2.5 left-2.5 z-10 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Tag className="w-3 h-3" /> -{pct}%
                      </span>
                    )}
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-[var(--line)] bg-[var(--surface-subtle)] flex-1 flex flex-col justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-[var(--ink)] group-hover:text-blue-500 transition-colors line-clamp-2 min-h-[2.5rem]">
                      {p.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-bold text-sm sm:text-base text-[var(--ink)]">
                        ৳{p.price.toLocaleString()}
                      </span>
                      {hasDiscount && p.originalPrice && (
                        <span className="text-xs text-[var(--steel)] line-through font-mono">
                          ৳{p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
