import { useState } from 'react';
import { FiPlus, FiTrash2, FiMenu } from 'react-icons/fi';

export default function AttributeValueEditor({ attributeType, values, onChange }) {
  const [newValue, setNewValue] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  
  const isColor = attributeType === 'color';
  const isImage = attributeType === 'image_swatch';

  const handleAdd = () => {
    if (!newValue.trim()) return;
    
    const slug = newValue.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newEntry = {
      id: `v-${Date.now()}`,
      label: newValue.trim(),
      slug,
      order: values.length,
      ...(isColor && { colorValue: newColor })
    };
    
    onChange([...values, newEntry]);
    setNewValue('');
  };

  const handleRemove = (id) => {
    onChange(values.filter(v => v.id !== id));
  };

  const moveValue = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === values.length - 1)
    ) return;
    
    const newValues = [...values];
    const temp = newValues[index];
    newValues[index] = newValues[index + direction];
    newValues[index + direction] = temp;
    
    // Update order
    onChange(newValues.map((v, i) => ({ ...v, order: i })));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="New value (e.g. Oak, XL, Blue)..."
          className="flex-1 px-4 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        {isColor && (
          <input 
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-12 h-[38px] p-0.5 bg-white border border-stone-200 rounded-lg cursor-pointer"
          />
        )}
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Value
        </button>
      </div>

      <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="p-3 w-10"></th>
              <th className="p-3 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Label</th>
              <th className="p-3 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Slug</th>
              {isColor && <th className="p-3 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Color</th>}
              {isImage && <th className="p-3 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Image</th>}
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {values.map((v, i) => (
              <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                <td className="p-3 text-stone-400 cursor-grab active:cursor-grabbing">
                  <FiMenu size={16} />
                </td>
                <td className="p-3">
                  <input 
                    type="text" 
                    value={v.label}
                    onChange={(e) => {
                      const newValues = [...values];
                      newValues[i].label = e.target.value;
                      onChange(newValues);
                    }}
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-stone-900"
                  />
                </td>
                <td className="p-3">
                  <span className="font-mono text-xs text-stone-500">{v.slug}</span>
                </td>
                {isColor && (
                  <td className="p-3">
                    <input 
                      type="color"
                      value={v.colorValue || '#000000'}
                      onChange={(e) => {
                        const newValues = [...values];
                        newValues[i].colorValue = e.target.value;
                        onChange(newValues);
                      }}
                      className="w-8 h-8 p-0 bg-transparent border-none rounded cursor-pointer"
                    />
                  </td>
                )}
                {isImage && (
                  <td className="p-3">
                    <button className="w-8 h-8 rounded border border-dashed border-stone-300 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors">
                      <FiPlus size={14} />
                    </button>
                  </td>
                )}
                <td className="p-3">
                  <button 
                    onClick={() => handleRemove(v.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {values.length === 0 && (
              <tr>
                <td colSpan={isColor || isImage ? 5 : 4} className="p-8 text-center text-stone-500 text-sm">
                  No values defined yet. Add some above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
