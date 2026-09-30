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
  const [googleLoading, setGoogleLoading] = useState(false);
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
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      {/* Outer Card Wrapper */}
      <div className="bg-white dark:bg-[#112240] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-2xl transition-all">
        
        {/* Navigation Tabs */}
        <div className="flex bg-gray-100/80 dark:bg-[#0a192f] p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => { setTab("signin"); setError(""); }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
              tab === "signin"
                ? "bg-white dark:bg-[#112240] text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab("signup"); setError(""); }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
              tab === "signup"
                ? "bg-white dark:bg-[#112240] text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium flex items-center gap-2 animate-shake">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            {error}
          </div>
        )}

        {/* Google OAuth Button */}
       

        {/* Divider */}
        
        {/* Forms */}
        {tab === "signin" ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-3.5">
            <div>
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={loading || googleLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl mt-2 transition-all duration-200 shadow-md shadow-blue-600/25 active:scale-[0.98] disabled:opacity-50 text-xs sm:text-sm tracking-wide"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col gap-3.5">
            <input
              required
              placeholder="Full Name"
              className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
              value={suEmail}
              onChange={(e) => setSuEmail(e.target.value)}
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="space-y-1.5">
              <input
                type="password"
                required
                placeholder="Password"
                minLength={6}
                className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
                value={suPassword}
                onChange={(e) => setSuPassword(e.target.value)}
              />
              {suPassword.length > 0 && (
                <div className="pt-1 px-1">
                  <div className="flex gap-1.5 h-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          i < strength.score ? strength.color : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-[11px] mt-1.5 font-bold tracking-wide uppercase ${
                      strength.label === "Weak"
                        ? "text-red-600 dark:text-red-400"
                        : strength.label === "Medium"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <input
              type="password"
              required
              placeholder="Re-enter Password"
              minLength={6}
              className="w-full border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition duration-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              disabled={loading || googleLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl mt-2 transition-all duration-200 shadow-md shadow-blue-600/25 active:scale-[0.98] disabled:opacity-50 text-xs sm:text-sm tracking-wide"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}