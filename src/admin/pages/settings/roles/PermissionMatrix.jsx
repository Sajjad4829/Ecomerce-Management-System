import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rbacService } from '../../../services/RBACService';
import { FiArrowLeft, FiCheck, FiInfo } from 'react-icons/fi';

const modules = [
  { id: 'catalog', name: 'Catalog', resources: ['products', 'categories', 'collections', 'inventory'] },
  { id: 'orders', name: 'Orders', resources: ['orders', 'returns', 'fulfillments', 'shipments'] },
  { id: 'customers', name: 'Customers', resources: ['profiles', 'groups', 'segments'] },
  { id: 'cms', name: 'Content Management', resources: ['pages', 'sections', 'navigation', 'media'] },
  { id: 'settings', name: 'System Settings', resources: ['staff', 'roles', 'general', 'security'] }
];

const actions = ['view', 'create', 'edit', 'delete', 'export'];

export default function PermissionMatrix() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  
  // Mock state for selected permissions
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const found = rbacService.getRoles().find(r => r.id === roleId);
    setRole(found);
    
    // Initialize mock selected state
    if (found?.isSystem && found.name === 'Super Admin') {
       const all = {};
       modules.forEach(m => m.resources.forEach(r => actions.forEach(a => all[`${m.id}.${r}.${a}`] = true)));
       setSelected(all);
    } else {
       setSelected({'catalog.products.view': true, 'catalog.products.edit': true});
    }
  }, [roleId]);

  const togglePermission = (mod, res, act) => {
    if (role?.name === 'Super Admin') return; // Cannot edit super admin
    const key = `${mod}.${res}.${act}`;
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleRow = (mod, res) => {
    if (role?.name === 'Super Admin') return;
    const allChecked = actions.every(a => selected[`${mod}.${res}.${a}`]);
    const next = { ...selected };
    actions.forEach(a => {
      next[`${mod}.${res}.${a}`] = !allChecked;
    });
    setSelected(next);
  };

  if (!role) return <div className="p-8">Loading...</div>;

  const isSuperAdmin = role.name === 'Super Admin';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(`/admin/settings/roles/${roleId}`)} className="text-text-muted hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">{role.name} Matrix</h1>
          <p className="text-text-muted text-sm mt-1">Configure fine-grained module access and actions</p>
        </div>
        <div className="ml-auto">
          <button 
            disabled={isSuperAdmin}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>

      {isSuperAdmin && (
        <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 flex items-start gap-3">
          <FiInfo className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">The Super Admin role is a protected system role with unrestricted access across all modules. Its permission matrix cannot be modified.</p>
        </div>
      )}

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 border-b border-black/10 bg-background font-medium text-text-muted">Resource</th>
              {actions.map(act => (
                <th key={act} className="p-4 border-b border-black/10 bg-background font-medium text-text-muted text-center capitalize w-24">
                  {act}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map(mod => (
              <React.Fragment key={mod.id}>
                <tr>
                  <td colSpan={actions.length + 1} className="p-4 bg-background/50 border-b border-black/5 font-semibold text-text-secondary">
                    {mod.name}
                  </td>
                </tr>
                {mod.resources.map(res => (
                  <tr key={res} className="border-b border-black/5 last:border-0 hover:bg-background/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleRow(mod.id, res)}
                          disabled={isSuperAdmin}
                          className="w-4 h-4 rounded border border-border-hover flex items-center justify-center text-white disabled:opacity-50"
                          style={{ backgroundColor: actions.every(a => selected[`${mod.id}.${res}.${a}`]) ? 'black' : 'transparent', borderColor: actions.every(a => selected[`${mod.id}.${res}.${a}`]) ? 'black' : '#d1d5db' }}
                        >
                          {actions.every(a => selected[`${mod.id}.${res}.${a}`]) && <FiCheck className="w-3 h-3" />}
                        </button>
                        <span className="capitalize">{res.replace('_', ' ')}</span>
                      </div>
                    </td>
                    {actions.map(act => {
                      const key = `${mod.id}.${res}.${act}`;
                      const isChecked = selected[key];
                      return (
                        <td key={act} className="p-4 text-center">
                          <button
                            onClick={() => togglePermission(mod.id, res, act)}
                            disabled={isSuperAdmin}
                            className={`w-5 h-5 rounded border mx-auto flex items-center justify-center text-white transition-colors disabled:opacity-50 ${isChecked ? 'bg-black border-black' : 'border-border-hover bg-surface hover:border-gray-400'}`}
                          >
                            {isChecked && <FiCheck className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
