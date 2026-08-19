import { motion } from 'framer-motion';
import { FiEye, FiCopy, FiEdit2, FiTrash2, FiLayers } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function GlobalBlockCard({ block, view, onPreview }) {
  const isList = view === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-surface border border-black/5 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex relative",
        isList ? "flex-row items-stretch" : "flex-col"
      )}
    >
      {/* Thumbnail */}
      <div className={cn(
        "bg-gray-100 relative shrink-0",
        isList ? "w-64" : "w-full aspect-[16/9]"
      )}>
        {block.image ? (
          <img src={block.image} alt={block.name} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <FiLayers size={32} className="mb-2 opacity-50" />
            <div className="text-[10px] uppercase tracking-widest">{block.category}</div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => onPreview(block)}
            className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-text-primary hover:scale-110 transition-transform shadow-lg"
            title="Preview Block"
          >
            <FiEye size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-4 flex flex-col flex-1", isList && "justify-between")}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{block.category}</div>
              <h3 className="text-sm font-bold text-text-primary font-serif">{block.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                block.status === 'published' ? "bg-success-soft text-success" : "bg-yellow-100 text-yellow-700"
              )}>
                {block.status}
              </span>
            </div>
          </div>
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
            {block.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
          <div className="flex items-center gap-3 text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            <span>Used on {block.usageCount} pages</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>v{block.version}</span>
          </div>
          
          <div className="flex items-center gap-1">
             <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded" title="Edit">
                <FiEdit2 size={14} />
             </button>
             <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded" title="Duplicate">
                <FiCopy size={14} />
             </button>
             <button className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded" title="Delete">
                <FiTrash2 size={14} />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
