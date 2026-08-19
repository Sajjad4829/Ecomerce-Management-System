import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function RoleCreator() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-text-muted hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Create New Role</h1>
          <p className="text-text-muted text-sm mt-1">Define a custom access profile</p>
        </div>
        <div className="ml-auto">
          <button onClick={() => navigate('/admin/settings/roles')} className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiSave /> Save Role
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Role Name</label>
          <input type="text" placeholder="e.g. Content Writer" className="w-full px-4 py-2 border border-border-hover rounded-lg focus:ring-black focus:border-black" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
          <textarea rows="3" className="w-full px-4 py-2 border border-border-hover rounded-lg focus:ring-black focus:border-black"></textarea>
        </div>

        <div className="pt-6 border-t border-black/10">
           <p className="text-sm text-text-muted">After creating this role, you will be directed to the Permission Matrix to configure its specific access levels.</p>
        </div>
      </div>
    </div>
  );
}
