import React, { useMemo, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { cn } from '../../../../../utils/cn';
import { useCategories } from '../../../../context/commerce/CategoryContext';

export default function CategoryCarouselPreview({ section = {} }) {
  const { categories: allCategories } = useCategories();
  const carouselRef = useRef(null);
  const content = section.content || {};
  const settings = section.settings || {};
  
  const itemsPerView = settings.itemsPerView || 5;
  const spacing = settings.spacing ?? 20;

  const [isHovered, setIsHovered] = React.useState(false);

  // Drag to scroll state
  const [isDragging, setIsDragging] = React.useState(false);
  const [hasDragged, setHasDragged] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const mockCategories = [
    { name: 'Category 1', image: '' },
    { name: 'Category 2', image: '' },
    { name: 'Category 3', image: '' },
    { name: 'Category 4', image: '' },
    { name: 'Category 5', image: '' },
    { name: 'Category 6', image: '' }
  ];

  const getCategoryById = (id) => allCategories.find(c => (c._id || c.id) === id);

  const categories = useMemo(() => {
    if (content.categories && content.categories.length > 0) {
      return content.categories.map(catItem => {
        const globalCat = getCategoryById(catItem.id);
        return {
          name: catItem.customName || globalCat?.name || 'Category',
          image: catItem.image || globalCat?.image || globalCat?.bannerImage || ''
        };
      });
    }
    return mockCategories;
  }, [content.categories, allCategories]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

      if (settings.loop) {
        if (direction === 'right' && currentScroll >= maxScroll - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }
        if (direction === 'left' && currentScroll <= 10) {
          carouselRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
          return;
        }
      }

      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleItemClick = (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  React.useEffect(() => {
    const isAutoPlay = settings.autoPlay !== false && settings.autoPlay !== 'false';
    if (!isAutoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      scroll('right');
    }, settings.autoPlaySpeed || 3000);
    
    return () => clearInterval(interval);
  }, [settings.autoPlay, settings.autoPlaySpeed, isHovered, settings.loop]);

  return (
    <div className="w-full bg-white py-12 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-4 group cursor-pointer w-fit">
            <span className="text-[28px] font-normal text-[#2b2b2b] tracking-wide">{content.title || 'Populer Furniture'}</span>
            <FiArrowRight strokeWidth={1} size={28} className="text-[#2b2b2b]" />
          </h2>
        </div>

        <div 
          className="relative group carousel-container pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {settings.arrowVisibility !== 'hidden' && settings.showArrows !== false && (
            <>
              <div 
                onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                className={cn(
                  "absolute -left-4 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-400 z-10 cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-all pointer-events-auto",
                  (!settings.arrowVisibility || settings.arrowVisibility === 'hover') ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                )}
              >
                <FiChevronLeft size={20} />
              </div>
              <div 
                onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                className={cn(
                  "absolute -right-4 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-400 z-10 cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-all pointer-events-auto",
                  (!settings.arrowVisibility || settings.arrowVisibility === 'hover') ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                )}
              >
                <FiChevronRight size={20} />
              </div>
            </>
          )}

          <div 
            ref={carouselRef}
            className={cn(
              "flex overflow-x-auto scrollbar-hide pb-4 select-none",
              isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
            )}
            style={{ 
              gap: `${spacing}px`,
              msOverflowStyle: 'none', 
              scrollbarWidth: 'none' 
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {categories.map((cat, index) => (
              <div 
                key={index} 
                onClick={handleItemClick}
                className="snap-start shrink-0 block"
                style={{ width: `calc((100% - ${(itemsPerView - 1) * spacing}px) / ${itemsPerView})` }}
              >
                <div className="aspect-square w-full bg-gray-100 overflow-hidden relative mb-4 pointer-events-none">
                  {cat.image ? (
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                
                <div className="text-center px-2">
                  <h3 className="font-normal text-[#4a4a4a] text-[15px]">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
