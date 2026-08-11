import { motion } from 'framer-motion';
import { FiPlus, FiEye } from 'react-icons/fi';
import TagBadge from './TagBadge';
import FavoriteButton from './FavoriteButton';
import { cn } from '../../../../utils/cn';

export default function SectionCard({ section, view, onPreview }) {
  const isList = view === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white border border-black/5 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex",
        isList ? "flex-row items-stretch" : "flex-col"
      )}
    >
      {/* Thumbnail */}
      <div className={cn(
        "bg-gray-100 relative shrink-0",
        isList ? "w-64" : "w-full aspect-[16/9]"
      )}>
        {section.image ? (
          <img src={section.image} alt={section.name} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <div className="text-xs uppercase tracking-widest font-bold">Preview</div>
            <div className="text-[10px] uppercase tracking-widest">{section.category}</div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => onPreview(section)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] hover:scale-110 transition-transform shadow-lg"
            title="Preview Section"
          >
            <FiEye size={18} />
          </button>
          <button 
            className="w-10 h-10 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            title="Add to Page"
          >
            <FiPlus size={18} />
          </button>
        </div>
        
        {/* Top Right Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <FavoriteButton isFavorite={section.isFavorite} />
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-4 flex flex-col flex-1", isList && "justify-between")}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{section.category}</div>
              <h3 className="text-sm font-bold text-[#1A1A1A] font-serif">{section.name}</h3>
            </div>
            <div className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">
              v{section.version || '1.0'}
            </div>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {section.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {section.tags?.slice(0, 3).map(tag => (
            <TagBadge key={tag} label={tag} />
          ))}
          {section.tags?.length > 3 && (
             <span className="text-[10px] text-gray-400 font-medium">+{section.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
