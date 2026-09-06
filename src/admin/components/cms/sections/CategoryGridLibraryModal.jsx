import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import { useCMS } from '../../../context/cms/CMSContext';
import { cn } from '../../../../utils/cn';

export default function CategoryGridLibraryModal({ section, onUpdate, onClose }) {
  const { libraryConfigurations } = useCMS();
  
  const [settings, setSettings] = useState({
    columns: '3',
    imageRatio: 'square',
    paddingTop: 'medium',
    paddingBottom: 'medium',
    fullWidth: false,
    visibleDesktop: true,
    visibleTablet: true,
    visibleMobile: true
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (section) {
      // Use the settings from the section or library config if available
      const existingConfig = libraryConfigurations['CATEGORY_GRID'];
      const initialSettings = {
        columns: section.settings?.columns || existingConfig?.settings?.columns || '3',
        imageRatio: section.settings?.imageRatio || existingConfig?.settings?.imageRatio || 'square',
        paddingTop: section.settings?.paddingTop || existingConfig?.settings?.paddingTop || 'medium',
        paddingBottom: section.settings?.paddingBottom || existingConfig?.settings?.paddingBottom || 'medium',
        fullWidth: section.settings?.fullWidth ?? existingConfig?.settings?.fullWidth ?? false,
        visibleDesktop: section.settings?.visibleDesktop ?? existingConfig?.settings?.visibleDesktop ?? true,
        visibleTablet: section.settings?.visibleTablet ?? existingConfig?.settings?.visibleTablet ?? true,
        visibleMobile: section.settings?.visibleMobile ?? existingConfig?.settings?.visibleMobile ?? true
      };
      setSettings(initialSettings);
    }
  }, [section, libraryConfigurations]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(section.id, { settings });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-[480px] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif text-gray-900">Edit Category Grid</h2>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#5946ff] bg-[#5946ff]/10 px-2 py-0.5 rounded">
                LIBRARY TEMPLATE
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
              <FiX size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
            
            {/* Columns (Implicitly 3 in mockup, no label shown but it's a dropdown with 3) */}
            <div>
              <div className="relative">
                <select 
                  value={settings.columns} 
                  onChange={(e) => setSettings({...settings, columns: e.target.value})}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff]"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1.5">Image Ratio</label>
              <div className="relative">
                <select 
                  value={settings.imageRatio} 
                  onChange={(e) => setSettings({...settings, imageRatio: e.target.value})}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff]"
                >
                  <option value="square">square</option>
                  <option value="portrait">portrait</option>
                  <option value="landscape">landscape</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1.5">Padding Top</label>
              <div className="relative">
                <select 
                  value={settings.paddingTop} 
                  onChange={(e) => setSettings({...settings, paddingTop: e.target.value})}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff]"
                >
                  <option value="none">none</option>
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1.5">Padding Bottom</label>
              <div className="relative">
                <select 
                  value={settings.paddingBottom} 
                  onChange={(e) => setSettings({...settings, paddingBottom: e.target.value})}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#5946ff]/20 focus:border-[#5946ff]"
                >
                  <option value="none">none</option>
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-500 mb-2">Full Width Container</label>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggle('fullWidth')}>
                <div className={cn("w-4 h-4 rounded flex items-center justify-center border", settings.fullWidth ? "bg-[#5946ff] border-[#5946ff] text-white" : "border-gray-400 bg-white")}>
                  {settings.fullWidth && <FiCheck size={12} />}
                </div>
                <span className="text-sm font-semibold text-gray-700">Full Width Container</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-500 mb-2">Visible on Desktop</label>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggle('visibleDesktop')}>
                <div className={cn("w-4 h-4 rounded flex items-center justify-center border", settings.visibleDesktop ? "bg-[#0070F3] border-[#0070F3] text-white" : "border-gray-400 bg-white")}>
                  {settings.visibleDesktop && <FiCheck size={12} strokeWidth={3} />}
                </div>
                <span className="text-sm font-semibold text-gray-700">Visible on Desktop</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-500 mb-2">Visible on Tablet</label>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggle('visibleTablet')}>
                <div className={cn("w-4 h-4 rounded flex items-center justify-center border", settings.visibleTablet ? "bg-[#0070F3] border-[#0070F3] text-white" : "border-gray-400 bg-white")}>
                  {settings.visibleTablet && <FiCheck size={12} strokeWidth={3} />}
                </div>
                <span className="text-sm font-semibold text-gray-700">Visible on Tablet</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-500 mb-2">Visible on Mobile</label>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggle('visibleMobile')}>
                <div className={cn("w-4 h-4 rounded flex items-center justify-center border", settings.visibleMobile ? "bg-[#0070F3] border-[#0070F3] text-white" : "border-gray-400 bg-white")}>
                  {settings.visibleMobile && <FiCheck size={12} strokeWidth={3} />}
                </div>
                <span className="text-sm font-semibold text-gray-700">Visible on Mobile</span>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-6 bg-white shrink-0">
            <button 
              onClick={onClose}
              className="text-sm font-semibold text-[#5946ff] hover:text-[#4335cc] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Template
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
