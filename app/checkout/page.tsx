"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { submitOrder } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

const SHIPPING_OPTIONS = [
  { key: "inside", label: "Inside Dhaka City", price: 70 },
  { key: "outside", label: "Outside Dhaka", price: 130 },
  { key: "free", label: "Free Delivery", price: 0 },
];

type SavedAddress = { _id: string; label: string; fullName: string; phone: string; address: string; district: string };

export default function CheckoutPage() {
  const { items, total, clearCart, isHydrated } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "Bangladesh",
    address: "",
    district: "",
    notes: "",
  });
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [shipping, setShipping] = useState("inside");
  const [createAccount, setCreateAccount] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  // Prefill email for logged-in users, and load their saved addresses.
  useEffect(() => {
    if (!user || !token) return;
    setForm((f) => ({ ...f, email: user.email }));

    fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.addresses) setSavedAddresses(data.addresses);
      })
      .catch(() => {});
  }, [user, token]);

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
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-6">Add something to your cart before checking out.</p>
        <button onClick={() => router.push("/")} className="bg-black text-white px-6 py-3 rounded-xl font-semibold">
          Continue Shopping
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
        items: items.map((i) => ({ productId: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          address: form.address,
          district: form.district,
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
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">
          ✓
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Order placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thanks, {form.fullName || "friend"} — we&apos;ll call {form.phone || "you"} soon to confirm your order.
        </p>
        <button onClick={() => router.push("/")} className="bg-black text-white px-6 py-3 rounded-xl font-semibold">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="border-2 border-dashed border-yellow-400 rounded-2xl p-1 mb-6">
        <p className="text-center text-xs font-semibold text-yellow-700 py-1">Cash on delivery available across Bangladesh</p>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
          {user && savedAddresses.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Use a saved address</p>
              <div className="flex flex-col gap-2 mb-2">
                {savedAddresses.map((addr) => (
                  <button
                    key={addr._id}
                    type="button"
                    onClick={() => useAddress(addr)}
                    className={`text-left border rounded-lg px-3.5 py-2.5 text-sm transition ${
                      selectedAddressId === addr._id
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="font-semibold">{addr.label}</span> — {addr.fullName}, {addr.address}, {addr.district}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400">Or fill in a different address below.</p>
              <hr className="border-gray-200 mt-3" />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name *</label>
            <input
              required
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition"
              value={form.fullName}
              onChange={(e) => { setForm({ ...form, fullName: e.target.value }); setSelectedAddressId(null); }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Phone *</label>
            <input
              required
              placeholder="Enter your 11-digit mobile number."
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition"
              value={form.phone}
              onChange={(e) => { setForm({ ...form, phone: e.target.value }); setSelectedAddressId(null); }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email *</label>
            <input
              required
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Country / Region *</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              <option>Bangladesh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Delivery Address *</label>
            <input
              required
              placeholder="Enter your Full Address"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition"
              value={form.address}
              onChange={(e) => { setForm({ ...form, address: e.target.value }); setSelectedAddressId(null); }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">District name *</label>
            <select
              required
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition"
              value={form.district}
              onChange={(e) => { setForm({ ...form, district: e.target.value }); setSelectedAddressId(null); }}
            >
              <option value="">Select your District</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Khulna</option>
              <option>Rajshahi</option>
              <option>Sylhet</option>
              <option>Barishal</option>
              <option>Rangpur</option>
              <option>Mymensingh</option>
            </select>
          </div>

          {!user && (
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={createAccount} onChange={(e) => setCreateAccount(e.target.checked)} />
              Create an account?
            </label>
          )}

          <div className="pt-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Additional Information</h3>
            <label className="block text-sm text-gray-700 mb-1.5">Order notes (optional)</label>
            <textarea
              rows={4}
              placeholder="Notes about your order, e.g. special notes for delivery."
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition resize-none"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
          <h2 className="font-display font-bold text-lg text-gray-900 mb-4">YOUR ORDER</h2>

          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm font-semibold text-gray-900 border-t border-gray-200 pt-3">
            <span>Subtotal</span>
            <span>৳{total.toLocaleString()}</span>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">Shipment</p>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map((opt) => (
                <label key={opt.key} className="flex items-center justify-between text-sm cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === opt.key}
                      onChange={() => setShipping(opt.key)}
                    />
                    <span className="font-medium text-gray-900">{opt.label}</span>
                  </span>
                  <span className="text-gray-600">{opt.price === 0 ? "Free" : `৳${opt.price}`}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 mt-4 pt-3">
            <span>Total</span>
            <span>৳{grandTotal.toLocaleString()}</span>
          </div>

          <div className="mt-4 text-sm">
            <p className="font-semibold text-gray-900">Cash on delivery</p>
            <p className="text-gray-500">Pay with cash upon delivery.</p>
          </div>

          <button
            type="submit"
            disabled={placing}
            className="w-full mt-5 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {placing ? "Placing order..." : "PLACE ORDER"}
          </button>

          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
          </p>
        </div>
      </form>
    </div>
  );
}
