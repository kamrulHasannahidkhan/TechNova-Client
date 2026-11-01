"use client";
import { Fragment } from "react";
import { getThanaGroups, DISTRICTS } from "@/lib/bd-locations";

const selectClass =
  "w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#0a192f] text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0a192f] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition disabled:opacity-60";

export default function AreaSelect({
  district,
  thana,
  onChange,
}: {
  district: string;
  thana: string;
  onChange: (v: { district: string; thana: string }) => void;
}) {
  const groups = district ? getThanaGroups(district) : [];

  const options = (items: string[]) =>
    items.map((t) => (
      <option key={t} value={t}>
        {t}
      </option>
    ));

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <select
        required
        className={selectClass}
        value={district}
        onChange={(e) => onChange({ district: e.target.value, thana: "" })}
      >
        <option value="">Select District</option>
        {DISTRICTS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        required
        disabled={!district}
        className={selectClass}
        value={thana}
        onChange={(e) => onChange({ district, thana: e.target.value })}
      >
        <option value="">{district ? "Select Thana / Upazila" : "Select district first"}</option>
        {groups.map((g) => (
          <Fragment key={g.label || "all"}>
            {g.label ? <optgroup label={g.label}>{options(g.items)}</optgroup> : options(g.items)}
          </Fragment>
        ))}
      </select>
    </div>
  );
}
