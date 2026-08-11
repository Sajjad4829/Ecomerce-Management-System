import React, { useState, useEffect } from 'react';
import { FiMaximize, FiBox } from 'react-icons/fi';
import Product360Viewer from './Product360Viewer';

export default function ProductGallery({ product, activeVariant }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | '360'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Derive the active image to show based on variant or primary image
  const media = product?.media || {};
  const gallery = media.gallery || [];
  const primaryImage = media.primaryImage || '';
  const view360 = media.view360 || { enabled: false, frames: [] };

  const variantImage = activeVariant?.image;

  // Flatten images for the gallery view
  let images = [];
  if (primaryImage) images.push(primaryImage);
  if (gallery.length > 0) {
    images = [...images, ...gallery];
  }
  // Remove duplicates just in case
  images = [...new Set(images)];

  // If there's an active variant with an image, we should show it if we switch variants
  useEffect(() => {
    if (variantImage && viewMode === 'gallery') {
      const idx = images.indexOf(variantImage);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      } else {
        // If variant image is not in gallery, maybe prepend it or just set it
        // For simplicity, we just use the variant image as active if it exists
        // Wait, if it's not in images, we should probably add it, but usually it is.
      }
    }
  }, [variantImage, viewMode, images]);

  const displayedImage = variantImage && !images.includes(variantImage) 
    ? variantImage 
    : (images[activeImageIndex] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800');

  return (
    <div className={`flex flex-col md:flex-row gap-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-8' : 'w-full h-full'}`}>
      
      {/* Thumbnails (Left side on desktop, bottom on mobile) */}
      <div className={`flex md:flex-col gap-3 overflow-auto no-scrollbar order-2 md:order-1 ${isFullscreen ? 'w-24 shrink-0' : 'md:w-20 lg:w-24 shrink-0'}`}>
        
        {view360.enabled && view360.frames.length > 0 && (
          <button 
            onClick={() => setViewMode('360')}
            className={`relative aspect-square rounded-lg border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${
              viewMode === '360' ? 'border-stone-900 ring-2 ring-stone-900/20' : 'border-stone-200 hover:border-stone-400 bg-stone-50'
            }`}
          >
             <FiBox size={24} className={viewMode === '360' ? 'text-stone-900' : 'text-stone-400'} />
             <span className="text-[10px] font-bold mt-1 uppercase tracking-wider text-stone-600">360° View</span>
          </button>
        )}

        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setViewMode('gallery');
              setActiveImageIndex(idx);
            }}
            className={`relative aspect-square rounded-sm border-2 overflow-hidden transition-all ${
              viewMode === 'gallery' && activeImageIndex === idx
                ? 'border-black opacity-100'
                : 'border-transparent hover:border-stone-300 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="flex-1 relative bg-stone-100 rounded-sm overflow-hidden aspect-square md:aspect-[4/5] lg:aspect-square order-1 md:order-2 border border-stone-200/60">
        
        {viewMode === '360' ? (
          <Product360Viewer 
            frames={view360.frames} 
            autoRotate={view360.autoRotate} 
            speed={view360.speed} 
          />
        ) : (
          <div className="w-full h-full relative group">
             <img 
               src={displayedImage} 
               alt={product?.basicInfo?.name || 'Product'} 
               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
             />
          </div>
        )}

        {/* Fullscreen Toggle */}
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-stone-600 hover:text-stone-900 hover:bg-white shadow-sm transition-all"
        >
          <FiMaximize size={18} />
        </button>

      </div>
      
      {isFullscreen && (
        <button 
          onClick={() => setIsFullscreen(false)}
          className="fixed top-8 right-8 px-6 py-2 bg-stone-900 text-white rounded-full font-bold shadow-xl"
        >
          Close Fullscreen
        </button>
      )}
    </div>
  );
}
