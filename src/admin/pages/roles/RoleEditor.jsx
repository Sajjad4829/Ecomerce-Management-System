import { useState } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PERMISSION_MODULES = [
  {
    id: 'products',
    name: 'Products & Catalog',
    permissions: [
      { id: 'products.view', label: 'View Products' },
      { id: 'products.create', label: 'Create Products' },
      { id: 'products.edit', label: 'Edit Products' },
      { id: 'products.delete', label: 'Delete Products' },
    ]
  },
  {
    id: 'orders',
    name: 'Orders & Fulfillment',
    permissions: [
      { id: 'orders.view', label: 'View Orders' },
      { id: 'orders.create', label: 'Create Orders' },
      { id: 'orders.edit', label: 'Edit Orders' },
      { id: 'orders.cancel', label: 'Cancel Orders' },
    ]
  },
  {
    id: 'customers',
    name: 'Customers',
    permissions: [
      { id: 'customers.view', label: 'View Customers' },
      { id: 'customers.edit', label: 'Edit Customers' },
      { id: 'customers.delete', label: 'Delete Customers' },
    ]
  },
  {
    id: 'cms',
    name: 'CMS & Content',
    permissions: [
      { id: 'cms.pages.view', label: 'View Pages' },
      { id: 'cms.pages.create', label: 'Create Pages' },
      { id: 'cms.pages.edit', label: 'Edit Pages' },
      { id: 'cms.pages.delete', label: 'Delete Pages' },
    ]
  }
];

export default function RoleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState({
    name: isNew ? '' : 'Catalog Editor',
    description: isNew ? '' : 'Manages products and inventory only.',
    selectedPermissions: isNew ? [] : ['products.view', 'products.create', 'products.edit']
  });

  const togglePermission = (permId) => {
    setFormData(prev => ({
      ...prev,
      selectedPermissions: prev.selectedPermissions.includes(permId)
        ? prev.selectedPermissions.filter(p => p !== permId)
        : [...prev.selectedPermissions, permId]
    }));
  };

  const toggleModule = (moduleObj) => {
    const modulePermIds = moduleObj.permissions.map(p => p.id);
    const allSelected = modulePermIds.every(id => formData.selectedPermissions.includes(id));
    
    setFormData(prev => {
      if (allSelected) {
        return {
          ...prev,
          selectedPermissions: prev.selectedPermissions.filter(id => !modulePermIds.includes(id))
        };
      } else {
        const toAdd = modulePermIds.filter(id => !prev.selectedPermissions.includes(id));
        return {
          ...prev,
          selectedPermissions: [...prev.selectedPermissions, ...toAdd]
        };
      }
    });
  };

  const handleSave = () => {
    navigate('/admin/roles');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      <div className="sticky top-0 z-20 bg-background pt-4 pb-4 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/roles" className="p-2 bg-surface border border-black/10 rounded-lg text-text-muted hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-text-primary">
              {isNew ? 'Create Role' : `Edit Role: ${formData.name}`}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/admin/roles" className="px-4 py-2 text-text-secondary hover:text-black text-sm font-medium transition-colors">
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> Save Role
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-8 space-y-8">
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <h2 className="text-lg font-serif font-bold text-text-primary mb-6">Role Details</h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Role Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-text-primary">Permission Matrix</h2>
            <span className="text-sm font-medium text-text-muted bg-gray-100 px-3 py-1 rounded-full">
              {formData.selectedPermissions.length} selected
            </span>
          </div>

          <div className="space-y-6">
            {PERMISSION_MODULES.map(module => {
              const allSelected = module.permissions.every(p => formData.selectedPermissions.includes(p.id));
              const someSelected = module.permissions.some(p => formData.selectedPermissions.includes(p.id)) && !allSelected;

              return (
                <div key={module.id} className="border border-black/5 rounded-lg overflow-hidden">
                  <div className="bg-background px-6 py-4 flex items-center justify-between border-b border-black/5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={allSelected}
                        ref={input => { if (input) input.indeterminate = someSelected; }}
                        onChange={() => toggleModule(module)}
                        className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]"
                      />
                      <span className="font-bold text-text-primary">{module.name}</span>
                    </label>
                  </div>
                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {module.permissions.map(perm => (
                      <label key={perm.id} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox"
                          checked={formData.selectedPermissions.includes(perm.id)}
                          onChange={() => togglePermission(perm.id)}
                          className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]"
                        />
                        <span className="text-sm text-text-secondary group-hover:text-black transition-colors">{perm.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
