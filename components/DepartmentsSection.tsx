import Link from "next/link";
import { getDepartments, getContentBySection } from "@/lib/api";

// className recipe for each of the first 5 "featured" tiles, matching a
// magazine-style asymmetric grid: big left tile, wide top-middle, two small
// middle-bottom tiles, tall right tile.
const FEATURED_LAYOUT = [
  "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-0",
  "md:col-span-2 min-h-[180px]",
  "min-h-[180px]",
  "min-h-[180px]",
  "md:row-span-2 min-h-[280px] md:min-h-0",
];

export default async function DepartmentsSection() {
  const [departments, content] = await Promise.all([
    getDepartments(),
    getContentBySection("departments-heading"),
  ]);

  if (departments.length === 0) return null;

  const title = content?.title || "Shop by Department";
  const featured = departments.slice(0, 5);
  const rest = departments.slice(5);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl font-bold tracking-tight mb-8">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-6">
        {featured.map((d: any, i: number) => (
          <Link
            key={d._id}
            href={`/department/${d._id}`}
            className={`group relative rounded-xl overflow-hidden ${FEATURED_LAYOUT[i] || "min-h-[180px]"}`}
          >
            <img
              src={d.image}
              alt={d.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-white font-display font-bold text-lg leading-snug">{d.title}</p>
              <p className="text-white/80 text-sm mt-1 underline underline-offset-2">Shop All</p>
            </div>
          </Link>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {rest.map((d: any) => (
            <Link
              key={d._id}
              href={`/department/${d._id}`}
              className="group flex flex-col"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-2 font-semibold text-black text-sm">{d.title}</p>
              <p className="text-gray-500 text-xs">Shop All</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
