import Link from "next/link";
import Image from "next/image";

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
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 border-t border-line">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
            {title}
          </h2>
          <p className="text-steel text-sm mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
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
              className="group surface-card overflow-hidden hover:-translate-y-1 hover:border-steel/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square bg-white p-4 overflow-hidden rounded-t-2xl">
                {/* Discount Badge */}
                {discountPct !== null && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-accent-gold text-slate-950 text-xs font-display font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                    -{discountPct}%
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
                  <div className="w-full h-full bg-paper flex items-center justify-center text-steel/50 text-xs">
                    No Image
                  </div>
                )}

                {/* Warranty Badge (Dynamic or Standard) */}
                <span className="absolute bottom-2.5 right-2.5 bg-surface-dark text-white text-[9px] font-mono-spec font-bold px-1.5 py-1 rounded-md leading-tight text-center uppercase tracking-wider shadow-md">
                  {p.warranty ? p.warranty : <>6<br />MONTHS</>}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 border-t border-line/60 bg-surface-subtle flex-1 flex flex-col justify-between">
                <h3 className="text-xs sm:text-sm font-medium text-ink group-hover:text-signal transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                  {p.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display font-bold text-sm sm:text-base text-ink">
                    ৳{p.price.toLocaleString()}
                  </span>
                  {hasDiscount && p.originalPrice && (
                    <span className="text-xs text-steel line-through font-mono-spec">
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