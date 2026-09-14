import Link from "next/link";
import Image from "next/image";

export default function ProductRow({ id, title, products }: { id?: string; title: string; products: any[] }) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-12 border-t border-[--line]">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-[--steel] text-sm mt-1">Discover the latest products added to our collection.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((p: any) => {
          const hasDiscount = p.originalPrice && p.originalPrice > p.price;
          const discountPct = hasDiscount
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : null;

          return (
            <Link
              key={p._id}
              href={`/department/${p.department?._id}/${p._id}`}
              className="group border border-gray-200 rounded-xl bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-white p-4">
                {discountPct !== null && (
                  <span className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                    -{discountPct}%
                  </span>
                )}
                {p.images?.[0] && (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <span className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-bold px-1.5 py-1 rounded leading-tight text-center">
                  6<br />MONTHS
                </span>
              </div>
              <div className="p-3 border-t border-gray-100">
                <h3 className="text-sm text-gray-800 line-clamp-2 leading-snug min-h-[2.5em]">{p.name}</h3>
                <div className="mt-1.5 flex items-baseline gap-2">
                  {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through">৳{p.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="font-bold text-gray-900">৳{p.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
