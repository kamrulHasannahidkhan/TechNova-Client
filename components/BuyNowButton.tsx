"use client";
import { trackPixel } from "@/lib/pixel";
import { useCart } from "@/context/CartContext";
import { logCartAdd } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleClick = () => {
    trackPixel("AddToCart", { content_ids: [product._id], content_name: product.name, value: product.price, currency: "BDT" });
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
    logCartAdd({ productId: product._id, name: product.name, price: product.price, quantity: 1 });
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
