import React, { useState } from 'react';
import { FiMap, FiBox, FiMaximize, FiCopy, FiAperture, FiChevronDown, FiPlus, FiTrash2 } from 'react-icons/fi';
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

const DEFAULT_ATTRIBUTES = [
  'Fabric',
  'Material',
  'Color',
  'Size',
  'Set'
];

export default function ProductAttributesManager({ formData, handleChange }) {
  const [openGroup, setOpenGroup] = useState(null);

  const [isAddingAttribute, setIsAddingAttribute] = useState(false);
  const [newAttributeType, setNewAttributeType] = useState('');

  // Initialize variants if empty
  const variants = formData.variants || [];
  
  // Combine DEFAULT_ATTRIBUTES with any custom attributes already in variants
  const activeVariants = DEFAULT_ATTRIBUTES.map(attrName => {
    return variants.find(v => v.type === attrName) || { type: attrName, options: [] };
  });

  variants.forEach(v => {
    if (!DEFAULT_ATTRIBUTES.includes(v.type)) {
      activeVariants.push(v);
    }
  });


  variants.forEach(v => {
    if (!DEFAULT_ATTRIBUTES.includes(v.type)) {
      activeVariants.push(v);
    }
  });

  const handleCreateAttribute = () => {
    if (newAttributeType.trim()) {
      const type = newAttributeType.trim();
      // Check if it already exists
      if (!activeVariants.find(v => v.type.toLowerCase() === type.toLowerCase())) {
        const updatedVariants = [...activeVariants, { type, options: [] }];
        handleChange(null, 'variants', updatedVariants);
        setOpenGroup(type);
      }
      setNewAttributeType('');
      setIsAddingAttribute(false);
    }
  };

  const handleAddOption = (type) => {
    const updatedVariants = [...activeVariants];
    const groupIndex = updatedVariants.findIndex(v => v.type === type);
    
    if (groupIndex >= 0) {
      updatedVariants[groupIndex].options.push({
        id: Math.random().toString(36).substr(2, 9),
        label: '',
        colorCode: ''
      });
      handleChange(null, 'variants', updatedVariants); // Custom call to update variants
    }
  };

  const handleUpdateOption = (type, optionId, field, value) => {
    const updatedVariants = [...activeVariants];
    const groupIndex = updatedVariants.findIndex(v => v.type === type);
    
    if (groupIndex >= 0) {
      const optIndex = updatedVariants[groupIndex].options.findIndex(o => o.id === optionId);
      if (optIndex >= 0) {
        updatedVariants[groupIndex].options[optIndex][field] = value;
        handleChange(null, 'variants', updatedVariants);
      }
    }
  };

  const handleRemoveOption = (type, optionId) => {
    const updatedVariants = [...activeVariants];
    const groupIndex = updatedVariants.findIndex(v => v.type === type);
    
    if (groupIndex >= 0) {
      updatedVariants[groupIndex].options = updatedVariants[groupIndex].options.filter(o => o.id !== optionId);
      handleChange(null, 'variants', updatedVariants);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {activeVariants.map((variantGroup) => {
        const isOpen = openGroup === variantGroup.type;

        return (
          <div key={variantGroup.type} className="border border-border rounded-xl overflow-hidden bg-surface">
            <button 
              onClick={() => setOpenGroup(isOpen ? null : variantGroup.type)}
              className="w-full flex items-center justify-between p-4 bg-surface hover:bg-stone-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-stone-50 rounded-lg border border-border shrink-0">
                  {getVariantIcon(variantGroup.type)}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-text-primary leading-tight">
                    {variantGroup.type}
                  </h3>
                  <p className="text-[13px] text-text-muted mt-0.5">
                    {getVariantSubtitle(variantGroup.type)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2 py-1 bg-stone-100 rounded-md text-text-secondary">
                  {variantGroup.options.length} options
                </span>
                <FiChevronDown className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-border bg-stone-50/50"
                >
                  <div className="p-5 space-y-4">
                    {variantGroup.options.map((option, idx) => (
                      <div key={option.id} className="flex items-start gap-3 bg-surface p-3 rounded-lg border border-border shadow-sm">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Option Name</label>
                          <input
                            type="text"
                            value={option.label}
                            onChange={(e) => handleUpdateOption(variantGroup.type, option.id, 'label', e.target.value)}
                            placeholder="e.g. Linen, Oak, Small"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
                          />
                        </div>
                        
                        {(variantGroup.type === 'Color' || variantGroup.type === 'Fabric') && (
                          <div className="w-24">
                            <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Color HEX</label>
                            <input
                              type="text"
                              value={option.colorCode}
                              onChange={(e) => handleUpdateOption(variantGroup.type, option.id, 'colorCode', e.target.value)}
                              placeholder="#000000"
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
                            />
                          </div>
                        )}
                        
                        <div className="pt-5">
                          <button
                            onClick={() => handleRemoveOption(variantGroup.type, option.id)}
                            className="p-2 text-text-muted hover:text-error hover:bg-error-soft rounded-lg transition-colors"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => handleAddOption(variantGroup.type)}
                      className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-lg text-sm font-semibold text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-soft transition-all"
                    >
                      <FiPlus size={16} /> Add Option
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Add Custom Attribute Field */}
      {isAddingAttribute ? (
        <div className="border border-primary bg-primary-soft/20 rounded-xl p-4 flex items-center gap-3">
          <input
            type="text"
            value={newAttributeType}
            onChange={(e) => setNewAttributeType(e.target.value)}
            placeholder="Enter new attribute type (e.g. Leg Finish) and press Enter"
            className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
            autoFocus
            onBlur={() => {
              if (newAttributeType.trim()) {
                handleCreateAttribute();
              } else {
                setIsAddingAttribute(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateAttribute();
              if (e.key === 'Escape') setIsAddingAttribute(false);
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsAddingAttribute(true)}
          className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-border rounded-xl text-sm font-bold text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-soft transition-all bg-surface mt-2"
        >
          <FiPlus size={18} /> Create Custom Attribute Field
        </button>
      )}
    </div>
  );
}
