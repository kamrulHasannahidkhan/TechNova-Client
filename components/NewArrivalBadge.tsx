const WINDOW_DAYS = 60; // 2 months
const DAY_MS = 24 * 60 * 60 * 1000;

function getLabel(createdAt?: string) {
  if (!createdAt) return null;

  const elapsed = Math.max(0, Math.floor((Date.now() - new Date(createdAt).getTime()) / DAY_MS));
  const left = WINDOW_DAYS - elapsed;

  if (left <= 0) return null;
  if (left === WINDOW_DAYS) return { top: "2", bottom: "MONTHS" };
  if (left > 30) {
    const days = left - 30;
    return { top: "1 MONTH", bottom: `${days} ${days === 1 ? "DAY" : "DAYS"}` };
  }
  return { top: String(left), bottom: left === 1 ? "DAY" : "DAYS" };
}

export default function NewArrivalBadge({ createdAt }: { createdAt?: string }) {
  const label = getLabel(createdAt);
  if (!label) return null;

  return (
    <span className="absolute bottom-2.5 right-2.5 bg-slate-900 text-amber-400 border border-amber-400/20 text-[9px] font-mono font-bold px-1.5 py-1 rounded-md leading-tight text-center uppercase tracking-wider shadow-md">
      {label.top}
      <br />
      {label.bottom}
    </span>
  );
}
