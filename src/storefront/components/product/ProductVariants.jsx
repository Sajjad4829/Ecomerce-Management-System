import React, { useState } from 'react';
import { FiMap, FiBox, FiMaximize, FiCopy, FiAperture, FiChevronDown, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const getVariantIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('fabric')) return <FiMap size={24} className="text-gray-400" />;
  if (t.includes('material')) return <FiBox size={24} className="text-gray-400" />;
  if (t.includes('size') || t.includes('dimension')) return <FiMaximize size={24} className="text-gray-400" />;
  if (t.includes('set')) return <FiCopy size={24} className="text-gray-400" />;
  if (t.includes('color')) return <FiAperture size={24} className="text-gray-400" />;
  return <FiBox size={24} className="text-gray-400" />;
};

const getVariantSubtitle = (type) => {
  const t = type.toLowerCase();
  if (t.includes('fabric')) return 'Fabric configuration';
  if (t.includes('color')) return 'Material & Wood Finish Color';
  if (t.includes('material')) return 'Material And Wood Finish';
  if (t.includes('size')) return 'Material Size';
  if (t.includes('set')) return 'Set Option';
  return 'Select option';
};

export default function ProductVariants({ variants, selectedVariants, onVariantChange }) {
  const [openGroup, setOpenGroup] = useState(null);

  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mb-8 pb-8">
      {variants.map((variantGroup) => {
        const isOpen = openGroup === variantGroup.type;
        const selectedOption = selectedVariants[variantGroup.type];

        return (
          <div key={variantGroup.type} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button 
              onClick={() => setOpenGroup(isOpen ? null : variantGroup.type)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 shrink-0">
                  {getVariantIcon(variantGroup.type)}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                    {variantGroup.type}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {selectedOption ? selectedOption.label : getVariantSubtitle(variantGroup.type)}
                  </p>
                </div>
              </div>
              <FiChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
                >
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {variantGroup.options.map((option) => {
                      const isSelected = selectedOption?.id === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            onVariantChange(variantGroup.type, option);
                            setOpenGroup(null);
                          }}
                          className={`flex items-center justify-between p-3 rounded-md border text-left transition-colors ${
                            isSelected 
                              ? 'border-gray-900 bg-white ring-1 ring-gray-900' 
                              : 'border-gray-200 bg-white hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {option.colorCode && (
                              <div 
                                className="w-6 h-6 rounded-full border border-gray-200 shrink-0" 
                                style={{ backgroundColor: option.colorCode }}
                              />
                            )}
                            <span className={`text-sm ${isSelected ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                              {option.label}
                            </span>
                          </div>
                          {isSelected && <FiCheck className="text-gray-900" size={16} />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
