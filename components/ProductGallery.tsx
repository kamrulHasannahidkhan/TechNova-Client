"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images?: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-slate-50 dark:bg-[#0a192f] rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs font-medium">
        No image preview available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-square bg-slate-50 dark:bg-[#0a192f] rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex items-center justify-center p-6 group">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-20 h-20 bg-slate-50 dark:bg-[#0a192f] rounded-xl overflow-hidden border-2 transition ${
                i === active
                  ? "border-blue-600"
                  : "border-slate-200 dark:border-slate-700/80 hover:border-slate-400"
              }`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
