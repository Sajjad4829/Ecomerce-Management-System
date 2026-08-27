import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronDown, FiMoreVertical, FiEdit2, FiEye, FiCopy, FiTrash2, FiMove } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';

const CategoryNode = ({ 
  node, 
  depth = 0, 
  searchQuery, 
  selectedCategories, 
  navItems,
  onSelectOne, 
  onEdit, 
  onPreview,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const [activeMenu, setActiveMenu] = useState(null);

  const hasChildren = node.children && node.children.length > 0;
  const isMatch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
  
  // If searching, auto-expand and show if matches
  if (searchQuery && !isMatch && !hasChildren) return null;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === node.id ? null : node.id);
  };

  return (
    <div className="w-full">
      <div 
        className={`group flex items-center justify-between py-3 pr-4 border-b border-stone-100 hover:bg-background transition-colors cursor-pointer ${selectedCategories.includes(node.id) ? 'bg-background' : ''}`}
        style={{ paddingLeft: `${depth * 24 + 16}px` }}
        onClick={(e) => {
          if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
            onEdit(node.id);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {hasChildren ? (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0.5 text-text-muted hover:text-text-primary transition-colors"
              >
                {isExpanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
              </button>
            ) : (
              <div className="w-5" /> // Spacer
            )}
            <input 
              type="checkbox"
              checked={selectedCategories.includes(node.id)}
              onChange={(e) => onSelectOne(node.id, e.target.checked)}
              className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary group-hover:text-warning transition-colors">
                {node.name}
                {node.navMenuId && node.navMenuId !== 'none' && (() => {
                  const menuItem = navItems?.find(n => n.id === node.navMenuId);
                  const menuDisplay = menuItem ? (menuItem.title || menuItem.label) : node.navMenuId;
                  return ` : ${menuDisplay}`;
                })()}
              </span>
            </div>
            <span className="text-xs text-text-muted font-mono">/{node.slug}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-24 text-right">
            <span className="text-xs text-text-muted">{node.productCount} Products</span>
          </div>
          <div className="w-24 text-right">
            <CatalogStatusBadge status={node.status} />
          </div>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={toggleMenu}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-stone-200 rounded transition-colors"
            >
              <FiMoreVertical size={16} />
            </button>
            
            <AnimatePresence>
              {activeMenu === node.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-xl z-20 py-1"
                >
                  <button onClick={() => { onEdit(node.id); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                    <FiEdit2 size={12} /> Edit
                  </button>
                  <button onClick={() => { onPreview(node); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                    <FiEye size={12} /> Preview
                  </button>
                  <div className="h-px bg-stone-100 my-1" />
                  <button className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                    <FiMove size={12} /> Move
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                    <FiCopy size={12} /> Duplicate
                  </button>
                  <div className="h-px bg-stone-100 my-1" />
                  <button onClick={() => { onDelete(node.id); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-danger hover:bg-danger-soft flex items-center gap-2">
                    <FiTrash2 size={12} /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transitionEnd: { overflow: 'visible' } 
            }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
            style={{ overflow: 'hidden' }}
          >
            {node.children.map(child => (
              <CategoryNode 
                key={child.id}
                node={child}
                depth={depth + 1}
                searchQuery={searchQuery}
                selectedCategories={selectedCategories}
                navItems={navItems}
                onSelectOne={onSelectOne}
                onEdit={onEdit}
                onPreview={onPreview}
                onDelete={onDelete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CategoryTree({ 
  categories, 
  searchQuery,
  selectedCategories,
  navItems,
  onSelectAll,
  onSelectOne,
  onEdit,
  onPreview,
  onDelete
}) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between p-4 bg-background border-b border-border rounded-t-xl">
        <div className="flex items-center gap-3 pl-7">
          <input 
            type="checkbox"
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
          />
          <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Category Hierarchy</span>
        </div>
        <div className="flex items-center gap-6 pr-10">
          <span className="w-24 text-right text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Products</span>
          <span className="w-24 text-right text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</span>
        </div>
      </div>

      <div className="divide-y divide-stone-100 max-h-[600px] overflow-y-auto custom-scrollbar">
        {categories.map(category => (
          <CategoryNode 
            key={category.id}
            node={category}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            navItems={navItems}
            onSelectOne={onSelectOne}
            onEdit={onEdit}
            onPreview={onPreview}
            onDelete={onDelete}
          />
        ))}
        {categories.length === 0 && (
          <div className="p-8 text-center text-text-muted text-sm">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
