import { useState, useEffect } from 'react';
import { FiSliders, FiPlus, FiTrash2, FiInfo, FiLayers } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function FieldInspector({
  field,
  onUpdateField,
  onDeleteField
}) {
  if (!field) {
    return (
      <div className="bg-white border border-black/10 rounded-xl p-6 shadow-2xs h-full flex flex-col items-center justify-center text-center text-gray-400">
        <FiSliders size={28} className="text-gray-300 mb-2" />
        <h4 className="font-serif font-bold text-xs text-[#1A1A1A]">No Field Selected</h4>
        <p className="text-[11px] text-gray-500 max-w-xs mt-1">
          Click on any field block in the canvas to edit its labels, placeholder text, validation, and layout width.
        </p>
      </div>
    );
  }

  const [optionsText, setOptionsText] = useState((field.options || []).join('\n'));

  useEffect(() => {
    setOptionsText((field.options || []).join('\n'));
  }, [field.id]);

  const handleOptionsChange = (e) => {
    const val = e.target.value;
    setOptionsText(val);
    const arr = val.split('\n').map(s => s.trim()).filter(Boolean);
    onUpdateField(field.id, { options: arr });
  };

  const hasOptions = ['select', 'radio', 'checkbox'].includes(field.type);

  return (
    <div className="bg-white border border-black/10 rounded-xl p-4 shadow-2xs space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/5 font-mono text-[9px] font-bold uppercase text-gray-700">
              {field.type}
            </span>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Field Inspector</h3>
          </div>
          <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {field.id}</p>
        </div>

        <button
          type="button"
          onClick={() => onDeleteField(field.id)}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete field"
        >
          <FiTrash2 size={15} />
        </button>
      </div>

      {/* Field Settings Form */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1 text-xs">
        
        {/* Label */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Field Label</label>
          <input
            type="text"
            value={field.label || ''}
            onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none"
          />
        </div>

        {/* Placeholder (if applicable) */}
        {!['radio', 'checkbox', 'divider', 'heading', 'paragraph', 'file'].includes(field.type) && (
          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Placeholder Text</label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => onUpdateField(field.id, { placeholder: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none"
            />
          </div>
        )}

        {/* Help Text */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Help / Subtitle Text</label>
          <input
            type="text"
            value={field.helpText || ''}
            onChange={(e) => onUpdateField(field.id, { helpText: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none"
          />
        </div>

        {/* Options List (for Select, Radio, Checkbox) */}
        {hasOptions && (
          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] flex items-center justify-between">
              <span>Options List</span>
              <span className="text-[9px] text-gray-400 font-normal">One option per line</span>
            </label>
            <textarea
              rows={4}
              value={optionsText}
              onChange={handleOptionsChange}
              className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono focus:bg-white focus:outline-none resize-none"
            />
          </div>
        )}

        {/* Layout Width Toggle */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Field Grid Width</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onUpdateField(field.id, { width: 'full' })}
              className={cn(
                "py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                field.width === 'full' ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-gray-50 text-gray-600 border-black/10"
              )}
            >
              100% Full Width
            </button>
            <button
              type="button"
              onClick={() => onUpdateField(field.id, { width: 'half' })}
              className={cn(
                "py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                field.width === 'half' ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-gray-50 text-gray-600 border-black/10"
              )}
            >
              50% Half Width
            </button>
          </div>
        </div>

        {/* Required Toggle */}
        <div className="pt-2 border-t border-black/5 flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-800 block text-xs">Required Field</span>
            <span className="text-[10px] text-gray-400">Force user completion before submit</span>
          </div>
          <button
            type="button"
            onClick={() => onUpdateField(field.id, { required: !field.required })}
            className={cn(
              "relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer",
              field.required ? "bg-black" : "bg-gray-200"
            )}
          >
            <span className={cn(
              "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
              field.required ? "translate-x-5" : "translate-x-1"
            )} />
          </button>
        </div>

        {/* Default Value */}
        <div className="space-y-1 pt-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Default Value</label>
          <input
            type="text"
            value={field.defaultValue || ''}
            onChange={(e) => onUpdateField(field.id, { defaultValue: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono focus:bg-white focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
}
