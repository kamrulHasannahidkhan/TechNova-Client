import Link from "next/link";
import { getContentBySection } from "@/lib/api";

export default async function BottomBanner() {
  const content = await getContentBySection("bottom-banner");
  if (!content?.image) return null;

  const banner = (
    <img
      src={content.image}
      alt={content.title || "Promotion"}
      className="w-full rounded-2xl object-cover"
    />
  );

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      {content.ctaLink ? (
        <Link href={content.ctaLink}>{banner}</Link>
      ) : (
        banner
      )}
    </section>
  );
}
