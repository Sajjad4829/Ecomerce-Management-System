import { cn } from '../../../../utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiTrash2, FiCopy, FiSave, FiLock } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import HeroPreview from './preview/HeroPreview';
import NavbarPreview from './preview/NavbarPreview';
import ProductGridPreview from './preview/ProductGridPreview';
import BannerPreview from './preview/BannerPreview';
import FeaturesPreview from './preview/FeaturesPreview';
import CategoryGridPreview from './preview/CategoryGridPreview';
import TestimonialsPreview from './preview/TestimonialsPreview';
import FAQPreview from './preview/FAQPreview';
import FooterPreview from './preview/FooterPreview';
import CreationsShowcasePreview from './preview/CreationsShowcasePreview';
import EmptyCanvas from './EmptyCanvas';

const GenericPreview = ({ section }) => {
  const IconComponent = Icons[section.icon] || Icons.FiLayout;
  return (
    <div className="py-24 px-12 border-2 border-dashed border-black/10 m-4 bg-surface/50 flex flex-col items-center justify-center text-text-muted transition-colors hover:bg-surface rounded-2xl">
      <IconComponent size={32} className="mb-4 text-black/20" />
      <h3 className="text-sm font-bold text-text-primary mb-1">{section.name}</h3>
      <p className="text-xs">{section.description || 'Preview placeholder for ' + section.type}</p>
      <div className="mt-4 px-3 py-1 bg-black/5 rounded-full text-[10px] uppercase tracking-widest font-bold">
        {section.category}
      </div>
    </div>
  );
};

export default function PreviewCanvas({
  device, sections, activeSectionId, onSelectSection,
  onMoveUp, onMoveDown, onDelete, onDuplicate, onAddSection,
  onSaveGlobalBlock
}) {

  const getContainerClasses = () => {
    switch (device) {
      case 'mobile': return 'w-[375px] max-w-full min-h-[667px] shadow-2xl rounded-[2rem] border-[8px] border-[#1A1A1A] mx-auto overflow-hidden bg-surface mt-8 transition-all duration-500 relative';
      case 'tablet': return 'w-[768px] max-w-full min-h-[1024px] shadow-2xl rounded-xl border-[4px] border-[#1A1A1A]/10 mx-auto overflow-hidden bg-surface mt-8 transition-all duration-500 relative';
      case 'desktop':
      default:
        return 'w-full min-h-full bg-white flex flex-col relative transition-all duration-500 border-x border-gray-200';
    }
  };

  const renderSection = (section, index) => {
    if (section.isHidden) return null;

    // Check responsive visibility
    const responsive = section.responsive || {};
    let isVisible = true;
    if (device === 'mobile' && responsive.mobile && responsive.mobile.visible !== undefined) {
      isVisible = responsive.mobile.visible;
    } else if ((device === 'mobile' || device === 'tablet') && responsive.tablet && responsive.tablet.visible !== undefined) {
      isVisible = responsive.tablet.visible;
    } else if (responsive.desktop && responsive.desktop.visible !== undefined) {
      isVisible = responsive.desktop.visible;
    }

    if (!isVisible) return null;

    const isActive = activeSectionId === section.id;
    const isFirst = index === 0;
    const isLast = index === sections.length - 1;

    const wrapperClasses = cn(
      "relative cursor-pointer transition-all outline-none group shrink-0",
      isActive ? "ring-2 ring-blue-500 ring-inset z-20" : "hover:ring-2 hover:ring-blue-400/50 hover:ring-inset z-10"
    );

    let content = null;
    switch (section.type) {
      case 'NAVBAR': content = <NavbarPreview section={section} device={device} />; break;
      case 'hero':
      case 'HERO_BANNER': content = <HeroPreview section={section} device={device} />; break;
      case 'FEATURE_GRID':
      case 'features': content = <FeaturesPreview section={section} device={device} />; break;
      case 'grid':
      case 'PRODUCT_GRID': content = <ProductGridPreview section={section} device={device} />; break;
      case 'banner':
      case 'CTA_BANNER':
      case 'PROMO_BANNER': content = <BannerPreview section={section} device={device} />; break;
      case 'category':
      case 'CATEGORY_GRID': content = <CategoryGridPreview section={section} device={device} />; break;
      case 'testimonials':
      case 'TESTIMONIALS': content = <TestimonialsPreview section={section} device={device} />; break;
      case 'faq':
      case 'FAQ': content = <FAQPreview section={section} device={device} />; break;
      case 'footer':
      case 'FOOTER': content = <FooterPreview section={section} device={device} />; break;
      case 'CREATIONS_SHOWCASE': content = <CreationsShowcasePreview section={section} device={device} />; break;
      default: content = <GenericPreview section={section} device={device} />;
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
            <button onClick={(e) => { e.stopPropagation(); onSaveGlobalBlock(section.id); }} className="p-2 hover:bg-surface/20 transition-colors" title="Save as Global Block">
              <FiSave size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onMoveUp(section.id); }} disabled={isFirst} className="p-2 hover:bg-surface/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-white/20" title="Move Up">
              <FiArrowUp size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onMoveDown(section.id); }} disabled={isLast} className="p-2 hover:bg-surface/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Move Down">
              <FiArrowDown size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDuplicate(section.id); }} className="p-2 hover:bg-surface/20 transition-colors" title="Duplicate">
              <FiCopy size={12} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(section.id); }} className="p-2 hover:bg-danger-soft0 transition-colors bg-red-600/80" title="Delete">
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
      className="flex-1 overflow-auto relative custom-scrollbar"
      onClick={() => onSelectSection(null)}
    >
      <div className={cn("w-full flex justify-center", device !== 'desktop' ? "pb-20 px-8" : "")}>
        <div className={getContainerClasses()}>
          {device === 'desktop' && (
            <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 shrink-0 gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center gap-2 text-[11px] font-medium text-gray-500 min-w-[250px] justify-center">
                  <FiLock size={10} className="text-emerald-500" />
                  https://yourstore.com
                </div>
              </div>
              <div className="w-[52px]"></div> {/* spacer to balance the traffic lights */}
            </div>
          )}
          <div 
            className={device === 'desktop' ? "relative flex-1 bg-surface flex flex-col min-h-[800px]" : ""}
            style={device === 'desktop' ? { zoom: '0.75' } : {}}
          >
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
    </div>
  );
}
