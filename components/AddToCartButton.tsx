"use client";
import { trackPixel } from "@/lib/pixel";
import { useCart } from "@/context/CartContext";
import { logCartAdd } from "@/lib/api";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    trackPixel("AddToCart", { content_ids: [product._id], content_name: product.name, value: product.price, currency: "BDT" });
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
    logCartAdd({ productId: product._id, name: product.name, price: product.price, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition"
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
