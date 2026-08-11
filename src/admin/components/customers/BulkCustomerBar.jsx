import { FiX, FiTag, FiArchive, FiShield } from 'react-icons/fi';

export default function BulkCustomerBar({ count, onClear }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 bg-[#1A1A1A] text-white px-6 flex items-center justify-between z-10 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={onClear}
          className="p-1 hover:bg-surface/10 rounded-full transition-colors text-text-muted hover:text-white"
        >
          <FiX size={18} />
        </button>
        <span className="text-sm font-medium">{count} customers selected</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-xs font-medium bg-surface/10 hover:bg-surface/20 rounded-md transition-colors flex items-center gap-2">
          <FiShield size={14} /> Assign Group
        </button>
        <button className="px-3 py-1.5 text-xs font-medium bg-surface/10 hover:bg-surface/20 rounded-md transition-colors flex items-center gap-2">
          <FiTag size={14} /> Add Tags
        </button>
        <button className="px-3 py-1.5 text-xs font-medium bg-danger-soft0/20 text-red-300 hover:bg-danger-soft0/30 rounded-md transition-colors flex items-center gap-2">
          <FiArchive size={14} /> Archive
        </button>
      </div>
    </div>
  );
}
