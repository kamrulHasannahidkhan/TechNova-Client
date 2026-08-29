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
    <section className="max-w-7xl mx-auto px-6 py-10 font-sans">
      {/* Header with full-width light bottom border */}
      <div className="border-b border-gray-200 pb-4 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
      </div>

      {/* Grid matching Best Buy style: minimalist, borderless, centered icon-above-text */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-x-6 gap-y-10">
        {departments.map((d: any) => (
          <Link
            key={d._id}
            href={`/department/${d._id}`}
            className="group flex flex-col items-center text-center transition-opacity hover:opacity-80"
          >
            {/* Minimalist Icon Container */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center">
              {d.image ? (
                <Image
                  src={d.image}
                  alt={d.title || "Department"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs font-semibold">
                  N/A
                </div>
              )}
            </div>

            {/* Department Title */}
            <span className="text-xs md:text-sm font-medium text-gray-900 leading-tight group-hover:underline max-w-[110px]">
              {d.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}