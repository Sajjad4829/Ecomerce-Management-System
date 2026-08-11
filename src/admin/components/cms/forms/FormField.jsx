import { FiTrash2, FiCopy, FiMove, FiArrowUp, FiArrowDown, FiCheck } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function FormField({
  field,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  isPreview = false
}) {
  const {
    id,
    type,
    label,
    placeholder,
    helpText,
    required,
    width = 'full', // 'full' | 'half'
    options = [],
    defaultValue
  } = field;

  // Render input field based on type
  const renderControl = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <input
            type={type === 'phone' ? 'tel' : type}
            disabled={!isPreview}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:border-black/30 disabled:bg-gray-50/70 cursor-pointer"
          />
        );

      case 'textarea':
        return (
          <textarea
            rows={3}
            disabled={!isPreview}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:border-black/30 disabled:bg-gray-50/70 resize-none cursor-pointer"
          />
        );

      case 'select':
        return (
          <select
            disabled={!isPreview}
            defaultValue={defaultValue || (options[0] || '')}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none disabled:bg-gray-50/70 cursor-pointer"
          >
            <option value="" disabled>Select an option...</option>
            {options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-1.5 pt-1">
            {options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name={`radio-${id}`}
                  disabled={!isPreview}
                  className="rounded-full border-black/20 text-black focus:ring-black"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-1.5 pt-1">
            {options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={!isPreview}
                  className="rounded border-black/20 text-black focus:ring-black"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            disabled={!isPreview}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white"
          />
        );

      case 'time':
        return (
          <input
            type="time"
            disabled={!isPreview}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white"
          />
        );

      case 'file':
        return (
          <div className="border-2 border-dashed border-black/15 rounded-xl p-4 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <span className="text-xs font-bold text-gray-600 block">Click or Drag Files Here</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">{helpText || 'Upload drawings, specs, or images (PDF, PNG, JPG)'}</span>
          </div>
        );

      case 'heading':
        return (
          <h4 className="font-serif font-bold text-base text-[#1A1A1A] border-b border-black/10 pb-1 mt-2">
            {label || 'Section Heading'}
          </h4>
        );

      case 'paragraph':
        return (
          <p className="text-xs text-gray-500 leading-relaxed italic">
            {label || 'Help paragraph text describing guidelines to the user.'}
          </p>
        );

      case 'divider':
        return <hr className="border-t border-black/10 my-2" />;

      case 'consent':
        return (
          <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer pt-1">
            <input type="checkbox" disabled={!isPreview} className="mt-0.5 rounded border-black/20" />
            <span className="leading-snug">{label || 'I agree to the privacy terms and VIP client communications.'}</span>
          </label>
        );

      case 'hidden':
        return (
          <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[10px] font-mono text-amber-800 flex items-center justify-between">
            <span>[HIDDEN FIELD] Name: <strong>{label}</strong></span>
            <span>Value: <code>{defaultValue || 'dynamic'}</code></span>
          </div>
        );

      default:
        return null;
    }
  };

  // Skip standard label rendering for heading, paragraph, divider, consent, hidden
  const hideStandardLabel = ['heading', 'paragraph', 'divider', 'consent', 'hidden'].includes(type);

  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative rounded-xl transition-all duration-200 group border",
        width === 'half' ? "col-span-1" : "col-span-2",
        !isPreview && "p-3.5 bg-white cursor-pointer hover:border-black/30",
        isSelected && !isPreview ? "border-2 border-[#1A1A1A] shadow-md ring-2 ring-black/5" : "border-black/10",
        isPreview && "p-1 border-transparent"
      )}
    >
      {/* Canvas Tool Actions Header */}
      {!isPreview && (
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-black/5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-gray-100 text-[9px] font-mono font-bold uppercase text-gray-600">
              {type}
            </span>
            {width === 'half' && (
              <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[9px] font-bold text-blue-700">
                50% Width
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              disabled={isFirst}
              onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
              className="p-1 hover:bg-gray-100 text-gray-500 rounded disabled:opacity-30"
              title="Move Up"
            >
              <FiArrowUp size={12} />
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
              className="p-1 hover:bg-gray-100 text-gray-500 rounded disabled:opacity-30"
              title="Move Down"
            >
              <FiArrowDown size={12} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
              className="p-1 hover:bg-gray-100 text-gray-600 rounded"
              title="Duplicate Field"
            >
              <FiCopy size={12} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1 hover:bg-red-50 text-red-600 rounded"
              title="Delete Field"
            >
              <FiTrash2 size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Field Content */}
      <div className="space-y-1.5">
        {!hideStandardLabel && (
          <label className="text-xs font-bold text-gray-800 flex items-center justify-between">
            <span>
              {label} {required && <span className="text-red-500 ml-0.5">*</span>}
            </span>
          </label>
        )}

        {renderControl()}

        {helpText && !hideStandardLabel && (
          <span className="text-[10px] text-gray-400 block">{helpText}</span>
        )}
      </div>
    </div>
  );
}
