import { getContentBySection } from "@/lib/api";

export default async function Footer() {
  const content = await getContentBySection("footer");
  const tagline = content?.description || "Checked, boxed, tested — before it ships.";

  return (
    <footer className="border-t border-[--line] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="font-display font-bold text-lg mb-3">TechNova<span className="text-[--signal]">.</span></p>
          <p className="text-sm text-[--steel]">{tagline}</p>
        </div>
        <div>
          <p className="font-mono-spec text-xs text-[--steel] mb-3">SHOP</p>
          <ul className="text-sm flex flex-col gap-2">
            <li><a href="/cart" className="hover:text-[--signal]">Cart</a></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-spec text-xs text-[--steel] mb-3">SUPPORT</p>
          <ul className="text-sm flex flex-col gap-2">
            <li><a href="#" className="hover:text-[--signal]">Returns</a></li>
            <li><a href="#" className="hover:text-[--signal]">Warranty</a></li>
            <li><a href="#" className="hover:text-[--signal]">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-spec text-xs text-[--steel] mb-3">PAY WITH</p>
          <p className="text-sm text-[--steel]">bKash · Nagad · Rocket · SSLCommerz</p>
        </div>
      </div>
      <div className="border-t border-[--line] py-4 text-center font-mono-spec text-xs text-[--steel]">
        © {new Date().getFullYear()} TechNova. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
