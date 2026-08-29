"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, total, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-[--ink] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-md mx-auto border border-dashed border-[--line] rounded-2xl p-10 bg-white/40">
          <div className="w-12 h-12 rounded-full bg-[--line]/40 flex items-center justify-center mx-auto mb-4 text-[--steel]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-[--ink] mb-2">
            Your cart is empty
          </h1>
          <p className="text-[--steel] text-sm mb-6">
            Looks like you haven&apos;t added any hardware or items to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[--ink] text-white text-sm font-medium hover:bg-[--signal] transition-colors shadow-sm"
          >
            Continue Shopping &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const estimatedShipping = 100;
  const grandTotal = total + estimatedShipping;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between border-b border-[--line]/60 pb-6 mb-8">
        <div>
          <span className="font-mono-spec text-xs text-[--signal] tracking-widest uppercase">
            CHECKOUT READY
          </span>
          <h1 className="font-display text-3xl font-extrabold text-[--ink] mt-1">
            Shopping Cart
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="font-mono-spec text-xs text-rose-600 hover:text-rose-700 underline underline-offset-4 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item._id}
                className="flex gap-4 p-4 border border-[--line] rounded-2xl bg-white hover:bg-white backdrop-blur-sm transition-all duration-200"
              >
                <div className="relative aspect-square w-24 shrink-0 rounded-xl overflow-hidden border border-[--line] bg-white">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[--steel] font-mono-spec text-[10px]">
                      NO IMAGE
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 py-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="font-mono-spec text-xs text-gray-500 mt-1">
                        ৳{item.price.toLocaleString("en-BD")} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-1 border border-gray-300 rounded-lg bg-white px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-900 font-bold hover:bg-gray-100 rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-mono-spec text-xs font-semibold w-8 text-center text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-900 font-bold hover:bg-gray-100 rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono-spec font-bold text-gray-900">
                      ৳{itemTotal.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 border border-[--line] rounded-2xl p-6 bg-white backdrop-blur-sm space-y-6 shadow-sm">
          <h2 className="font-mono-spec text-xs font-semibold text-gray-900 tracking-widest uppercase pb-3 border-b border-gray-200">
            Order Summary
          </h2>

          <div className="space-y-3 font-mono-spec text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="text-gray-900 font-medium">৳{total.toLocaleString("en-BD")}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Estimated Shipping</span>
              <span className="text-gray-900 font-medium">৳{estimatedShipping.toLocaleString("en-BD")}</span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between text-sm">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900 text-base">
                ৳{grandTotal.toLocaleString("en-BD")}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[--ink] text-white font-medium text-sm hover:bg-[--signal] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Proceed to Checkout &rarr;
          </Link>

          <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 font-mono-spec text-[11px] text-gray-600 space-y-1.5">
            <div className="flex items-center gap-1.5 text-gray-900 font-semibold">
              <span className="text-[--signal]">✓</span> Guaranteed Delivery
            </div>
            <p className="leading-normal">
              Orders placed before 4:00 PM ship out the same day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
