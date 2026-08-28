import Link from "next/link";
import { getDepartments, getContentBySection } from "@/lib/api";

export default async function DepartmentsSection() {
  const [departments, content] = await Promise.all([
    getDepartments(),
    getContentBySection("departments-heading"),
  ]);

  const title = content?.title || "Shop electronics in every department";

  if (departments.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl font-bold tracking-tight border-b border-[--line] pb-4 mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-y-8 gap-x-4">
        {departments.map((d: any) => (
          <Link
            key={d._id}
            href={`/department/${d._id}`}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img src={d.image} alt={d.title} className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-sm font-medium text-[--ink] group-hover:text-[--signal] transition">
              {d.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
