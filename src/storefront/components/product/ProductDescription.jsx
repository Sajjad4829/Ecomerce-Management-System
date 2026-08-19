import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function ProductDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!description) return null;

  return (
    <div className="py-8 border-b border-gray-100">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h2 className="text-lg font-serif font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
          Description
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
            <div className="pt-6 text-base text-gray-600 leading-relaxed prose prose-gray max-w-none">
              {/* If description contains HTML, we would use dangerouslySetInnerHTML here. 
                  Assuming plain text or basic formatting for now. */}
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
