import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreVertical, FiEdit2, FiEye, FiFolder } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';

export default function CategoryGrid({ 
  categories, 
  searchQuery, 
  selectedCategories, 
  onSelectOne, 
  onEdit, 
  onPreview 
}) {
  const [activeMenu, setActiveMenu] = useState(null);

  // Flatten the category tree for grid display
  const flattenCategories = (cats) => {
    let flat = [];
    cats.forEach(c => {
      flat.push(c);
      if (c.children) flat = flat.concat(flattenCategories(c.children));
    });
    return flat;
  };

  let displayCategories = flattenCategories(categories);

  if (searchQuery) {
    displayCategories = displayCategories.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {displayCategories.map(category => (
        <div 
          key={category.id} 
          className={`relative bg-white rounded-xl border p-4 shadow-sm transition-all cursor-pointer group ${selectedCategories.includes(category.id) ? 'border-amber-400 ring-1 ring-amber-400' : 'border-stone-200 hover:border-stone-300'}`}
          onClick={(e) => {
            if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
              onEdit(category.id);
            }
          }}
        >
          {/* Top Row: Checkbox & Menu */}
          <div className="flex items-start justify-between mb-3">
            <input 
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={(e) => onSelectOne(category.id, e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
            <div className="relative">
              <button 
                onClick={(e) => toggleMenu(e, category.id)}
                className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
              >
                <FiMoreVertical size={16} />
              </button>
              
              <AnimatePresence>
                {activeMenu === category.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-full mt-1 w-32 bg-white border border-stone-200 rounded-lg shadow-xl z-20 py-1"
                  >
                    <button onClick={() => { onEdit(category.id); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                      <FiEdit2 size={12} /> Edit
                    </button>
                    <button onClick={() => { onPreview(category); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                      <FiEye size={12} /> Preview
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Icon / Image */}
          <div className="w-12 h-12 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center mb-3 text-stone-400 overflow-hidden">
            {category.image ? (
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            ) : (
              <FiFolder size={20} />
            )}
          </div>

          {/* Info */}
          <div className="space-y-1 mb-3">
            <h3 className="text-sm font-semibold text-stone-900 truncate">{category.name}</h3>
            <p className="text-xs text-stone-500 font-mono truncate">/{category.slug}</p>
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="text-xs text-stone-500">{category.productCount} Products</span>
            <CatalogStatusBadge status={category.status} />
          </div>
        </div>
      ))}
      {displayCategories.length === 0 && (
        <div className="col-span-full py-12 text-center text-stone-500">
          No categories found.
        </div>
      )}
    </div>
  );
}
