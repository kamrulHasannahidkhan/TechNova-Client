import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import { getDepartmentProducts } from "@/lib/api";
import { ShieldCheck, Zap, ChevronRight, PackageCheck } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id, productId } = await params;
  const products = await getDepartmentProducts(id);
  const product = products.find((p: any) => p._id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Product Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">The item you are looking for might have been moved or removed.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
          <li>
            <Link href={`/department/${id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Department
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
          <li className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Product Card */}
      <div className="bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 grid md:grid-cols-12 gap-8 md:gap-12 items-start shadow-sm dark:shadow-2xl transition-colors">
        
        {/* Left Column: Image Container */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative w-full aspect-square bg-slate-50 dark:bg-[#0a192f] rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex items-center justify-center p-6 group">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="text-slate-400 dark:text-slate-500 text-xs font-medium">No image preview available</div>
            )}
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <PackageCheck className="w-3.5 h-3.5" />
              In Stock &amp; Ready to Ship
            </span>

            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                ৳{product.price?.toLocaleString() || product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 dark:text-slate-500 line-through font-medium">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Overview</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description || "No overview provided for this product."}
              </p>
            </div>
          </div>

          {/* Action Buttons & Value Props */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <AddToCartButton product={product} />
              <BuyNowButton product={product} />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-700/60">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Authentic Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}