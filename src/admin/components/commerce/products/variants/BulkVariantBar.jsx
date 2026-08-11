import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiEdit2, FiImage, FiDollarSign } from 'react-icons/fi';

export default function BulkVariantBar({ selectedCount, onClear }) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white rounded-xl shadow-2xl px-6 py-4 flex items-center gap-6 z-40"
        >
          <div className="flex items-center gap-4 border-r border-stone-700 pr-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-stone-900 font-bold text-xs">
              {selectedCount}
            </span>
            <span className="text-sm font-medium">Variants Selected</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 hover:bg-stone-800 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <FiDollarSign size={14} /> Update Prices
            </button>
            <button className="px-3 py-1.5 hover:bg-stone-800 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <FiImage size={14} /> Assign Image
            </button>
            <button className="px-3 py-1.5 hover:bg-stone-800 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <FiEdit2 size={14} /> Edit Status
            </button>
            <button className="px-3 py-1.5 hover:bg-red-900/50 text-red-400 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <FiTrash2 size={14} /> Delete
            </button>
          </div>

          <button 
            onClick={onClear}
            className="ml-2 p-1.5 hover:bg-stone-800 rounded-lg transition-colors text-stone-400 hover:text-white"
          >
            <FiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
