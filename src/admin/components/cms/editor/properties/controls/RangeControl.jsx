export default function RangeControl({ label, value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-text-muted mb-2 uppercase tracking-widest flex justify-between">
        <span>{label}</span>
        <span>{value}</span>
      </label>
      <input 
        type="range" 
        min={min}
        max={max}
        step={step}
        value={value || min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#1A1A1A]" 
      />
    </div>
  );
}
