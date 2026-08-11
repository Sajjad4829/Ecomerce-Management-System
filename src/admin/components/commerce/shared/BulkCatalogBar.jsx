import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiEye, FiArchive, FiStar } from 'react-icons/fi';

export default function BulkCatalogBar({ selectedCount, onClear }) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-4 border border-stone-700"
        >
          <div className="flex items-center gap-3 pr-4 border-r border-stone-700">
            <div className="w-6 h-6 rounded-full bg-white text-stone-900 flex items-center justify-center text-xs font-bold">
              {selectedCount}
            </div>
            <span className="text-sm font-medium">Selected</span>
            <button onClick={onClear} className="text-stone-400 hover:text-white transition-colors p-1">
              <FiX size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-800 rounded-lg text-xs font-medium transition-colors">
              <FiEye size={14} /> Publish
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-800 rounded-lg text-xs font-medium transition-colors">
              <FiStar size={14} /> Feature
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-800 rounded-lg text-xs font-medium transition-colors">
              <FiArchive size={14} /> Archive
            </button>
            <div className="w-px h-4 bg-stone-700 mx-2" />
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-900/30 text-red-400 rounded-lg text-xs font-medium transition-colors">
              <FiTrash2 size={14} /> Delete
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
