import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useCMS } from '../../../context/cms/CMSContext';

export default function CreateSectionModal({ isOpen, onClose, onCreate }) {
  const { sections } = useCMS();
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  // Get unique base types from the existing sections to offer as templates
  const baseTypes = Array.from(new Set(sections.map(s => s.type))).sort();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) return;

    // Find a template to copy default content/settings from
    const template = sections.find(s => s.type === type);

    const newType = `${type}_CUSTOM_${Date.now()}`;

    const newSection = {
      id: `lib-custom-${Date.now()}`,
      name,
      type: newType,
      baseType: type,
      category: template?.category || 'CUSTOM',
      description: `Custom ${type} section`,
      icon: template?.icon || 'FiLayout',
      defaultContent: template?.defaultContent || {},
      defaultSettings: template?.defaultSettings || {},
      status: 'Active',
      image: template?.image || null
    };

    onCreate(newSection);
    setName('');
    setType('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Add New Section</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Winter Promo Hero"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
              >
                <option value="" disabled>Select a base type...</option>
                {baseTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-gray-500">The base type determines the structure and editor options available for this section.</p>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name || !type}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Create Section
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
