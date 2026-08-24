import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts, getSections } from "@/lib/api";

export default async function HomePage() {
  const [sections, products] = await Promise.all([getSections(), getProducts()]);

  return (
    <>
      <Hero />
      {sections.map((section: any) => {
        const sectionProducts = products.filter(
          (p: any) => p.category?._id === section.category?._id
        );
        return <ProductSection key={section._id} section={section} products={sectionProducts} />;
      })}
    </>
  );
}
