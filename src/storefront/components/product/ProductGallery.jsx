import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProductGallery({ images, selectedVariants }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const scrollRef = useRef(null);

  // Derive final images (if a variant has an image, maybe insert it, or just rely on existing array)
  // For now, we assume the variant image logic is handled upstream or we just show the array.
  // Real app: if selectedVariant has an image, set activeIndex to that image's index.
  useEffect(() => {
    if (selectedVariants && images) {
      Object.values(selectedVariants).forEach(option => {
        if (option && option.image) {
          const idx = images.findIndex(img => img === option.image);
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

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
        
        {/* Desktop Thumbnails (Left side) */}
        <div className="hidden lg:flex flex-col gap-4 w-32 flex-shrink-0 bg-[#f4f5f6] p-3 rounded-xl">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative w-full aspect-square bg-white p-1 overflow-hidden rounded-lg transition-all ${
                activeIndex === idx ? 'border-2 border-gray-900 shadow-sm' : 'border border-gray-200 shadow-sm opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
            </button>
          ))}
        </div>

        {/* Main Image Area */}
        <div 
          className="relative w-full flex-1 aspect-[4/5] lg:aspect-[4/3] bg-gray-100 overflow-hidden group lg:cursor-zoom-in"
          onClick={() => window.innerWidth >= 1024 && setIsLightboxOpen(true)}
        >
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:overflow-hidden"
          >
            {images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={img}
                  alt={`Product view ${idx + 1}`}
                  className={`w-full h-full object-cover ${idx === activeIndex || window.innerWidth < 1024 ? 'block' : 'hidden lg:block'}`}
                  onClick={() => window.innerWidth < 1024 && setIsLightboxOpen(true)}
                />
              </div>
            ))}
          </div>

          {/* Mobile Image Counter Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium tracking-widest text-gray-900 lg:hidden shadow-sm pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Mobile Horizontal Thumbnail Selector (Optional alternative to swiping) */}
        <div className="flex lg:hidden gap-3 overflow-x-auto scrollbar-hide mt-2 pb-2 px-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative w-16 flex-shrink-0 aspect-[4/5] bg-gray-100 overflow-hidden rounded-md transition-all ${
                activeIndex === idx ? 'ring-2 ring-gray-900 ring-offset-2' : 'opacity-50'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500">
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>Please note: Actual product color, fabric, finish, texture, and appearance may vary slightly from the images shown due to photography, lighting, device display settings, and natural material variations.</p>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center p-4">
              <span className="text-sm font-bold tracking-widest">{activeIndex + 1} / {images.length}</span>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center p-4">
              {images.length > 1 && (
                <button 
                  onClick={prevImage}
                  className="absolute left-4 p-3 bg-white/50 hover:bg-white rounded-full shadow-lg backdrop-blur transition-all z-10"
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
                  className="absolute right-4 p-3 bg-white/50 hover:bg-white rounded-full shadow-lg backdrop-blur transition-all z-10"
                >
                  <FiChevronRight size={24} />
                </button>
              )}
            </div>
            
            <div className="h-24 flex items-center justify-center gap-2 p-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-full aspect-[4/5] overflow-hidden rounded-md transition-all ${
                    activeIndex === idx ? 'ring-2 ring-gray-900 ring-offset-2' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
