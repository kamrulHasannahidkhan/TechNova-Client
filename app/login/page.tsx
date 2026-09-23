"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function getPasswordStrength(password: string): { label: string; score: number; color: string } {
  if (password.length === 0) return { label: "", score: 0, color: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Weak", score, color: "bg-red-500" };
  if (score <= 3) return { label: "Medium", score, color: "bg-yellow-500" };
  return { label: "Strong", score, color: "bg-green-500" };
}

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sign in fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign up fields
  const [name, setName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const strength = useMemo(() => getPasswordStrength(suPassword), [suPassword]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError("Invalid email or password");
    else router.push("/account");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (suPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: suEmail, phone, password: suPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setError(data.error || "Registration failed");
      return;
    }
    const signInRes = await signIn("credentials", { email: suEmail, password: suPassword, redirect: false });
    setLoading(false);
    if (signInRes?.error) setError("Account created — please sign in.");
    else router.push("/account");
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => { setTab("signin"); setError(""); }}
          className={`flex-1 pb-3 text-sm font-semibold transition ${
            tab === "signin" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setTab("signup"); setError(""); }}
          className={`flex-1 pb-3 text-sm font-semibold transition ${
            tab === "signup" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
          }`}
        >
          Sign Up
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {tab === "signin" ? (
        <form onSubmit={handleSignIn} className="flex flex-col gap-3">
          <input type="email" required placeholder="Email" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required placeholder="Password" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg mt-2 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <input required placeholder="Full name" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
            value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" required placeholder="Email" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
            value={suEmail} onChange={(e) => setSuEmail(e.target.value)} />
          <input type="tel" required placeholder="Phone number" className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
            value={phone} onChange={(e) => setPhone(e.target.value)} />

          <div>
            <input type="password" required placeholder="Password" minLength={6}
              className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm w-full"
              value={suPassword} onChange={(e) => setSuPassword(e.target.value)} />
            {suPassword.length > 0 && (
              <div className="mt-1.5">
                <div className="flex gap-1 h-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`flex-1 rounded-full ${i < strength.score ? strength.color : "bg-gray-200"}`} />
                  ))}
                </div>
                <p className={`text-xs mt-1 font-medium ${strength.label === "Weak" ? "text-red-600" : strength.label === "Medium" ? "text-yellow-600" : "text-green-600"}`}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          <input type="password" required placeholder="Re-enter password" minLength={6}
            className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg mt-2 disabled:opacity-50">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
}
