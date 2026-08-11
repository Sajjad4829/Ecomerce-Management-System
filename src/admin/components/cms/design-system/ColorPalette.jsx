import { useState } from 'react';
import { FiCopy, FiEdit2 } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const DEFAULT_COLORS = [
  { id: 'primary', name: 'Primary', value: '#1A1A1A', variable: '--color-primary', type: 'brand' },
  { id: 'secondary', name: 'Secondary', value: '#F7F5F2', variable: '--color-secondary', type: 'brand' },
  { id: 'accent', name: 'Accent', value: '#A69076', variable: '--color-accent', type: 'brand' },
  
  { id: 'bg', name: 'Background', value: '#FFFFFF', variable: '--color-bg', type: 'surface' },
  { id: 'surface', name: 'Surface', value: '#F9FAFB', variable: '--color-surface', type: 'surface' },
  { id: 'border', name: 'Border', value: '#E5E7EB', variable: '--color-border', type: 'surface' },
  { id: 'text-main', name: 'Text Main', value: '#111827', variable: '--color-text-main', type: 'text' },
  { id: 'text-muted', name: 'Text Muted', value: '#6B7280', variable: '--color-text-muted', type: 'text' },
  
  { id: 'success', name: 'Success', value: '#10B981', variable: '--color-success', type: 'status' },
  { id: 'warning', name: 'Warning', value: '#F59E0B', variable: '--color-warning', type: 'status' },
  { id: 'error', name: 'Error', value: '#EF4444', variable: '--color-error', type: 'status' },
  { id: 'info', name: 'Info', value: '#3B82F6', variable: '--color-info', type: 'status' },
];

export default function ColorPalette() {
  const [colors, setColors] = useState(DEFAULT_COLORS);

  const handleColorChange = (id, newValue) => {
    setColors(colors.map(c => c.id === id ? { ...c, value: newValue } : c));
  };

  const ColorGroup = ({ title, type }) => {
    const groupColors = colors.filter(c => c.type === type);
    
    return (
      <div className="mb-10">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4 border-b border-black/5 pb-2">
          {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groupColors.map(color => (
            <div key={color.id} className="bg-surface border border-black/5 rounded-xl p-4 shadow-sm group">
              <div 
                className="w-full h-24 rounded-lg mb-4 border border-black/10 relative overflow-hidden"
                style={{ backgroundColor: color.value }}
              >
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-surface text-text-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                      <FiCopy size={16} />
                    </button>
                 </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-text-primary">{color.name}</span>
                  <div className="relative w-8 h-8 rounded-full border border-black/10 overflow-hidden cursor-pointer" title="Edit Color">
                    <input 
                      type="color" 
                      value={color.value}
                      onChange={(e) => handleColorChange(color.id, e.target.value)}
                      className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-text-muted">
                  <span className="font-mono">{color.value.toUpperCase()}</span>
                  <span className="font-mono truncate w-24 text-right" title={color.variable}>{color.variable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <ColorGroup title="Brand Colors" type="brand" />
      <ColorGroup title="Surfaces & Borders" type="surface" />
      <ColorGroup title="Typography" type="text" />
      <ColorGroup title="Status Colors" type="status" />
    </div>
  );
}
