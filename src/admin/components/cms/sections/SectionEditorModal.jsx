import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useCMS } from '../../../context/cms/CMSContext';
import { getSectionSchema, FIELD_TYPES } from '../editor/sectionEditorSchemas';
import { cn } from '../../../../utils/cn';

// Reuse PropertyGroup and DynamicField logic
const PropertyGroup = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/5">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-text-muted" size={14} />}
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{title}</h3>
        </div>
        {isOpen ? <FiChevronUp size={14} className="text-text-muted" /> : <FiChevronDown size={14} className="text-text-muted" />}
      </button>
      {isOpen && <div className="p-4 pt-0 space-y-4">{children}</div>}
    </div>
  );
};

const DynamicField = ({ field, value, onChange }) => {
  const handleChange = (e) => {
    const val = field.type === FIELD_TYPES.TOGGLE ? e.target.checked : e.target.value;
    onChange(field.name, val);
  };

  switch (field.type) {
    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.URL:
      return (
        <input type="text" value={value || ''} onChange={handleChange} placeholder={field.defaultValue} className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
      );
    case FIELD_TYPES.COLOR:
      return (
        <input type="color" value={value || field.defaultValue || '#000000'} onChange={handleChange} className="w-full h-10 rounded cursor-pointer border border-black/10 bg-transparent p-0" />
      );
    case FIELD_TYPES.TEXTAREA:
      return (
        <textarea rows={3} value={value || ''} onChange={handleChange} placeholder={field.defaultValue} className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors resize-none"></textarea>
      );
    case FIELD_TYPES.SELECT:
      return (
        <select value={value || field.defaultValue || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors">
          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    case FIELD_TYPES.NUMBER:
      return (
        <input type="number" value={value || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
      );
    case FIELD_TYPES.TOGGLE:
      return (
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={value ?? field.defaultValue ?? false} onChange={handleChange} className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
          <label className="text-xs text-text-primary font-medium">{field.label}</label>
        </div>
      );
    case FIELD_TYPES.IMAGE:
      return (
        <div className="space-y-2">
          {value && (
            <div className="w-full h-24 rounded overflow-hidden relative">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <input type="text" value={value || ''} onChange={handleChange} placeholder="Image URL..." className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
        </div>
      );
    case FIELD_TYPES.GALLERY:
      const galleryItems = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-4">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="p-3 bg-white border border-black/5 rounded-lg space-y-2 relative shadow-sm group">
              <input type="text" value={item.title || ''} onChange={(e) => {
                const newItems = [...galleryItems];
                newItems[idx] = { ...item, title: e.target.value };
                onChange(field.name, newItems);
              }} placeholder="Title (e.g. Living Room)" className="w-full px-2 py-1.5 bg-background border border-black/5 rounded text-xs focus:outline-none focus:bg-surface transition-colors" />
              <input type="text" value={item.image || ''} onChange={(e) => {
                const newItems = [...galleryItems];
                newItems[idx] = { ...item, image: e.target.value };
                onChange(field.name, newItems);
              }} placeholder="Image URL..." className="w-full px-2 py-1.5 bg-background border border-black/5 rounded text-xs focus:outline-none focus:bg-surface transition-colors" />
              <input type="text" value={item.link || ''} onChange={(e) => {
                const newItems = [...galleryItems];
                newItems[idx] = { ...item, link: e.target.value };
                onChange(field.name, newItems);
              }} placeholder="Link (/shop)" className="w-full px-2 py-1.5 bg-background border border-black/5 rounded text-xs focus:outline-none focus:bg-surface transition-colors" />
              <button onClick={() => {
                const newItems = galleryItems.filter((_, i) => i !== idx);
                onChange(field.name, newItems);
              }} className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm text-xs opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </div>
          ))}
          <button onClick={() => {
            const newItem = { id: `item-${Date.now()}`, title: 'New Item', image: '', link: '' };
            onChange(field.name, [...galleryItems, newItem]);
          }} className="w-full py-2 bg-neutral-50 text-neutral-600 text-xs rounded-lg hover:bg-neutral-100 transition-colors border border-dashed border-neutral-200">
            + Add Item
          </button>
        </div>
      );
    default:
      return null;
  }
};

export default function SectionEditorModal({ sectionType, onClose }) {
  const { libraryConfigurations, saveLibraryConfiguration, sections } = useCMS();
  const [content, setContent] = useState({});
  const [settings, setSettings] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Find registry entry
  const registryEntry = sections.find(s => s.type === sectionType);
  const schema = getSectionSchema(sectionType);

  useEffect(() => {
    if (!registryEntry) return;
    const existing = libraryConfigurations[sectionType];
    if (existing) {
      setContent({ ...(registryEntry.defaultContent || {}), ...(existing.content || {}) });
      setSettings({ ...(registryEntry.defaultSettings || {}), ...(existing.settings || {}) });
    } else {
      setContent(registryEntry.defaultContent || {});
      setSettings(registryEntry.defaultSettings || {});
    }
  }, [sectionType, registryEntry, libraryConfigurations]);

  if (!registryEntry || !schema) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveLibraryConfiguration(sectionType, { content, settings });
      onClose();
    } catch (err) {
      alert("Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-y-10 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-surface rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden border border-black/10">

        {/* Header */}
        <div className="h-16 flex flex-shrink-0 items-center justify-between px-6 border-b border-black/5 bg-background">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-xl text-text-primary">Edit {registryEntry.name}</h2>
            <span className="text-[10px] uppercase tracking-widest font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">Library Template</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-text-muted transition-colors"><FiX size={18} /></button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-text-primary">Content</h3>
            {schema.content?.map(field => (
              <div key={field.name} className="space-y-1">
                <label className="block text-xs font-medium text-text-muted">{field.label}</label>
                <DynamicField field={field} value={content[field.name]} onChange={(k, v) => setContent(prev => ({ ...prev, [k]: v }))} />
              </div>
            ))}
          </div>

          {schema.settings?.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-black/5">
              <h3 className="font-bold text-sm text-text-primary">Settings</h3>
              {schema.settings.map(field => (
                <div key={field.name} className="space-y-1">
                  <label className="block text-xs font-medium text-text-muted">{field.label}</label>
                  <DynamicField field={field} value={settings[field.name]} onChange={(k, v) => setSettings(prev => ({ ...prev, [k]: v }))} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/5 bg-background flex justify-end gap-3 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-[#1A1A1A] text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-colors shadow-sm flex items-center gap-2">
            <FiSave size={16} /> {isSaving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
