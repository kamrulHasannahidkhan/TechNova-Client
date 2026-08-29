"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button onClick={handleClick} className="mt-6 bg-black text-white px-6 py-3 rounded w-full">
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
