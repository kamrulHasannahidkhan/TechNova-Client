import Link from "next/link";
import Image from "next/image";
import { Sparkles, Tag } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images?: string[];
  warranty?: string;
  department?: {
    _id: string;
  };
}

interface ProductRowProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductRow({
  id,
  title,
  subtitle = "Discover the latest products added to our collection.",
  products,
}: ProductRowProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 border-t border-[var(--line)]"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)]">
              {title}
            </h2>
          </div>
          <p className="text-[var(--steel)] text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
        {products.map((p) => {
          const hasDiscount = Boolean(p.originalPrice && p.originalPrice > p.price);
          const discountPct =
            hasDiscount && p.originalPrice
              ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
              : null;

          const productHref = p.department?._id
            ? `/department/${p.department._id}/${p._id}`
            : `/product/${p._id}`;

          return (
            <Link
              key={p._id}
              href={productHref}
              className="group bg-[var(--surface-card)] border border-[var(--line)] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square bg-white p-3 overflow-hidden rounded-t-2xl flex items-center justify-center">
                {/* Discount Badge */}
                {discountPct !== null && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    <Tag className="w-3 h-3" /> -{discountPct}%
                  </span>
                )}

                {/* Product Image */}
                {p.images?.[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
                    No Image
                  </div>
                )}

                {/* Warranty Badge */}
                <span className="absolute bottom-2.5 right-2.5 bg-slate-900 text-amber-400 border border-amber-400/20 text-[9px] font-mono font-bold px-1.5 py-1 rounded-md leading-tight text-center uppercase tracking-wider shadow-md">
                  {p.warranty ? p.warranty : <>6<br />MONTHS</>}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 border-t border-[var(--line)] bg-[var(--surface-subtle)] flex-1 flex flex-col justify-between">
                <h3 className="text-xs sm:text-sm font-medium text-[var(--ink)] group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                  {p.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-sans font-bold text-sm sm:text-base text-[var(--ink)]">
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
    </section>
  );
}