import React from 'react';
import { Link } from 'react-router-dom';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function CreationsWithPurpose({ data, activeTheme, ...settings }) {
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : "Creations with purpose";
  const subtitle = content.subtitle !== undefined ? content.subtitle : "Many choices based on your space";
  const ctaText = content.ctaText !== undefined ? content.ctaText : "Explore Now";
  const ctaUrl = content.ctaUrl !== undefined ? content.ctaUrl : "/shop";
  const items = content.items !== undefined ? content.items : [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800", title: "Bedroom", link: "/category/bedroom" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800", title: "Office", link: "/category/office" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800", title: "Living Room", link: "/category/living-room" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800", title: "Dining", link: "/category/dining" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800", title: "Sofa", link: "/category/sofa" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=800", title: "Kitchen", link: "/category/kitchen" }
  ];
  
  const resolveSetting = (key, defaultVal) => {
    return {
      desktop: settings[key] !== undefined ? settings[key] : defaultVal,
      tablet: settings[`${key}_tablet`] !== undefined ? settings[`${key}_tablet`] : (settings[key] !== undefined ? settings[key] : defaultVal),
      mobile: settings[`${key}_mobile`] !== undefined ? settings[`${key}_mobile`] : (settings[`${key}_tablet`] !== undefined ? settings[`${key}_tablet`] : (settings[key] !== undefined ? settings[key] : defaultVal))
    };
  };

  const itemCount = items?.length || 0;
  
  if (itemCount === 0) return null;

  // Use dynamic layout settings if provided, else fallback to standard layout logic
  const gridColsSetting = resolveSetting('gridCols', null);
  const getGridClasses = (baseClasses) => {
    let gridClasses = baseClasses;
    if (gridColsSetting.desktop || settings.gridColsDesktop) {
       const m = gridColsSetting.mobile || settings.gridColsMobile || '1';
       const t = gridColsSetting.tablet || settings.gridColsTablet || '2';
       const d = gridColsSetting.desktop || settings.gridColsDesktop || '3';
       gridClasses += ` grid-cols-${m} sm:grid-cols-${t} md:grid-cols-${d}`;
    } else {
      if (itemCount <= 2) {
        gridClasses += " grid-cols-1 md:grid-cols-2";
      } else if (itemCount === 3 || itemCount === 4) {
        gridClasses += " grid-cols-2 lg:grid-cols-2";
      } else {
        gridClasses += " grid-cols-2 md:grid-cols-3";
      }
    }
    return gridClasses;
  };

  const imageRatioSetting = resolveSetting('imageRatio', 'Square (1:1)');
  const getAspectRatioClass = () => {
    // Only support desktop aspect ratio mapped to tailwind for simplicity, since it's a fixed class, 
    // or we can map them responsive if needed. Let's map it.
    const getCls = (val) => val === 'Portrait (3:4)' ? 'aspect-[3/4]' : (val === 'Landscape (16:9)' ? 'aspect-video' : 'aspect-square');
    return `${getCls(imageRatioSetting.mobile)} sm:${getCls(imageRatioSetting.tablet)} md:${getCls(imageRatioSetting.desktop)}`;
  };

  const bgCol = settings.backgroundColor || null;
  
  const paddingSetting = resolveSetting('sectionPadding', 'Large');
  const getPaddingClass = () => {
     const getCls = (val) => val === 'None' ? 'py-0' : (val === 'Small' ? 'py-8' : (val === 'Medium' ? 'py-16' : 'py-24'));
     return `${getCls(paddingSetting.mobile)} sm:${getCls(paddingSetting.tablet)} md:${getCls(paddingSetting.desktop)}`;
  };
  
  // Theme 2: Editorial Center Layout
  if (activeTheme?.id === 'modern-luxury') {
    return (
      <section className={`w-full overflow-hidden ${bgCol ? '' : 'bg-neutral-50'} ${getPaddingClass()}`} style={{ backgroundColor: bgCol }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center max-w-2xl mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-neutral-900 mb-6">{title}</h2>
            <p className="text-lg text-neutral-600 mb-8">{subtitle}</p>
            <Link 
              to={ctaUrl} 
              className="inline-flex items-center justify-center px-8 py-3 border border-neutral-900 text-base font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300"
            >
              {ctaText}
            </Link>
          </div>
          <div className={getGridClasses("w-full grid gap-4 sm:gap-6")}>
            {items.map((img) => (
              <Link to={img.link} key={img.id} className={`relative overflow-hidden group cursor-pointer bg-neutral-200 block shadow-sm hover:shadow-xl rounded-xl ${getAspectRatioClass()}`}>
                <img src={img.imageUrl} alt={img.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
                  <span className="text-white text-xl font-serif tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Theme 1: Classic Furniture Layout
  return (
    <section className={`w-full overflow-hidden ${bgCol ? '' : 'bg-white'} ${getPaddingClass()}`} style={{ backgroundColor: bgCol }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          
          {/* Left Section: Typography Block (~30%) */}
          <div className="w-full lg:w-[30%] flex flex-col items-center lg:items-end text-center lg:text-right px-4 lg:px-12 order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-xl text-gray-500 mt-4">
              {subtitle}
            </p>
            <Link 
              to={ctaUrl} 
              className="text-lg font-medium border-b border-gray-900 pb-1 mt-8 inline-block hover:text-red-600 hover:border-red-600 transition-colors"
            >
              {ctaText}
            </Link>
          </div>

          {/* Right Section: Image Grid (~70%) */}
          <div className="w-full lg:w-[70%] order-2">
            <div className={getGridClasses("grid gap-2 sm:gap-4")}>
              {items.map((img) => (
                <Link to={img.link} key={img.id} className={`relative overflow-hidden rounded-none group cursor-pointer bg-gray-100 block ${getAspectRatioClass()}`}>
                  <img 
                    src={img.imageUrl} 
                    alt={img.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay with Category Name */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 sm:p-10">
                    <div className="w-full h-full border border-white flex flex-col items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-500">
                      <span className="text-white text-3xl md:text-4xl font-bold text-center leading-tight">
                        {img.title}<br/>space
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
