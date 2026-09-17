import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { FiChevronLeft, FiChevronRight, FiPhoneCall } from 'react-icons/fi';

export default function HeroSection({ data, viewport: propViewport }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewport, setViewport] = useState(propViewport || 'desktop');
  const { activeTheme } = useStorefrontTheme();
  const heroTokens = activeTheme.tokens.hero;

  useEffect(() => {
    if (propViewport) {
      setViewport(propViewport);
      return;
    }
    const handleResize = () => {
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
  }, [propViewport]);

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

  const formatUnit = (val) => {
    if (val === undefined || val === null || val === '') return undefined;
    if (!isNaN(val)) return `${val}px`;
    return val;
  };

  const getProp = (propName) => {
    // Try data.responsive first
    if (data?.responsive && data.responsive[viewport] && data.responsive[viewport][propName] != null && data.responsive[viewport][propName] !== '') {
      return data.responsive[viewport][propName];
    }
    
    // Legacy support for _viewport suffixed settings
    if (viewport !== 'desktop') {
      const deviceProp = `${propName}_${viewport}`;
      if (settings[deviceProp] != null && settings[deviceProp] !== '') return settings[deviceProp];
      if (activeSlide[deviceProp] != null && activeSlide[deviceProp] !== '') return activeSlide[deviceProp];
    }

    // Fallbacks
    if (settings[propName] != null && settings[propName] !== '') return settings[propName];
    return activeSlide[propName];
  };

  const getLineWidth = (text, type = 'title') => {
    const len = text?.length || 0;
    if (type === 'title') {
      if (len > 35) return 'w-8 md:w-12 lg:w-16';
      if (len > 20) return 'w-12 md:w-24 lg:w-32';
      return 'w-24 md:w-48 lg:w-64';
    } else {
      if (len > 70) return 'w-8 md:w-12 lg:w-16';
      if (len > 40) return 'w-12 md:w-24 lg:w-32';
      return 'w-24 md:w-48 lg:w-64';
    }
  };

  return (
    <section 
      className={`relative w-full bg-white md:bg-[#F7F7F7] ${propViewport ? 'p-0' : 'p-3 md:p-0'} ${viewport === 'mobile' ? 'h-[300px]' : (propViewport ? 'h-full min-h-0' : 'h-[65vh] md:h-screen min-h-[400px] md:min-h-[600px]')}`}
      style={propViewport ? { 
        height: getProp('heroHeight') ? formatUnit(getProp('heroHeight')) : (viewport === 'mobile' ? '300px' : '100%'),
        width: getProp('heroWidth') ? formatUnit(getProp('heroWidth')) : undefined
      } : {
        height: getProp('heroHeight') ? formatUnit(getProp('heroHeight')) : (viewport === 'mobile' ? '300px' : undefined),
        width: getProp('heroWidth') ? formatUnit(getProp('heroWidth')) : undefined
      }}
    >
      <div className="w-full h-full relative rounded-[20px] md:rounded-none overflow-hidden group mx-auto" style={{ maxWidth: getProp('heroWidth') ? '100%' : undefined }}>

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

      {/* Overlay */}
      {settings.overlay !== false && (
        <div 
          className="absolute inset-0 z-0 bg-black transition-opacity duration-300" 
          style={{ opacity: settings.overlayOpacity !== undefined ? settings.overlayOpacity : 0.4 }}
        />
      )}

      {/* Text Content — absolute positioned so padding/margin settings work exactly as typed */}
      <div className="absolute inset-0 z-10 overflow-hidden flex flex-col" key={`content-${currentSlide}`}>
        <div
          className="flex flex-col w-full h-full justify-center"
          style={{
            paddingTop:    formatUnit(getProp('textPaddingTop'))    || (viewport === 'mobile' ? '1rem' : '8rem'),
            paddingBottom: formatUnit(getProp('textPaddingBottom')),
            paddingLeft:   formatUnit(getProp('textPaddingLeft'))   || (viewport === 'mobile' ? '1rem' : '2rem'),
            paddingRight:  formatUnit(getProp('textPaddingRight'))  || (viewport === 'mobile' ? '1rem' : '2rem'),
            marginTop:     formatUnit(getProp('textMarginTop')),
            marginBottom:  formatUnit(getProp('textMarginBottom')),
            marginLeft:    formatUnit(getProp('textMarginLeft')),
            marginRight:   formatUnit(getProp('textMarginRight')),
            maxWidth:      '80rem',
          }}
        >
          {/* Title block — margin on wrapper div moves the whole title row */}
          <div
            className="w-full text-white"
            style={{
              marginTop:    formatUnit(getProp('titleMarginTop')),
              marginBottom: formatUnit(getProp('titleMarginBottom')) || '0.5rem',
              marginLeft:   formatUnit(getProp('titleMarginLeft')),
              marginRight:  formatUnit(getProp('titleMarginRight')),
            }}
          >
            <div className="flex flex-row items-center gap-2 md:gap-6 w-full shrink-0">
              <h1 
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight ${getProp('titleFontFamily') || "font-['Montserrat']"} ${getProp('titleFontWeight') || 'font-medium'}`}
                style={{ 
                  fontSize: getProp('titleFontSize') ? formatUnit(getProp('titleFontSize')) : undefined,
                  color: getProp('titleColor') || undefined,
                }}
              >
                {title}
              </h1>
              {getProp('showTitleLine') !== false && (
                <div 
                  className={`${getLineWidth(title, 'title')} shadow-sm shrink-0 opacity-70 transition-all duration-300`} 
                  style={{ 
                    backgroundColor: getProp('titleLineColor') || '#ffffff',
                    width: getProp('titleLineWidth') ? formatUnit(getProp('titleLineWidth')) : undefined,
                    height: formatUnit(getProp('titleLineStroke')) || '1px'
                  }}
                />
              )}
            </div>
          </div>

          {/* Subtitle block — margin on wrapper div moves the whole subtitle row */}
          <div
            className="w-full text-white"
            style={{
              marginTop:    formatUnit(getProp('subtitleMarginTop')),
              marginBottom: formatUnit(getProp('subtitleMarginBottom')) || '1rem',
              marginLeft:   formatUnit(getProp('subtitleMarginLeft')),
              marginRight:  formatUnit(getProp('subtitleMarginRight')),
            }}
          >
            <div className="flex flex-row items-center gap-2 md:gap-6 w-full shrink-0">
              {getProp('showSubtitleLine') !== false && (
                <div 
                  className={`${getLineWidth(subtitle, 'subtitle')} shadow-sm shrink-0 opacity-70 transition-all duration-300`} 
                  style={{ 
                    backgroundColor: getProp('subtitleLineColor') || '#5946ff',
                    width: getProp('subtitleLineWidth') ? formatUnit(getProp('subtitleLineWidth')) : undefined,
                    height: formatUnit(getProp('subtitleLineStroke')) || '1px'
                  }}
                />
              )}
              <p 
                className={`text-base md:text-[36px] opacity-90 ${getProp('subtitleFontWeight') || 'font-light'} text-white leading-relaxed drop-shadow-md ${getProp('subtitleFontFamily') || ''} shrink-0`}
                style={{
                  fontSize: getProp('subtitleFontSize') ? formatUnit(getProp('subtitleFontSize')) : undefined,
                  color: getProp('subtitleColor') || undefined,
                }}
              >
                {subtitle}
              </p>
            </div>
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
      </div>
    </section>
  );
}
