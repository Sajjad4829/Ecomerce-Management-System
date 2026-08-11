import { motion } from 'framer-motion';
import { FiCopy, FiEyeOff, FiTrash2, FiMoreVertical, FiImage, FiType, FiLayout, FiGrid, FiList, FiStar, FiHelpCircle, FiBox } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SectionItem({ section, isActive, onClick, index }) {
  const getIcon = (type) => {
    switch(type) {
      case 'hero': return <FiImage />;
      case 'text': return <FiType />;
      case 'grid': return <FiGrid />;
      case 'slider': return <FiLayout />;
      case 'category': return <FiBox />;
      case 'testimonials': return <FiStar />;
      case 'faq': return <FiHelpCircle />;
      case 'footer': return <FiLayout />;
      case 'banner': return <FiType />;
      case 'features': return <FiList />;
      default: return <FiList />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all mb-2",
        isActive 
          ? "border-[#1A1A1A] bg-gray-50 shadow-sm" 
          : "border-black/5 hover:border-black/10 hover:bg-gray-50/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="cursor-grab text-gray-300 hover:text-gray-500">
          <FiMoreVertical size={14} className="-mr-1.5" />
          <FiMoreVertical size={14} />
        </div>
        <div className={cn(
          "w-8 h-8 rounded bg-white border flex items-center justify-center shrink-0 transition-colors",
          isActive ? "border-black/20 text-[#1A1A1A]" : "border-black/5 text-gray-400"
        )}>
          {getIcon(section.type)}
        </div>
        <div>
          <div className="text-xs font-semibold text-[#1A1A1A]">{section.name}</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">{section.type}</div>
        </div>
      </div>
      
      <div className={cn(
        "flex items-center gap-1 transition-opacity",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <button className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-black/5 rounded transition-colors" title="Duplicate">
          <FiCopy size={12} />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-black/5 rounded transition-colors" title="Hide">
          <FiEyeOff size={12} />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
          <FiTrash2 size={12} />
        </button>
      </div>
    </motion.div>
  );
}
