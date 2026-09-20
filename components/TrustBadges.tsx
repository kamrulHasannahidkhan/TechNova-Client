import Image from "next/image";
import { getPerks } from "@/lib/api";
import { ShieldCheck } from "lucide-react";

interface Perk {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
}

export default async function TrustBadges() {
  const perks = await getPerks();
  if (!perks || perks.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {perks.map((p: Perk) => (
          <div
            key={p._id}
            className="group bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 flex flex-col items-center justify-center space-y-3.5"
          >
            {/* Icon Container with Glass Ring & White Frame for Transparent Icons */}
            <div className="relative w-14 h-14 p-3 rounded-2xl bg-white border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md">
              {p.icon ? (
                <Image
                  src={p.icon}
                  alt={p.title || "Perk Icon"}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              ) : (
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-sm md:text-base text-white group-hover:text-blue-400 transition-colors">
                {p.title}
              </h3>
              {p.description && (
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px] mx-auto font-normal">
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