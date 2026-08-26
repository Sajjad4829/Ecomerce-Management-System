import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEye, FiSave, FiMoreVertical, FiPlus, FiTrash2, 
  FiImage, FiUploadCloud, FiFolder, FiChevronDown, FiSettings
} from 'react-icons/fi';
import { GripVertical } from 'lucide-react';
import { cn } from '../../../utils/cn';

export default function HeroManager() {
  const [slides, setSlides] = useState([
    {
      id: 'slide-1',
      title: 'Dining Collection',
      subtitle: 'Made for creating tasty memories',
      subtitle2: 'Bundle of satisfaction',
      ctaText: 'Explore Collection',
      ctaLink: '/dining-collection',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      active: true
    },
    {
      id: 'slide-2',
      title: 'Living Room',
      subtitle: 'Comfort meets elegance',
      subtitle2: 'Premium quality',
      ctaText: 'Shop Now',
      ctaLink: '/living-room',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      active: true
    },
    {
      id: 'slide-3',
      title: 'Bedroom Comfort',
      subtitle: 'Rest easy',
      subtitle2: 'Nightly bliss',
      ctaText: 'View Collection',
      ctaLink: '/bedroom',
      image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      active: false
    },
    {
      id: 'slide-4',
      title: 'Premium Interior',
      subtitle: 'Elevate your space',
      subtitle2: 'Design perfectly',
      ctaText: 'Discover',
      ctaLink: '/premium',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      active: false
    }
  ]);
  
  const [activeSlideId, setActiveSlideId] = useState(slides[0].id);
  const activeSlide = slides.find(s => s.id === activeSlideId) || slides[0];

  const [settings, setSettings] = useState({
    autoplay: true,
    autoplaySpeed: 5,
    transitionEffect: 'Fade',
    showDots: true,
    showArrows: false,
    infiniteLoop: true
  });

  const handleUpdateActiveSlide = (updates) => {
    setSlides(slides.map(s => s.id === activeSlideId ? { ...s, ...updates } : s));
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

  const handleDeleteSlide = (id) => {
    const newSlides = slides.filter(s => s.id !== id);
    setSlides(newSlides);
    if (activeSlideId === id && newSlides.length > 0) {
      setActiveSlideId(newSlides[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Hero Section</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and customize the homepage hero section and slides.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
              <FiEye size={16} />
              Preview
            </button>
            <button className="px-5 py-2 bg-[#ED1C24] text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm shadow-sm">
              <FiSave size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sidebar & Settings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Slides List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-lg">Slides</h2>
            </div>
            <div className="p-4 space-y-3">
              {slides.map((slide, index) => {
                const isActive = activeSlideId === slide.id;
                return (
                  <div 
                    key={slide.id}
                    onClick={() => setActiveSlideId(slide.id)}
                    className={cn(
                      "flex items-center p-3 rounded-lg cursor-pointer transition-all border",
                      isActive 
                        ? "border-[#ED1C24]/30 bg-red-50/50 shadow-sm" 
                        : "border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    <div className="text-gray-400 mr-2 cursor-grab active:cursor-grabbing hover:text-gray-600 transition-colors">
                      <GripVertical size={16} />
                    </div>
                    
                    <div className="w-12 h-8 rounded bg-gray-200 mr-3 overflow-hidden shrink-0 border border-black/5">
                      {slide.image ? (
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FiImage size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-xs font-bold", isActive ? "text-[#ED1C24]" : "text-gray-500")}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {slide.title || 'Untitled'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded",
                        slide.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      )}>
                        {slide.active ? 'Active' : 'Inactive'}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors">
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <button 
                onClick={handleAddSlide}
                className="w-full py-3 mt-2 border border-dashed border-red-300 rounded-lg text-[#ED1C24] text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <FiPlus size={16} />
                Add New Slide
              </button>
            </div>
          </div>

          {/* Hero Settings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-lg">Hero Settings</h2>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Autoplay</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.autoplay} onChange={(e) => setSettings({...settings, autoplay: e.target.checked})} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED1C24]"></div>
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Autoplay Speed</span>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">{settings.autoplaySpeed} sec</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={settings.autoplaySpeed}
                  onChange={(e) => setSettings({...settings, autoplaySpeed: e.target.value})}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ED1C24]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-medium block">Transition Effect</label>
                <div className="relative">
                  <select 
                    value={settings.transitionEffect}
                    onChange={(e) => setSettings({...settings, transitionEffect: e.target.value})}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-shadow"
                  >
                    <option value="Fade">Fade</option>
                    <option value="Slide">Slide</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Show Dots</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.showDots} onChange={(e) => setSettings({...settings, showDots: e.target.checked})} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED1C24]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Show Arrows</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.showArrows} onChange={(e) => setSettings({...settings, showArrows: e.target.checked})} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED1C24]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Infinite Loop</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.infiniteLoop} onChange={(e) => setSettings({...settings, infiniteLoop: e.target.checked})} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED1C24]"></div>
                </label>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Edit Active Slide */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-gray-900 text-lg">Edit Slide</h2>
                <span className={cn(
                  "text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded",
                  activeSlide.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                )}>
                  {activeSlide.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDeleteSlide(activeSlide.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete Slide"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6 flex-1">
              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Slide Title</label>
                  <input 
                    type="text" 
                    value={activeSlide.title}
                    onChange={(e) => handleUpdateActiveSlide({ title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-shadow" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Slide Subtitle</label>
                  <input 
                    type="text" 
                    value={activeSlide.subtitle2}
                    onChange={(e) => handleUpdateActiveSlide({ subtitle2: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-shadow" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CTA Text</label>
                  <input 
                    type="text" 
                    value={activeSlide.ctaText}
                    onChange={(e) => handleUpdateActiveSlide({ ctaText: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-shadow" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CTA Link</label>
                  <input 
                    type="text" 
                    value={activeSlide.ctaLink}
                    onChange={(e) => handleUpdateActiveSlide({ ctaLink: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-shadow" 
                  />
                </div>
              </div>

              {/* Image Preview */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-gray-700">Slide Image</label>
                <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                  {activeSlide.image ? (
                    <>
                      <img src={activeSlide.image} alt={activeSlide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex gap-4">
                          <button className="px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                            <FiUploadCloud size={16} />
                            Upload New
                          </button>
                          <button className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 shadow-sm">
                            <FiFolder size={16} />
                            Media Library
                          </button>
                        </div>
                      </div>
                      
                      <button className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-lg hover:bg-black/80 transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100">
                        <FiImage size={14} />
                        Change Image
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl m-2 w-[calc(100%-16px)] h-[calc(100%-16px)] bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                      <FiImage size={48} className="mb-4 text-gray-300" />
                      <p className="text-sm text-gray-500 font-medium">Click to upload slide image</p>
                      <p className="text-xs text-gray-400 mt-1">Recommended size: 1920x1080px</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
                    <FiUploadCloud size={16} />
                    Upload New
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
                    <FiFolder size={16} />
                    Media Library
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Options footer */}
            <div className="border-t border-gray-100 p-5 bg-gray-50/50 flex items-center justify-between cursor-pointer hover:bg-gray-100/50 transition-colors mt-auto">
              <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                <FiSettings size={16} />
                Advanced Options
              </div>
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
