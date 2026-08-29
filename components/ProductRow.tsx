import Link from "next/link";
import Image from "next/image";

export default function ProductRow({ title, id, products }: { title: string; id?: string; products: any[] }) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-12 border-t border-[--line]">
      <h2 className="font-display text-2xl font-bold tracking-tight mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <Link
            key={p._id}
            href={`/department/${p.department?._id}/${p._id}`}
            className="border border-[--line] rounded-xl p-4 hover:border-[--signal] transition"
          >
            {p.images?.[0] && (
              <Image src={p.images[0]} alt={p.name} width={300} height={300} className="w-full h-36 object-cover rounded-lg mb-3" />
            )}
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-[--steel] mt-1">৳{p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
