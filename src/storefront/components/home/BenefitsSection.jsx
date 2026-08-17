import { FiTruck, FiRefreshCcw, FiLock, FiStar } from 'react-icons/fi';

const BENEFITS = [
  {
    icon: FiTruck,
    title: 'FREE SHIPPING',
    description: 'Worldwide delivery'
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

export default function BenefitsSection() {
  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 py-8 lg:py-12">
          {BENEFITS.map((benefit, idx) => (
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
