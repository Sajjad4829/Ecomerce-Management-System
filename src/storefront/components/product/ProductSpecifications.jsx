import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function ProductSpecifications({ specifications }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="py-8 border-b border-gray-100">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h2 className="text-lg font-serif font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
          Specifications
        </h2>
        {isExpanded ? (
          <FiChevronUp className="text-gray-400 group-hover:text-gray-900 transition-colors" />
        ) : (
          <FiChevronDown className="text-gray-400 group-hover:text-gray-900 transition-colors" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {specifications.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-gray-50 last:border-0 md:last:border-b md:odd:border-0 md:even:border-0">
                  <span className="text-sm font-bold text-gray-900 tracking-wide">{spec.label}</span>
                  <span className="text-sm text-gray-600 text-right ml-4">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
