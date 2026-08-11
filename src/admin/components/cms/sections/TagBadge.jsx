export default function TagBadge({ label }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-widest bg-gray-100 text-text-muted border border-black/5">
      {label}
    </span>
  );
}
