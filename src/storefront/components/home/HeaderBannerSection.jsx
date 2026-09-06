import React from 'react';

export default function HeaderBannerSection({ data, activeTheme }) {
  const content = data?.content || {};
  const settings = data?.settings || {};

  const title = content.title || '';
  const description = content.description || '';
  const image = content.image || '';
  const buttonText = content.buttonText || '';
  const buttonLink = content.buttonLink || '';
  const showButton = content.showButton !== undefined ? content.showButton : false;

  const contentAlignment = settings.contentAlignment || 'left';
  const verticalAlignment = settings.verticalAlignment || 'center';
  const columnGap = settings.columnGap !== undefined ? settings.columnGap : 0;
  const imageWidth = settings.imageWidth || 55;
  const contentWidth = settings.contentWidth || 45;
  const imageHeight = settings.imageHeight || 400;
  const backgroundColor = settings.backgroundColor || '#FFFFFF';
  const textColor = settings.textColor || '#111827';
  const imagePosition = settings.imagePosition || 'left';
  const structure = settings.structure || ['title', 'description', 'button'];

  const alignClass = {
    'left': 'text-left items-start',
    'center': 'text-center items-center',
    'right': 'text-right items-end',
    'justify': 'text-justify items-start'
  }[contentAlignment] || 'text-left items-start';

  const verticalAlignClass = {
    'top': 'justify-start',
    'center': 'justify-center',
    'bottom': 'justify-end'
  }[verticalAlignment] || 'justify-center';

  return (
    <div
      className={`flex flex-col md:flex-row w-full font-sans overflow-hidden ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}
      style={{ backgroundColor, gap: `${columnGap}px` }}
    >
      <div
        className="relative"
        style={{ width: `calc(${imageWidth}% - ${columnGap / 2}px)`, minHeight: `${imageHeight}px` }}
      >
        {image ? (
          <img src={image} alt="Header Banner" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-neutral-200"></div>
        )}
      </div>
      <div
        className={`w-full flex flex-col ${verticalAlignClass} ${alignClass}`}
        style={{ 
          width: `calc(${contentWidth}% - ${columnGap / 2}px)`,
          padding: `${settings.paddingY !== undefined ? settings.paddingY : 40}px ${settings.paddingX !== undefined ? settings.paddingX : 40}px`
        }}
      >
        {structure.map((item, index) => {
          if (item === 'title' && title) {
            return (
              <h2 key={index} className={`mb-6 uppercase tracking-wide leading-tight ${settings.titleSize || 'text-3xl md:text-4xl lg:text-5xl'} ${settings.titleWeight || 'font-bold'}`} style={{ color: settings.titleColor || textColor }}>
                {title}
              </h2>
            );
          }
          if (item === 'description' && description) {
            return (
              <p key={index} className={`leading-relaxed mb-8 ${settings.descSize || 'text-sm md:text-base'}`} style={{ color: settings.descColor || textColor }}>
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
