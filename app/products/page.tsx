import { getDepartments } from "@/lib/api";
import ProductsExplorer from "@/components/ProductsExplorer";

export const dynamic = "force-dynamic";

async function getAllProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function AllProductsPage() {
  const [products, departments] = await Promise.all([getAllProducts(), getDepartments()]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] mb-6">
        All Products
      </h1>
      <ProductsExplorer products={products} departments={departments} />
    </div>
  );
}
