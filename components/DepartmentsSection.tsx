import Link from "next/link";
import Image from "next/image";
import { getDepartments, getContentBySection } from "@/lib/api";

interface Department {
  _id: string;
  title: string;
  image?: string;
  slug?: { current: string };
}

export default async function DepartmentsSection() {
  const [departments, content] = await Promise.all([
    getDepartments(),
    getContentBySection("departments-heading"),
  ]);

  if (!departments || departments.length === 0) return null;

  const title = content?.title || "Shop by Department";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-line">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
        {departments.map((d: Department) => (
          <Link
            key={d._id}
            href={`/department/${d.slug?.current || d._id}`}
            className="group flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-200 hover:bg-surface-subtle"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-paper border border-line group-hover:border-signal group-hover:shadow-md transition-all duration-300">
              {d.image ? (
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-steel font-bold text-lg bg-line/40">
                  {d.title?.charAt(0) || "D"}
                </div>
              )}
            </div>

            <p className="mt-3 text-xs md:text-sm font-semibold text-ink group-hover:text-signal transition-colors line-clamp-2">
              {d.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}