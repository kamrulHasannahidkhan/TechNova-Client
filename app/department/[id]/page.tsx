import Link from "next/link";
import Image from "next/image";
import { getDepartmentProducts, getDepartments } from "@/lib/api";

export default async function DepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [products, departments] = await Promise.all([
    getDepartmentProducts(id),
    getDepartments(),
  ]);

  const department = departments.find((d: any) => d._id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 font-sans">
      {/* Header & Breadcrumb Bar */}
      <div className="mb-8 pb-6 border-b border-[--line]">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-2 text-xs text-[--steel]">
            <li>
              <Link href="/" className="hover:text-[--signal] transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li className="text-[--ink] font-medium truncate">
              {department?.title || "Department"}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-4xl font-black text-[--ink] tracking-tight">
              {department?.title || "Department"}
            </h1>
            {department?.description && (
              <p className="text-xs md:text-sm text-[--steel] mt-1 max-w-2xl">
                {department.description}
              </p>
            )}
          </div>
          <span className="self-start sm:self-auto text-xs font-bold text-[--steel] bg-[--surface-subtle] px-3.5 py-1.5 rounded-full border border-[--line] shadow-sm">
            {products.length} {products.length === 1 ? "Product" : "Products"} Found
          </span>
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-[--surface-subtle] rounded-3xl border border-[--line] shadow-sm">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-3 text-xl">
            📦
          </div>
          <h3 className="text-base font-bold text-[--ink]">No Products Available</h3>
          <p className="text-xs text-[--steel] mt-1">Check back later or browse other departments.</p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p: any) => (
            <Link
              key={p._id}
              href={`/department/${id}/${p._id}`}
              className="group relative bg-[--surface-subtle] border border-[--line] rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[--signal]/50 transition-all duration-300"
            >
              <div>
                {/* Product Image Container */}
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

                  {/* Stock/Discount Badge Overlays */}
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

              {/* Price & Action Footer */}
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
          ))}
        </div>
      )}
    </div>
  );
}