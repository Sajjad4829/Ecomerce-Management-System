import React from 'react';

export default function HeaderBannerSection({ data, activeTheme }) {
  const content = data?.content || {};
  const settings = data?.settings || {};

  const resolveSetting = (key, defaultVal) => {
    return {
      desktop: settings[key] !== undefined ? settings[key] : defaultVal,
      tablet: settings[`${key}_tablet`] !== undefined ? settings[`${key}_tablet`] : (settings[key] !== undefined ? settings[key] : defaultVal),
      mobile: settings[`${key}_mobile`] !== undefined ? settings[`${key}_mobile`] : (settings[`${key}_tablet`] !== undefined ? settings[`${key}_tablet`] : (settings[key] !== undefined ? settings[key] : defaultVal))
    };
  };

  const title = content.title || '';
  const description = content.description || '';
  const image = content.image || '';
  const buttonText = content.buttonText || '';
  const buttonLink = content.buttonLink || '';
  const showButton = content.showButton !== undefined ? content.showButton : false;

  const contentAlignment = resolveSetting('contentAlignment', 'left');
  const verticalAlignment = resolveSetting('verticalAlignment', 'center');
  const columnGap = resolveSetting('columnGap', 0);
  const imageHeight = resolveSetting('imageHeight', 400);
  const paddingX = resolveSetting('paddingX', 40);
  const paddingY = resolveSetting('paddingY', 40);
  const sectionHeight = resolveSetting('sectionHeight', 0);
  const sectionFixedHeight = resolveSetting('sectionFixedHeight', 0);

  const imageWidth = settings.imageWidth || 55;
  const contentWidth = settings.contentWidth || 45;
  const backgroundColor = settings.backgroundColor || '#FFFFFF';
  const textColor = settings.textColor || '#111827';
  const imagePosition = settings.imagePosition || 'left';
  const sectionWidth = settings.sectionWidth || 'w-full';
  const structure = settings.structure || ['title', 'description', 'button'];

  const getAlignClass = (align) => ({
    'left': 'text-left items-start',
    'center': 'text-center items-center',
    'right': 'text-right items-end',
    'justify': 'text-justify items-start'
  }[align] || 'text-left items-start');

  const getVerticalAlignClass = (valign) => ({
    'top': 'justify-start',
    'center': 'justify-center',
    'bottom': 'justify-end'
  }[valign] || 'justify-center');

  // We map responsive classes manually to simplify. 
  // Wait, these are currently used in the wrapper div. Let's compute a static desktop version for simplicity 
  // or use Tailwind classes to implement responsive alignments.
  const getResponsiveAlignClasses = () => {
     // map alignClass for mobile, sm: tablet, md: desktop
     const mb = getAlignClass(contentAlignment.mobile).split(' ').map(c => `${c}`).join(' ');
     const tb = getAlignClass(contentAlignment.tablet).split(' ').map(c => `sm:${c}`).join(' ');
     const dt = getAlignClass(contentAlignment.desktop).split(' ').map(c => `md:${c}`).join(' ');
     return `${mb} ${tb} ${dt}`;
  };

  const getResponsiveVerticalClasses = () => {
     const mb = getVerticalAlignClass(verticalAlignment.mobile).split(' ').map(c => `${c}`).join(' ');
     const tb = getVerticalAlignClass(verticalAlignment.tablet).split(' ').map(c => `sm:${c}`).join(' ');
     const dt = getVerticalAlignClass(verticalAlignment.desktop).split(' ').map(c => `md:${c}`).join(' ');
     return `${mb} ${tb} ${dt}`;
  };

  return (
    <div
      className={`flex flex-col md:flex-row mx-auto font-sans overflow-hidden ${sectionWidth} ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}
      style={{ 
        backgroundColor, 
        gap: `${columnGap.desktop}px`,
        minHeight: `${sectionHeight.desktop}px`,
        height: sectionFixedHeight.desktop > 0 ? `${sectionFixedHeight.desktop}px` : 'auto'
      }}
    >
      <div
        className={`w-full flex header-banner-img-${imageWidth}`}
        style={{ 
          '--md-width': `calc(${imageWidth}% - ${columnGap.desktop / 2}px)`
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .header-banner-img-${imageWidth} { width: var(--md-width) !important; flex: 0 0 auto; }
          }
        `}</style>
        {image ? (
          <img 
            src={image} 
            alt="Header Banner" 
            className="w-full object-cover" 
            style={{ height: imageHeight.desktop > 0 ? `${imageHeight.desktop}px` : '100%' }} 
          />
        ) : (
          <div className="w-full min-h-[300px] bg-neutral-200" style={{ height: imageHeight.desktop > 0 ? `${imageHeight.desktop}px` : '100%' }}></div>
        )}
      </div>
      <div
        className={`w-full flex flex-col header-banner-content-${contentWidth} ${getResponsiveVerticalClasses()} ${getResponsiveAlignClasses()}`}
        style={{ 
          '--md-content-width': `calc(${contentWidth}% - ${columnGap.desktop / 2}px)`,
          padding: `${paddingY.desktop}px ${paddingX.desktop}px`
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .header-banner-content-${contentWidth} { width: var(--md-content-width) !important; flex: 0 0 auto; }
          }
        `}</style>
        {structure.map((item, index) => {
          if (item === 'title' && title) {
            return (
              <h2 key={index} className={`mb-6 uppercase tracking-wide leading-tight ${settings.titleSize || 'text-3xl md:text-4xl lg:text-5xl'} ${settings.titleWeight || 'font-bold'} ${settings.titleStyle || 'not-italic'}`} style={{ color: settings.titleColor || textColor }}>
                {title}
              </h2>
            );
          }
          if (item === 'description' && description) {
            return (
              <p key={index} className={`leading-relaxed mb-8 ${settings.descSize || 'text-sm md:text-base'} ${settings.descStyle || 'not-italic'}`} style={{ color: settings.descColor || textColor }}>
                {description}
              </p>
            );
          }
          if (item === 'button' && showButton) {
            return (
              <a
                key={index}
                href={buttonLink}
                className="inline-block px-8 py-3 bg-gray-900 text-white font-medium text-sm rounded hover:bg-gray-800 transition-colors self-start"
              >
                {buttonText}
              </a>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
