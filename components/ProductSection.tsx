import Link from "next/link";
import Image from "next/image";

export default function ProductSection({ section, products }: { section: any; products: any[] }) {
  return (
    <section id={section.category?.slug || section._id} className="max-w-6xl mx-auto px-6 py-16 border-b border-[--line]">
      <div className="flex justify-between items-baseline mb-2">
        <h2 className="font-display text-3xl font-bold tracking-tight">{section.title}</h2>
        <span className="font-mono-spec text-xs text-[--steel]">{products.length} ITEMS</span>
      </div>
      {section.description && <p className="text-[--steel] mb-6">{section.description}</p>}

      {products.length === 0 ? (
        <p className="text-[--steel] mt-6">
          Nothing listed here yet — add products under this category from the admin panel.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {products.map((p: any, i: number) => (
            <Link
              key={p._id}
              href={`/products/${p._id}`}
              className="group border border-[--line] rounded-xl p-4 hover:border-[--signal] transition bg-white/50"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono-spec text-[10px] text-[--steel]">
                  {String(i + 1).padStart(3, "0")}
                </span>
                {p.stock > 0 ? (
                  <span className="font-mono-spec text-[10px] text-[--signal]">IN STOCK</span>
                ) : (
                  <span className="font-mono-spec text-[10px] text-[--steel]">SOLD OUT</span>
                )}
              </div>
              {p.images?.[0] && (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="font-medium group-hover:text-[--signal] transition">{p.name}</h3>
              <p className="font-mono-spec text-sm text-[--steel] mt-1">৳{p.price}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
