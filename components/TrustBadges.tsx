import Image from "next/image";
import { getPerks } from "@/lib/api";

export default async function TrustBadges() {
  const perks = await getPerks();
  if (!perks || perks.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {perks.map((p: any) => (
          <div
            key={p._id}
            className="group bg-[--surface-subtle] border border-[--line] rounded-2xl p-6 text-center transition-all duration-300 hover:border-[--signal]/40 hover:shadow-xl hover:-translate-y-0.5 flex flex-col items-center justify-center space-y-3"
          >
            {/* Icon Wrapper with Dynamic Light Accent Background */}
            {p.icon && (
              <div className="relative w-12 h-12 p-2.5 rounded-2xl bg-[--paper] border border-[--line] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={p.icon}
                  alt={p.title || "Perk Icon"}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Title & Description */}
            <div className="space-y-1">
              <h3 className="font-display font-bold text-sm md:text-base text-[--ink] group-hover:text-[--signal] transition-colors">
                {p.title}
              </h3>
              {p.description && (
                <p className="text-xs text-[--steel] leading-relaxed max-w-[220px] mx-auto">
                  {p.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}