"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock?: number;
  images?: string[];
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Cleanup pending state timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = async () => {
    if (isOutOfStock || isAdding || added) return;

    setIsAdding(true);

    // Tactile feedback delay
    await new Promise((resolve) => setTimeout(resolve, 250));

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });

    setIsAdding(false);
    setAdded(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isOutOfStock || isAdding}
      aria-label={isOutOfStock ? "Product sold out" : `Add ${product.name} to cart`}
      className={`relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--signal] focus-visible:ring-offset-2 select-none shadow-sm ${
        isOutOfStock
          ? "bg-[--surface-subtle] text-[--steel] border border-[--line] cursor-not-allowed opacity-60 shadow-none"
          : added
          ? "bg-emerald-600 text-white shadow-emerald-500/20 shadow-lg scale-[1.01]"
          : "bg-[--ink] text-[--paper] hover:bg-[--signal] hover:shadow-lg hover:shadow-[--signal]/25"
      }`}
    >
      {/* Dynamic Feedback States */}
      {isAdding ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Adding...
        </span>
      ) : added ? (
        <span className="flex items-center gap-2 animate-in zoom-in-95 duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Added to Cart!
        </span>
      ) : isOutOfStock ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Out of Stock
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
          </svg>
          Add to Cart
        </span>
      )}
    </button>
  );
}