import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronDown, FiMoreVertical, FiEdit2, FiEye, FiCopy, FiTrash2, FiMove } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';

const CategoryNode = ({ 
  node, 
  depth = 0, 
  searchQuery, 
  selectedCategories, 
  onSelectOne, 
  onEdit, 
  onPreview 
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
        className={`group flex items-center justify-between py-3 pr-4 border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer ${selectedCategories.includes(node.id) ? 'bg-stone-50' : ''}`}
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
                className="p-0.5 text-stone-400 hover:text-stone-900 transition-colors"
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
              className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
              {node.name}
            </span>
            <span className="text-xs text-stone-500 font-mono">/{node.slug}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-24 text-right">
            <span className="text-xs text-stone-500">{node.productCount} Products</span>
          </div>
          <div className="w-24 text-right">
            <CatalogStatusBadge status={node.status} />
          </div>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={toggleMenu}
              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
            >
              <FiMoreVertical size={16} />
            </button>
            
            <AnimatePresence>
              {activeMenu === node.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-1 w-40 bg-white border border-stone-200 rounded-lg shadow-xl z-20 py-1"
                >
                  <button onClick={() => { onEdit(node.id); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                    <FiEdit2 size={12} /> Edit
                  </button>
                  <button onClick={() => { onPreview(node); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                    <FiEye size={12} /> Preview
                  </button>
                  <div className="h-px bg-stone-100 my-1" />
                  <button className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                    <FiMove size={12} /> Move
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                    <FiCopy size={12} /> Duplicate
                  </button>
                  <div className="h-px bg-stone-100 my-1" />
                  <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
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
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {node.children.map(child => (
              <CategoryNode 
                key={child.id}
                node={child}
                depth={depth + 1}
                searchQuery={searchQuery}
                selectedCategories={selectedCategories}
                onSelectOne={onSelectOne}
                onEdit={onEdit}
                onPreview={onPreview}
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
  onSelectAll,
  onSelectOne,
  onEdit,
  onPreview
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-3 pl-7">
          <input 
            type="checkbox"
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
          />
          <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Category Hierarchy</span>
        </div>
        <div className="flex items-center gap-6 pr-10">
          <span className="w-24 text-right text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Products</span>
          <span className="w-24 text-right text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Status</span>
        </div>
      </div>

      <div className="divide-y divide-stone-100">
        {categories.map(category => (
          <CategoryNode 
            key={category.id}
            node={category}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            onSelectOne={onSelectOne}
            onEdit={onEdit}
            onPreview={onPreview}
          />
        ))}
        {categories.length === 0 && (
          <div className="p-8 text-center text-stone-500 text-sm">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
