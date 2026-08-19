import React from 'react';
import { useNavigate } from 'react-router-dom';
import { rbacService } from '../../../services/RBACService';
import DataTable from '../../../../components/cms/DataTable';
import { FiPlus, FiShield } from 'react-icons/fi';

export default function RoleManager() {
  const navigate = useNavigate();
  const roles = rbacService.getRoles();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Roles & Permissions</h1>
          <p className="text-text-muted text-sm mt-1">Manage enterprise access control levels</p>
        </div>
        <button 
          onClick={() => navigate('/admin/settings/roles/new')}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FiPlus /> New Role
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={roles}
          columns={[
            { key: 'name', label: 'Role Name', render: (val, row) => (
              <div className="flex items-center gap-2">
                <span className="font-medium">{val}</span>
                {row.isSystem && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                    <FiShield className="w-3 h-3" /> System
                  </span>
                )}
              </div>
            )},
            { key: 'description', label: 'Description', render: (val) => <span className="text-text-muted">{val}</span> },
            { key: 'staffCount', label: 'Staff Assigned' },
            { key: 'permissionCount', label: 'Permissions' },
            { key: 'status', label: 'Status', render: (val) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                val === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {val}
              </span>
            )}
          ]}
          onRowClick={(row) => navigate(`/admin/settings/roles/${row.id}`)}
        />
      </div>
    </div>
  );
}
