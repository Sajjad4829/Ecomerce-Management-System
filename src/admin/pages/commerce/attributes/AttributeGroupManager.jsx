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
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      <header className="shrink-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/attributes')}
            className="p-2 -ml-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-background"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-serif font-bold text-xl text-text-primary">
              Attribute Groups
            </h1>
            <p className="text-xs text-text-muted font-mono mt-1">
              Organize attributes into logical sets for product forms.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Create New Group</label>
              <input 
                type="text" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. Technical Specs, Care Instructions"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <button 
              onClick={handleAdd}
              className="shrink-0 px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-2 h-[42px]"
            >
              <FiPlus size={16} /> Add Group
            </button>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Group Name</th>
                  <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Slug</th>
                  <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Attributes</th>
                  <th className="p-4 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {groups.map((g) => (
                  <tr key={g.id} className="hover:bg-background transition-colors group">
                    <td className="p-4 text-text-muted cursor-grab active:cursor-grabbing">
                      <FiMenu size={16} />
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-text-primary text-sm">{g.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs text-text-muted">{g.slug}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-stone-100 text-text-secondary rounded-lg text-xs font-medium">
                        {g.attributeCount} attributes
                      </span>
                    </td>
                    <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-end gap-1">
                        <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-stone-200 rounded transition-colors">
                          <FiEdit2 size={14} />
                        </button>
                        <button 
                          onClick={() => setGroups(groups.filter(grp => grp.id !== g.id))}
                          className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors"
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
