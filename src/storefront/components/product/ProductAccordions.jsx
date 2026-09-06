import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductAccordions({ product }) {
  const [openSection, setOpenSection] = useState(null);

  const details = product?.furnitureDetails || {};
  let sections = [];

  if (details.customAccordion && details.customAccordion.length > 0) {
    sections = details.customAccordion.map(item => {
      let content = item.content;
      if (!content || content.trim() === '' || content === '<p><br></p>') {
        if (item.title === 'Exchange and Return') content = 'Our exchange and return policy ensures your complete satisfaction. Please contact our support team within 14 days of delivery.';
        else if (item.title === 'Features') content = details.features || 'Premium build quality with high-density foam and kiln-dried solid wood frame.';
        else if (item.title === 'Furniture Care Information') content = details.care?.furniture || 'Dust regularly with a soft, dry cloth. Avoid direct sunlight and moisture.';
        else if (item.title === 'Upholstery Care Information') content = details.care?.upholstery || 'Professional cleaning recommended. Vacuum weekly to remove dust and dirt.';
        else if (item.title === 'Warranty') content = details.warranty?.description || '12 Months comprehensive warranty covering manufacturing defects.';
      }
      return { title: item.title, content };
    }).filter(s => s.title && s.content);
  } else {
    sections = [
      { title: 'Exchange and Return', content: 'Our exchange and return policy ensures your complete satisfaction. Please contact our support team within 14 days of delivery.' },
      { title: 'Features', content: details.features || 'Premium build quality with high-density foam and kiln-dried solid wood frame.' },
      { title: 'Furniture Care Information', content: details.care?.furniture || 'Dust regularly with a soft, dry cloth. Avoid direct sunlight and moisture.' },
      { title: 'Upholstery Care Information', content: details.care?.upholstery || 'Professional cleaning recommended. Vacuum weekly to remove dust and dirt.' },
      { title: 'Warranty', content: details.warranty?.description || '12 Months comprehensive warranty covering manufacturing defects.' },
    ];
  }

  const toggleSection = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  return (
    <div className="w-full mt-12 mb-8 border-t border-b border-gray-100 bg-white">
      <div className="flex flex-col divide-y divide-gray-100 px-6">
        {sections.map((section, idx) => {
          const isOpen = openSection === idx;
          return (
            <div key={idx} className="w-full">
              <button 
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between py-4 text-left hover:text-gray-900 transition-colors"
              >
                <span className="text-[15px] font-normal text-gray-700">{section.title}</span>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
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
                    <div 
                      className="pb-8 text-gray-600 pr-8 font-sans quill-content"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
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
