import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { FiChevronLeft, FiChevronRight, FiPhoneCall } from 'react-icons/fi';

export default function HeroSection({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { activeTheme } = useStorefrontTheme();
  const heroTokens = activeTheme.tokens.hero;

  const content = data?.content || {};
  const settings = {
    autoplay: true,
    autoplaySpeed: 5,
    transitionEffect: 'Fade',
    showDots: true,
    showArrows: false,
    infiniteLoop: true,
    ...data?.settings
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
  const phoneNumber = activeSlide.phoneNumber || content.phoneNumber || '09 678 7777 77';

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center bg-[#F7F7F7] overflow-hidden group">

      {/* Slider Images Background */}
      {slides.length > 0 ? (
        settings.transitionEffect?.toLowerCase() === 'slide' && slides.length > 1 ? (
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
        ) : settings.transitionEffect?.toLowerCase() === 'none' || slides.length === 1 ? (
          <div className="absolute inset-0 z-0">
            <img
              src={slides[currentSlide]?.image}
              alt={slides[currentSlide]?.title || title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className={`absolute inset-0 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
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
          {content.image || data?.image ? (
            <img src={content.image || data?.image} alt={title} className="w-full h-full object-cover object-center" />
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
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 lg:mt-24"
        key={`content-${currentSlide}`}
        style={{
          paddingTop: (activeSlide.textPaddingTop || settings.textPaddingTop) ? `${activeSlide.textPaddingTop || settings.textPaddingTop}px` : undefined,
          paddingBottom: (activeSlide.textPaddingBottom || settings.textPaddingBottom) ? `${activeSlide.textPaddingBottom || settings.textPaddingBottom}px` : undefined,
          paddingLeft: (activeSlide.textPaddingLeft || settings.textPaddingLeft) ? `${activeSlide.textPaddingLeft || settings.textPaddingLeft}px` : undefined,
          paddingRight: (activeSlide.textPaddingRight || settings.textPaddingRight) ? `${activeSlide.textPaddingRight || settings.textPaddingRight}px` : undefined,
          marginTop: (activeSlide.textMarginTop || settings.textMarginTop) ? `${activeSlide.textMarginTop || settings.textMarginTop}px` : undefined,
          marginBottom: (activeSlide.textMarginBottom || settings.textMarginBottom) ? `${activeSlide.textMarginBottom || settings.textMarginBottom}px` : undefined,
          marginLeft: (activeSlide.textMarginLeft || settings.textMarginLeft) ? `${activeSlide.textMarginLeft || settings.textMarginLeft}px` : undefined,
          marginRight: (activeSlide.textMarginRight || settings.textMarginRight) ? `${activeSlide.textMarginRight || settings.textMarginRight}px` : undefined,
        }}
      >
        <div className="max-w-4xl text-white">
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 w-full">
            <h1 className={`${heroTokens.titleSize} ${heroTokens.fontFamily} font-bold leading-[1.05] shrink-0 drop-shadow-lg`}>
              {title}
            </h1>
            {data?.type?.toLowerCase().includes('hero') && (
              <div className="flex-grow h-[1px] bg-white drop-shadow-md opacity-80" />
            )}
          </div>

          <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-12 w-full">
            {data?.type?.toLowerCase().includes('hero') && (
              <div className="w-16 md:w-24 h-[1px] bg-white drop-shadow-md opacity-80" />
            )}
            <p className="text-xl md:text-[36px] opacity-90 font-light text-white leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
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
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Number inside banner at bottom left */}
      {phoneNumber && (
        <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="text-xs md:text-sm font-bold tracking-wider drop-shadow-md">{phoneNumber}</span>
        </a>
      )}


    </section>
  );
}
