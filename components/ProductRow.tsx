import Link from "next/link";
import Image from "next/image";

export default function ProductRow({ title, id, products }: { title: string; id?: string; products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-[--line]">
      {/* Section Header with Accent Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[--signal] rounded-full" />
          <h2 className="font-display text-xl md:text-2xl font-black text-[--ink] tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p: any) => {
          const deptId = p.department?._id || p.department || "all";

          return (
            <Link
              key={p._id}
              href={`/department/${deptId}/${p._id}`}
              className="group relative bg-[--surface-subtle] border border-[--line] rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[--signal]/50 transition-all duration-300"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden mb-3 flex items-center justify-center border border-[--line]/40">
                  {p.images?.[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="text-[--steel] text-xs font-medium">No Image</div>
                  )}

                  {/* Discount Badge */}
                  {p.discount && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow-sm">
                      -{p.discount}%
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[--ink] text-xs md:text-sm line-clamp-2 leading-snug group-hover:text-[--signal] transition-colors">
                  {p.name}
                </h3>
              </div>

              {/* Price & Navigation Action Footer */}
              <div className="mt-3 pt-2.5 border-t border-[--line] flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-[--steel] uppercase font-bold tracking-wider leading-none">
                    Price
                  </p>
                  <p className="text-sm md:text-base font-extrabold text-[--ink] mt-0.5">
                    ৳{p.price?.toLocaleString() || p.price}
                  </p>
                </div>

                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-[--signal] text-[--steel] group-hover:text-white flex items-center justify-center transition-colors text-xs">
                  ➔
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}