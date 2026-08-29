import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getDepartmentProducts } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id, productId } = await params;
  const products = await getDepartmentProducts(id);
  const product = products.find((p: any) => p._id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
          🔍
        </div>
        <h2 className="text-xl font-bold text-[--ink]">Product Not Found</h2>
        <p className="text-sm text-[--steel] mt-1">The item you are looking for might have been moved or removed.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2.5 rounded-full bg-[--signal] text-white text-sm font-semibold hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 font-sans">
      {/* Dynamic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs text-[--steel]">
          <li>
            <Link href="/" className="hover:text-[--signal] transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/department/${id}`} className="hover:text-[--signal] transition-colors">Department</Link>
          </li>
          <li>/</li>
          <li className="text-[--ink] font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</li>
        </ol>
      </nav>

      {/* Main Grid Card Container */}
      <div className="bg-[--surface-subtle] border border-[--line] rounded-3xl p-6 md:p-10 shadow-sm grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Gallery / Image Section */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-[--line] overflow-hidden flex items-center justify-center p-6 group">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="text-[--steel] text-xs">No image preview available</div>
            )}
            
            {product.discount && (
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Strip (if multiple images exist) */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} className="relative w-20 h-20 bg-slate-50 dark:bg-slate-900/50 border border-[--line] rounded-xl flex-shrink-0 overflow-hidden cursor-pointer hover:border-[--signal] transition">
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-contain p-1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[--signal] bg-[--signal]/10 px-3 py-1 rounded-full">
              In Stock & Ready to Ship
            </span>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[--ink] leading-tight">
              {product.name}
            </h1>

            {/* Pricing Tag */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl md:text-4xl font-extrabold text-[--ink]">
                ৳{product.price?.toLocaleString() || product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[--steel] line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <hr className="border-[--line]" />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[--steel]">Overview</h3>
              <p className="text-sm md:text-base text-[--steel] leading-relaxed">
                {product.description || "No overview provided for this product."}
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="space-y-4 pt-4 border-t border-[--line]">
            <AddToCartButton product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-[--line]">
                <span className="text-lg">⚡</span>
                <span className="text-xs font-semibold text-[--ink]">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-[--line]">
                <span className="text-lg">🛡️</span>
                <span className="text-xs font-semibold text-[--ink]">Authentic Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}