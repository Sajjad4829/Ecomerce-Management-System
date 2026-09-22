import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEye, FiSave, FiMoreVertical, FiPlus, FiMinus, FiTrash2, 
  FiImage, FiUploadCloud, FiFolder, FiChevronDown, FiSettings, FiX, FiLayout,
  FiMonitor, FiTablet, FiSmartphone
} from 'react-icons/fi';
import { GripVertical } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export default function FeaturedShowcaseEditorModal({ section, onUpdate, onClose }) {
  const [items, setItems] = useState([]);
  const [activeDevice, setActiveDevice] = useState('desktop');
  
  const getPropName = (baseProp) => activeDevice === 'desktop' ? baseProp : `${baseProp}_${activeDevice}`;

  const parseSpacing = (val) => {
    if (!val || ['Small', 'Medium', 'Large', 'None'].includes(val)) return { t: '', r: '', b: '', l: '' };
    
    const parts = val.split(' ').filter(Boolean);
    if (parts.length === 1) return { t: parts[0], r: parts[0], b: parts[0], l: parts[0] };
    if (parts.length === 2) return { t: parts[0], r: parts[1], b: parts[0], l: parts[1] };
    if (parts.length === 3) return { t: parts[0], r: parts[1], b: parts[2], l: parts[1] };
    if (parts.length >= 4) return { t: parts[0], r: parts[1], b: parts[2], l: parts[3] };
    return { t: '', r: '', b: '', l: '' };
  };
  
  const getTextPosition = () => {
    let pos = settings[getPropName('layoutDirection')];
    if (!pos) pos = activeDevice === 'mobile' ? 'top' : 'left';
    if (pos === 'row') return 'left';
    if (pos === 'column') return 'top';
    return pos;
  };

  const getContentAlignment = () => {
    let align = settings[getPropName('contentAlignment')];
    if (align) return align;
    // Fallback based on text position
    if (getTextPosition() === 'top' || getTextPosition() === 'bottom') return 'center';
    return 'left';
  };
  
  const formatFontSize = (val) => {
    if (!val) return undefined;
    if (!isNaN(val)) return `${val}px`;
    return val;
  };
  
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaUrl: '',
    isActive: true
  });

  const [settings, setSettings] = useState({
    gridColsDesktop: '3',
    gridColsTablet: '2',
    gridColsMobile: '1',
    imageRatio: 'Square (1:1)',
    backgroundColor: '#ffffff',
    sectionPadding: '',
    sectionPadding_tablet: '',
    sectionPadding_mobile: '',
    sectionMargin: '',
    sectionMargin_tablet: '',
    sectionMargin_mobile: '',
    titleFontFamily: 'Inter',
    titleFontFamily_tablet: 'Inter',
    titleFontFamily_mobile: 'Inter',
    titleFontSize: '',
    titleFontSize_tablet: '',
    titleFontSize_mobile: '',
    subtitleFontFamily: 'Inter',
    subtitleFontFamily_tablet: 'Inter',
    subtitleFontFamily_mobile: 'Inter',
    subtitleFontSize: '',
    subtitleFontSize_tablet: '',
    subtitleFontSize_mobile: '',
  });
  
  useEffect(() => {
    // Initialize state from section data
    const initialItems = section?.content?.items || [];
    setItems(initialItems);
    
    if (section?.content) {
      setContent({
        title: section.content.title || '',
        subtitle: section.content.subtitle || '',
        ctaText: section.content.ctaText || '',
        ctaUrl: section.content.ctaUrl || '',
        isActive: section.content.isActive !== false // default true
      });
    }

    if (section?.settings) {
      setSettings({
        gridColsDesktop: section.settings.gridColsDesktop || '3',
        gridColsTablet: section.settings.gridColsTablet || '2',
        gridColsMobile: section.settings.gridColsMobile || '1',
        imageRatio: section.settings.imageRatio || 'Square (1:1)',
        backgroundColor: section.settings.backgroundColor || '#ffffff',
        sectionPadding: section.settings.sectionPadding || '',
        sectionPadding_tablet: section.settings.sectionPadding_tablet || '',
        sectionPadding_mobile: section.settings.sectionPadding_mobile || '',
        sectionMargin: section.settings.sectionMargin || '',
        sectionMargin_tablet: section.settings.sectionMargin_tablet || '',
        sectionMargin_mobile: section.settings.sectionMargin_mobile || '',
        titleFontFamily: section.settings.titleFontFamily || 'Inter',
        titleFontFamily_tablet: section.settings.titleFontFamily_tablet || section.settings.titleFontFamily || 'Inter',
        titleFontFamily_mobile: section.settings.titleFontFamily_mobile || section.settings.titleFontFamily || 'Inter',
        titleFontSize: section.settings.titleFontSize || '',
        titleFontSize_tablet: section.settings.titleFontSize_tablet || '',
        titleFontSize_mobile: section.settings.titleFontSize_mobile || '',
        subtitleFontFamily: section.settings.subtitleFontFamily || 'Inter',
        subtitleFontFamily_tablet: section.settings.subtitleFontFamily_tablet || section.settings.subtitleFontFamily || 'Inter',
        subtitleFontFamily_mobile: section.settings.subtitleFontFamily_mobile || section.settings.subtitleFontFamily || 'Inter',
        subtitleFontSize: section.settings.subtitleFontSize || '',
        subtitleFontSize_tablet: section.settings.subtitleFontSize_tablet || '',
        subtitleFontSize_mobile: section.settings.subtitleFontSize_mobile || '',
      });
    }
  }, [section]);

  const handleUpdateItem = (index, updates) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/webp', 0.6);
          handleUpdateItem(index, { imageUrl: dataUrl });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'New Item',
      link: '',
      imageUrl: '',
      active: true
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (indexToDelete) => {
    const newItems = items.filter((_, idx) => idx !== indexToDelete);
    setItems(newItems);
  };

  const handleSave = () => {
    const sortedItems = [...items]
      .map((item, idx) => ({ ...item, order: item.order !== undefined ? item.order : idx + 1 }))
      .sort((a, b) => a.order - b.order);

    onUpdate(section.id, {
      content: {
        ...(section.content || {}),
        ...content,
        items: sortedItems
      },
      settings: {
        ...(section.settings || {}),
        ...settings
      }
    });
    onClose();
  };

  // Preview Render Logic
  const getGridColsClass = () => {
    let cols = '1';
    if (activeDevice === 'desktop') cols = settings[getPropName('gridCols')] || settings.gridColsDesktop || '3';
    else if (activeDevice === 'tablet') cols = settings[getPropName('gridCols')] || settings.gridColsTablet || '2';
    else if (activeDevice === 'mobile') cols = settings[getPropName('gridCols')] || settings.gridColsMobile || '1';
    
    return `grid gap-2 grid-cols-${cols}`;
  };

  const getAspectRatioClass = () => {
    switch (settings.imageRatio) {
      case 'Portrait (3:4)': return 'aspect-[3/4]';
      case 'Landscape (16:9)': return 'aspect-video';
      case 'Square (1:1)':
      default: return 'aspect-square';
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#f8fafc] overflow-y-auto w-full h-full flex flex-col font-sans"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Edit Showcase Section</h1>
            <div className="text-[11px] font-medium text-gray-500 mt-1 flex items-center gap-2">
              <span>Dashboard</span>
              <span className="text-gray-300">&gt;</span>
              <span>Page Sections</span>
              <span className="text-gray-300">&gt;</span>
              <span>Showcase</span>
              <span className="text-gray-300">&gt;</span>
              <span className="text-[#5946ff]">Edit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
              Preview
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-[#5946ff] text-white font-medium rounded-lg hover:bg-[#4335cc] transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 max-w-[1600px] mx-auto w-full space-y-6">
          {/* Top 3 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Col 1: Section Information */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 text-sm">Section Information</h2>
                <button className="text-gray-400 hover:text-gray-600"><FiMoreVertical size={16} /></button>
              </div>
              <div className="p-5 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Title (For Admin)</label>
                  <input 
                    type="text" 
                    value={content.title}
                    onChange={(e) => setContent({...content, title: e.target.value})}
                    placeholder="e.g. Creations with purpose"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Subtitle</label>
                  <input 
                    type="text" 
                    value={content.subtitle}
                    onChange={(e) => setContent({...content, subtitle: e.target.value})}
                    placeholder="e.g. Many choices based on your space"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Button Text</label>
                  <input 
                    type="text" 
                    value={content.ctaText}
                    onChange={(e) => setContent({...content, ctaText: e.target.value})}
                    placeholder="e.g. Explore Now"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Button Link</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={content.ctaUrl}
                      onChange={(e) => setContent({...content, ctaUrl: e.target.value})}
                      placeholder="/collections/all"
                      className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all" 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiSettings size={14} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Status</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setContent({...content, isActive: !content.isActive})}
                      className={cn(
                        "w-10 h-5 rounded-full relative transition-colors duration-200",
                        content.isActive ? "bg-[#5946ff]" : "bg-gray-300"
                      )}
                    >
                      <span className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-sm",
                        content.isActive ? "left-5" : "left-0.5"
                      )} />
                    </button>
                    <span className="text-sm font-medium text-gray-700">{content.isActive ? 'Active' : 'Hidden'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Preview Area */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 text-sm">Preview</h2>
              </div>
              <div className="flex-1 p-8 flex items-center justify-center bg-gray-50/50" style={{ backgroundColor: settings.backgroundColor }}>
                {/* Live Preview Canvas */}
                <div className={cn(
                  "bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300",
                  activeDevice === 'mobile' ? 'w-full max-w-[375px] p-6' : 
                  activeDevice === 'tablet' ? 'w-full max-w-[768px] p-8' : 
                  'w-full max-w-5xl p-10'
                )}>
                  <div className={cn(
                    (getTextPosition() === 'top' || getTextPosition() === 'bottom') 
                      ? "flex flex-col gap-6" 
                      : "grid grid-cols-12 gap-8 items-center"
                  )}>
                    {/* Left Text Side */}
                    <div className={cn(
                      (getTextPosition() === 'top' || getTextPosition() === 'bottom') ? "w-full space-y-3" : "col-span-5 space-y-4",
                      getTextPosition() === 'left' ? "order-1" : "",
                      getTextPosition() === 'right' ? "order-2" : "",
                      getTextPosition() === 'top' ? "order-1" : "",
                      getTextPosition() === 'bottom' ? "order-2" : "",
                      "flex flex-col",
                      getContentAlignment() === 'center' ? "text-center items-center" :
                      getContentAlignment() === 'right' ? "text-right items-end" :
                      "text-left items-start"
                    )}>
                      <h3 
                        className={cn(
                          "font-bold text-gray-900 leading-tight",
                          activeDevice === 'mobile' ? "text-2xl" : "text-3xl"
                        )}
                        style={{
                          fontFamily: settings[getPropName('titleFontFamily')] || 'Inter',
                          fontSize: formatFontSize(settings[getPropName('titleFontSize')])
                        }}
                      >
                        {content.title || 'Creations with purpose'}
                      </h3>
                      <p 
                        className="text-gray-500 text-sm leading-relaxed"
                        style={{
                          fontFamily: settings[getPropName('subtitleFontFamily')] || 'Inter',
                          fontSize: formatFontSize(settings[getPropName('subtitleFontSize')])
                        }}
                      >
                        {content.subtitle || 'Many choices based on your space'}
                      </p>
                      <button className={cn(
                        "text-sm font-bold text-gray-900 flex items-center gap-2 hover:opacity-70 transition-opacity pt-2",
                        (getTextPosition() === 'top' || getTextPosition() === 'bottom') && getContentAlignment() === 'center' ? "justify-center w-full" : ""
                      )}>
                        {content.ctaText || 'Explore Now'} <span className="text-lg">→</span>
                      </button>
                    </div>

                    {/* Right Images Side */}
                    <div className={cn(
                      (getTextPosition() === 'top' || getTextPosition() === 'bottom') ? "w-full" : "col-span-7",
                      (getTextPosition() === 'right' || getTextPosition() === 'bottom') ? "order-1" : "order-2"
                    )}>
                      <div className={getGridColsClass()}>
                        {[...items].map((item, idx) => ({ ...item, order: item.order !== undefined ? item.order : idx + 1 })).sort((a, b) => a.order - b.order).filter(i => i.active).slice(0, activeDevice === 'mobile' ? 4 : 6).map((item, idx) => (
                          <div key={item.id || idx} className={cn("bg-gray-100 overflow-hidden group relative", getAspectRatioClass())}>
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                                <FiImage size={24} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Layout Settings */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 text-sm">Layout Settings</h2>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveDevice('desktop')}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeDevice === 'desktop' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                      title="Desktop"
                    >
                      <FiMonitor size={14} />
                    </button>
                    <button
                      onClick={() => setActiveDevice('tablet')}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeDevice === 'tablet' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                      title="Tablet"
                    >
                      <FiTablet size={14} />
                    </button>
                    <button
                      onClick={() => setActiveDevice('mobile')}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeDevice === 'mobile' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                      title="Mobile"
                    >
                      <FiSmartphone size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Text Position</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setSettings({...settings, [getPropName('layoutDirection')]: 'left'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getTextPosition() === 'left' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Left
                      </button>
                      <button
                        onClick={() => setSettings({...settings, [getPropName('layoutDirection')]: 'right'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getTextPosition() === 'right' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Right
                      </button>
                      <button
                        onClick={() => setSettings({...settings, [getPropName('layoutDirection')]: 'top'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getTextPosition() === 'top' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Top
                      </button>
                      <button
                        onClick={() => setSettings({...settings, [getPropName('layoutDirection')]: 'bottom'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getTextPosition() === 'bottom' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Bottom
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Content Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSettings({...settings, [getPropName('contentAlignment')]: 'left'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getContentAlignment() === 'left' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Left
                      </button>
                      <button
                        onClick={() => setSettings({...settings, [getPropName('contentAlignment')]: 'center'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getContentAlignment() === 'center' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Center
                      </button>
                      <button
                        onClick={() => setSettings({...settings, [getPropName('contentAlignment')]: 'right'})}
                        className={cn(
                          "py-2 text-xs border rounded-lg transition-colors font-medium text-center",
                          getContentAlignment() === 'right' ? "border-[#5946ff] bg-[#5946ff]/5 text-[#5946ff]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        Right
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Grid Columns</label>
                    <input 
                      type="number"
                      min="1" max={activeDevice === 'desktop' ? "6" : activeDevice === 'tablet' ? "4" : "2"}
                      value={settings[getPropName('gridCols')] || (activeDevice === 'desktop' ? settings.gridColsDesktop : activeDevice === 'tablet' ? settings.gridColsTablet : settings.gridColsMobile) || '1'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSettings({...settings, [getPropName('gridCols')]: val});
                        // Backwards compatibility sync
                        if (activeDevice === 'desktop') setSettings(s => ({...s, gridColsDesktop: val, [getPropName('gridCols')]: val}));
                        if (activeDevice === 'tablet') setSettings(s => ({...s, gridColsTablet: val, [getPropName('gridCols')]: val}));
                        if (activeDevice === 'mobile') setSettings(s => ({...s, gridColsMobile: val, [getPropName('gridCols')]: val}));
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all" 
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Image Ratio</label>
                    <div className="relative">
                      <select 
                        value={settings[getPropName('imageRatio')] || settings.imageRatio}
                        onChange={(e) => setSettings({...settings, [getPropName('imageRatio')]: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white"
                      >
                        <option>Square (1:1)</option>
                        <option>Portrait (3:4)</option>
                        <option>Landscape (16:9)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FiChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 text-sm">Style Settings</h2>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveDevice('desktop')}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeDevice === 'desktop' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                      title="Desktop"
                    >
                      <FiMonitor size={14} />
                    </button>
                    <button
                      onClick={() => setActiveDevice('tablet')}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeDevice === 'tablet' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                      title="Tablet"
                    >
                      <FiTablet size={14} />
                    </button>
                    <button
                      onClick={() => setActiveDevice('mobile')}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeDevice === 'mobile' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                      title="Mobile"
                    >
                      <FiSmartphone size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Background Color</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color"
                        value={settings.backgroundColor}
                        onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                        className="w-9 h-9 p-0 border-0 rounded cursor-pointer shrink-0" 
                      />
                      <input 
                        type="text" 
                        value={settings.backgroundColor}
                        onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all uppercase" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Padding Inputs */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Padding</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['t', 'r', 'b', 'l'].map((dir, idx) => {
                          const parsed = parseSpacing(settings[getPropName('sectionPadding')] || '');
                          return (
                            <div key={`pad-${dir}`} className="flex flex-col gap-1">
                              <input 
                                type="text" 
                                value={parsed[dir]} 
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  const newParsed = { ...parsed, [dir]: newVal };
                                  const str = `${newParsed.t || '0px'} ${newParsed.r || '0px'} ${newParsed.b || '0px'} ${newParsed.l || '0px'}`;
                                  setSettings({...settings, [getPropName('sectionPadding')]: str});
                                }}
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white text-center"
                              />
                              <span className="text-[10px] font-medium text-gray-400 text-center uppercase">{dir}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Margin Inputs */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Margin</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['t', 'r', 'b', 'l'].map((dir, idx) => {
                          const parsed = parseSpacing(settings[getPropName('sectionMargin')] || '');
                          return (
                            <div key={`mar-${dir}`} className="flex flex-col gap-1">
                              <input 
                                type="text" 
                                value={parsed[dir]} 
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  const newParsed = { ...parsed, [dir]: newVal };
                                  const str = `${newParsed.t || '0px'} ${newParsed.r || '0px'} ${newParsed.b || '0px'} ${newParsed.l || '0px'}`;
                                  setSettings({...settings, [getPropName('sectionMargin')]: str});
                                }}
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white text-center"
                              />
                              <span className="text-[10px] font-medium text-gray-400 text-center uppercase">{dir}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Title Font Family</label>
                      <div className="relative">
                        <select 
                          value={settings[getPropName('titleFontFamily')] || 'Inter'}
                          onChange={(e) => setSettings({...settings, [getPropName('titleFontFamily')]: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white"
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Outfit">Outfit</option>
                          <option value="sans-serif">Sans Serif</option>
                          <option value="serif">Serif</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <FiChevronDown size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Title Font Size</label>
                      <div className="relative">
                        <input 
                          type="number"
                          placeholder="e.g. 36"
                          value={(settings[getPropName('titleFontSize')] || '').replace('px', '')}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSettings({...settings, [getPropName('titleFontSize')]: val ? `${val}px` : ''});
                          }}
                          className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium pointer-events-none">
                          px
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Subtitle Font Family</label>
                      <div className="relative">
                        <select 
                          value={settings[getPropName('subtitleFontFamily')] || 'Inter'}
                          onChange={(e) => setSettings({...settings, [getPropName('subtitleFontFamily')]: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white"
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Outfit">Outfit</option>
                          <option value="sans-serif">Sans Serif</option>
                          <option value="serif">Serif</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <FiChevronDown size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section Subtitle Font Size</label>
                      <div className="relative">
                        <input 
                          type="number"
                          placeholder="e.g. 16"
                          value={(settings[getPropName('subtitleFontSize')] || '').replace('px', '')}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSettings({...settings, [getPropName('subtitleFontSize')]: val ? `${val}px` : ''});
                          }}
                          className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff] transition-all bg-white"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium pointer-events-none">
                          px
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Table: Items / Images */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-base">Items / Images</h2>
              <button 
                onClick={handleAddItem}
                className="px-4 py-2 bg-[#5946ff] text-white text-xs font-semibold rounded-lg hover:bg-[#4335cc] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <FiPlus size={14} /> Add Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-4 text-[11px] font-semibold text-gray-600 uppercase tracking-wider w-20 text-center">Order</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-gray-600 uppercase tracking-wider w-24">Image</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Title (Optional)</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Link (Optional)</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-gray-600 uppercase tracking-wider w-24 text-center">Status</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-gray-600 uppercase tracking-wider w-20 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 text-center">
                        <input 
                          type="number"
                          value={item.order !== undefined ? item.order : index + 1}
                          onChange={(e) => handleUpdateItem(index, { order: parseInt(e.target.value) || 0 })}
                          className="w-16 border border-gray-200 rounded-lg px-2 py-2 text-center text-sm focus:outline-none focus:ring-1 focus:ring-[#5946ff] focus:border-[#5946ff] transition-all bg-white mx-auto"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <label className="w-14 h-14 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer hover:border-[#5946ff] hover:shadow-sm transition-all group relative block">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(index, e)}
                            className="hidden"
                          />
                          {item.imageUrl ? (
                            <>
                              <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <FiUploadCloud size={14} className="text-white" />
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-400 group-hover:text-[#5946ff]">
                              <FiImage size={20} />
                            </div>
                          )}
                        </label>
                      </td>
                      <td className="py-4 px-4">
                        <input 
                          type="text" 
                          value={item.title || ''}
                          onChange={(e) => handleUpdateItem(index, { title: e.target.value })}
                          placeholder="e.g. Bed"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5946ff] focus:border-[#5946ff] transition-all bg-white" 
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative">
                          <input 
                            type="text" 
                            value={item.link || ''}
                            onChange={(e) => handleUpdateItem(index, { link: e.target.value })}
                            placeholder="/collections/beds"
                            className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5946ff] focus:border-[#5946ff] transition-all bg-white" 
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                             <FiSettings size={12} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center align-middle">
                        <div className="flex items-center justify-center h-full pt-1">
                          <button 
                            onClick={() => handleUpdateItem(index, { active: !item.active })}
                            className={cn(
                              "w-10 h-5 rounded-full relative transition-colors duration-200",
                              item.active !== false ? "bg-[#5946ff]" : "bg-gray-300"
                            )}
                          >
                            <span className={cn(
                              "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-sm",
                              item.active !== false ? "left-5" : "left-0.5"
                            )} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center align-middle">
                        <div className="flex items-center justify-center h-full">
                          <button 
                            onClick={() => handleDeleteItem(index)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Item"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-500 text-sm">
                        No items added yet. Click "Add Item" to start building your grid.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
