import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { getDepartmentProducts } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id, productId } = await params;
  const products = await getDepartmentProducts(id);
  const product = products.find((p: any) => p._id === productId);

  if (!product) {
    return <div className="p-8">Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      {product.images?.[0] && (
        <Image src={product.images[0]} alt={product.name} width={500} height={500} className="rounded" />
      )}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl mt-2">৳{product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
