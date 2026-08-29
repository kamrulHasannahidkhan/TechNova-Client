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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-sans">
      {/* Header & Breadcrumb Bar */}
      <div className="mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{department?.title || "Department"}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {department?.title || "Department"}
          </h1>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {products.length} Products Found
          </span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">No products available in this department yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p: any) => (
            <Link
              key={p._id}
              href={`/department/${id}/${p._id}`}
              className="group relative bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:border-blue-500/40 transition-all duration-300"
            >
              <div>
                {/* Product Image Container */}
                <div className="relative w-full h-40 bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                  {p.images?.[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="text-slate-300 text-xs font-medium">No Image</div>
                  )}

                  {/* Stock/Discount Badge Overlays */}
                  {p.discount && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow-sm">
                      -{p.discount}%
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-800 text-xs md:text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {p.name}
                </h3>
              </div>

              {/* Price & Action Footer */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold text-[9px] tracking-wider leading-none">Price</p>
                  <p className="text-sm md:text-base font-extrabold text-slate-900 mt-0.5">
                    ৳{p.price?.toLocaleString() || p.price}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-600 group-hover:text-white flex items-center justify-center transition-colors">
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