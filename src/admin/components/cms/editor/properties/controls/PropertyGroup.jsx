import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { cn } from '../../../../../../utils/cn';

export default function PropertyGroup({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-text-muted" size={14} />}
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{title}</h3>
        </div>
        {isOpen ? <FiChevronUp size={14} className="text-text-muted" /> : <FiChevronDown size={14} className="text-text-muted" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
