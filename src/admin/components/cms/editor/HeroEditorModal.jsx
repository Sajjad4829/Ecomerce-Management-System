import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEye, FiSave, FiMoreVertical, FiPlus, FiMinus, FiTrash2, 
  FiImage, FiUploadCloud, FiFolder, FiChevronDown, FiSettings, FiX,
  FiMonitor, FiTablet, FiSmartphone
} from 'react-icons/fi';
import { GripVertical } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import HeroSection from '../../../../storefront/components/home/HeroSection';
import { useToast } from '../../../../components/ui/Toast/ToastContext';

export default function HeroEditorModal({ section, onUpdate, onClose }) {
  const { addToast } = useToast();
  const [slides, setSlides] = useState([]);
  const [activeSlideId, setActiveSlideId] = useState(null);
  const [activeDevice, setActiveDevice] = useState('desktop');

  const getPropName = (baseProp) => activeDevice === 'desktop' ? baseProp : `${baseProp}_${activeDevice}`;
  
  const [settings, setSettings] = useState({
    autoplay: true,
    autoplaySpeed: 5,
    transitionEffect: 'Fade',
    showDots: true,
    showArrows: false,
    infiniteLoop: true
  });

  useEffect(() => {
    // Initialize state from section data
    const initialSlides = section?.content?.slides || [];
    setSlides(initialSlides);
    if (initialSlides.length > 0) {
      setActiveSlideId(initialSlides[0].id || 0); // Handle if slides don't have IDs yet
    }
    
    if (section?.settings) {
      setSettings(prev => ({ ...prev, ...section.settings }));
    }
  }, [section]);

  const activeSlideIndex = slides.findIndex((s, idx) => (s.id || idx) === activeSlideId);
  const activeSlide = activeSlideIndex >= 0 ? slides[activeSlideIndex] : null;

  const handleUpdateActiveSlide = (updates) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex] = { ...activeSlide, ...updates };
    setSlides(newSlides);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions
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

          // Compress to webp at 60% quality to ensure it fits in localStorage
          const dataUrl = canvas.toDataURL('image/webp', 0.6);
          handleUpdateActiveSlide({ image: dataUrl });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide',
      subtitle: '',
      subtitle2: '',
      ctaText: '',
      ctaLink: '',
      image: '',
      active: true
    };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newSlide.id);
  };

  const handleDeleteSlide = (indexToDelete) => {
    const newSlides = slides.filter((_, idx) => idx !== indexToDelete);
    setSlides(newSlides);
    if (activeSlideIndex === indexToDelete && newSlides.length > 0) {
      setActiveSlideId(newSlides[0].id || 0);
    }
  };

  const handleSave = () => {
    const updatedData = {
      image: slides.length > 0 && slides[0].image ? slides[0].image : section.image,
      content: {
        ...(section.content || {}),
        slides: slides
      },
      settings: {
        ...(section.settings || {}),
        ...settings
      }
    };

    const isChanged = JSON.stringify({
      image: section.image,
      content: section.content,
      settings: section.settings
    }) !== JSON.stringify({
      image: updatedData.image,
      content: updatedData.content,
      settings: updatedData.settings
    });

    if (isChanged) {
      addToast({ type: 'success', message: 'Hero Section updated successfully!' });
    } else {
      addToast({ type: 'info', message: 'No changes detected.' });
    }

    onUpdate(updatedData);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          className="bg-[#F8FAFC] w-full max-w-7xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/10"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Hero Section Editor</h1>
              <p className="text-xs text-gray-500 mt-1">Manage slides and settings for this layout.</p>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1 mx-4">
              <button
                onClick={() => setActiveDevice('desktop')}
                className={cn(
                  "p-1.5 rounded-md transition-colors flex items-center gap-2 text-xs font-medium",
                  activeDevice === 'desktop' ? "bg-white shadow-sm text-[#5946ff]" : "text-gray-500 hover:text-gray-700"
                )}
                title="Desktop"
              >
                <FiMonitor size={14} /> <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setActiveDevice('tablet')}
                className={cn(
                  "p-1.5 rounded-md transition-colors flex items-center gap-2 text-xs font-medium",
                  activeDevice === 'tablet' ? "bg-white shadow-sm text-[#5946ff]" : "text-gray-500 hover:text-gray-700"
                )}
                title="Tablet"
              >
                <FiTablet size={14} /> <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setActiveDevice('mobile')}
                className={cn(
                  "p-1.5 rounded-md transition-colors flex items-center gap-2 text-xs font-medium",
                  activeDevice === 'mobile' ? "bg-white shadow-sm text-[#5946ff]" : "text-gray-500 hover:text-gray-700"
                )}
                title="Mobile"
              >
                <FiSmartphone size={14} /> <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm"
              >
                <FiX size={16} />
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 bg-[#5946ff] text-white font-medium rounded-lg hover:bg-[#4335cc] transition-colors flex items-center gap-2 text-sm shadow-sm"
              >
                <FiSave size={16} />
                Save Changes
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Sidebar & Settings */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Slides List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900 text-base">Slides</h2>
                  </div>
                  <div className="p-3 space-y-2">
                    {slides.map((slide, index) => {
                      const isActive = (slide.id || index) === activeSlideId;
                      return (
                        <div 
                          key={slide.id || index}
                          onClick={() => setActiveSlideId(slide.id || index)}
                          className={cn(
                            "flex items-center p-2 rounded-lg cursor-pointer transition-all border",
                            isActive 
                              ? "border-[#5946ff]/30 bg-[#5946ff]/5 shadow-sm" 
                              : "border-transparent bg-white hover:border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          <div className="text-gray-400 mr-2 cursor-grab active:cursor-grabbing hover:text-gray-600 transition-colors">
                            <GripVertical size={14} />
                          </div>
                          
                          <div className="w-10 h-7 rounded bg-gray-200 mr-3 overflow-hidden shrink-0 border border-black/5">
                            {slide.image ? (
                              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <FiImage size={12} />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0 mr-3">
                            <div className="flex items-center gap-2">
                              <span className={cn("text-[10px] font-bold", isActive ? "text-[#5946ff]" : "text-gray-500")}>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="text-xs font-medium text-gray-900 truncate">
                                {slide.title || 'Untitled'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded",
                              slide.active !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                            )}>
                              {slide.active !== false ? 'Active' : 'Inactive'}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors">
                              <FiMoreVertical size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    
                    <button 
                      onClick={handleAddSlide}
                      className="w-full py-2.5 mt-2 border border-dashed border-[#5946ff]/30 rounded-lg text-[#5946ff] text-xs font-medium hover:bg-[#5946ff]/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiPlus size={14} />
                      Add New Slide
                    </button>
                  </div>
                </div>

                {/* Hero Settings */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900 text-base">Hero Settings</h2>
                  </div>
                  <div className="p-5 space-y-5">
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700 font-medium">Autoplay</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.autoplay} onChange={(e) => setSettings({...settings, autoplay: e.target.checked})} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5946ff]"></div>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-700 font-medium">Autoplay Speed</span>
                        <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">{settings.autoplaySpeed} sec</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={settings.autoplaySpeed}
                        onChange={(e) => setSettings({...settings, autoplaySpeed: Number(e.target.value)})}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5946ff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-700 font-medium block">Transition Effect</label>
                      <div className="relative">
                        <select 
                          value={settings.transitionEffect}
                          onChange={(e) => setSettings({...settings, transitionEffect: e.target.value})}
                          className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5946ff]/50 focus:border-[#5946ff] transition-shadow"
                        >
                          <option value="Fade">Fade</option>
                          <option value="Slide">Slide</option>
                          <option value="None">None</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-700 font-medium block">Overlay Opacity</span>
                        <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">{Math.round((parseFloat(settings.overlayOpacity) || 0.2) * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSettings({...settings, overlayOpacity: Math.max(0, (parseFloat(settings.overlayOpacity) || 0.2) - 0.1).toFixed(1)})}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                        >
                          <FiMinus size={14} />
                        </button>
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.1"
                          value={parseFloat(settings.overlayOpacity) || 0.2}
                          onChange={(e) => setSettings({...settings, overlayOpacity: e.target.value})}
                          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5946ff]"
                        />
                        <button 
                          onClick={() => setSettings({...settings, overlayOpacity: Math.min(1, (parseFloat(settings.overlayOpacity) || 0.2) + 0.1).toFixed(1)})}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Divider Line Settings */}
                    <div className="pt-4 border-t border-gray-100 mt-4 mb-4 space-y-4">
                      <span className="text-xs text-gray-900 font-bold mb-3 block">Title Divider Line</span>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-700 font-medium">Show Title Line</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={settings.showTitleLine !== false} onChange={(e) => setSettings({...settings, showTitleLine: e.target.checked})} />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5946ff]"></div>
                        </label>
                      </div>

                      {settings.showTitleLine !== false && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Line Width (px)</span>
                            <input 
                              type="number" 
                              placeholder="Auto" 
                              value={settings.titleLineWidth || ''} 
                              onChange={(e) => setSettings({...settings, titleLineWidth: e.target.value})} 
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]" 
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Line Stroke (px)</span>
                            <input 
                              type="number" 
                              placeholder="1" 
                              value={settings.titleLineStroke || ''} 
                              onChange={(e) => setSettings({...settings, titleLineStroke: e.target.value})} 
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]" 
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Line Color</span>
                            <div className="flex gap-1 items-center">
                              <input 
                                type="color"
                                value={settings.titleLineColor || '#ffffff'}
                                onChange={(e) => setSettings({ ...settings, titleLineColor: e.target.value })}
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                              />
                              <input 
                                type="text"
                                placeholder="rgba(255,255,255,0.5)"
                                value={settings.titleLineColor || ''}
                                onChange={(e) => setSettings({ ...settings, titleLineColor: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4 mb-4 space-y-4">
                      <span className="text-xs text-gray-900 font-bold mb-3 block">Subtitle Divider Line</span>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-700 font-medium">Show Subtitle Line</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={settings.showSubtitleLine !== false} onChange={(e) => setSettings({...settings, showSubtitleLine: e.target.checked})} />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5946ff]"></div>
                        </label>
                      </div>

                      {settings.showSubtitleLine !== false && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Line Width (px)</span>
                            <input 
                              type="number" 
                              placeholder="Auto" 
                              value={settings.subtitleLineWidth || ''} 
                              onChange={(e) => setSettings({...settings, subtitleLineWidth: e.target.value})} 
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]" 
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Line Stroke (px)</span>
                            <input 
                              type="number" 
                              placeholder="1" 
                              value={settings.subtitleLineStroke || ''} 
                              onChange={(e) => setSettings({...settings, subtitleLineStroke: e.target.value})} 
                              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]" 
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Line Color</span>
                            <div className="flex gap-1 items-center">
                              <input 
                                type="color"
                                value={settings.subtitleLineColor || '#5946ff'}
                                onChange={(e) => setSettings({ ...settings, subtitleLineColor: e.target.value })}
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                              />
                              <input 
                                type="text"
                                placeholder="#5946ff"
                                value={settings.subtitleLineColor || ''}
                                onChange={(e) => setSettings({ ...settings, subtitleLineColor: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700 font-medium">Show Dots</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.showDots} onChange={(e) => setSettings({...settings, showDots: e.target.checked})} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5946ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700 font-medium">Show Arrows</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.showArrows} onChange={(e) => setSettings({...settings, showArrows: e.target.checked})} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5946ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700 font-medium">Infinite Loop</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.infiniteLoop} onChange={(e) => setSettings({...settings, infiniteLoop: e.target.checked})} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5946ff]"></div>
                      </label>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mb-4 space-y-4">
                      <span className="text-xs text-gray-900 font-bold mb-3 block">Hero Dimensions</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Hero Height <span className="text-gray-400">(px, %, vh)</span></span>
                          <input 
                            type="text" 
                            list="height-options"
                            placeholder="" 
                            value={settings[getPropName('heroHeight')] || ''} 
                            onChange={(e) => setSettings({...settings, [getPropName('heroHeight')]: e.target.value})} 
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]" 
                          />
                          <datalist id="height-options">
                            <option value="100vh">Full Screen Height</option>
                            <option value="80vh">Large (80vh)</option>
                            <option value="600px">Medium (600px)</option>
                            <option value="400px">Small (400px)</option>
                          </datalist>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Hero Width <span className="text-gray-400">(px, %, vw)</span></span>
                          <input 
                            type="text" 
                            list="width-options"
                            placeholder="" 
                            value={settings[getPropName('heroWidth')] || ''} 
                            onChange={(e) => setSettings({...settings, [getPropName('heroWidth')]: e.target.value})} 
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]" 
                          />
                          <datalist id="width-options">
                            <option value="100%">Full Width (100%)</option>
                            <option value="1400px">Extra Wide (1400px)</option>
                            <option value="1200px">Boxed (1200px)</option>
                            <option value="1000px">Narrow (1000px)</option>
                          </datalist>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-900 font-bold block">Text Content Position & Typography</span>
                      </div>

                      <div className="space-y-4">
                        {/* Block Padding */}
                        <div>
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
                        <div>
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

                        {/* Title Margin */}
                        <div>
                          <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Title Margin <span className="text-gray-400">(px)</span></span>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { label: 'Top', key: 'titleMarginTop' },
                              { label: 'Right', key: 'titleMarginRight' },
                              { label: 'Bottom', key: 'titleMarginBottom' },
                              { label: 'Left', key: 'titleMarginLeft' },
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

                        {/* Subtitle Margin */}
                        <div>
                          <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Subtitle Margin <span className="text-gray-400">(px)</span></span>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { label: 'Top', key: 'subtitleMarginTop' },
                              { label: 'Right', key: 'subtitleMarginRight' },
                              { label: 'Bottom', key: 'subtitleMarginBottom' },
                              { label: 'Left', key: 'subtitleMarginLeft' },
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

                      <div className="pt-4 mt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-900 font-bold mb-3 block">Typography Settings</span>
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Title Font</label>
                              <select 
                                value={settings[getPropName('titleFontFamily')] || ''}
                                onChange={(e) => setSettings({ ...settings, [getPropName('titleFontFamily')]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              >
                                <option value="">Theme Default</option>
                                <option value="font-['Montserrat']">Montserrat</option>
                                <option value="font-['Poppins']">Poppins</option>
                                <option value="font-['Roboto']">Roboto</option>
                                <option value="font-['Playfair_Display']">Playfair</option>
                                <option value="font-sans">System Sans</option>
                                <option value="font-serif">System Serif</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Title Weight</label>
                              <select 
                                value={settings[getPropName('titleFontWeight')] || ''}
                                onChange={(e) => setSettings({ ...settings, [getPropName('titleFontWeight')]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              >
                                <option value="">Theme Default</option>
                                <option value="font-light">Light (300)</option>
                                <option value="font-normal">Normal (400)</option>
                                <option value="font-medium">Medium (500)</option>
                                <option value="font-bold">Bold (700)</option>
                                <option value="font-black">Black (900)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Title Size</label>
                              <input 
                                type="text"
                                value={settings[getPropName('titleFontSize')] || ''}
                                onChange={(e) => setSettings({ ...settings, [getPropName('titleFontSize')]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Title Color</label>
                              <div className="flex gap-1 items-center">
                                <input 
                                  type="color"
                                  value={settings[getPropName('titleColor')] || '#ffffff'}
                                  onChange={(e) => setSettings({ ...settings, [getPropName('titleColor')]: e.target.value })}
                                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                  type="text"
                                  placeholder="#ffffff"
                                  value={settings[getPropName('titleColor')] || ''}
                                  onChange={(e) => setSettings({ ...settings, [getPropName('titleColor')]: e.target.value })}
                                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Subtitle Font</label>
                              <select 
                                value={settings[getPropName('subtitleFontFamily')] || ''}
                                onChange={(e) => setSettings({ ...settings, [getPropName('subtitleFontFamily')]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              >
                                <option value="">Theme Default</option>
                                <option value="font-['Montserrat']">Montserrat</option>
                                <option value="font-['Poppins']">Poppins</option>
                                <option value="font-['Roboto']">Roboto</option>
                                <option value="font-['Playfair_Display']">Playfair</option>
                                <option value="font-sans">System Sans</option>
                                <option value="font-serif">System Serif</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Subtitle Weight</label>
                              <select 
                                value={settings[getPropName('subtitleFontWeight')] || ''}
                                onChange={(e) => setSettings({ ...settings, [getPropName('subtitleFontWeight')]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              >
                                <option value="">Theme Default</option>
                                <option value="font-light">Light (300)</option>
                                <option value="font-normal">Normal (400)</option>
                                <option value="font-medium">Medium (500)</option>
                                <option value="font-bold">Bold (700)</option>
                                <option value="font-black">Black (900)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Subtitle Size</label>
                              <input 
                                type="text"
                                value={settings[getPropName('subtitleFontSize')] || ''}
                                onChange={(e) => setSettings({ ...settings, [getPropName('subtitleFontSize')]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-gray-600 block mb-1">Subtitle Color</label>
                              <div className="flex gap-1 items-center">
                                <input 
                                  type="color"
                                  value={settings[getPropName('subtitleColor')] || '#ffffff'}
                                  onChange={(e) => setSettings({ ...settings, [getPropName('subtitleColor')]: e.target.value })}
                                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                  type="text"
                                  placeholder="#ffffff"
                                  value={settings[getPropName('subtitleColor')] || ''}
                                  onChange={(e) => setSettings({ ...settings, [getPropName('subtitleColor')]: e.target.value })}
                                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Edit Active Slide */}
              <div className="lg:col-span-8">
                <div className="sticky top-0 max-h-[calc(90vh-140px)] flex flex-col overflow-y-auto custom-scrollbar rounded-xl">
                  {activeSlide ? (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col shrink-0">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h2 className="font-semibold text-gray-900 text-base">Edit Slide</h2>
                        <span className={cn(
                          "text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded",
                          activeSlide.active !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        )}>
                          {activeSlide.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleDeleteSlide(activeSlideIndex)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          title="Delete Slide"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-6 flex-1">
                      {/* Form Grid */}
                      <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-xs font-medium text-gray-700">Slide Title</label>
                          <input 
                            type="text" 
                            value={activeSlide.title || ''}
                            onChange={(e) => handleUpdateActiveSlide({ title: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]/50 focus:border-[#5946ff] transition-shadow" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-700">Slide Subtitle</label>
                          <input 
                            type="text" 
                            value={activeSlide.subtitle2 || activeSlide.subtitle || ''}
                            onChange={(e) => handleUpdateActiveSlide({ subtitle2: e.target.value, subtitle: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]/50 focus:border-[#5946ff] transition-shadow" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-700">Phone Number</label>
                          <input 
                            type="text" 
                            value={activeSlide.phoneNumber || ''}
                            onChange={(e) => handleUpdateActiveSlide({ phoneNumber: e.target.value })}
                            placeholder="e.g. 09 678 7777 77"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5946ff]/50 focus:border-[#5946ff] transition-shadow" 
                          />
                        </div>
                      </div>



                      {/* Image Preview & Live Editor */}
                      <div className="space-y-1.5 pt-4 border-t border-gray-100 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-gray-700">Slide Image & Live Preview</label>
                          <label className="cursor-pointer px-3 py-1.5 bg-[#5946ff] text-white text-[10px] font-medium rounded hover:bg-[#4b3be0] transition-colors flex items-center gap-1.5 shadow-sm">
                            <FiUploadCloud size={12} />
                            Upload Image
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        
                        <div className="relative w-full h-[350px] bg-gray-100 rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
                          {activeSlide.image ? (
                            <div className="w-full h-full relative overflow-hidden pointer-events-none bg-gray-100">
                              <div 
                                className="absolute top-0" 
                                style={{ 
                                  transformOrigin: activeDevice === 'desktop' ? 'top left' : 'top center',
                                  left: activeDevice === 'desktop' ? '0' : '50%',
                                  marginLeft: activeDevice === 'mobile' ? '-225px' : activeDevice === 'tablet' ? '-384px' : '0',
                                  width: activeDevice === 'mobile' ? '450px' : activeDevice === 'tablet' ? '768px' : '200%',
                                  height: activeDevice === 'desktop' ? '700px' : 'auto',
                                  transform: activeDevice === 'desktop' ? 'scale(0.5)' : 'scale(0.9) translateY(10%)',
                                  backgroundColor: '#fff',
                                  boxShadow: activeDevice !== 'desktop' ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
                                  borderRadius: activeDevice !== 'desktop' ? '12px' : '0'
                                }}
                              >
                                <HeroSection 
                                  viewport={activeDevice}
                                  data={{ 
                                    content: { slides: slides }, 
                                    settings: settings 
                                  }} 
                                />
                              </div>
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-auto">
                                <label className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
                                  <FiUploadCloud size={14} />
                                  Change Image
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center text-gray-400 hover:text-[#5946ff] transition-colors h-full w-full cursor-pointer bg-white">
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <FiUploadCloud size={32} className="mb-3" />
                              <p className="text-xs font-medium">Click to upload image</p>
                              <p className="text-[10px] opacity-70 mt-1">Recommended size: 1920x1080px</p>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center h-full min-h-[400px]">
                    <FiImage size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium text-sm">No slide selected</p>
                    <p className="text-gray-400 text-xs mt-1">Select a slide from the left or add a new one.</p>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
