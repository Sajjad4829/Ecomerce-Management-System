import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white border border-black/5 rounded-2xl border-dashed">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-6 border border-black/5">
        <FiInbox size={24} />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] font-serif mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
        {message}
      </p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
