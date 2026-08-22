import { getResponsiveValue } from '../../../../utils/responsiveUtils';

export default function BannerPreview({ section, device = 'desktop' }) {
  const content = section?.content || {};
  const settings = section?.settings || {};
  const paddingTopSetting = getResponsiveValue(section, 'paddingTop', device) || 'medium';
  const paddingBottomSetting = getResponsiveValue(section, 'paddingBottom', device) || 'medium';

  const ptClass = { none: 'pt-0', small: 'pt-8', medium: 'pt-16', large: 'pt-24', xlarge: 'pt-32' }[paddingTopSetting] || 'pt-16';
  const pbClass = { none: 'pb-0', small: 'pb-8', medium: 'pb-16', large: 'pb-24', xlarge: 'pb-32' }[paddingBottomSetting] || 'pb-16';

  const isNewsletter = section?.type === 'NEWSLETTER';
  
  if (isNewsletter) {
    return (
      <div className={`${ptClass} ${pbClass} px-8 bg-[#1A1A1A] text-white text-center flex flex-col items-center justify-center`}>
        <h2 className="text-2xl font-serif font-bold mb-4 max-w-2xl mx-auto">
          {content.title || content.text || 'Join our newsletter for 10% off your first order.'}
        </h2>
        {content.subtitle && <p className="mb-6 opacity-80">{content.subtitle}</p>}
        <div className={`flex w-full max-w-md mx-auto ${device === 'mobile' ? 'flex-col gap-3' : ''}`}>
          <input 
            type="email" 
            placeholder={content.placeholder || "Enter your email"} 
            className="flex-1 px-4 py-3 bg-surface/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
          />
          <button className={`px-6 py-3 bg-surface text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors ${device === 'mobile' ? 'w-full' : ''}`}>
            {content.buttonText || 'Subscribe'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${ptClass} ${pbClass} px-8 text-center flex flex-col items-center justify-center ${settings.color === 'brand' ? 'bg-[#1A1A1A] text-white' : 'bg-gray-100 text-text-primary'}`}>
      <h2 className="text-xl font-serif font-bold mb-2">
        {content.text || content.title || 'Promotional Banner'}
      </h2>
      {content.description && <p className="mb-4">{content.description}</p>}
      {content.button && (
         <button className="mt-4 px-6 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">
            {content.button}
         </button>
      )}
    </div>
  );
}
