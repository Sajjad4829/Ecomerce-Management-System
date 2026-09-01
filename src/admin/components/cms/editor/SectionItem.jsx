import { motion } from 'framer-motion';
import { FiCopy, FiEye, FiEyeOff, FiTrash2, FiMoreVertical, FiLock, FiGlobe } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

// Types that are global/read-only — they cannot be duplicated or deleted from the page via structure panel
const GLOBAL_TYPES = ['NAVBAR', 'FOOTER'];

export default function SectionItem({ section, isActive, onClick, index, onDelete, onDuplicate, onToggleHide }) {
  const IconComponent = Icons[section.icon] || Icons.FiLayout;
  const isGlobal = GLOBAL_TYPES.includes(section.type);

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
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Drag handle — hidden for global sections */}
        {isGlobal ? (
          <div className="text-[#5946ff]/50 shrink-0">
            <FiGlobe size={14} />
          </div>
        ) : (
          <div className="cursor-grab text-gray-300 hover:text-text-muted shrink-0 flex items-center justify-center w-4 h-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          </div>
        )}

        <div className={cn(
          "w-8 h-8 rounded border flex items-center justify-center shrink-0 transition-colors",
          isActive
            ? "border-black/20 text-text-primary bg-surface"
            : "border-black/5 text-text-muted bg-surface",
          isGlobal && "border-[#5946ff]/20 text-[#5946ff] bg-[#5946ff]/5"
        )}>
          <IconComponent size={14} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-text-primary flex items-center gap-1.5 truncate">
            <span className="truncate">{section.name}</span>
            {section.isHidden && <span className="text-[9px] bg-black/10 px-1 rounded uppercase tracking-wider shrink-0">Hidden</span>}
            {isGlobal && (
              <span className="text-[9px] bg-[#5946ff]/10 text-[#5946ff] px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 shrink-0">
                <FiLock size={8} /> Global
              </span>
            )}
          </div>
          <div className="text-[10px] text-text-muted uppercase tracking-widest truncate">{section.type}</div>
        </div>
      </div>

      {/* Action buttons — global sections only get show/hide, no duplicate or delete */}
      <div className={cn(
        "flex items-center gap-1 transition-opacity",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        {!isGlobal && (
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors" title="Duplicate">
            <FiCopy size={12} />
          </button>
        )}
        <button onClick={(e) => { e.stopPropagation(); onToggleHide(); }} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors" title={section.isHidden ? "Show" : "Hide"}>
          {section.isHidden ? <FiEye size={12} /> : <FiEyeOff size={12} />}
        </button>
        {!isGlobal && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors" title="Delete">
            <FiTrash2 size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
