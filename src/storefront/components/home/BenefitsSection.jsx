import { FiTruck, FiRefreshCcw, FiLock, FiStar } from 'react-icons/fi';

const BENEFITS = [
  {
    icon: FiTruck,
    title: 'FREE SHIPPING',
    description: 'Nationwide delivery'
  },
  {
    icon: FiRefreshCcw,
    title: '30 DAYS RETURN',
    description: 'Easy returns & refunds'
  },
  {
    icon: FiLock,
    title: 'SECURE PAYMENT',
    description: '100% secure checkout'
  },
  {
    icon: FiStar,
    title: 'PREMIUM QUALITY',
    description: 'Crafted to last'
  }
];

export default function BenefitsSection({ data, ...settings }) {
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : '';

  const resolveSetting = (key, defaultVal) => {
    const baseVal = settings[key] !== undefined ? settings[key] : defaultVal;
    return {
      desktop: data?.responsive?.desktop?.[key] !== undefined ? data.responsive.desktop[key] : baseVal,
      tablet: data?.responsive?.tablet?.[key] !== undefined ? data.responsive.tablet[key] : baseVal,
      mobile: data?.responsive?.mobile?.[key] !== undefined ? data.responsive.mobile[key] : baseVal
    };
  };

  const columns = resolveSetting('columns', '4');

  const getGridClasses = () => {
    return `grid grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} divide-y sm:divide-y-0 sm:divide-x divide-gray-100`;
  };

  const displayBenefits = BENEFITS.slice(0, parseInt(columns.desktop, 10) || 4);

  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {title && <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">{title}</h2>}
        <div className={getGridClasses()}>
          {displayBenefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center text-center py-6 sm:py-4 px-4 hover:-translate-y-1 transition-transform duration-300">
              <benefit.icon size={28} className="text-gray-900 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
