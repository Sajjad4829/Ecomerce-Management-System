export default function ImageSelectControl({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-primary mb-1.5">{label}</label>
      <div className="flex flex-col gap-2">
        {value && (
          <div className="w-full h-32 bg-surface border border-black/5 rounded-lg overflow-hidden relative group">
            <img src={value} alt="Selected" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => onChange('')} 
                className="text-white text-[10px] font-bold tracking-widest uppercase bg-black/40 px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <input 
          type="text" 
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" 
        />
      </div>
    </div>
  );
}
