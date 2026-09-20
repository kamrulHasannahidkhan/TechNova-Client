import Link from "next/link";
import { getContentBySection } from "@/lib/api";

export default async function BottomBanner() {
  const content = await getContentBySection("bottom-banner");
  if (!content?.image) return null;

  const banner = (
    <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden">
      <img
        src={content.image}
        alt={content.title || "Promotion"}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      {content.ctaLink ? <Link href={content.ctaLink}>{banner}</Link> : banner}
    </section>
  );
}
