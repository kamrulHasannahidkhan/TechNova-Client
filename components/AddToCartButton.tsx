"use client";

import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
    setAdded(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={added ? "Added to cart" : `Add ${product.name} to cart`}
      className={`mt-6 w-full px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--signal] focus-visible:ring-offset-2 flex items-center justify-center gap-2 shadow-sm ${
        added
          ? "bg-emerald-600 text-white shadow-emerald-500/20"
          : "bg-[--ink] text-[--paper] hover:bg-[--signal] hover:shadow-md"
      }`}
    >
      {added ? (
        <span className="flex items-center gap-2 animate-in zoom-in-95 duration-150">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Added!
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