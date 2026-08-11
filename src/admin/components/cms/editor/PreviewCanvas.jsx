import { cn } from '../../../../utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiTrash2, FiCopy, FiSave } from 'react-icons/fi';
import HeroPreview from './preview/HeroPreview';
import ProductGridPreview from './preview/ProductGridPreview';
import BannerPreview from './preview/BannerPreview';
import FeaturesPreview from './preview/FeaturesPreview';
import CategoryGridPreview from './preview/CategoryGridPreview';
import TestimonialsPreview from './preview/TestimonialsPreview';
import FAQPreview from './preview/FAQPreview';
import FooterPreview from './preview/FooterPreview';
import EmptyCanvas from './EmptyCanvas';

export default function PreviewCanvas({ 
  device, sections, activeSectionId, onSelectSection,
  onMoveUp, onMoveDown, onDelete, onDuplicate, onAddSection,
  onSaveGlobalBlock
}) {
  
  const getContainerClasses = () => {
    switch (device) {
      case 'mobile': return 'w-[375px] max-w-full min-h-[667px] shadow-2xl rounded-[2rem] border-[8px] border-[#1A1A1A] mx-auto overflow-hidden bg-white mt-8 transition-all duration-500 relative';
      case 'tablet': return 'w-[768px] max-w-full min-h-[1024px] shadow-2xl rounded-xl border-[4px] border-[#1A1A1A]/10 mx-auto overflow-hidden bg-white mt-8 transition-all duration-500 relative';
      case 'desktop': 
      default: 
        return 'w-full min-h-full shadow-sm bg-white transition-all duration-500 relative';
    }
  };

  const renderSection = (section, index) => {
    const isActive = activeSectionId === section.id;
    const isFirst = index === 0;
    const isLast = index === sections.length - 1;

    const wrapperClasses = cn(
      "relative cursor-pointer transition-all outline-none group",
      isActive ? "ring-2 ring-blue-500 ring-inset z-20" : "hover:ring-2 hover:ring-blue-400/50 hover:ring-inset z-10"
    );

    let content = null;
    switch(section.type) {
      case 'hero': content = <HeroPreview />; break;
      case 'grid': content = <ProductGridPreview />; break;
      case 'banner': content = <BannerPreview />; break;
      case 'features': content = <FeaturesPreview />; break;
      case 'category': content = <CategoryGridPreview />; break;
      case 'testimonials': content = <TestimonialsPreview />; break;
      case 'faq': content = <FAQPreview />; break;
      case 'footer': content = <FooterPreview />; break;
      default: content = <div className="p-20 text-center bg-gray-100 text-gray-400">Placeholder for {section.type}</div>;
    }

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        key={section.id} 
        className={wrapperClasses}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSection(section.id);
        }}
      >
        {isActive && (
          <div className="absolute top-0 right-0 bg-blue-500 text-white flex items-center rounded-bl-lg z-30 shadow-lg overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold border-r border-white/20">
              {section.name}
            </div>
            <button onClick={(e) => { e.stopPropagation(); onSaveGlobalBlock(section.id); }} className="p-2 hover:bg-white/20 transition-colors" title="Save as Global Block">
              <FiSave size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onMoveUp(section.id); }} disabled={isFirst} className="p-2 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-white/20" title="Move Up">
              <FiArrowUp size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onMoveDown(section.id); }} disabled={isLast} className="p-2 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Move Down">
              <FiArrowDown size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDuplicate(section.id); }} className="p-2 hover:bg-white/20 transition-colors" title="Duplicate">
              <FiCopy size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(section.id); }} className="p-2 hover:bg-red-500 transition-colors bg-red-600/80" title="Delete">
              <FiTrash2 size={12} />
            </button>
          </div>
        )}

        {isActive && (
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 z-20" />
        )}

        <div className={cn("pointer-events-none transition-opacity", isActive ? "opacity-100" : "opacity-95 group-hover:opacity-100")}>
          {content}
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="flex-1 bg-[#ECEAE6] h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden relative custom-scrollbar"
      onClick={() => onSelectSection(null)}
    >
      <div className="w-full flex justify-center pb-20">
        <div className={getContainerClasses()}>
          {sections.length === 0 ? (
            <EmptyCanvas onAddSection={onAddSection} />
          ) : (
            <AnimatePresence>
              {sections.map((section, index) => renderSection(section, index))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
