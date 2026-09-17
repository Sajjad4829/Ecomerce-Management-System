import { Link } from 'react-router-dom';

const formatDimension = (val, fallback) => {
  if (!val) return fallback;
  const cleaned = val.toString().trim().replace(/\s+px$/i, 'px');
  if (/^\d+$/.test(cleaned)) return `${cleaned}px`;
  return cleaned;
};

export default function CategoryHero({ category }) {
  if (!category || (!category.bannerImage && !category.image)) return null;

  const descFontClass = category.descriptionFontFamily || 'font-sans';
  const descSizeVal = category.descriptionFontSize;
  const descSizeClass = !descSizeVal ? 'text-sm md:text-base' : '';
  const descStyle = descSizeVal ? { fontSize: isNaN(Number(descSizeVal)) ? descSizeVal : `${descSizeVal}px` } : {};
  
  const titleFontClass = category.titleFontFamily || 'font-sans';
  const titleSizeVal = category.titleFontSize;
  const titleSizeClass = !titleSizeVal ? 'text-2xl md:text-3xl lg:text-4xl' : '';
  const titleStyle = titleSizeVal ? { fontSize: isNaN(Number(titleSizeVal)) ? titleSizeVal : `${titleSizeVal}px` } : {};

  const textAlignmentClass = category.textAlignment || 'text-left';

  if (!category.showBanner) {
    return null;
  }

  const alignmentClass = category.bannerAlignment === 'left' ? 'mr-auto text-left' : category.bannerAlignment === 'right' ? 'ml-auto text-right' : 'mx-auto text-center';
  const containerAlignClass = category.bannerAlignment === 'left' ? 'mr-auto' : category.bannerAlignment === 'right' ? 'ml-auto' : 'mx-auto';
  
  return (
    <div className="flex flex-col min-h-full w-full mb-8">
      
      <div 
        className={`flex flex-col md:flex-row w-full ${containerAlignClass} bg-white min-h-[auto] md:min-h-[var(--desktop-min-height)]`}
        style={{ 
          maxWidth: formatDimension(category.bannerWidth, '1920px'),
          '--desktop-min-height': formatDimension(category.bannerHeight, '350px')
        }}
      >
        {/* Image Section */}
        <div 
          className={`w-full relative overflow-hidden aspect-[16/9] md:aspect-auto md:h-[var(--desktop-height)] ${(category.heroTitle || category.description) ? 'md:[width:var(--img-w,55%)] shrink-0' : 'flex-1'}`}
          style={{
            '--img-w': (category.heroTitle || category.description) ? formatDimension(category.imageWidth, '55%') : undefined,
            '--desktop-height': formatDimension(category.bannerHeight, '100%')
          }}
        >
          <img
            src={category.bannerImage || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000'}
            alt={category.name}
            className={`absolute inset-0 w-full h-full object-cover ${category.bannerAlignment === 'left' ? 'object-left' : category.bannerAlignment === 'right' ? 'object-right' : 'object-center'}`}
          />
        </div>

        {/* Text Section (Right side) */}
        {/* Only render this if there is a heroTitle or description */}
        {(category.heroTitle || category.description) && (
          <div 
            className={`hidden md:flex flex-col justify-center px-6 py-6 md:py-10 md:px-10 lg:px-12 bg-white ${textAlignmentClass} flex-1`}
          >
            {category.heroTitle && (
              <h2 
                className={`font-bold text-gray-900 uppercase tracking-widest leading-tight mb-2 md:mb-6 ${titleFontClass} ${titleSizeClass}`}
                style={{
                  ...titleStyle,
                  width: category.titleWidth ? formatDimension(category.titleWidth, undefined) : undefined,
                  maxWidth: '100%'
                }}
              >
                {category.heroTitle}
              </h2>
            )}
            {category.description && (
              <p 
                className={`hidden md:block text-gray-600 leading-relaxed w-full ${descFontClass} ${descSizeClass} ${textAlignmentClass === 'text-center' ? 'mx-auto' : textAlignmentClass === 'text-right' ? 'ml-auto' : ''}`}
                style={{
                  ...descStyle,
                  width: category.descriptionWidth ? formatDimension(category.descriptionWidth, undefined) : '100%',
                  maxWidth: '100%'
                }}
              >
                {category.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
