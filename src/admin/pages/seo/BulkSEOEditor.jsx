import React, { useState } from 'react';
import { FiSave, FiLayers } from 'react-icons/fi';

export function BulkSEOEditor() {
  const [items, setItems] = useState([
    { id: 1, name: 'Modern Sofa', title: 'Modern Sofa - Aurora Furniture', description: 'Buy modern sofa online.' },
    { id: 2, name: 'Leather Chair', title: 'Leather Chair - Aurora', description: 'Premium leather chair.' }
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Bulk SEO Editor</h2>
          <p className="text-sm text-text-muted">Edit multiple SEO fields at once for rapid optimization.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <FiSave /> Save All Changes
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background border-b border-border text-xs font-bold text-text-muted uppercase tracking-widest">
              <th className="px-6 py-4 w-1/4">Resource Name</th>
              <th className="px-6 py-4 w-1/3">SEO Title</th>
              <th className="px-6 py-4">Meta Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-background">
                <td className="px-6 py-4 font-medium text-text-primary text-sm">{item.name}</td>
                <td className="px-6 py-4">
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={e => {
                      const newItems = [...items];
                      newItems[idx].title = e.target.value;
                      setItems(newItems);
                    }}
                    className="w-full p-2 bg-surface border border-border rounded-md text-sm focus:border-primary outline-none"
                  />
                  <div className={`text-[10px] mt-1 text-right ${item.title.length > 60 ? 'text-danger' : 'text-text-muted'}`}>{item.title.length}/60</div>
                </td>
                <td className="px-6 py-4">
                   <textarea 
                    value={item.description}
                    onChange={e => {
                      const newItems = [...items];
                      newItems[idx].description = e.target.value;
                      setItems(newItems);
                    }} 
                    rows={2}
                    className="w-full p-2 bg-surface border border-border rounded-md text-sm focus:border-primary outline-none"
                  />
                  <div className={`text-[10px] mt-1 text-right ${item.description.length > 160 ? 'text-danger' : 'text-text-muted'}`}>{item.description.length}/160</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
