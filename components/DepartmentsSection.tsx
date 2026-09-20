import Link from "next/link";
import { getDepartments, getContentBySection } from "@/lib/api";

export default async function DepartmentsSection() {
  const [departments, content] = await Promise.all([
    getDepartments(),
    getContentBySection("departments-heading"),
  ]);

  if (departments.length === 0) return null;

  const title = content?.title || "Shop by Department";

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl font-bold tracking-tight mb-8">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
        {departments.map((d: any) => (
          <Link
            key={d._id}
            href={`/department/${d._id}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-[--signal] transition">
              <img
                src={d.image}
                alt={d.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-xs md:text-sm font-medium text-black group-hover:text-[--signal] transition line-clamp-2">
              {d.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
