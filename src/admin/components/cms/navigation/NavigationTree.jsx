import { useState } from 'react';
import { FiChevronRight, FiChevronDown, FiMove, FiMoreVertical, FiLayout, FiFolder, FiLink } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const INITIAL_TREE = [
  { id: '1', label: 'Living Room', type: 'mega-menu', children: [
    { id: '1-1', label: 'Sofas', type: 'category' },
    { id: '1-2', label: 'Coffee Tables', type: 'category' },
    { id: '1-3', label: 'TV Stands', type: 'category' }
  ]},
  { id: '2', label: 'Bedroom', type: 'category', children: [
    { id: '2-1', label: 'Beds', type: 'category' },
    { id: '2-2', label: 'Nightstands', type: 'category' }
  ]},
  { id: '3', label: 'Dining', type: 'category', children: []},
  { id: '4', label: 'Collections', type: 'custom-link', children: []},
  { id: '5', label: 'About Us', type: 'page', children: []},
];

const TreeItem = ({ item, depth = 0, isSelected, onSelect }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const getIcon = () => {
    if (item.type === 'mega-menu') return <FiLayout size={14} className="text-purple-500" />;
    if (item.type === 'category') return <FiFolder size={14} className="text-orange-500" />;
    return <FiLink size={14} className="text-text-muted" />;
  };

  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg border transition-colors group relative",
          isSelected ? "bg-blue-50 border-blue-200" : "bg-surface border-black/5 hover:border-black/10 hover:bg-background"
        )}
        style={{ marginLeft: `${depth * 24}px` }}
        onClick={() => onSelect(item.id)}
      >
        <div className="cursor-grab text-gray-300 hover:text-text-muted active:cursor-grabbing p-1">
          <FiMove size={14} />
        </div>
        
        <div 
          className="w-5 h-5 flex items-center justify-center cursor-pointer text-text-muted hover:text-text-primary rounded hover:bg-black/5"
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        >
          {hasChildren ? (expanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />) : <div className="w-3 h-3" />}
        </div>
        
        <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 shrink-0">
          {getIcon()}
        </div>
        
        <div className="text-sm font-semibold text-text-primary flex-1 truncate">
          {item.label}
        </div>
        
        {item.type === 'mega-menu' && (
          <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Mega</span>
        )}

        <button className="p-1.5 text-text-muted hover:text-text-primary rounded hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <FiMoreVertical size={14} />
        </button>
      </div>
      
      {expanded && hasChildren && (
        <div className="mt-1 space-y-1 relative">
           {/* Connecting line */}
           <div 
             className="absolute left-[39px] top-0 bottom-4 w-px bg-black/5" 
             style={{ left: `${(depth * 24) + 39}px` }}
           ></div>
           
           {item.children.map(child => (
             <TreeItem 
               key={child.id} 
               item={child} 
               depth={depth + 1} 
               isSelected={isSelected}
               onSelect={onSelect}
             />
           ))}
        </div>
      )}
    </div>
  );
};

export default function NavigationTree({ selectedItemId, setSelectedItemId }) {
  return (
    <div className="bg-surface border border-black/5 rounded-xl flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 border-b border-black/5 shrink-0 bg-background/50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Navigation Structure</h3>
        <span className="text-xs text-text-muted font-medium">Drag to reorder</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-background">
        <div className="max-w-2xl mx-auto space-y-1">
          {INITIAL_TREE.map((item) => (
            <TreeItem 
              key={item.id} 
              item={item} 
              isSelected={selectedItemId === item.id}
              onSelect={setSelectedItemId}
            />
          ))}
          
          <div className="mt-6 border-2 border-dashed border-black/10 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-background/50">
             <div className="text-sm font-semibold text-text-muted mb-1">Drag items here</div>
             <p className="text-xs text-text-muted">Add new navigation links from the library</p>
          </div>
        </div>
      </div>
    </div>
  );
}
