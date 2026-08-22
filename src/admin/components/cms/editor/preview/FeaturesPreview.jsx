import React from 'react';
import { FiTruck, FiShield, FiClock, FiRefreshCcw } from 'react-icons/fi';

export default function FeaturesPreview() {
  const features = [
    { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: FiShield, title: 'Secure Payment', desc: '100% secure payment' },
    { icon: FiClock, title: '24/7 Support', desc: 'Friendly support' },
    { icon: FiRefreshCcw, title: 'Money Back', desc: '30 days return' },
  ];

  return (
    <div className="w-full bg-white py-12 px-12 flex justify-between items-center border-t border-b border-gray-50/50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] relative z-20">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF]">
            <feature.icon size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">{feature.title}</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
