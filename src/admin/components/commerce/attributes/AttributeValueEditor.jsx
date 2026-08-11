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
          className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        {isColor && (
          <input 
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-12 h-[38px] p-0.5 bg-surface border border-border rounded-lg cursor-pointer"
          />
        )}
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Value
        </button>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-surface">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-border">
              <th className="p-3 w-10"></th>
              <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Label</th>
              <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Slug</th>
              {isColor && <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Color</th>}
              {isImage && <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Image</th>}
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {values.map((v, i) => (
              <tr key={v.id} className="hover:bg-background transition-colors">
                <td className="p-3 text-text-muted cursor-grab active:cursor-grabbing">
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
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-text-primary"
                  />
                </td>
                <td className="p-3">
                  <span className="font-mono text-xs text-text-muted">{v.slug}</span>
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
                    <button className="w-8 h-8 rounded border border-dashed border-border-hover flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-stone-100 transition-colors">
                      <FiPlus size={14} />
                    </button>
                  </td>
                )}
                <td className="p-3">
                  <button 
                    onClick={() => handleRemove(v.id)}
                    className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {values.length === 0 && (
              <tr>
                <td colSpan={isColor || isImage ? 5 : 4} className="p-8 text-center text-text-muted text-sm">
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
