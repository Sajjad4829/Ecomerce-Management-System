export default function SelectControl({ label, value, onChange, options = [] }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-primary mb-1.5">{label}</label>
      <select 
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors appearance-none"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
