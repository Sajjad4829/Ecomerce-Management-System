import { Link } from 'react-router-dom';

export default function CollectionFeature({ data, ...settings }) {
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : "The Sanctuary Collection";
  const subtitle = content.subtitle !== undefined ? content.subtitle : "Curated Collection";
  const description = content.description !== undefined ? content.description : "Furniture designed for calm, comfort and timeless interiors.";
  const ctaText = content.ctaText !== undefined ? content.ctaText : "Explore Collection";
  const ctaUrl = content.ctaUrl !== undefined ? content.ctaUrl : "/collections/sanctuary";
  const image = content.image !== undefined && content.image !== '' ? content.image : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200";

  const resolveSetting = (key, defaultVal) => {
    const baseVal = settings[key] !== undefined ? settings[key] : defaultVal;
    return {
      desktop: data?.responsive?.desktop?.[key] !== undefined ? data.responsive.desktop[key] : baseVal,
      tablet: data?.responsive?.tablet?.[key] !== undefined ? data.responsive.tablet[key] : baseVal,
      mobile: data?.responsive?.mobile?.[key] !== undefined ? data.responsive.mobile[key] : baseVal
    };
  };

  const reverse = resolveSetting('reverse', false);
  const paddingTop = resolveSetting('paddingTop', 'py-24');
  const paddingBottom = resolveSetting('paddingBottom', '');

  const formatPadding = (val) => {
    if (!val) return '';
    return val;
  };

  return (
    <section className="bg-[#FAFAFA]" style={{ 
      paddingTop: formatPadding(paddingTop.desktop), 
      paddingBottom: formatPadding(paddingBottom.desktop) 
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${reverse.desktop ? 'lg:flex-row-reverse' : ''}`}>
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] relative bg-gray-200 overflow-hidden">
              <img 
                src={image} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            {subtitle && (
              <span className="block text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-6">
                {subtitle}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight uppercase">
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg whitespace-pre-wrap">
              {description}
            </p>
            <Link 
              to={ctaUrl} 
              className="group inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-widest text-white bg-black hover:bg-gray-800 transition-colors uppercase"
            >
              {ctaText} <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
