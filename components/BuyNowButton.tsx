"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleClick = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
    >
      Buy Now
    </button>
  );
}
