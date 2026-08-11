import { useState } from 'react';
import { FiTag, FiX, FiPlus } from 'react-icons/fi';

export default function CustomerTags({ tags: initialTags = [] }) {
  const [tags, setTags] = useState(initialTags.length ? initialTags : ['VIP', 'Returning Customer']);
  const [newTag, setNewTag] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
    setNewTag('');
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
          <FiTag className="text-gray-400" /> Tags
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <FiPlus size={14} /> Add Tag
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
            {tag}
            <button 
              onClick={() => setTags(tags.filter(t => t !== tag))}
              className="text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <FiX size={12} />
            </button>
          </span>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mt-3 flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="e.g. High Value"
            autoFocus
            className="flex-1 px-3 py-1.5 bg-[#F7F5F2] border-transparent rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-black/20"
          />
          <button type="submit" className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded-md text-xs font-medium hover:bg-black">
            Add
          </button>
        </form>
      )}
    </div>
  );
}
