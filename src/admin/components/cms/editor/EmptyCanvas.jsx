import { FiPlus, FiLayout } from 'react-icons/fi';

export default function EmptyCanvas({ onAddSection }) {
  return (
    <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-background border-2 border-dashed border-border-hover rounded-2xl m-8 p-12 text-center">
      <div className="w-20 h-20 bg-surface rounded-full shadow-sm flex items-center justify-center text-text-muted mb-6 border border-gray-100">
        <FiLayout size={32} />
      </div>
      <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">Your page is empty</h3>
      <p className="text-text-muted max-w-md mx-auto mb-8 leading-relaxed text-sm">
        Start building your page by adding sections from the library. You can drag and drop to reorder them later.
      </p>
      <button 
        onClick={(e) => { e.stopPropagation(); onAddSection(); }}
        className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2"
      >
        <FiPlus size={16} /> Add First Section
      </button>
    </div>
  );
}
