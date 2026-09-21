import Link from "next/link";
import Image from "next/image";
import { searchProducts, getDepartments } from "@/lib/api";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || "").trim();

  if (!query) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center text-[--steel]">
        Type something in the search bar to find products or departments.
      </div>
    );
  }

  const [products, allDepartments] = await Promise.all([
    searchProducts(query),
    getDepartments(),
  ]);

  const matchedDepartments = allDepartments.filter((d: any) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl font-bold mb-1">Search results for &quot;{query}&quot;</h1>
      <p className="text-sm text-[--steel] mb-8">
        {products.length} product{products.length !== 1 ? "s" : ""}, {matchedDepartments.length} department{matchedDepartments.length !== 1 ? "s" : ""}
      </p>

      {matchedDepartments.length > 0 && (
        <div className="mb-10">
          <h2 className="font-semibold text-lg mb-3">Departments</h2>
          <div className="flex flex-wrap gap-3">
            {matchedDepartments.map((d: any) => (
              <Link
                key={d._id}
                href={`/department/${d._id}`}
                className="flex items-center gap-2 border border-[--line] rounded-full px-4 py-2 text-sm hover:border-[--signal] transition"
              >
                <img src={d.image} alt="" className="w-6 h-6 rounded-full object-cover" />
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-semibold text-lg mb-3">Products</h2>
      {products.length === 0 ? (
        <p className="text-sm text-[--steel]">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {products.map((p: any) => (
            <Link
              key={p._id}
              href={`/department/${p.department?._id}/${p._id}`}
              className="border border-[--line] rounded-xl bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-white p-4">
                {p.images?.[0] && (
                  <Image src={p.images[0]} alt={p.name} fill className="object-contain p-2" />
                )}
              </div>
              <div className="p-3 border-t border-gray-100">
                <h3 className="text-sm text-gray-800 line-clamp-2">{p.name}</h3>
                <p className="font-bold text-gray-900 mt-1">৳{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
