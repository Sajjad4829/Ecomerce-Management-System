import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

export default function ProductGallery({ images, selectedVariants, note, layout = 'vertical' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedVariants && images) {
      Object.values(selectedVariants).forEach(option => {
        const firstVariantImage = (option && option.images && option.images.length > 0) ? option.images[0] : (option && option.image);
        if (firstVariantImage) {
          const idx = images.findIndex(img => img === firstVariantImage);
          if (idx !== -1) {
            handleThumbnailClick(idx);
          }
        }
      });
    }
  }, [selectedVariants, images]);

  if (!images || images.length === 0) return null;

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (scrollRef.current && window.innerWidth < 1024) {
      const scrollAmount = index * scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const index = Math.round(scrollPosition / scrollRef.current.clientWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const renderGridThumbnails = () => {
    // Show up to 4 thumbnails in grid layout
    const gridImages = images.slice(0, 4);
    return (
      <div className="hidden md:grid grid-cols-2 gap-4 mt-4 w-full px-[10%] mx-auto">
        {gridImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`relative aspect-[4/3] bg-white p-1 overflow-hidden rounded-lg transition-all ${
              activeIndex === idx ? 'border-2 border-[#6b46c1] shadow-sm' : 'border border-gray-200 shadow-sm opacity-80 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
          </button>
        ))}
      </div>
    );
  };

  const isVertical = layout === 'vertical';
  const isHorizontal = layout === 'horizontal';
  const isGrid = layout === 'grid';

  return (
    <>
      <div className={`flex flex-col ${isVertical ? 'md:flex-row' : 'md:flex-col'} gap-4 md:gap-6 w-full`}>
        
        {/* Thumbnails (Vertical or Horizontal) */}
        {!isGrid && (
          <div className={`hidden md:flex ${isHorizontal ? 'flex-row overflow-x-auto w-full order-last' : 'flex-col w-32'} gap-4 flex-shrink-0 bg-[#f4f5f6] p-3 rounded-xl`}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`relative ${isHorizontal ? 'h-24 w-24 shrink-0' : 'w-full aspect-square'} bg-white p-1 overflow-hidden rounded-lg transition-all ${
                  activeIndex === idx ? 'border-2 border-[#6b46c1] shadow-sm' : 'border border-gray-200 shadow-sm opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
              </button>
            ))}
          </div>
        )}

        {/* Main Image Area & Note Wrapper */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Main Image Area */}
          <div 
            className="relative w-full bg-gray-100 overflow-hidden group md:cursor-zoom-in rounded-none"
          onClick={() => window.innerWidth >= 768 && setIsLightboxOpen(true)}
        >
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide md:overflow-hidden"
          >
            {images.map((img, idx) => (
              <div key={idx} className={`w-full flex-shrink-0 snap-center relative ${idx === activeIndex ? 'block' : 'block md:hidden'}`}>
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={img}
                  alt={`Product view ${idx + 1}`}
                  className="w-full h-auto object-contain"
                  onClick={() => window.innerWidth >= 768 ? setIsLightboxOpen(true) : setIsLightboxOpen(true)}
                />
              </div>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute top-4 right-4 bg-white p-2.5 rounded shadow-sm hover:shadow-md transition-all z-10 text-gray-600 hover:text-gray-900"
            aria-label="View Fullscreen"
          >
            <FiMaximize2 size={20} />
          </button>

          {/* Mobile Image Counter Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium tracking-widest text-gray-900 md:hidden shadow-sm pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {note && (
          <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{note}</p>
          </div>
        )}
      </div>

        {/* Grid Layout Thumbnails */}
        {isGrid && renderGridThumbnails()}

        {/* Mobile Horizontal Thumbnail Selector (Optional alternative to swiping) */}
        <div className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide mt-2 pb-2 px-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative w-16 flex-shrink-0 aspect-[4/5] bg-gray-100 overflow-hidden rounded-md transition-all ${
                activeIndex === idx ? 'ring-2 ring-[#6b46c1] ring-offset-2' : 'opacity-50'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>



      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
          >
            {/* Close Button (Red Square) */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 bg-[#EE2737] hover:bg-red-700 text-white p-1.5 transition-colors z-50"
              aria-label="Close Fullscreen"
            >
              <FiX size={28} />
            </button>
            
            <div className="relative flex items-center justify-center w-full h-full p-4 lg:p-12">
              {images.length > 1 && (
                <button 
                  onClick={prevImage}
                  className="absolute left-4 lg:left-8 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur transition-all z-10 text-gray-700"
                >
                  <FiChevronLeft size={24} />
                </button>
              )}
              
              <img 
                src={images[activeIndex]} 
                alt="Fullscreen view" 
                className="max-w-full max-h-full object-contain"
              />

              {images.length > 1 && (
                <button 
                  onClick={nextImage}
                  className="absolute right-4 lg:right-8 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur transition-all z-10 text-gray-700"
                >
                  <FiChevronRight size={24} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
