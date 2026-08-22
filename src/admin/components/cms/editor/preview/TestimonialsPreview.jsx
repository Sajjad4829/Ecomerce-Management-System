import { getResponsiveValue } from '../../../../utils/responsiveUtils';

export default function TestimonialsPreview({ section, device = 'desktop' }) {
  const content = section?.content || {};
  const paddingTopSetting = getResponsiveValue(section, 'paddingTop', device) || 'medium';
  const paddingBottomSetting = getResponsiveValue(section, 'paddingBottom', device) || 'medium';

  const ptClass = { none: 'pt-0', small: 'pt-12', medium: 'pt-24', large: 'pt-32', xlarge: 'pt-48' }[paddingTopSetting] || 'pt-24';
  const pbClass = { none: 'pb-0', small: 'pb-12', medium: 'pb-24', large: 'pb-32', xlarge: 'pb-48' }[paddingBottomSetting] || 'pb-24';

  return (
    <div className={`${ptClass} ${pbClass} px-8 md:px-16 bg-[#1A1A1A] text-white`}>
      <div className="max-w-4xl mx-auto text-center">
        {content.title && (
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-12">{content.title}</h2>
        )}
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h3 className={`${device === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'} font-serif leading-relaxed mb-8`}>
          "{content.subtitle || content.description || 'The quality of the oak dining table exceeded all our expectations. It is truly a centerpiece that our family will gather around for decades to come.'}"
        </h3>
        <div className="text-sm tracking-widest uppercase font-bold text-text-muted">
          — Sarah Jenkins, Verified Buyer
        </div>
      </div>
    </div>
  );
}
