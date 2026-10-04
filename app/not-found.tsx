import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <p className="font-display text-6xl mb-4">🚧</p>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Under Construction</h1>
      <p className="text-gray-500 mb-8">This page isn&apos;t ready yet — we&apos;re working on it. Check back soon.</p>
      <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
        Back to Home
      </Link>
    </div>
  );
}
