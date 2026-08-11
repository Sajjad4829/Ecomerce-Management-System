import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCheck, FiChevronRight, FiGrid, FiList } from 'react-icons/fi';
import CombinationPreview from './CombinationPreview';

// Mock Global Attributes for the builder
const MOCK_ATTRIBUTES = [
  {
    id: 'attr-1',
    name: 'Color',
    values: [
      { id: 'v1', label: 'Black' },
      { id: 'v2', label: 'Brown' },
      { id: 'v3', label: 'White' },
      { id: 'v4', label: 'Navy' }
    ]
  },
  {
    id: 'attr-2',
    name: 'Material',
    values: [
      { id: 'm1', label: 'Leather' },
      { id: 'm2', label: 'Fabric' },
      { id: 'm3', label: 'Velvet' }
    ]
  },
  {
    id: 'attr-3',
    name: 'Size',
    values: [
      { id: 's1', label: '2 Seater' },
      { id: 's2', label: '3 Seater' },
      { id: 's3', label: '4 Seater' }
    ]
  },
  {
    id: 'attr-4',
    name: 'Finish',
    values: [
      { id: 'f1', label: 'Matte' },
      { id: 'f2', label: 'Gloss' },
      { id: 'f3', label: 'Satin' }
    ]
  }
];

export default function VariantGenerator({ onCancel, onGenerate, basePrice, baseSku }) {
  const [step, setStep] = useState(1); // 1: Select Attributes & Values, 2: Preview Combinations
  
  // selectedOptions format: { 'attr-1': ['v1', 'v2'], 'attr-2': ['m1'] }
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleAttributeToggle = (attrId) => {
    if (selectedOptions[attrId]) {
      const newOpts = { ...selectedOptions };
      delete newOpts[attrId];
      setSelectedOptions(newOpts);
    } else {
      setSelectedOptions({ ...selectedOptions, [attrId]: [] });
    }
  };

  const handleValueToggle = (attrId, valueId) => {
    const current = selectedOptions[attrId] || [];
    if (current.includes(valueId)) {
      setSelectedOptions({ ...selectedOptions, [attrId]: current.filter(v => v !== valueId) });
    } else {
      setSelectedOptions({ ...selectedOptions, [attrId]: [...current, valueId] });
    }
  };

  // Generate combinations
  const combinations = useMemo(() => {
    const activeAttributes = MOCK_ATTRIBUTES.filter(attr => 
      selectedOptions[attr.id] && selectedOptions[attr.id].length > 0
    );

    if (activeAttributes.length === 0) return [];

    let combos = [[]];
    
    for (const attr of activeAttributes) {
      const newCombos = [];
      const selectedValueIds = selectedOptions[attr.id];
      const activeValues = attr.values.filter(v => selectedValueIds.includes(v.id));

      for (const combo of combos) {
        for (const val of activeValues) {
          newCombos.push([...combo, { attrId: attr.id, attrName: attr.name, valueId: val.id, valueLabel: val.label }]);
        }
      }
      combos = newCombos;
    }

    // Format final variants
    return combos.map((combo, index) => {
      const skuSuffix = combo.map(c => c.valueLabel.substring(0, 3).toUpperCase()).join('-');
      return {
        id: `var-${Date.now()}-${index}`,
        sku: `${baseSku || 'PRD'}-${skuSuffix}`,
        price: basePrice || 0,
        compareAtPrice: 0,
        stock: 0,
        status: 'active',
        attributes: combo,
        image: null
      };
    });
  }, [selectedOptions, basePrice, baseSku]);

  const handleFinish = () => {
    const activeAttributes = MOCK_ATTRIBUTES.filter(attr => 
      selectedOptions[attr.id] && selectedOptions[attr.id].length > 0
    );
    onGenerate(combinations, activeAttributes);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 h-full flex flex-col">
      <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-xl">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-900">Generate Variants</h2>
          <p className="text-xs text-stone-500">Step {step} of 2: {step === 1 ? 'Select Attributes' : 'Preview & Generate'}</p>
        </div>
        <button onClick={onCancel} className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors">
          <FiX size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {step === 1 ? (
          <div className="p-8 overflow-y-auto max-w-4xl mx-auto w-full">
            <h3 className="text-sm font-bold text-stone-900 mb-6">Select Global Attributes</h3>
            <div className="space-y-6">
              {MOCK_ATTRIBUTES.map(attr => {
                const isSelected = !!selectedOptions[attr.id];
                const selectedValues = selectedOptions[attr.id] || [];

                return (
                  <div key={attr.id} className={`border rounded-xl transition-all ${isSelected ? 'border-stone-400 shadow-sm' : 'border-stone-200'}`}>
                    <div 
                      className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-stone-50 rounded-xl"
                      onClick={() => handleAttributeToggle(attr.id)}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 text-transparent'}`}>
                        <FiCheck size={14} />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-stone-900 text-sm">{attr.name}</span>
                        {isSelected && (
                          <span className="ml-3 text-xs text-stone-500 font-mono">
                            {selectedValues.length} selected
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50 rounded-b-xl">
                        <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-3">Select Values</p>
                        <div className="flex flex-wrap gap-2">
                          {attr.values.map(val => {
                            const valSelected = selectedValues.includes(val.id);
                            return (
                              <button
                                key={val.id}
                                onClick={() => handleValueToggle(attr.id, val.id)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                                  valSelected 
                                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-medium' 
                                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                                }`}
                              >
                                {val.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <CombinationPreview combinations={combinations} />
        )}
      </div>

      <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 rounded-b-xl flex items-center justify-between shrink-0">
        <button 
          onClick={step === 1 ? onCancel : () => setStep(1)}
          className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        
        <button 
          onClick={step === 1 ? () => setStep(2) : handleFinish}
          disabled={step === 1 && combinations.length === 0}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {step === 1 ? (
            <>Preview Combinations ({combinations.length}) <FiChevronRight size={16} /></>
          ) : (
            <>Generate Variants <FiCheck size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
}
