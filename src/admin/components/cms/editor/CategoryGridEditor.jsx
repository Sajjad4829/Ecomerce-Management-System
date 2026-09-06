import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiEye, FiSave, FiMoreVertical, FiPlus, FiTrash2,
  FiImage, FiChevronDown, FiX, FiEdit2, FiSettings
} from 'react-icons/fi';
import { GripVertical } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import CategoryGridSection from '../../../../storefront/components/home/CategoryGridSection';
import { useToast } from '../../../../components/ui/Toast/ToastContext';

export default function CategoryGridEditor({ section, pageName, onUpdate, onClose, onSave }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('Content');

  const [content, setContent] = useState({
    title: '',
    categories: []
  });

  const [settings, setSettings] = useState({
    columns: '5',
    imageRatio: 'square'
  });

  useEffect(() => {
    if (section?.content) {
      setContent({
        title: section.content.title || '',
        categories: section.content.categories || []
      });
    }
    if (section?.settings) {
      setSettings(prev => ({ ...prev, ...section.settings }));
    }
  }, [section]);

  const handleUpdateCategory = (index, updates) => {
    const newCategories = [...content.categories];
    newCategories[index] = { ...newCategories[index], ...updates };
    setContent({ ...content, categories: newCategories });
  };

  const handleDeleteCategory = (index) => {
    const newCategories = [...content.categories];
    newCategories.splice(index, 1);
    setContent({ ...content, categories: newCategories });
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Category',
      image: '',
      link: ''
    };
    setContent({ ...content, categories: [...content.categories, newCategory] });
  };

  const moveCategory = (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === content.categories.length - 1)) return;
    const newCategories = [...content.categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index + direction];
    newCategories[index + direction] = temp;
    setContent({ ...content, categories: newCategories });
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...section,
        content,
        settings
      });
    } else if (onUpdate) {
      onUpdate(section.id, { content, settings });
    }
    addToast({ type: 'success', message: 'Category Grid saved successfully!' });
    if (onClose) onClose();
  };

  const currentPreviewData = {
    ...section,
    content,
    settings
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F9FAFB] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 font-medium cursor-pointer hover:text-gray-900" onClick={onClose}>{pageName || 'Page Builder'}</div>
          <div className="text-gray-300 text-sm">&gt;</div>
          <div className="text-sm text-gray-900 font-semibold">Category Grid Section</div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <FiEye size={16} />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#4F46E5] rounded-lg hover:bg-[#4338CA] transition-colors shadow-sm flex items-center gap-2"
          >
            Save Changes
          </button>
          <button className="text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FiMoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">

        {/* Center Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-12 bg-[#F9FAFB] flex items-start justify-center">
          <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden relative min-h-[500px]">

            {/* Overlay Toolbar to look like the screenshot */}
            <div className="absolute top-0 inset-x-0 h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
                  <FiImage size={14} />
                </div>
                <span className="text-sm font-bold text-gray-900">Category Grid Section</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">CATEGORY_GRID</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-indigo-100 transition-colors">
                  <FiSettings size={12} />
                  Open Advanced Settings
                </button>
              </div>
            </div>

            {/* Actual Rendered Preview */}
            <div className="mt-14 pointer-events-none w-full h-full">
              {/* Fallback rendering if component not yet created to prevent crashes */}
              {CategoryGridSection ? (
                <CategoryGridSection data={currentPreviewData} />
              ) : (
                <div className="p-20 text-center text-gray-400">Loading component...</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Advanced Settings */}
        <div className="w-[380px] bg-white border-l border-gray-200 flex flex-col shrink-0 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-20">
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
            <h2 className="text-lg font-bold text-gray-900">Advanced Settings</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <FiX size={18} />
            </button>
          </div>

          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center text-[#5946ff]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </div>
              <span className="text-sm font-bold text-gray-900">Category Grid Section</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>

          <div className="flex border-b border-gray-100 px-6 gap-6 shrink-0">
            <button
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'Content' ? 'border-[#5946ff] text-[#5946ff]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              onClick={() => setActiveTab('Content')}
            >
              Content
            </button>
            <button
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'Settings' ? 'border-[#5946ff] text-[#5946ff]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              onClick={() => setActiveTab('Settings')}
            >
              Settings
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            {activeTab === 'Content' && (
              <div className="flex flex-col h-full">
                <div className="p-6 space-y-6 flex-1">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">Section Title</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all outline-none"
                      value={content.title}
                      onChange={(e) => setContent({ ...content, title: e.target.value })}
                      placeholder="e.g. Living Room"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-800">Categories</label>

                    <div className="space-y-2">
                      {content.categories.map((cat, index) => (
                        <div key={cat.id || index} className="group border border-gray-100 hover:border-gray-200 bg-white rounded-lg p-2 flex gap-3 transition-all items-center">
                          <div className="flex flex-col justify-center text-gray-300 cursor-grab active:cursor-grabbing">
                            <button onClick={() => moveCategory(index, -1)} className="hover:text-gray-600"><GripVertical size={14} /></button>
                          </div>

                          <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                            {cat.image ? (
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            ) : (
                              <FiImage size={14} className="text-gray-300" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col gap-1.5 justify-center">
                            <input
                              type="text"
                              className="w-full border border-gray-200 rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 outline-none placeholder-gray-400 focus:border-[#5946ff]"
                              value={cat.name}
                              onChange={(e) => handleUpdateCategory(index, { name: e.target.value })}
                              placeholder="Sofa Set"
                            />
                            <input
                              type="text"
                              className="w-full border border-gray-200 rounded-md px-2.5 py-1 text-[11px] text-gray-500 outline-none placeholder-gray-300 font-mono focus:border-[#5946ff]"
                              value={cat.link}
                              onChange={(e) => handleUpdateCategory(index, { link: e.target.value })}
                              placeholder="/living-room/sofa-set"
                            />
                          </div>

                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <label className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors" title="Edit Image">
                              <FiEdit2 size={13} />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (evt) => handleUpdateCategory(index, { image: evt.target.result });
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <button onClick={() => handleDeleteCategory(index)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Category">
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleAddCategory}
                      className="flex items-center gap-2 text-sm font-semibold text-[#5946ff] hover:text-[#4335cc] transition-colors mt-4 py-2 px-1"
                    >
                      <FiPlus size={16} /> Add Category
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-auto">
                  <button
                    onClick={() => setActiveTab('Settings')}
                    className="w-full px-6 py-4 flex items-center justify-between text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FiSettings size={16} className="text-gray-400" />
                      Section Settings
                    </div>
                    <FiChevronDown size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Settings' && (
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">Grid Columns</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                    value={settings.columns}
                    onChange={(e) => setSettings({ ...settings, columns: e.target.value })}
                  >
                    <option value="3">3 Columns</option>
                    <option value="4">4 Columns</option>
                    <option value="5">5 Columns</option>
                    <option value="6">6 Columns</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Image Ratio</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                    value={settings.imageRatio}
                    onChange={(e) => setSettings({ ...settings, imageRatio: e.target.value })}
                  >
                    <option value="square">Square (1:1)</option>
                    <option value="portrait">Portrait (3:4)</option>
                    <option value="landscape">Landscape (4:3)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Grid Gap</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                    value={settings.gap || 'medium'}
                    onChange={(e) => setSettings({ ...settings, gap: e.target.value })}
                  >
                    <option value="small">Small (16px)</option>
                    <option value="medium">Medium (24px)</option>
                    <option value="large">Large (32px)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 p-4 shrink-0 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <FiSettings size={14} />
              Section Settings
            </div>
            <FiChevronDown size={16} className="text-gray-400" />
          </div>
        </div>

      </div>
    </div>
  );
}
