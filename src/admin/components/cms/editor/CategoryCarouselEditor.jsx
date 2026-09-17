import React, { useState, useEffect, useMemo } from 'react';
import { FiX, FiMoreVertical, FiPlus, FiTrash2, FiSettings, FiMonitor, FiTablet, FiSmartphone, FiImage, FiEye } from 'react-icons/fi';
import { GripVertical } from 'lucide-react';
import CategoryImage from './CategoryImage';
import { cn } from '../../../../utils/cn';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import { useCategories } from '../../../context/commerce/CategoryContext';
import CategorySelectorModal from './CategorySelectorModal';

// Note: Ensure CategoryCarouselSection is imported to render the preview.
import CategoryCarouselSection from '../../../../storefront/components/home/CategoryCarouselSection';

export default function CategoryCarouselEditor({ section, pageName, onUpdate, onClose, onSave }) {
  const { addToast } = useToast();
  const { categories, loading: categoriesLoading, getCategoryById } = useCategories();
  const [activeTab, setActiveTab] = useState('Content');
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const getPropName = (baseProp) => activeDevice === 'desktop' ? baseProp : `${baseProp}_${activeDevice}`;

  const [content, setContent] = useState({
    title: '',
    categoryIds: []
  });

  const [settings, setSettings] = useState({
    itemsPerView: 5,
    itemsPerView_tablet: 3,
    itemsPerView_mobile: 2,
    showArrows: true,
    autoPlay: true,
    autoPlaySpeed: 3000,
    loop: true,
    spacing: 20
  });

  useEffect(() => {
    if (section?.content) {
      setContent({
        title: section.content.title || '',
        categoryIds: section.content.categoryIds || []
      });
      setContent(prev => ({
        ...prev,
        ...section.content
      }));
    }
    if (section?.settings) {
      setSettings(prev => ({ ...prev, ...section.settings }));
    }
  }, [section]);

  const handleAddCategory = (selectedCategories) => {
    const newItems = selectedCategories
      .map(cat => cat._id || cat.id)
      .filter(id => !content.categories?.some(c => c.id === id))
      .map(id => ({ id, image: '', customName: '' }));
      
    if (newItems.length > 0) {
      setContent(prev => ({
        ...prev,
        categories: [...(prev.categories || []), ...newItems]
      }));
    }
    setIsSelectorOpen(false);
  };

  const removeCategory = (index) => {
    const newCats = [...(content.categories || [])];
    newCats.splice(index, 1);
    setContent({ ...content, categories: newCats });
  };

  const moveCategory = (index, direction) => {
    const newCats = [...(content.categories || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newCats.length) return;
    [newCats[index], newCats[targetIndex]] = [newCats[targetIndex], newCats[index]];
    setContent({ ...content, categories: newCats });
  };

  const handleUpdateCategory = (index, updates) => {
    const newCats = [...(content.categories || [])];
    newCats[index] = { ...newCats[index], ...updates };
    setContent({ ...content, categories: newCats });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave({
          ...section,
          content,
          settings
        });
      } else if (onUpdate) {
        await onUpdate(section.id, { content, settings });
      }
      addToast({ type: 'success', message: 'Category Carousel saved successfully!' });
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving Category Carousel:', error);
      addToast({ type: 'error', message: error.message || 'Failed to save Category Carousel' });
    } finally {
      setIsSaving(false);
    }
  };

  // Derived state to get full category details from context
  const resolvedCategories = useMemo(() => {
    if (!content.categories) return [];
    return content.categories.map(catItem => {
      const globalCat = getCategoryById(catItem.id);
      return {
        ...globalCat,
        ...catItem,
        globalName: globalCat?.name || 'Unknown Category',
        globalImage: globalCat?.image || globalCat?.bannerImage || ''
      };
    });
  }, [content.categories, getCategoryById]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F9FAFB] flex flex-col font-sans">
      <CategorySelectorModal 
        isOpen={isSelectorOpen} 
        onClose={() => setIsSelectorOpen(false)} 
        onAddCategories={handleAddCategory}
        existingCategoryIds={(content.categories || []).map(c => c.id)}
      />

      {/* Top Navigation Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 font-medium cursor-pointer hover:text-gray-900" onClick={onClose}>{pageName || 'Page Builder'}</div>
          <div className="text-gray-300 text-sm">&gt;</div>
          <div className="text-sm text-gray-900 font-semibold">Category Carousel</div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <FiEye size={16} />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-5 py-2 text-sm font-semibold text-white bg-[#4F46E5] rounded-lg transition-colors shadow-sm flex items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#4338CA]'}`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Center Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-12 bg-[#F9FAFB] flex items-start justify-center">
          <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden relative min-h-[500px]">
            <div className="absolute top-0 inset-x-0 h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
                  <FiImage size={14} />
                </div>
                <span className="text-sm font-bold text-gray-900">Category Carousel</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">CATEGORY_CAROUSEL</span>
              </div>
            </div>

            <div className="mt-14 pointer-events-none w-full h-full">
              {CategoryCarouselSection ? (
                <CategoryCarouselSection data={{ content, settings }} />
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
              <div className="p-6 space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">Section Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all outline-none"
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    placeholder="Popular Furniture"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800">Selected Categories</label>
                  
                  <div className="space-y-2">
                    {resolvedCategories.map((cat, index) => (
                      <div key={cat.id} className="group border border-gray-100 hover:border-gray-200 bg-white rounded-lg p-2 flex gap-3 transition-all items-center">
                        <div className="flex flex-col justify-center text-gray-300 cursor-grab active:cursor-grabbing">
                          <button onClick={() => moveCategory(index, -1)} className="hover:text-gray-600"><GripVertical size={14} /></button>
                        </div>

                        <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative group/img">
                          <CategoryImage 
                            src={cat.image || cat.globalImage}
                            categoryName={cat.globalName || cat.name}
                            alt={cat.globalName || cat.name}
                            className="w-full h-full object-cover"
                          />
                          <label className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 cursor-pointer transition-opacity">
                            <FiImage size={12} />
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleUpdateCategory(index, { image: URL.createObjectURL(file) });
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                             <div className="text-sm font-semibold text-gray-900 truncate">{cat.globalName}</div>
                        </div>

                        <button onClick={() => removeCategory(index)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsSelectorOpen(true)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#5946ff] bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors mt-4 py-2.5 px-4 w-full justify-center"
                  >
                    <FiPlus size={16} /> Add Category
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Settings' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="text-sm font-bold text-gray-900">Carousel Settings</span>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setActiveDevice('desktop')} className={cn("p-1.5 rounded-md transition-colors", activeDevice === 'desktop' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700")}><FiMonitor size={14} /></button>
                    <button onClick={() => setActiveDevice('tablet')} className={cn("p-1.5 rounded-md transition-colors", activeDevice === 'tablet' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700")}><FiTablet size={14} /></button>
                    <button onClick={() => setActiveDevice('mobile')} className={cn("p-1.5 rounded-md transition-colors", activeDevice === 'mobile' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700")}><FiSmartphone size={14} /></button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">Items Per View</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                    value={settings[getPropName('itemsPerView')] || 5}
                    onChange={(e) => setSettings({ ...settings, [getPropName('itemsPerView')]: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">Arrow Visibility</label>
                    <select
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                      value={settings.arrowVisibility || (settings.showArrows === false ? 'hidden' : 'hover')}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSettings({ 
                          ...settings, 
                          arrowVisibility: val,
                          showArrows: val !== 'hidden' // for backwards compatibility
                        });
                      }}
                    >
                      <option value="always">Always Show</option>
                      <option value="hover">Show on Hover</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">Auto Play</span>
                    <input
                      type="checkbox"
                      checked={settings.autoPlay !== false}
                      onChange={(e) => setSettings({ ...settings, autoPlay: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5946ff] relative"></div>
                  </label>

                  {settings.autoPlay !== false && (
                    <div className="space-y-2 pl-4 border-l-2 border-gray-100">
                      <label className="text-xs font-semibold text-gray-600">Auto Play Speed (ms)</label>
                      <input
                        type="number"
                        min="500"
                        step="500"
                        className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none"
                        value={settings.autoPlaySpeed || 3000}
                        onChange={(e) => setSettings({ ...settings, autoPlaySpeed: Number(e.target.value) })}
                      />
                    </div>
                  )}

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">Loop</span>
                    <input
                      type="checkbox"
                      checked={settings.loop !== false}
                      onChange={(e) => setSettings({ ...settings, loop: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5946ff] relative"></div>
                  </label>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-semibold text-gray-800">Spacing Between Cards (px)</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                      value={settings.spacing ?? 20}
                      onChange={(e) => setSettings({ ...settings, spacing: Number(e.target.value) })}
                    />
                  </div>

                  {/* Block Padding */}
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Block Padding <span className="text-gray-400">(px)</span></span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: 'Top', key: 'textPaddingTop' },
                        { label: 'Right', key: 'textPaddingRight' },
                        { label: 'Bottom', key: 'textPaddingBottom' },
                        { label: 'Left', key: 'textPaddingLeft' },
                      ].map(({ label, key }) => (
                        <div key={key}>
                          <span className="text-[9px] text-gray-400 block text-center mb-0.5">{label}</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={settings[getPropName(key)] || ''}
                            onChange={(e) => setSettings({ ...settings, [getPropName(key)]: e.target.value })}
                            className="w-full border border-gray-300 rounded px-1.5 py-1.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Block Margin */}
                  <div className="pt-2 mt-2">
                    <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Block Margin <span className="text-gray-400">(px)</span></span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: 'Top', key: 'textMarginTop' },
                        { label: 'Right', key: 'textMarginRight' },
                        { label: 'Bottom', key: 'textMarginBottom' },
                        { label: 'Left', key: 'textMarginLeft' },
                      ].map(({ label, key }) => (
                        <div key={key}>
                          <span className="text-[9px] text-gray-400 block text-center mb-0.5">{label}</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={settings[getPropName(key)] || ''}
                            onChange={(e) => setSettings({ ...settings, [getPropName(key)]: e.target.value })}
                            className="w-full border border-gray-300 rounded px-1.5 py-1.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
