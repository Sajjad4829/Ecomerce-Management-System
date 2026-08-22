export default function ToggleControl({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <input 
        type="checkbox" 
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
      />
      <label className="text-xs text-text-primary font-medium">{label}</label>
    </div>
  );
}
