import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryGridSection({ data }) {
  if (!data || !data.content) return null;

  const s = data.settings || {};
  const resolveSetting = (key, defaultVal) => {
    return {
      desktop: s[key] || defaultVal,
      tablet: s[`${key}_tablet`] || s[key] || defaultVal,
      mobile: s[`${key}_mobile`] || s[`${key}_tablet`] || s[key] || defaultVal
    };
  };

  const { title, categories } = data.content;
  const cols = resolveSetting('columns', '5');
  const gapSet = resolveSetting('gap', 'medium');
  const imageRatio = resolveSetting('imageRatio', 'square');
  const titleFont = s.titleFont || 'sans-serif';

  // Tailwind classes mapping based on user settings
  const getGridCols = () => {
    const getColClass = (val, prefix = '') => {
      switch (String(val)) {
        case '1': return `${prefix}grid-cols-1`;
        case '2': return `${prefix}grid-cols-2`;
        case '3': return `${prefix}grid-cols-3`;
        case '4': return `${prefix}grid-cols-4`;
        case '6': return `${prefix}grid-cols-6`;
        case '5':
        default: return `${prefix}grid-cols-5`;
      }
    };
    return `${getColClass(cols.mobile)} ${getColClass(cols.tablet, 'sm:')} ${getColClass(cols.desktop, 'md:')}`;
  };

  const gapClassMap = {
    small: 'gap-4',
    medium: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12'
  };

  const getGapValue = (gapVal) => gapClassMap[gapVal] || '';
  const getGapStyle = (gapVal) => !gapClassMap[gapVal] ? { gap: `${gapVal}px` } : {};

  // For gap we'll just use desktop for style if custom, or build classes if standard
  const gapClass = getGapValue(gapSet.desktop);
  const gapStyle = getGapStyle(gapSet.desktop);

  const getAspectRatio = () => {
    // For simplicity, we apply desktop imageRatio globally unless we want dynamic aspect ratios per breakpoint
    // Let's implement responsive aspect ratios using Tailwind aspect-[ratio] per breakpoint
    const getAspectClass = (val, prefix = '') => {
      switch (val) {
        case 'portrait': return `${prefix}aspect-[3/4]`;
        case 'landscape': return `${prefix}aspect-[4/3]`;
        case 'square':
        default: return `${prefix}aspect-square`;
      }
    };
    return `${getAspectClass(imageRatio.mobile)} ${getAspectClass(imageRatio.tablet, 'sm:')} ${getAspectClass(imageRatio.desktop, 'md:')}`;
  };

  const renderTitle = (name) => {
    if (!name) return null;
    const words = name.split(' ');
    let firstPart, secondPart;

    if (words.length > 1) {
      firstPart = words[0];
      secondPart = ' ' + words.slice(1).join(' ');
    } else {
      const splitIndex = Math.max(3, Math.floor(name.length / 2));
      firstPart = name.substring(0, splitIndex);
      secondPart = name.substring(splitIndex);
    }

    return (
      <h2 
        className="text-[32px] md:text-[40px] font-normal text-[#1a1a1a] tracking-normal mb-2"
        style={{ fontFamily: titleFont }}
      >
        <span className="border-b-[1px] border-gray-500 pb-1">{firstPart}</span>{secondPart}
      </h2>
    );
  };

  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">

        {title && (
          <div className="text-center mb-8 md:mb-10 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-500 mb-4 hidden">
              {/* Keeping breadcrumb hidden if they don't want it, but wait, they said "Shop > Living Room not add under header banner" earlier. So we leave it visible. */}
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-500 mb-6">
              <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
              <span className="text-gray-400 font-normal">&gt;</span>
              <span className="text-red-600">{title}</span>
            </div>
            {renderTitle(title)}
          </div>
        )}

        {(!categories || categories.length === 0) ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-gray-100">
            No categories added yet. Open the Advanced Settings to add categories.
          </div>
        ) : (
          <div className={`grid ${gapClass} ${getGridCols()}`} style={gapStyle}>
            {categories.map((cat, index) => {
              const cardContentElement = (
                <div className="w-full group flex flex-col bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-gray-200 p-[2px]">
                  <div className={`w-full ${getAspectRatio()} overflow-hidden bg-gray-50 relative`}>
                    {cat.image ? (
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                        <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 md:p-4 shrink-0 flex flex-col justify-center text-center">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name || 'Untitled Category'}
                    </h3>
                  </div>
                </div>
              );

              if (cat.link) {
                // Determine if it's an absolute URL
                const isAbsolute = cat.link.startsWith('http://') || cat.link.startsWith('https://');
                
                if (cat.link.startsWith('mailto:') || cat.link.startsWith('tel:')) {
                  return (
                    <a key={cat.id || index} href={cat.link} className="block w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      {cardContentElement}
                    </a>
                  );
                }

                // Force all HTTP links to become relative paths so they trigger a React state change (SPA routing)
                // without reloading the page, exactly as requested.
                let toPath = cat.link;
                try {
                  if (isAbsolute) {
                    const url = new URL(cat.link);
                    toPath = url.pathname + url.search + url.hash;
                  }
                } catch (e) {
                  // Ignore parsing errors, fallback to raw string
                }

                return (
                  <Link key={cat.id || index} to={toPath} className="block w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {cardContentElement}
                  </Link>
                );
              }

              return (
                <div key={cat.id || index} className="w-full">
                  {cardContentElement}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
