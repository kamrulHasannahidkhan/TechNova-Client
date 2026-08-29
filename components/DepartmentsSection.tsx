import Link from "next/link";
import Image from "next/image";
import { getDepartments, getContentBySection } from "@/lib/api";

export default async function DepartmentsSection() {
  const [departments, content] = await Promise.all([
    getDepartments(),
    getContentBySection("departments-heading"),
  ]);

  const title = content?.title || "Shop electronics in every department";

  if (!departments || departments.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 mb-8 border-b border-[--line]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[--signal] rounded-full" />
          <h2 className="font-display text-xl md:text-2xl font-black text-[--ink] tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {departments.map((d: any) => (
          <Link
            key={d._id}
            href={`/department/${d._id}`}
            className="group relative bg-[--surface-subtle] border border-[--line] rounded-2xl p-4 flex flex-col items-center text-center justify-between transition-all duration-300 hover:shadow-xl hover:border-[--signal]/50 hover:-translate-y-0.5"
          >
            {/* Image Container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-xl bg-[--paper] border border-[--line]/60 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
              {d.image ? (
                <Image
                  src={d.image}
                  alt={d.title || "Department Image"}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 33vw, 16vw"
                />
              ) : (
                <div className="text-[--steel] text-xs font-medium">No Icon</div>
              )}
            </div>

            {/* Department Title */}
            <span className="font-semibold text-xs md:text-sm text-[--ink] group-hover:text-[--signal] transition-colors line-clamp-2 leading-tight">
              {d.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}