import { motion } from 'framer-motion';
import { FiCopy, FiEye, FiEyeOff, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SectionItem({ section, isActive, onClick, index, onDelete, onDuplicate, onToggleHide }) {
  const IconComponent = Icons[section.icon] || Icons.FiLayout;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all mb-2",
        isActive
          ? "border-[#1A1A1A] bg-background shadow-sm"
          : "border-black/5 hover:border-black/10 hover:bg-background/50",
        section.isHidden && "opacity-50 grayscale"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="cursor-grab text-gray-300 hover:text-text-muted">
          <FiMoreVertical size={14} className="-mr-1.5" />
          <FiMoreVertical size={14} />
        </div>
        <div className={cn(
          "w-8 h-8 rounded bg-surface border flex items-center justify-center shrink-0 transition-colors",
          isActive ? "border-black/20 text-text-primary" : "border-black/5 text-text-muted"
        )}>
          <IconComponent size={14} />
        </div>
        <div>
          <div className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
            {section.name}
            {section.isHidden && <span className="text-[9px] bg-black/10 px-1 rounded uppercase tracking-wider">Hidden</span>}
          </div>
          <div className="text-[10px] text-text-muted uppercase tracking-widest">{section.type}</div>
        </div>
      </div>

      <div className={cn(
        "flex items-center gap-1 transition-opacity",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors" title="Duplicate">
          <FiCopy size={12} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onToggleHide(); }} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors" title={section.isHidden ? "Show" : "Hide"}>
          {section.isHidden ? <FiEye size={12} /> : <FiEyeOff size={12} />}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors" title="Delete">
          <FiTrash2 size={12} />
        </button>
      </div>
    </motion.div>
  );
}
