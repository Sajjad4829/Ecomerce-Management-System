import React, { useState } from 'react';
import { FiMap, FiBox, FiMaximize, FiCopy, FiAperture, FiChevronDown, FiCheck, FiInfo } from 'react-icons/fi';
import { Ruler, Scroll } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getVariantIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('fabric')) return <Scroll size={24} strokeWidth={1.5} className="text-gray-400" />;
  if (t.includes('material')) return <FiBox size={24} className="text-gray-400" />;
  if (t.includes('size') || t.includes('dimension')) return <Ruler size={24} strokeWidth={1.5} className="text-gray-400" />;
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
    <div className="flex flex-col mb-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {variants.map((variantGroup) => {
          const isOpen = openGroup === variantGroup.type;
          const selectedOption = selectedVariants[variantGroup.type];
          const isSize = variantGroup.type.toLowerCase().includes('size');
          const isFabric = variantGroup.type.toLowerCase().includes('fabric');
          const isMaterial = variantGroup.type.toLowerCase().includes('material');

          return (
            <div key={variantGroup.type} className="w-full">
            <button 
              onClick={() => setOpenGroup(isOpen ? null : variantGroup.type)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg shrink-0">
                  {getVariantIcon(variantGroup.type)}
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-gray-800 leading-tight">
                    {variantGroup.type}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {isFabric 
                      ? "Fabric Configuration"
                      : isMaterial 
                        ? "Material & Wood Finish"
                        : (selectedOption ? selectedOption.label : getVariantSubtitle(variantGroup.type))}
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
                  className="overflow-hidden border-t border-gray-100 bg-white"
                >
                  <div className={(isSize || isFabric || isMaterial) ? "p-6 bg-[#FAFAFA]" : "p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 bg-gray-50/50"}>
                    {isSize ? (
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-3">
                        {variantGroup.options.map((option) => {
                          const isSelected = selectedOption?.id === option.id;
                          return (
                            <button
                              key={option.id}
                              onClick={() => {
                                onVariantChange(variantGroup.type, option);
                                setOpenGroup(null);
                              }}
                              className="flex items-center justify-between px-5 py-4 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] transition-all w-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-black/5"
                            >
                              <span className={`text-[15px] font-normal tracking-wide ${isSelected ? 'text-[#EF4444]' : 'text-gray-600'}`}>
                                {option.label}
                              </span>
                              <FiCopy className="text-gray-500 shrink-0" size={20} strokeWidth={1.5} />
                            </button>
                          );
                        })}
                      </div>
                    ) : isFabric ? (
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-3 max-h-[260px] overflow-y-auto">
                        {variantGroup.options.map((option, index) => {
                          const isCurrent = selectedOption ? selectedOption.id === option.id : index === 0;
                          return (
                            <button
                              key={option.id}
                              onClick={() => {
                                onVariantChange(variantGroup.type, option);
                              }}
                              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F4F5F7] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-black/5 hover:bg-[#EAECEF] transition-all text-left"
                            >
                              <div className="flex items-center gap-4">
                                {option.colorCode && (
                                  <div 
                                    className="w-8 h-8 rounded-lg shadow-sm border border-black/5 shrink-0" 
                                    style={{ backgroundColor: option.colorCode }}
                                  />
                                )}
                                <span className={`text-[15px] font-normal tracking-wide ${isCurrent ? 'text-[#EF4444]' : 'text-gray-600'}`}>
                                  {option.label}
                                </span>
                              </div>
                              <FiInfo className="text-gray-800 shrink-0" size={20} />
                            </button>
                          );
                        })}
                      </div>
                    ) : isMaterial ? (
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-wrap gap-3">
                        {variantGroup.options.map((option) => (
                          <div
                            key={option.id}
                            className="inline-flex items-center justify-center px-4 py-2 bg-[#9e9e9e] rounded-md text-white"
                          >
                            <span className="text-[15px] font-normal tracking-wide">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      variantGroup.options.map((option) => {
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
                    }))}
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
