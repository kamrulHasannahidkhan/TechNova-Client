import Link from "next/link";
import Image from "next/image";
import { getProductsByCategoryName, getContentBySection } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images?: string[];
}

export default async function ElectronicsSection() {
  const products: Product[] = await getProductsByCategoryName("Electronics");
  const content = await getContentBySection("electronics-heading");

  const title = content?.title || "Electronics";
  const description = content?.description;

  return (
    <section id="electronics" className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[--line]/60 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[--signal]" />
            <span className="font-mono-spec text-xs tracking-widest text-[--signal] uppercase">
              CATALOG SELECTION
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[--ink]">
            {title}
          </h2>
          {description && (
            <p className="text-[--steel] text-base mt-2 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <span className="font-mono-spec text-xs font-semibold text-[--steel] bg-[--line]/40 px-3 py-1.5 rounded-full self-start sm:self-auto shrink-0">
          {products.length} {products.length === 1 ? "ITEM" : "ITEMS"} AVAILABLE
        </span>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[--line] rounded-2xl bg-white/40">
          <p className="font-mono-spec text-sm text-[--steel]">
            NO PRODUCTS FOUND IN THIS CATEGORY
          </p>
          <p className="text-xs text-[--steel]/80 mt-1">
            Add items under &quot;Electronics&quot; from your admin panel to list them here.
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => {
            const isOutOfStock = p.stock <= 0;

            return (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                className="group relative flex flex-col justify-between border border-[--line] rounded-2xl p-4 bg-white/60 hover:bg-white backdrop-blur-sm hover:border-[--signal] hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Top Item Meta */}
                  <div className="flex justify-between items-center mb-3 font-mono-spec text-[11px]">
                    <span className="text-[--steel] tracking-wider">
                      EL-{String(i + 1).padStart(3, "0")}
                    </span>
                    
                    {isOutOfStock ? (
                      <span className="text-rose-500 bg-rose-50 px-2 py-0.5 rounded font-medium">
                        SOLD OUT
                      </span>
                    ) : (
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        IN STOCK
                      </span>
                    )}
                  </div>

                  {/* Image Container with Hover Scale */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[--line]/20 mb-4">
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                          isOutOfStock ? "grayscale opacity-60" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-[--steel] font-mono-spec text-xs">
                        NO IMAGE
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <h3 className="font-medium text-[--ink] group-hover:text-[--signal] transition-colors duration-200 line-clamp-1">
                    {p.name}
                  </h3>
                </div>

                {/* Price Footer */}
                <div className="mt-3 pt-3 border-t border-[--line]/50 flex items-center justify-between">
                  <span className="font-mono-spec font-bold text-base text-[--ink]">
                    ৳{p.price.toLocaleString("en-BD")}
                  </span>
                  
                  <span className="text-xs font-mono-spec text-[--signal] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    VIEW &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}