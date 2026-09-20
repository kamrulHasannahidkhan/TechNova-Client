import Link from "next/link";
import Image from "next/image";
import { getDepartments, getContentBySection } from "@/lib/api";
import { ChevronRight, Grid } from "lucide-react";

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
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/20 !text-blue-400 border border-blue-500/20">
            <Grid className="w-5 h-5" />
          </div>
          <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight !text-white">
            {title}
          </h2>
        </div>

        <Link
          href="/departments"
          className="group flex items-center gap-1 text-xs sm:text-sm font-semibold !text-blue-400 hover:!text-blue-300 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Departments Icon Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
        {departments.map((d: Department) => (
          <Link
            key={d._id}
            href={`/department/${d.slug?.current || d._id}`}
            className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            {/* White card wrapper for clean icon contrast */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl p-2.5 bg-white border border-white/20 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center overflow-hidden">
              {d.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    className="object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-xl flex items-center justify-center !text-slate-700 font-bold text-xl bg-slate-100">
                  {d.title?.charAt(0) || "D"}
                </div>
              )}
            </div>

            {/* Label with forced high contrast */}
            <p className="mt-3 text-xs md:text-sm font-semibold !text-slate-100 group-hover:!text-blue-400 transition-colors line-clamp-2 leading-tight">
              {d.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}