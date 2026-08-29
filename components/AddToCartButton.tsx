"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isHydrated,
  } = useCart();

  const shippingCost = items.length > 0 ? 100 : 0;
  const grandTotal = total + shippingCost;

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-[--steel]">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-sans">
      {/* Header */}
      <div className="flex items-end justify-between pb-6 mb-8 border-b border-[--line]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[--signal]">
            Checkout Ready
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-[--ink] mt-1">
            Shopping Cart ({itemCount})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 underline underline-offset-4 transition"
          >
            Clear All Items
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[--surface-subtle] border border-[--line] rounded-3xl space-y-4">
          <div className="text-4xl">🛒</div>
          <h2 className="text-lg font-bold text-[--ink]">Your cart is empty</h2>
          <p className="text-xs text-[--steel]">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-full bg-[--signal] text-white text-xs font-bold hover:opacity-90 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Product List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-[--surface-subtle] border border-[--line] rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center justify-between shadow-sm transition-all hover:border-[--line]"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 dark:bg-slate-900 border border-[--line] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-[10px] text-[--steel]">No image</span>
                  )}
                </div>

                {/* Details & Controls */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-[--ink] truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-[--steel] hover:text-rose-500 p-1 transition"
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-[--steel]">
                    ৳{item.price.toLocaleString()} each
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="inline-flex items-center border border-[--line] rounded-lg bg-[--paper] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1 text-sm font-bold text-[--steel] hover:text-[--ink] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-extrabold text-[--ink]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 text-sm font-bold text-[--steel] hover:text-[--ink] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal Item Price */}
                <div className="text-right flex-shrink-0 self-center">
                  <span className="text-base sm:text-lg font-black text-[--ink]">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-4 bg-[--surface-subtle] border border-[--line] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-6">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[--steel] border-b border-[--line] pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[--steel]">
                <span>Subtotal</span>
                <span className="font-bold text-[--ink]">৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[--steel]">
                <span>Estimated Shipping</span>
                <span className="font-bold text-[--ink]">৳{shippingCost}</span>
              </div>
            </div>

            <div className="border-t border-[--line] pt-4 flex justify-between items-baseline">
              <span className="text-base font-bold text-[--ink]">Total</span>
              <span className="text-2xl font-black text-[--ink]">
                ৳{grandTotal.toLocaleString()}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[--signal] text-white font-bold text-sm hover:opacity-95 transition shadow-md active:scale-[0.98]"
            >
              Proceed to Checkout →
            </Link>

            {/* Guaranteed Delivery Notice */}
            <div className="p-4 rounded-xl bg-[--paper] border border-[--line] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>✓</span> Guaranteed Delivery
              </div>
              <p className="text-[11px] text-[--steel] leading-tight">
                Orders placed before 4:00 PM ship out the same day.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}