import Hero from "@/components/Hero";
import DepartmentsSection from "@/components/DepartmentsSection";
import ProductRow from "@/components/ProductRow";
import { getProductsByTag } from "@/lib/api";

export default async function HomePage() {
  const [newArrivals, exclusive, bestSellers] = await Promise.all([
    getProductsByTag("new-arrival"),
    getProductsByTag("exclusive"),
    getProductsByTag("best-seller"),
  ]);

  return (
    <>
      <Hero />
      <DepartmentsSection />
      <ProductRow id="new-arrivals" title="New Arrivals" products={newArrivals} />
      <ProductRow id="exclusive" title="Exclusive" products={exclusive} />
      <ProductRow id="best-sellers" title="Best Sellers" products={bestSellers} />
    </>
  );
}
