import React, { useState } from 'react';
import { FiChevronDown, FiBox, FiLayers, FiInfo, FiHeart, FiShield, FiTruck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionSection({ title, icon, children, isOpen, onToggle }) {
  return (
    <div className="border-t border-[#E5E7F2]">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-4">
          <span className="text-[14px] text-gray-700 capitalize transition-colors">{title}</span>
        </div>
        <FiChevronDown 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm text-stone-600 leading-relaxed font-sans">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetailsAccordion({ product }) {
  const [openSection, setOpenSection] = useState(null);
  const details = product?.furnitureDetails || {};

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };


  return (
    <div className="mt-8 w-full max-w-4xl border-b border-[#E5E7F2] bg-white">
      <AccordionSection 
        title="Need Help?" 
        isOpen={openSection === 'help'} 
        onToggle={() => handleToggle('help')}
      >
        <div className="space-y-2">
          <p>If you have any questions, feel free to contact our support team:</p>
          <p><strong>Email:</strong> support@shopease.com</p>
          <p><strong>Phone:</strong> +1 (800) 123-4567</p>
        </div>
      </AccordionSection>

      {details.customAccordion && details.customAccordion.map((section, idx) => (
        section.title && section.content ? (
          <AccordionSection 
            key={`custom-${idx}`}
            title={section.title} 
            isOpen={openSection === `custom-${idx}`} 
            onToggle={() => handleToggle(`custom-${idx}`)}
          >
            <div 
              className="prose prose-sm max-w-none text-stone-600 font-sans" 
              dangerouslySetInnerHTML={{ __html: section.content }} 
            />
          </AccordionSection>
        ) : null
      ))}
    </div>
  );
}
