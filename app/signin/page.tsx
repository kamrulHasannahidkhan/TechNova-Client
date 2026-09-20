"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError("Invalid email or password");
    else router.push("/account");
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-display text-2xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input type="email" required placeholder="Email" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required placeholder="Password" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="bg-black text-white font-semibold py-2.5 rounded-lg mt-2 disabled:opacity-50">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Don&apos;t have an account? <Link href="/signup" className="text-[--signal] font-medium">Sign up</Link>
      </p>
    </div>
  );
}
