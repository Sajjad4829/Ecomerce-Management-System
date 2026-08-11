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
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Bulk SEO Editor</h2>
          <p className="text-sm text-stone-500">Edit multiple SEO fields at once for rapid optimization.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
          <FiSave /> Save All Changes
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-widest">
              <th className="px-6 py-4 w-1/4">Resource Name</th>
              <th className="px-6 py-4 w-1/3">SEO Title</th>
              <th className="px-6 py-4">Meta Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium text-stone-900 text-sm">{item.name}</td>
                <td className="px-6 py-4">
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={e => {
                      const newItems = [...items];
                      newItems[idx].title = e.target.value;
                      setItems(newItems);
                    }}
                    className="w-full p-2 bg-white border border-stone-200 rounded-md text-sm focus:border-stone-400 outline-none"
                  />
                  <div className={`text-[10px] mt-1 text-right ${item.title.length > 60 ? 'text-red-500' : 'text-stone-400'}`}>{item.title.length}/60</div>
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
                    className="w-full p-2 bg-white border border-stone-200 rounded-md text-sm focus:border-stone-400 outline-none"
                  />
                  <div className={`text-[10px] mt-1 text-right ${item.description.length > 160 ? 'text-red-500' : 'text-stone-400'}`}>{item.description.length}/160</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
