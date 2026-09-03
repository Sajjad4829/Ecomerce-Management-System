import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductAccordions({ product }) {
  const [openSection, setOpenSection] = useState(null);

  // We map the requested sections to data we might have in the product
  // or use the customAccordion array if the admin provided it.
  
  // Default structure matching screenshot 3
  const sections = [
    { title: 'Exchange and Return', content: product?.furnitureDetails?.customAccordion?.find(a => a.title === 'Exchange and Return')?.content || 'Our exchange and return policy ensures your complete satisfaction. Please contact our support team within 14 days of delivery.' },
    { title: 'Features', content: product?.furnitureDetails?.features || product?.furnitureDetails?.customAccordion?.find(a => a.title === 'Features')?.content || 'Premium build quality with high-density foam and kiln-dried solid wood frame.' },
    { title: 'Furniture Care Information', content: product?.furnitureDetails?.care?.furniture || product?.furnitureDetails?.customAccordion?.find(a => a.title === 'Furniture Care Information')?.content || 'Dust regularly with a soft, dry cloth. Avoid direct sunlight and moisture.' },
    { title: 'Upholstery Care Information', content: product?.furnitureDetails?.care?.upholstery || product?.furnitureDetails?.customAccordion?.find(a => a.title === 'Upholstery Care Information')?.content || 'Professional cleaning recommended. Vacuum weekly to remove dust and dirt.' },
    { title: 'Warranty', content: product?.furnitureDetails?.warranty?.description || product?.furnitureDetails?.customAccordion?.find(a => a.title === 'Warranty')?.content || '12 Months comprehensive warranty covering manufacturing defects.' },
  ];

  const toggleSection = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  return (
    <div className="w-full mt-16 mb-8 border-t border-gray-200">
      <div className="flex flex-col divide-y divide-gray-200">
        {sections.map((section, idx) => {
          const isOpen = openSection === idx;
          return (
            <div key={idx} className="w-full bg-white">
              <button 
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between py-6 text-left hover:text-gray-600 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800">{section.title}</span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-sm text-gray-600 leading-relaxed pr-8 whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
