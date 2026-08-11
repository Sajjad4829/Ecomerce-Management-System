import { FiPlus, FiGrid } from 'react-icons/fi';
import FormField from './FormField';

export default function FormCanvas({
  fields = [],
  selectedFieldId,
  onSelectField,
  onDuplicateField,
  onDeleteField,
  onMoveField,
  submitButtonText = 'Submit Inquiry'
}) {
  return (
    <div className="bg-white border border-black/10 rounded-xl p-6 shadow-2xs min-h-[500px] flex flex-col justify-between">
      
      {/* Top Canvas Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <FiGrid size={16} className="text-gray-500" />
          <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Live Form Canvas</h3>
        </div>
        <span className="text-xs text-gray-400 font-mono">{fields.length} elements placed</span>
      </div>

      {/* Fields Canvas Grid */}
      <div className="flex-1">
        {fields.length === 0 ? (
          <div className="border-2 border-dashed border-black/10 rounded-xl p-12 text-center my-8 bg-gray-50/50">
            <FiPlus size={24} className="mx-auto text-gray-300 mb-2" />
            <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Your form canvas is currently empty</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Select or drag field elements from the left Library panel to build your custom inquiry or lead capture form.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-6">
            {fields.map((field, idx) => (
              <FormField
                key={field.id}
                field={field}
                isSelected={selectedFieldId === field.id}
                onSelect={() => onSelectField(field.id)}
                onDuplicate={() => onDuplicateField(field.id)}
                onDelete={() => onDeleteField(field.id)}
                onMoveUp={() => onMoveField(idx, idx - 1)}
                onMoveDown={() => onMoveField(idx, idx + 1)}
                isFirst={idx === 0}
                isLast={idx === fields.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit Button Placeholder */}
      {fields.length > 0 && (
        <div className="pt-4 border-t border-black/10">
          <button
            type="button"
            disabled
            className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md opacity-90 cursor-not-allowed"
          >
            {submitButtonText}
          </button>
        </div>
      )}

    </div>
  );
}
