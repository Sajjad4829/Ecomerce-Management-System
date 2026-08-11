import { useState } from 'react';
import { FiType, FiLayout, FiImage, FiSettings, FiMaximize, FiArrowRight, FiEye, FiMonitor, FiPlay, FiCode, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const PropertyGroup = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-text-muted" size={14} />}
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{title}</h3>
        </div>
        {isOpen ? <FiChevronUp size={14} className="text-text-muted" /> : <FiChevronDown size={14} className="text-text-muted" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default function PropertyPanel({ activeSectionId, sections }) {
  if (!activeSectionId) {
    return (
      <div className="w-80 bg-surface border-l border-black/10 flex flex-col h-[calc(100vh-4rem)] shrink-0 z-10 p-8 items-center justify-center text-center">
        <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-gray-300 mb-4 border border-black/5 shadow-sm">
          <FiSettings size={24} />
        </div>
        <p className="text-xs text-text-muted font-medium leading-relaxed">Select a section from the canvas or structure panel to edit its properties.</p>
      </div>
    );
  }

  const section = sections.find(s => s.id === activeSectionId);
  if (!section) return null;

  return (
    <div className="w-80 bg-surface border-l border-black/10 flex flex-col h-[calc(100vh-4rem)] shrink-0 z-10 overflow-hidden shadow-xl shadow-black/5">
      {/* Header */}
      <div className="p-4 border-b border-black/5 shrink-0 bg-background">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <FiLayout className="text-text-muted" size={14} />
            <h2 className="text-xs font-bold text-text-primary truncate max-w-[200px]">{section.name}</h2>
          </div>
          <span className="text-[9px] font-mono bg-surface px-1.5 py-0.5 rounded border border-black/10">ID: {section.id.split('-')[1]}</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest">{section.type} Settings</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        <PropertyGroup title="General" icon={FiSettings} defaultOpen={true}>
           <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Section Name</label>
            <input type="text" defaultValue={section.name} className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
          </div>
        </PropertyGroup>

        <PropertyGroup title="Content & Typography" icon={FiType} defaultOpen={true}>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Heading</label>
            <input type="text" defaultValue="Premium Furniture" className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Subheading</label>
            <textarea rows={3} defaultValue="Discover our new collection of meticulously crafted wooden furniture." className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors resize-none"></textarea>
          </div>
        </PropertyGroup>

        <PropertyGroup title="Layout" icon={FiMaximize}>
          <div>
            <label className="block text-[10px] font-semibold text-text-muted mb-2 uppercase tracking-widest">Padding Top</label>
            <input type="range" className="w-full accent-[#1A1A1A]" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-muted mb-2 uppercase tracking-widest">Padding Bottom</label>
            <input type="range" className="w-full accent-[#1A1A1A]" />
          </div>
          <div className="flex items-center gap-3 mt-4">
             <input type="checkbox" id="full-width" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
             <label htmlFor="full-width" className="text-xs text-text-primary font-medium">Full Width Container</label>
          </div>
        </PropertyGroup>

        <PropertyGroup title="Background" icon={FiImage}>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Background Color</label>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-black/10 bg-background"></div>
              <input type="text" defaultValue="#F7F5F2" className="flex-1 px-3 py-1.5 bg-background border border-black/5 rounded-lg text-sm font-mono focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
            </div>
          </div>
          <div>
             <label className="block text-xs font-semibold text-text-primary mb-1.5">Background Image</label>
             <button className="w-full py-4 border border-black/10 border-dashed rounded-lg flex flex-col items-center justify-center text-text-muted hover:text-text-primary hover:bg-background hover:border-black/30 transition-all bg-surface">
               <FiImage className="mb-2" size={20} />
               <span className="text-xs font-semibold">Upload Image</span>
             </button>
          </div>
        </PropertyGroup>

        <PropertyGroup title="Buttons" icon={FiArrowRight}>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Button Label</label>
            <input type="text" defaultValue="Shop Now" className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Button Link</label>
            <input type="text" defaultValue="/shop" className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors" />
          </div>
        </PropertyGroup>

        <PropertyGroup title="Visibility" icon={FiEye}>
          <div className="space-y-3">
             <div className="flex items-center justify-between">
               <label className="text-xs text-text-primary font-medium">Visible on Desktop</label>
               <input type="checkbox" defaultChecked className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
             </div>
             <div className="flex items-center justify-between">
               <label className="text-xs text-text-primary font-medium">Visible on Tablet</label>
               <input type="checkbox" defaultChecked className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
             </div>
             <div className="flex items-center justify-between">
               <label className="text-xs text-text-primary font-medium">Visible on Mobile</label>
               <input type="checkbox" defaultChecked className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
             </div>
          </div>
        </PropertyGroup>

        <PropertyGroup title="Responsive" icon={FiMonitor}>
          <div>
             <label className="block text-[10px] font-semibold text-text-muted mb-2 uppercase tracking-widest">Mobile Reverse Stack</label>
             <select className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors">
               <option>Default (Text First)</option>
               <option>Reverse (Image First)</option>
             </select>
          </div>
        </PropertyGroup>

        <PropertyGroup title="Animation" icon={FiPlay}>
          <div>
             <label className="block text-[10px] font-semibold text-text-muted mb-2 uppercase tracking-widest">Entrance Animation</label>
             <select className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors">
               <option>None</option>
               <option>Fade In</option>
               <option>Slide Up</option>
               <option>Zoom In</option>
             </select>
          </div>
        </PropertyGroup>

        <PropertyGroup title="Advanced" icon={FiCode}>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Custom CSS Class</label>
            <input type="text" placeholder="e.g. bg-brand-special" className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors font-mono" />
          </div>
        </PropertyGroup>

      </div>
    </div>
  );
}
