import React, { useState } from 'react';
import { FiMap, FiBox, FiMaximize, FiCopy, FiAperture, FiChevronDown, FiCheck, FiInfo } from 'react-icons/fi';
import { Ruler, Scroll } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getVariantIcon = (type) => {
  if (!type) return <FiBox size={24} className="text-gray-400" />;
  const t = String(type).toLowerCase();
  if (t.includes('fabric')) return <Scroll size={24} strokeWidth={1.5} className="text-gray-400" />;
  if (t.includes('material')) return <FiBox size={24} className="text-gray-400" />;
  if (t.includes('size') || t.includes('dimension')) return <Ruler size={24} strokeWidth={1.5} className="text-gray-400" />;
  if (t.includes('set')) return <FiCopy size={24} className="text-gray-400" />;
  if (t.includes('color')) return <FiAperture size={24} className="text-gray-400" />;
  return <FiBox size={24} className="text-gray-400" />;
};

const getVariantSubtitle = (type) => {
  if (!type) return 'Select option';
  const t = String(type).toLowerCase();
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
    <div className="flex flex-col mb-4 gap-3">
      {variants.map((variantGroup) => {
        const isOpen = openGroup === variantGroup.type;
        const selectedOption = selectedVariants[variantGroup.type];
        const typeStr = variantGroup?.type ? String(variantGroup.type).toLowerCase() : '';
        const isSize = typeStr.includes('size');
        const isFabric = typeStr.includes('fabric');
        const isMaterial = typeStr.includes('material');

        return (
          <div key={variantGroup.type} className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setOpenGroup(isOpen ? null : variantGroup.type)}
              className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center border border-gray-100 rounded-lg shrink-0 bg-[#F9FAFB]">
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
                  className="overflow-hidden border-t border-gray-50 bg-white"
                >
                  <div className={(isSize || isFabric || isMaterial) ? "p-5 bg-white" : "p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 bg-white"}>
                    {isSize ? (
                      <div className="flex flex-col gap-3">
                        {variantGroup.options.map((option) => {
                          const isSelected = selectedOption?.id === option.id;
                          return (
                            <button
                              key={option.id}
                              onClick={() => {
                                onVariantChange(variantGroup.type, option);
                                setOpenGroup(null);
                              }}
                              className="flex items-center justify-between px-5 py-4 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] transition-all w-full border border-transparent hover:border-gray-200"
                            >
                              <span className={`text-[15px] font-normal tracking-wide ${isSelected ? 'text-[#D3161D]' : 'text-gray-600'}`}>
                                {option.label}
                              </span>
                              <FiCopy className="text-gray-400 shrink-0" size={20} strokeWidth={1.5} />
                            </button>
                          );
                        })}
                      </div>
                    ) : isFabric ? (
                      <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-2 scrollbar-hide">
                        {variantGroup.options.map((option, index) => {
                          const isCurrent = selectedOption ? selectedOption.id === option.id : index === 0;
                          return (
                            <button
                              key={option.id}
                              onClick={() => {
                                onVariantChange(variantGroup.type, option);
                              }}
                              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] transition-all text-left border border-transparent hover:border-gray-200"
                            >
                              <div className="flex items-center gap-4">
                                {option.colorCode && (
                                  <div 
                                    className="w-8 h-8 rounded-lg shadow-sm shrink-0" 
                                    style={{ backgroundColor: option.colorCode }}
                                  />
                                )}
                                <span className={`text-[15px] font-normal tracking-wide ${isCurrent ? 'text-[#D3161D]' : 'text-gray-600'}`}>
                                  {option.label}
                                </span>
                              </div>
                              <FiInfo className="text-gray-400 shrink-0" size={20} />
                            </button>
                          );
                        })}
                      </div>
                    ) : isMaterial ? (
                      <div className="flex flex-wrap gap-3">
                        {variantGroup.options.map((option) => (
                          <div
                            key={option.id}
                            className="inline-flex items-center justify-center px-4 py-2 bg-[#F4F5F7] rounded-lg text-gray-700 border border-transparent"
                          >
                            <span className="text-[15px] font-normal tracking-wide">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      variantGroup.options && variantGroup.options.map((option) => {
                        const isSelected = selectedOption?.id === option.id;

                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            onVariantChange(variantGroup.type, option);
                            setOpenGroup(null);
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${
                            isSelected 
                              ? 'border-[#D3161D] bg-red-50/30' 
                              : 'border-gray-100 bg-[#F4F5F7] hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {option.colorCode && (
                              <div 
                                className="w-6 h-6 rounded-full border border-gray-200 shrink-0" 
                                style={{ backgroundColor: option.colorCode }}
                              />
                            )}
                            <span className={`text-sm ${isSelected ? 'font-bold text-[#D3161D]' : 'font-medium text-gray-700'}`}>
                              {option.label}
                            </span>
                          </div>
                          {isSelected && <FiCheck className="text-[#D3161D]" size={16} />}
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
  );
}
