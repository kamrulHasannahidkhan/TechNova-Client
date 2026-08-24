import { getProduct } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const mainImage = product.images?.[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb Nav */}
      <nav className="flex items-center gap-2 font-mono-spec text-xs text-[--steel] mb-8">
        <Link href="/" className="hover:text-[--ink] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/#electronics" className="hover:text-[--ink] transition">
          Electronics
        </Link>
        <span>/</span>
        <span className="text-[--ink] truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[--line] bg-white/60 shadow-sm">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover ${isOutOfStock ? "grayscale opacity-75" : ""}`}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[--steel] font-mono-spec text-sm">
                NO IMAGE AVAILABLE
              </div>
            )}
          </div>

          {/* Additional Thumbnails Grid */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[--line] bg-white/60 cursor-pointer hover:border-[--signal] transition"
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions (Cols 8-12) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:sticky lg:top-24">
          <div>
            {/* Meta Badges */}
            <div className="flex items-center justify-between font-mono-spec text-xs mb-3">
              <span className="text-[--signal] font-semibold tracking-wider">
                ORIGINAL HARDWARE
              </span>
              
              {isOutOfStock ? (
                <span className="text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full font-medium">
                  SOLD OUT
                </span>
              ) : (
                <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  IN STOCK ({product.stock ?? "Available"})
                </span>
              )}
            </div>

            {/* Title & Price */}
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[--ink] tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 pb-6 border-b border-[--line]/60 flex items-baseline gap-3">
              <span className="font-mono-spec text-3xl font-black text-[--ink]">
                ৳{product.price?.toLocaleString("en-BD")}
              </span>
              <span className="font-mono-spec text-xs text-[--steel]">
                VAT INCLUDED
              </span>
            </div>

            {/* Description */}
            <div className="mt-6 space-y-3">
              <p className="font-mono-spec text-xs text-[--steel] tracking-wider uppercase">
                OVERVIEW
              </p>
              <p className="text-[--steel] leading-relaxed text-base">
                {product.description || "No description provided for this item."}
              </p>
            </div>

            {/* Trust Specs Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 p-4 rounded-xl border border-[--line] bg-white/40 font-mono-spec text-xs">
              <div className="flex items-center gap-2 text-[--ink]">
                <span className="text-[--signal]">✓</span> 48H Express Delivery
              </div>
              <div className="flex items-center gap-2 text-[--ink]">
                <span className="text-[--signal]">✓</span> 7-Day Replacement
              </div>
              <div className="flex items-center gap-2 text-[--ink]">
                <span className="text-[--signal]">✓</span> Genuine Warranty
              </div>
              <div className="flex items-center gap-2 text-[--ink]">
                <span className="text-[--signal]">✓</span> Cash on Delivery
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[--line]/60 text-black">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}