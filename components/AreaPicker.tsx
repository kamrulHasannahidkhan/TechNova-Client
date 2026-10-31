"use client";
import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { getAllAreas } from "@/lib/bd-locations";

export default function AreaPicker({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (area: { thana: string; district: string }) => void;
}) {
  const areas = useMemo(() => getAllAreas(), []);
  const [text, setText] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => setText(value), [value]);

  const searching = text !== value;
  const q = searching ? text.trim().toLowerCase() : "";
  const results = areas
    .filter((a) => !q || a.thana.toLowerCase().includes(q) || a.district.toLowerCase().includes(q))
    .slice(0, 40);

  return (
    <div className="relative">
      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        required
        value={text}
        placeholder="Search thana or district"
        onChange={(e) => { setText(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => { setText(value); setOpen(false); }}
        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
      />

      {open && (
        <div className="absolute z-30 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a192f] shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">No area found</p>
          ) : (
            results.map((a) => (
              <button
                key={`${a.district}-${a.thana}`}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect({ thana: a.thana, district: a.district });
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{a.thana}</span>
                <span className="text-xs text-slate-500">{a.tag}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
