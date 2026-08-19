import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewMediaGallery({ images, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
        />
        
        <div className="relative z-10 w-full max-w-5xl h-[80vh] flex flex-col md:flex-row bg-surface rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative flex-1 bg-black flex items-center justify-center group">
            <img 
              src={currentImage.url} 
              alt="Review Media" 
              className="max-w-full max-h-full object-contain"
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/10 hover:bg-surface/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/10 hover:bg-surface/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                >
                  <FiChevronRight size={24} />
                </button>
              </>
            )}
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center md:hidden"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="w-full md:w-80 bg-surface flex flex-col shrink-0">
            <div className="p-4 border-b border-black/5 flex justify-between items-center hidden md:flex">
              <span className="text-sm font-bold text-text-primary">Customer Photo</span>
              <button onClick={onClose} className="p-2 text-text-muted hover:text-black rounded-full hover:bg-background transition-colors">
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-text-muted">{currentImage.reviewer.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{currentImage.reviewer}</p>
                  <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={10} className={i < currentImage.rating ? 'fill-current' : 'fill-transparent text-gray-300'} />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary leading-relaxed">"{currentImage.reviewText}"</p>
              <p className="text-xs text-text-muted mt-4">{currentImage.date}</p>
            </div>
            
            {images.length > 1 && (
              <div className="p-4 border-t border-black/5 mt-auto">
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${currentIndex === idx ? 'border-[#1A1A1A]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
