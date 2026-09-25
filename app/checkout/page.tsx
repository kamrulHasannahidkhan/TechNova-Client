"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { submitOrder } from "@/lib/api";
import {
  CheckCircle2,
  Truck,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

const SHIPPING_OPTIONS = [
  { key: "inside", label: "Inside Dhaka City", price: 70 },
  { key: "outside", label: "Outside Dhaka", price: 130 },
];

const DIVISIONS = [
  "Barishal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];

const DISTRICTS_64 = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria",
  "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhamrai", "Dinajpur",
  "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur",
  "Jeshore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj",
  "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj",
  "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj",
  "Narsingdi", "Natore", "Nawabganj", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

type SavedAddress = {
  _id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  district: string;
};

export default function CheckoutPage() {
  const { items, total, clearCart, isHydrated } = useCart();
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    division: "",
    district: "",
    address: "",
    notes: "",
  });
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [shipping, setShipping] = useState("inside");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm((f) => ({ ...f, email: user.email || "" }));

    fetch("/api/account/addresses-list")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data)) setSavedAddresses(data);
      })
      .catch(() => {});
  }, [user]);

  const useAddress = (addr: SavedAddress) => {
    setForm((f) => ({
      ...f,
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      district: addr.district,
    }));
    setSelectedAddressId(addr._id);
  };

  if (!isHydrated) return null;

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-blue-500/20">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Your cart is empty
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Add something to your cart before checking out.
        </p>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95 text-sm"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const shippingCost = SHIPPING_OPTIONS.find((s) => s.key === shipping)?.price ?? 0;
  const grandTotal = total + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    try {
      await submitOrder({
        items: items.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          division: form.division,
          district: form.district,
          address: form.address,
          notes: form.notes,
        },
        shippingOption: SHIPPING_OPTIONS.find((s) => s.key === shipping)?.label,
        shippingCost,
        subtotal: total,
        total: grandTotal,
      });
      setPlaced(true);
      clearCart();
    } catch {
      alert("Something went wrong placing your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          Thanks, <span className="font-semibold text-slate-900 dark:text-slate-200">{form.fullName || "friend"}</span> — we&apos;ll call{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-200">{form.phone || "you"}</span> soon to confirm your order details.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95 text-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Cash on delivery notice banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 mb-8 flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold">
        <Truck className="w-4 h-4 shrink-0" />
        <span>Cash on Delivery is available across all 64 districts of Bangladesh</span>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer & Shipping Details */}
        <div className="lg:col-span-7 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-slate-100">
              Shipping & Customer Details
            </h2>
          </div>

          {user && savedAddresses.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Saved Addresses
              </p>
              <div className="grid gap-2">
                {savedAddresses.map((addr) => (
                  <button
                    key={addr._id}
                    type="button"
                    onClick={() => useAddress(addr)}
                    className={`text-left border rounded-xl p-3 text-xs sm:text-sm transition-all ${
                      selectedAddressId === addr._id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500"
                        : "border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-[#0a192f]/50 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-slate-900 dark:text-white mr-1.5">{addr.label}:</span>
                    {addr.fullName}, {addr.address}, {addr.district}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400">Or enter a new shipping address below:</p>
              <hr className="border-slate-200 dark:border-slate-800" />
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                required
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                value={form.fullName}
                onChange={(e) => {
                  setForm({ ...form, fullName: e.target.value });
                  setSelectedAddressId(null);
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Mobile Phone *
              </label>
              <input
                required
                placeholder="01XXXXXXXXX"
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  setSelectedAddressId(null);
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address *
              </label>
              <input
                required
                type="email"
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

          {/*  <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Division *
              </label>
              <select
                required
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                value={form.division}
                onChange={(e) => {
                  setForm({ ...form, division: e.target.value });
                  setSelectedAddressId(null);
                }}
              >
                <option value="">Select Division</option>
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>*/}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                District *
              </label>
              <select
                required
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                value={form.district}
                onChange={(e) => {
                  setForm({ ...form, district: e.target.value });
                  setSelectedAddressId(null);
                }}
              >
                <option value="">Select District</option>
                {DISTRICTS_64.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Delivery Address *
              </label>
              <input
                required
                placeholder="House, Road, Area, Thana/Upazila"
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                value={form.address}
                onChange={(e) => {
                  setForm({ ...form, address: e.target.value });
                  setSelectedAddressId(null);
                }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Order Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Notes about your order, e.g. special instructions for delivery."
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition resize-none"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Review */}
        <div className="lg:col-span-5 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 sticky top-6 shadow-sm dark:shadow-2xl">
          <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-xs sm:text-sm items-center">
                <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                  {item.name} <span className="text-slate-400 dark:text-slate-500 font-medium">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                ৳{total.toLocaleString()}
              </span>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Shipping Location
              </span>
              <div className="space-y-2">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      shipping === opt.key
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-slate-100"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shipping === opt.key}
                        onChange={() => setShipping(opt.key)}
                        className="accent-blue-600"
                      />
                      {opt.label}
                    </span>
                    <span className="text-xs font-bold">৳{opt.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 pt-4">
            <span>Total Amount</span>
            <span className="text-xl text-blue-600 dark:text-blue-400">
              ৳{grandTotal.toLocaleString()}
            </span>
          </div>

          {/* Payment Method Badge */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Cash on Delivery</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pay with cash when your product arrives at your doorstep.
            </p>
          </div>

          <button
            type="submit"
            disabled={placing}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 text-sm tracking-wide"
          >
            {placing ? "Placing Order..." : "PLACE ORDER NOW"}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure 256-bit Encrypted Checkout</span>
          </div>
        </div>
      </form>
    </div>
  );
}