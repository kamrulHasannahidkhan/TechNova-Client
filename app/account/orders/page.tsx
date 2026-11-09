import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PackageCheck } from "lucide-react";

export const dynamic = "force-dynamic";

const STEPS = [
  { key: "waiting", label: "Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "On Process" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const BADGES: Record<string, { label: string; cls: string }> = {
  waiting: { label: "Waiting", cls: "bg-slate-500/10 text-slate-600 dark:text-slate-300" },
  confirmed: { label: "Confirmed", cls: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  processing: { label: "On Process", cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  shipped: { label: "Shipped", cls: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  delivered: { label: "Delivered", cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  cancelled: { label: "Cancelled", cls: "bg-red-500/10 text-red-600 dark:text-red-400" },
  refunded: { label: "Refunded", cls: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  failed: { label: "Failed", cls: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
};

async function getMyOrders(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/orders/mine?email=${encodeURIComponent(email)}`,
      { headers: { "x-api-key": process.env.INTERNAL_API_KEY || "" }, cache: "no-store" }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function MyOrdersPage() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const orders = await getMyOrders(email);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">My Orders</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Track the status of your orders.</p>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-3xl">
          <PackageCheck className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <p className="font-semibold text-slate-900 dark:text-slate-100">No orders yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">Orders you place while signed in will show up here.</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((o: any) => {
            const status = o.orderStatus || "waiting";
            const badge = BADGES[status] || BADGES.waiting;
            const idx = STEPS.findIndex((s) => s.key === status);
            const date = new Date(o.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={o._id}
                className="bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm dark:shadow-2xl"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{o.orderNumber || "Order"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{date}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                </div>

                {idx !== -1 && (
                  <div className="flex items-start mt-6">
                    {STEPS.map((s, i) => (
                      <div key={s.key} className="flex-1 flex flex-col items-center">
                        <div className="flex items-center w-full">
                          <div className={`flex-1 h-0.5 ${i === 0 ? "opacity-0" : i <= idx ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`} />
                          <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${i <= idx ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`} />
                          <div className={`flex-1 h-0.5 ${i === STEPS.length - 1 ? "opacity-0" : i < idx ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`} />
                        </div>
                        <span
                          className={`mt-1.5 text-[10px] sm:text-xs text-center ${
                            i <= idx ? "text-slate-900 dark:text-slate-100 font-semibold" : "text-slate-400"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1.5">
                  {o.items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">
                        {item.name} <span className="text-slate-400">× {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                    <span>Total (with delivery)</span>
                    <span>৳{Number(o.total || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
