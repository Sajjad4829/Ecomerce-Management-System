import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiTrash2, FiMenu, FiEdit2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AttributeGroupManager() {
  const navigate = useNavigate();
  
  const [groups, setGroups] = useState([
    { id: 'g-1', name: 'General', slug: 'general', attributeCount: 12 },
    { id: 'g-2', name: 'Materials', slug: 'materials', attributeCount: 8 },
    { id: 'g-3', name: 'Dimensions', slug: 'dimensions', attributeCount: 4 },
    { id: 'g-4', name: 'Shipping', slug: 'shipping', attributeCount: 3 },
  ]);

  const [newGroupName, setNewGroupName] = useState('');

  const handleAdd = () => {
    if (!newGroupName.trim()) return;
    const slug = newGroupName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    setGroups([...groups, {
      id: `g-${Date.now()}`,
      name: newGroupName.trim(),
      slug,
      attributeCount: 0
    }]);
    setNewGroupName('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#F7F5F2]">
      <header className="shrink-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/attributes')}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-50"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-serif font-bold text-xl text-stone-900">
              Attribute Groups
            </h1>
            <p className="text-xs text-stone-500 font-mono mt-1">
              Organize attributes into logical sets for product forms.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Create New Group</label>
              <input 
                type="text" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. Technical Specs, Care Instructions"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <button 
              onClick={handleAdd}
              className="shrink-0 px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-2 h-[42px]"
            >
              <FiPlus size={16} /> Add Group
            </button>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Group Name</th>
                  <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Slug</th>
                  <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Attributes</th>
                  <th className="p-4 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {groups.map((g) => (
                  <tr key={g.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="p-4 text-stone-400 cursor-grab active:cursor-grabbing">
                      <FiMenu size={16} />
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-stone-900 text-sm">{g.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs text-stone-500">{g.slug}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium">
                        {g.attributeCount} attributes
                      </span>
                    </td>
                    <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-end gap-1">
                        <button className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors">
                          <FiEdit2 size={14} />
                        </button>
                        <button 
                          onClick={() => setGroups(groups.filter(grp => grp.id !== g.id))}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
