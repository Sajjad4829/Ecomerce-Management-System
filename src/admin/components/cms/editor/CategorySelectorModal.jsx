import React, { useState, useMemo } from 'react';
import { FiX, FiSearch, FiImage } from 'react-icons/fi';
import { useCategories } from '../../../context/commerce/CategoryContext';
import CategoryImage from './CategoryImage';

export default function CategorySelectorModal({ isOpen, onClose, onAddCategories, existingCategoryIds = [] }) {
  const { categories, loading } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const id = cat._id || cat.id;
      return cat.name.toLowerCase().includes(searchTerm.toLowerCase()) && !existingCategoryIds.includes(id);
    });
  }, [categories, searchTerm, existingCategoryIds]);

  if (!isOpen) return null;

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const selectedCategories = categories.filter(cat => selectedIds.includes(cat._id || cat.id));
    onAddCategories(selectedCategories);
    setSelectedIds([]);
    setSearchTerm('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] border border-gray-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Select Categories</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <FiX size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5946ff] focus:ring-1 focus:ring-[#5946ff] transition-all"
            />
          </div>
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          {loading ? (
            <div className="p-8 text-center text-sm font-medium text-gray-500">Loading categories...</div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-8 text-center text-sm font-medium text-gray-500">No categories found.</div>
          ) : (
            <div className="space-y-1">
              {filteredCategories.map(cat => {
                const id = cat._id || cat.id;
                const isSelected = selectedIds.includes(id);
                return (
                  <label 
                    key={id} 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${isSelected ? 'bg-indigo-50/50 border-indigo-200' : 'border-transparent hover:bg-gray-50 hover:border-gray-100'}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(id)}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 transition-colors"
                    />
                    
                    <div className="w-10 h-10 rounded border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
                      <CategoryImage 
                        src={cat.image}
                        categoryName={cat.name}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-gray-900 truncate">{cat.name}</span>
                      <span className="text-xs font-mono text-gray-500 truncate">/categories/{cat.slug || id}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleAdd}
            disabled={selectedIds.length === 0}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors shadow-sm ${selectedIds.length === 0 ? 'bg-indigo-400 cursor-not-allowed opacity-70' : 'bg-[#4F46E5] hover:bg-[#4338CA]'}`}
          >
            Add Selected ({selectedIds.length})
          </button>
        </div>

      </div>
    </div>
  );
}
