import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function HeroSection({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { activeTheme } = useStorefrontTheme();
  const heroTokens = activeTheme.tokens.hero;
  
  const content = data?.content || {};
  const slides = activeTheme.heroSlides || [];
  
  const title = content.title || 'Discover Products That Inspire';
  const subtitle = content.subtitle || 'Premium quality products with modern designs crafted for your lifestyle.';
  const ctaText = content.ctaText || 'Shop Now';
  const secondaryCtaText = content.secondaryCtaText || 'Explore Categories';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center bg-[#F7F7F7] overflow-hidden">
      {/* Slider Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <img
            src={content.image || slide.image}
            alt={`${slide.category} furniture setup`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      
      {/* Dark overlay to give a premium, moody feel and make text pop */}
      <div className={`absolute inset-0 z-0 ${heroTokens.overlay}`}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          <span className="block text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-90 text-gray-200">
            {data?.category || 'NEW COLLECTION'}
          </span>
          <h1 className={`${heroTokens.titleSize} ${heroTokens.fontFamily} font-bold leading-[1.05] mb-6`}>
            {title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light text-gray-100 max-w-xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className={`inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest transition-colors uppercase ${heroTokens.buttonPrimary}`}
            >
              {ctaText}
            </Link>
            {secondaryCtaText && (
              <Link 
                to="/collections/new" 
                className={`inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest transition-colors uppercase ${heroTokens.buttonSecondary}`}
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Slider Navigation Dots */}
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

      {/* Mobile Number inside banner at bottom left */}
      <a href="tel:09678777777" className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span className="text-xs md:text-sm font-bold tracking-wider drop-shadow-md">09 678 7777 77</span>
      </a>
    </section>
  );
}
