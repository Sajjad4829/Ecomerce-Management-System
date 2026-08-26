import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function HeroSection({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { activeTheme } = useStorefrontTheme();
  const heroTokens = activeTheme.tokens.hero;
  
  const content = data?.content || {};
  const settings = data?.settings || {
    autoplay: true,
    autoplaySpeed: 5,
    transitionEffect: 'Fade',
    showDots: true,
    showArrows: false,
    infiniteLoop: true
  };
  
  // Get active slides only, or fallback to theme defaults
  const rawSlides = (content.slides && content.slides.length > 0) ? content.slides : (activeTheme.heroSlides || []);
  const slides = rawSlides.filter(s => s.active !== false);
  
  useEffect(() => {
    if (!settings.autoplay || slides.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length - 1) {
          return settings.infiniteLoop ? 0 : prev;
        }
        return prev + 1;
      });
    }, (settings.autoplaySpeed || 5) * 1000);
    return () => clearInterval(timer);
  }, [slides.length, settings.autoplay, settings.autoplaySpeed, settings.infiniteLoop]);

  const nextSlide = () => setCurrentSlide((prev) => prev === slides.length - 1 ? (settings.infiniteLoop ? 0 : prev) : prev + 1);
  const prevSlide = () => setCurrentSlide((prev) => prev === 0 ? (settings.infiniteLoop ? slides.length - 1 : prev) : prev - 1);

  // Active slide details
  const activeSlide = slides[currentSlide] || {};
  const title = activeSlide.title || content.title || '';
  const subtitle = activeSlide.subtitle2 || activeSlide.subtitle || content.subtitle || '';
  const ctaText = activeSlide.ctaText || content.ctaText || '';
  const ctaLink = activeSlide.ctaLink || content.ctaUrl || '/products';

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center bg-[#F7F7F7] overflow-hidden group">
      
      {/* Slider Images Background */}
      {slides.length > 0 ? (
        settings.transitionEffect === 'Slide' ? (
          <div 
            className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id || index} className="w-full h-full flex-shrink-0 relative">
                <img src={slide.image} alt={slide.title || title} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
        ) : (
          slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title || title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))
        )
      ) : (
        <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400">
           {content.image ? (
             <img src={content.image} alt={title} className="w-full h-full object-cover object-center" />
           ) : (
             <span>No Image Provided</span>
           )}
        </div>
      )}
      
      {/* Dark overlay */}
      {settings.overlay !== false && (
        <div 
          className="absolute inset-0 z-0 bg-black transition-opacity duration-300"
          style={{ opacity: settings.overlayOpacity || '0.2' }}
        ></div>
      )}
      
      {/* Text Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 lg:mt-24 transition-opacity duration-700" key={`content-${currentSlide}`}>
        <div className="max-w-4xl text-white">
          <span className="block text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-90 text-gray-200">
            {data?.category || ''}
          </span>
          <div className="flex items-center mb-4 md:mb-6">
            <h1 className={`${heroTokens.titleSize} ${heroTokens.fontFamily} font-bold leading-[1.05] shrink-0 drop-shadow-lg`}>
              {title}
            </h1>
            <div className="flex-1 ml-6 md:ml-10 h-[2px] bg-white opacity-50 mt-2"></div>
          </div>
          <div className="flex items-center mb-10 md:mb-12">
            <div className="w-16 md:w-48 mr-6 md:mr-10 h-[1px] bg-white opacity-60 mt-2"></div>
            <p className="text-xl md:text-[40px] opacity-90 font-light text-white leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 ml-0 md:ml-[232px]">
            {ctaText && (
              <Link 
                to={ctaLink} 
                className={`inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest transition-colors uppercase ${heroTokens.buttonPrimary}`}
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Arrows */}
      {settings.showArrows && slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Slider Navigation Dots */}
      {settings.showDots && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Number inside banner at bottom left */}
      <a href="tel:09678777777" className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span className="text-xs md:text-sm font-bold tracking-wider drop-shadow-md">09 678 7777 77</span>
      </a>

      {/* Floating Chat Bubble at bottom right */}
      <button 
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 bg-[#ED1C24] rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
        aria-label="Chat with us"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    </section>
  );
}
