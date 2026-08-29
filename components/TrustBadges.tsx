import { getPerks } from "@/lib/api";

export default async function TrustBadges() {
  const perks = await getPerks();
  if (perks.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {perks.map((p: any) => (
          <div key={p._id} className="bg-white border border-[--line] rounded-xl p-6 text-center">
            <img src={p.icon} alt="" className="w-10 h-10 mx-auto mb-3 object-contain" />
            <h3 className="font-semibold text-[--ink] mb-1">{p.title}</h3>
            <p className="text-sm text-[--steel]">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
