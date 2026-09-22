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
    { id: "1", imageUrl: "", title: "Bedroom", link: "/category/bedroom" },
    { id: "2", imageUrl: "", title: "Office", link: "/category/office" },
    { id: "3", imageUrl: "", title: "Living Room", link: "/category/living-room" },
    { id: "4", imageUrl: "", title: "Dining", link: "/category/dining" },
    { id: "5", imageUrl: "", title: "Sofa", link: "/category/sofa" },
    { id: "6", imageUrl: "", title: "Kitchen", link: "/category/kitchen" }
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
  
  const marginSetting = resolveSetting('sectionMargin', '');
  const paddingSetting = resolveSetting('sectionPadding', '');
  
  const titleFontFamilySetting = resolveSetting('titleFontFamily', 'Inter');
  const titleFontSizeSetting = resolveSetting('titleFontSize', '');
  const subtitleFontFamilySetting = resolveSetting('subtitleFontFamily', 'Inter');
  const subtitleFontSizeSetting = resolveSetting('subtitleFontSize', '');

  const layoutDirectionSetting = resolveSetting('layoutDirection', 'left');
  
  const getDesktopPos = () => {
    let p = layoutDirectionSetting.desktop || 'left';
    if (p === 'row') return 'left';
    if (p === 'column') return 'top';
    return p;
  };
  const dPos = getDesktopPos();

  const contentAlignmentSetting = resolveSetting('contentAlignment', '');
  const getContentAlign = () => {
    let align = contentAlignmentSetting.desktop;
    if (align) return align;
    if (dPos === 'top' || dPos === 'bottom') return 'center';
    return 'left';
  };
  const cAlign = getContentAlign();

  const formatFontSize = (val) => {
    if (!val) return undefined;
    if (!isNaN(val)) return `${val}px`;
    return val;
  };

  const parseSpacing = (val) => {
    if (!val || ['Small', 'Medium', 'Large', 'None'].includes(val)) return '';
    return val;
  };
  
  // Use inline style for dynamic margin and padding 
  // (In a real production app with styled-components or CSS variables we'd map responsive breakpoints perfectly, 
  // but for inline styles we will apply the desktop setting globally for now to respect the CMS string inputs)
  const sectionStyle = {
    backgroundColor: bgCol || undefined,
    margin: parseSpacing(marginSetting.desktop),
    padding: parseSpacing(paddingSetting.desktop)
  };
  
  // Theme 2: Editorial Center Layout
  if (activeTheme?.id === 'modern-luxury') {
    return (
      <section className={`w-full overflow-hidden ${bgCol ? '' : 'bg-neutral-50'}`} style={sectionStyle}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center max-w-2xl mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-serif text-neutral-900 mb-6"
              style={{
                fontFamily: titleFontFamilySetting.desktop || undefined,
                fontSize: formatFontSize(titleFontSizeSetting.desktop)
              }}
            >
              {title}
            </h2>
            <p 
              className="text-lg text-neutral-600 mb-8"
              style={{
                fontFamily: subtitleFontFamilySetting.desktop || undefined,
                fontSize: formatFontSize(subtitleFontSizeSetting.desktop)
              }}
            >
              {subtitle}
            </p>
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
                {img.imageUrl ? (
                  <img src={img.imageUrl} alt={img.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                ) : null}
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
    <section className={`w-full overflow-hidden ${bgCol ? '' : 'bg-white'}`} style={sectionStyle}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-12 lg:gap-8 items-center ${dPos === 'left' ? 'lg:flex-row' : dPos === 'right' ? 'lg:flex-row-reverse' : dPos === 'bottom' ? 'lg:flex-col-reverse' : 'lg:flex-col'}`}>
          
          {/* Text Section */}
          <div className={`w-full ${dPos === 'top' || dPos === 'bottom' ? 'lg:w-full' : 'lg:w-[30%]'} flex flex-col px-4 lg:px-12 ${cAlign === 'center' ? 'text-center items-center' : cAlign === 'right' ? 'text-right items-end' : 'text-left items-start'}`}>
            <h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              style={{
                fontFamily: titleFontFamilySetting.desktop || undefined,
                fontSize: formatFontSize(titleFontSizeSetting.desktop)
              }}
            >
              {title}
            </h2>
            <p 
              className="text-xl text-gray-500 mt-4"
              style={{
                fontFamily: subtitleFontFamilySetting.desktop || undefined,
                fontSize: formatFontSize(subtitleFontSizeSetting.desktop)
              }}
            >
              {subtitle}
            </p>
            <Link 
              to={ctaUrl} 
              className="text-lg font-medium border-b border-gray-900 pb-1 mt-8 inline-block hover:text-red-600 hover:border-red-600 transition-colors"
            >
              {ctaText}
            </Link>
          </div>

          {/* Image Grid */}
          <div className={`w-full ${dPos === 'top' || dPos === 'bottom' ? 'lg:w-full' : 'lg:w-[70%]'}`}>
            <div className={getGridClasses("grid gap-2 sm:gap-4")}>
              {items.map((img) => (
                <Link to={img.link} key={img.id} className={`relative overflow-hidden rounded-none group cursor-pointer bg-gray-200 block ${getAspectRatioClass()}`}>
                  {img.imageUrl ? (
                    <img 
                      src={img.imageUrl} 
                      alt={img.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                  {/* Hover Overlay with Category Name */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 lg:p-8">
                    <div className="w-full h-full border border-white/90 flex flex-col items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-500 px-2 text-center">
                      <span className="text-white text-base lg:text-xl font-bold leading-tight drop-shadow-sm">
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
