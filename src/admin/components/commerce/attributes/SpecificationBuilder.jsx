import { useState } from 'react';
import { FiPlus, FiTrash2, FiMenu, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// This acts as a matrix builder for specifications mappings or directly within a product
export default function SpecificationBuilder({ specs, onChange }) {
  const [newRowGroup, setNewRowGroup] = useState('General');
  const [newRowName, setNewRowName] = useState('');
  
  const handleAdd = () => {
    if (!newRowName.trim()) return;
    
    onChange([...specs, {
      id: `spec-${Date.now()}`,
      group: newRowGroup,
      name: newRowName.trim(),
      value: '',
      isDynamic: false // false = manual text, true = linked to global attribute
    }]);
    
    setNewRowName('');
  };

  const handleRemove = (id) => {
    onChange(specs.filter(s => s.id !== id));
  };

  // Group the specs
  const groupedSpecs = specs.reduce((acc, spec) => {
    if (!acc[spec.group]) acc[spec.group] = [];
    acc[spec.group].push(spec);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      
      {/* Add new row */}
      <div className="bg-background p-4 rounded-xl border border-border flex flex-col sm:flex-row gap-3 items-end">
        <div className="w-full sm:w-1/3">
          <label className="block text-[10px] font-mono font-bold text-text-muted uppercase mb-1.5">Spec Group</label>
          <input 
            type="text" 
            value={newRowGroup}
            onChange={(e) => setNewRowGroup(e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
          />
        </div>
        <div className="w-full sm:w-1/3">
          <label className="block text-[10px] font-mono font-bold text-text-muted uppercase mb-1.5">Spec Name</label>
          <input 
            type="text" 
            value={newRowName}
            onChange={(e) => setNewRowName(e.target.value)}
            placeholder="e.g. Weight Capacity"
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
        </div>
        <button 
          onClick={handleAdd}
          className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 h-[38px]"
        >
          <FiPlus size={16} /> Add Spec Row
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSpecs).map(([groupName, groupItems]) => (
          <div key={groupName} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="bg-background px-4 py-3 border-b border-border">
              <h4 className="text-xs font-mono font-bold text-text-primary uppercase">{groupName}</h4>
            </div>
            <div className="divide-y divide-stone-100">
              {groupItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center p-3 gap-3 hover:bg-background transition-colors">
                  <div className="flex items-center gap-3 w-full sm:w-1/3 shrink-0">
                    <button className="text-stone-300 hover:text-text-muted cursor-grab active:cursor-grabbing">
                      <FiMenu size={16} />
                    </button>
                    <input 
                      type="text" 
                      value={item.name}
                      onChange={(e) => {
                        const newSpecs = [...specs];
                        const index = newSpecs.findIndex(s => s.id === item.id);
                        newSpecs[index].name = e.target.value;
                        onChange(newSpecs);
                      }}
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-text-primary"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    {item.isDynamic ? (
                      <div className="flex-1 px-3 py-2 bg-stone-100 border border-border border-dashed rounded-lg flex items-center gap-2 text-text-muted text-sm italic">
                        <FiSettings size={14} /> Linked to Global Attribute
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        value={item.value}
                        onChange={(e) => {
                          const newSpecs = [...specs];
                          const index = newSpecs.findIndex(s => s.id === item.id);
                          newSpecs[index].value = e.target.value;
                          onChange(newSpecs);
                        }}
                        placeholder="Value..."
                        className="flex-1 px-3 py-1.5 bg-surface border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    )}
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors shrink-0"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {specs.length === 0 && (
          <div className="py-8 text-center border-2 border-dashed border-border rounded-xl">
            <p className="text-sm text-text-muted">No specifications added yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
