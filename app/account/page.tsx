"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type Address = { _id: string; label: string; fullName: string; phone: string; address: string; district: string };

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState({ label: "Home", fullName: "", phone: "", address: "", district: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);

  const loadAddresses = async () => {
    try {
      const res = await fetch("/api/account/addresses-list");
      if (res.ok) setAddresses(await res.json());
    } catch {}
  };

  useEffect(() => { if (status === "authenticated") loadAddresses(); }, [status]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm({ label: "Home", fullName: "", phone: "", address: "", district: "" });
      await loadAddresses();
    } catch {
      setError("Could not save address — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    loadAddresses();
  };

  if (status !== "authenticated" || !session?.user) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold">Hi, {session.user.name}</h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-red-600 font-medium">Sign out</button>
      </div>

      <h2 className="font-semibold text-lg mb-3">Saved Addresses</h2>
      <div className="flex flex-col gap-3 mb-6">
        {addresses.length === 0 && <p className="text-sm text-gray-500">No saved addresses yet.</p>}
        {addresses.map((a) => (
          <div key={a._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
            <div className="text-sm">
              <p className="font-semibold">{a.label} — {a.fullName}</p>
              <p className="text-gray-600">{a.phone}</p>
              <p className="text-gray-600">{a.address}, {a.district}</p>
            </div>
            <button onClick={() => handleDeleteAddress(a._id)} className="text-xs text-red-600">Remove</button>
          </div>
        ))}
      </div>

      <h3 className="font-semibold mb-2">Add new address</h3>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <form onSubmit={handleAddAddress} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2.5">
        <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Label (e.g. Home, Office)"
          value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
        <input required className="border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Full name"
          value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input required className="border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Phone"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required className="border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Address"
          value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input required className="border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="District"
          value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
        <button disabled={saving} className="bg-black text-white font-semibold py-2 rounded-lg text-sm mt-1 disabled:opacity-50">
          {saving ? "Saving..." : "Save Address"}
        </button>
      </form>
    </div>
  );
}
