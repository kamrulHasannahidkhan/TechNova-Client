import { Suspense } from "react";
import Hero from "@/components/Hero";
import DepartmentsSection from "@/components/DepartmentsSection";
import ProductRow from "@/components/ProductRow";
import BottomBanner from "@/components/BottomBanner";
import { getProductsByTag } from "@/lib/api";
import TrustBadges from "@/components/TrustBadges";

export const dynamic = "force-dynamic";

// Async wrapper component to stream individual product sections independently
async function ProductRowAsync({
  id,
  title,
  tag,
}: {
  id: string;
  title: string;
  tag: string;
}) {
  const products = await getProductsByTag(tag);
  return <ProductRow id={id} title={title} products={products} />;
}

// Skeleton loader matching ProductRow structure
function ProductRowSkeleton() {
  return (
    <div className="py-8 space-y-4 animate-pulse">
      <div className="h-6 w-48 bg-slate-200 rounded-md" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-slate-100 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DepartmentsSection />

      <Suspense fallback={<ProductRowSkeleton />}>
        <ProductRowAsync id="new-arrivals" title="New Arrivals" tag="new-arrival" />
      </Suspense>

      <Suspense fallback={<ProductRowSkeleton />}>
        <ProductRowAsync id="exclusive" title="Exclusive" tag="exclusive" />
      </Suspense>

      <Suspense fallback={<ProductRowSkeleton />}>
        <ProductRowAsync id="best-sellers" title="Best Sellers" tag="best-seller" />
      </Suspense>
      <TrustBadges />

      <BottomBanner />
    </>
  );
}