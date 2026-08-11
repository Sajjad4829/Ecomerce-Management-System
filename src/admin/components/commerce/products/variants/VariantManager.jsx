import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiGrid, FiList, FiSettings } from 'react-icons/fi';
import VariantGenerator from './VariantGenerator';
import VariantTable from './VariantTable';
import VariantMatrix from './VariantMatrix';
import VariantEditor from './VariantEditor';
import VariantSelectorPreview from './VariantSelectorPreview';

export default function VariantManager({ productData, setProductData }) {
  // Local state for variants (normally would be part of productData)
  const [variants, setVariants] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]); // Which global attributes are used for variants
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'matrix'
  const [editingVariant, setEditingVariant] = useState(null);

  const hasVariants = variants.length > 0;

  useEffect(() => {
    // If the product has predefined variants, we would load them here.
  }, []);

  const handleGenerate = (newVariants, attributes) => {
    setSelectedAttributes(attributes);
    // Combine existing variants or replace? For this prototype, we'll replace or append if we want.
    // Let's replace for simplicity in prototype, but warn in real app.
    setVariants(newVariants);
    setIsGenerating(false);
  };

  if (!hasVariants && !isGenerating) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 border border-stone-200">
          <FiGrid size={24} className="text-stone-400" />
        </div>
        <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">Product Variants</h3>
        <p className="text-sm text-stone-500 max-w-md mb-8">
          This product has no variants. Add variants if this product comes in multiple options, like different sizes, colors, or materials.
        </p>
        <button 
          onClick={() => setIsGenerating(true)}
          className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Variants
        </button>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <VariantGenerator 
        onCancel={() => setIsGenerating(false)}
        onGenerate={handleGenerate}
        basePrice={productData.price}
        baseSku={productData.sku}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F7F5F2]">
      {/* Top Header */}
      <div className="p-6 bg-white border-b border-stone-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Variant Manager</h2>
          <p className="text-xs text-stone-500">
            {variants.length} active variants based on {selectedAttributes.length} attributes.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
            >
              <FiList size={16} />
            </button>
            <button 
              onClick={() => setViewMode('matrix')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'matrix' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
            >
              <FiGrid size={16} />
            </button>
          </div>
          
          <button 
            onClick={() => setIsGenerating(true)}
            className="px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg text-sm font-semibold hover:bg-stone-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <FiSettings size={14} /> Configure Options
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        <div className="flex-1 p-6 overflow-auto">
          {viewMode === 'table' ? (
            <VariantTable 
              variants={variants} 
              setVariants={setVariants}
              onEdit={(v) => setEditingVariant(v)}
              attributes={selectedAttributes}
            />
          ) : (
            <VariantMatrix 
              variants={variants} 
              setVariants={setVariants}
              attributes={selectedAttributes}
              onEdit={(v) => setEditingVariant(v)}
            />
          )}
        </div>
        
        <div className="w-full lg:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-stone-200 bg-white p-6 overflow-y-auto">
          <VariantSelectorPreview variants={variants} attributes={selectedAttributes} />
        </div>
      </div>

      <VariantEditor 
        variant={editingVariant}
        isOpen={!!editingVariant}
        onClose={() => setEditingVariant(null)}
        onSave={(updatedVariant) => {
          setVariants(variants.map(v => v.id === updatedVariant.id ? updatedVariant : v));
          setEditingVariant(null);
        }}
        attributes={selectedAttributes}
      />
    </div>
  );
}
