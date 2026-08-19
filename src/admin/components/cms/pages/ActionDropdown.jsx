import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreVertical } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function ActionDropdown({ actions }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors"
      >
        <FiMoreVertical size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 origin-top-right bg-surface border border-black/5 rounded-xl shadow-lg shadow-black/5 z-50 overflow-hidden"
          >
            <div className="py-1">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center w-full text-left px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
                      action.danger 
                        ? "text-danger hover:bg-danger-soft" 
                        : "text-text-secondary hover:bg-background hover:text-text-primary"
                    )}
                  >
                    {Icon && <Icon className="mr-3 text-sm" />}
                    {action.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
