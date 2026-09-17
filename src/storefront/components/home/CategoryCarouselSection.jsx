import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import CategoryImage from '../../../admin/components/cms/editor/CategoryImage';
import { cn } from '../../../utils/cn';

export default function CategoryCarouselSection({ data }) {
  const { categories: allCategories } = useCategories();
  const carouselRef = useRef(null);
  
  const content = data?.content || {};
  const settings = data?.settings || {};
  
  const title = content.title || '';
  const categoryList = content.categories || [];
  
  const getCategoryById = (id) => allCategories.find(c => (c._id || c.id) === id);

  const resolvedCategories = useMemo(() => {
    return categoryList.map(catItem => {
      const globalCat = getCategoryById(catItem.id);
      return {
        ...globalCat,
        ...catItem,
        finalName: catItem.customName || globalCat?.name || 'Unknown Category',
        finalImage: catItem.image || globalCat?.image || globalCat?.bannerImage || ''
      };
    });
  }, [categoryList, allCategories]);

  const showArrows = settings.showArrows !== false;
  const spacing = settings.spacing ?? 20;

  // Responsive Items Per View
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return settings.itemsPerView_mobile || 2;
      if (window.innerWidth < 1024) return settings.itemsPerView_tablet || 3;
    }
    return settings.itemsPerView || 5;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [viewport, setViewport] = useState('desktop');
  const [isHovered, setIsHovered] = useState(false);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    setItemsPerView(getItemsPerView());
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      const width = window.innerWidth;
      if (width < 768) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [settings]);

  const formatUnit = (val) => {
    if (val === undefined || val === null || val === '') return undefined;
    if (!isNaN(val)) return `${val}px`;
    return val;
  };

  const getProp = (propName) => {
    if (viewport !== 'desktop') {
      const deviceProp = `${propName}_${viewport}`;
      if (settings[deviceProp] != null && settings[deviceProp] !== '') return settings[deviceProp];
    }
    return settings[propName];
  };

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

  const handleLinkClick = (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const isAutoPlay = settings.autoPlay !== false && settings.autoPlay !== 'false';
    if (!isAutoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      scroll('right');
    }, settings.autoPlaySpeed || 3000);
    
    return () => clearInterval(interval);
  }, [settings.autoPlay, settings.autoPlaySpeed, isHovered, settings.loop]);

  if (!resolvedCategories.length) return null;

  return (
    <section 
      className="w-full bg-white"
      style={{
        paddingTop:    formatUnit(getProp('textPaddingTop')),
        paddingBottom: formatUnit(getProp('textPaddingBottom')),
        paddingLeft:   formatUnit(getProp('textPaddingLeft')),
        paddingRight:  formatUnit(getProp('textPaddingRight')),
        marginTop:     formatUnit(getProp('textMarginTop')),
        marginBottom:  formatUnit(getProp('textMarginBottom')),
        marginLeft:    formatUnit(getProp('textMarginLeft')),
        marginRight:   formatUnit(getProp('textMarginRight')),
      }}
    >
      <div className="w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {title && (
            <h2 className="flex items-center gap-4 group cursor-pointer w-fit">
              <span className="text-[28px] font-normal text-[#2b2b2b] tracking-wide">{title}</span>
              <FiArrowRight strokeWidth={1} size={28} className="text-[#2b2b2b] transition-transform duration-300 group-hover:translate-x-2" />
            </h2>
          )}
          
          {/* Navigation Controls */}
          {settings.arrowVisibility !== 'hidden' && settings.showArrows !== false && (
            <div className="hidden md:flex items-center gap-3 opacity-0 transition-opacity duration-300">
            </div>
          )}
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {settings.arrowVisibility !== 'hidden' && settings.showArrows !== false && (
            <>
              <button 
                onClick={() => scroll('left')}
                className={cn(
                  "absolute -left-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black transition-all duration-300",
                  (!settings.arrowVisibility || settings.arrowVisibility === 'hover') ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                )}
              >
                <FiChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className={cn(
                  "absolute -right-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black transition-all duration-300",
                  (!settings.arrowVisibility || settings.arrowVisibility === 'hover') ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                )}
              >
                <FiChevronRight size={20} />
              </button>
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
              // Hide scrollbar but keep functionality
              msOverflowStyle: 'none', 
              scrollbarWidth: 'none' 
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {/* CSS to hide webkit scrollbar */}
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {resolvedCategories.map((cat, index) => (
              <Link 
                key={`${cat.id}-${index}`}
                to={`/categories/${cat.slug || cat.id}`}
                onClick={handleLinkClick}
                className="snap-start shrink-0 group/card transition-all block"
                style={{
                  width: `calc((100% - ${(itemsPerView - 1) * spacing}px) / ${itemsPerView})`
                }}
              >
                {/* Image */}
                <div className="aspect-square w-full bg-transparent overflow-hidden relative mb-4 pointer-events-none">
                  <CategoryImage 
                    src={cat.finalImage} 
                    alt={cat.finalName}
                    categoryName={cat.finalName}
                    className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-700 ease-out" 
                  />
                </div>
                
                {/* Content */}
                <div className="text-center px-2">
                  <h3 className="font-normal text-[#4a4a4a] text-[15px] group-hover/card:text-black transition-colors">
                    {cat.finalName}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
