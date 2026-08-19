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
          {icon && <div className="text-[#111A4A]">{icon}</div>}
          <span className="text-[13px] font-bold text-[#111A4A] transition-colors uppercase tracking-widest">{title}</span>
        </div>
        <FiChevronDown 
          className={`text-[#111A4A] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
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
  const [openSection, setOpenSection] = useState('story');
  const details = product?.furnitureDetails || {};
  const description = product?.basicInfo?.description || '';

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const hasDimensions = details.dimensions && Object.keys(details.dimensions).length > 0;
  const hasMaterials = details.materials && Object.keys(details.materials).length > 0;
  const hasCare = details.care && (details.care.furniture || details.care.upholstery);
  const hasWarranty = details.warranty && (details.warranty.duration || details.warranty.description);
  const hasReturns = details.warranty && details.warranty.returnPolicy;
  const hasStory = !!details.story || !!description;

  return (
    <div className="mt-8 w-full max-w-4xl border-b border-[#E5E7F2]">
      {hasStory && (
        <AccordionSection 
          title="Product Story" 
          icon={<FiInfo size={20} />}
          isOpen={openSection === 'story'} 
          onToggle={() => handleToggle('story')}
        >
          <div className="whitespace-pre-wrap">{details.story || description}</div>
        </AccordionSection>
      )}

      {hasDimensions && (
        <AccordionSection 
          title="Dimensions" 
          icon={<FiBox size={20} />}
          isOpen={openSection === 'dimensions'} 
          onToggle={() => handleToggle('dimensions')}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(details.dimensions).map(([key, value]) => (
              value ? (
                <div key={key}>
                  <div className="text-xs text-stone-400 uppercase mb-1">{key}</div>
                  <div className="font-medium text-stone-900">{value}</div>
                </div>
              ) : null
            ))}
          </div>
        </AccordionSection>
      )}

      {hasMaterials && (
        <AccordionSection 
          title="Materials & Finish" 
          icon={<FiLayers size={20} />}
          isOpen={openSection === 'materials'} 
          onToggle={() => handleToggle('materials')}
        >
          <ul className="space-y-3">
            {Object.entries(details.materials).map(([key, value]) => (
              value ? (
                <li key={key} className="flex flex-col sm:flex-row sm:gap-4 border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                   <span className="text-stone-400 capitalize w-1/3 shrink-0">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                   <span className="text-stone-900">{value}</span>
                </li>
              ) : null
            ))}
          </ul>
        </AccordionSection>
      )}

      {hasCare && (
        <AccordionSection 
          title="Care Information" 
          icon={<FiHeart size={20} />}
          isOpen={openSection === 'care'} 
          onToggle={() => handleToggle('care')}
        >
          <div className="space-y-4">
            {details.care.furniture && (
              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Furniture Care</h4>
                <p className="whitespace-pre-wrap">{details.care.furniture}</p>
              </div>
            )}
            {details.care.upholstery && (
              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Upholstery Care</h4>
                <p className="whitespace-pre-wrap">{details.care.upholstery}</p>
              </div>
            )}
          </div>
        </AccordionSection>
      )}

      {hasWarranty && (
        <AccordionSection 
          title="Warranty" 
          icon={<FiShield size={20} />}
          isOpen={openSection === 'warranty'} 
          onToggle={() => handleToggle('warranty')}
        >
          <div className="space-y-2">
            {details.warranty.duration && (
              <div><strong className="text-stone-900 font-semibold">Duration:</strong> {details.warranty.duration}</div>
            )}
            {details.warranty.description && (
              <div className="whitespace-pre-wrap">{details.warranty.description}</div>
            )}
          </div>
        </AccordionSection>
      )}

      {hasReturns && (
        <AccordionSection 
          title="Delivery & Returns" 
          icon={<FiTruck size={20} />}
          isOpen={openSection === 'returns'} 
          onToggle={() => handleToggle('returns')}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-stone-900 mb-1">Returns Policy</h4>
              <p className="whitespace-pre-wrap">{details.warranty.returnPolicy}</p>
            </div>
          </div>
        </AccordionSection>
      )}
    </div>
  );
}
