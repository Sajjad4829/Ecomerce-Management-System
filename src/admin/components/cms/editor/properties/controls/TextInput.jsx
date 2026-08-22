export default function TextInput({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-primary mb-1.5">{label}</label>
      <input 
        type="text" 
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" 
      />
    </div>
  );
}
