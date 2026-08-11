import { FiSearch, FiSave, FiEye, FiDownload, FiUpload } from 'react-icons/fi';

export default function TokenToolbar({ activeCategory }) {
  return (
    <div className="bg-surface p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm sticky top-0 z-20 mb-6">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <h2 className="text-lg font-bold font-serif text-text-primary">{activeCategory}</h2>
        <div className="h-6 w-px bg-black/10"></div>
        <div className="text-xs text-text-muted flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-success-soft0"></span> Synced
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background transition-colors" title="Export Tokens">
          <FiDownload size={14} />
        </button>
        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background transition-colors" title="Import Tokens">
          <FiUpload size={14} />
        </button>
        <div className="hidden md:block h-6 w-px bg-black/10 mx-1"></div>
        <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background transition-colors flex items-center gap-2">
          <FiEye size={14} /> Live Preview
        </button>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2">
          <FiSave size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
}
