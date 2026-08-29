import Link from "next/link";
import { getDepartments, getContentBySection } from "@/lib/api";

// Always-safe min-height per featured tile so it never collapses,
// regardless of how many siblings exist.
const FEATURED_LAYOUT = [
  "md:col-span-2 md:row-span-2 min-h-[280px]",
  "md:col-span-2 min-h-[180px]",
  "min-h-[180px]",
  "min-h-[180px]",
  "md:row-span-2 min-h-[280px]",
];

function DeptTile({ d, className }: { d: any; className: string }) {
  return (
    <Link
      href={`/department/${d._id}`}
      className={`group relative rounded-xl overflow-hidden ${className}`}
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
  );
}

export default async function DepartmentsSection() {
  const [departments, content] = await Promise.all([
    getDepartments(),
    getContentBySection("departments-heading"),
  ]);

  if (departments.length === 0) return null;

  const title = content?.title || "Shop by Department";

  // The asymmetric magazine layout only makes visual sense with enough
  // tiles to fill it — otherwise fall back to a simple uniform grid.
  if (departments.length >= 5) {
    const featured = departments.slice(0, 5);
    const rest = departments.slice(5);

    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-8">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[140px] gap-4 mb-6">
          {featured.map((d: any, i: number) => (
            <DeptTile key={d._id} d={d} className={FEATURED_LAYOUT[i]} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {rest.map((d: any) => (
              <Link key={d._id} href={`/department/${d._id}`} className="group flex flex-col">
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

  // Fewer than 5 departments: simple, always-safe grid.
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl font-bold tracking-tight mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((d: any) => (
          <DeptTile key={d._id} d={d} className="min-h-[240px]" />
        ))}
      </div>
    </section>
  );
}
