import React from 'react';
import { rbacService } from '../../../services/RBACService';
import DataTable from '../../../../components/cms/DataTable';

export default function PermissionManager() {
  const permissions = rbacService.getPermissions();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Permission Dictionary</h1>
          <p className="text-text-muted text-sm mt-1">Reference of all available system permissions</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={permissions}
          searchPlaceholder="Search permissions..."
          columns={[
            { key: 'id', label: 'ID', render: (val) => <span className="font-mono text-xs">{val}</span> },
            { key: 'module', label: 'Module', render: (val) => <span className="capitalize">{val}</span> },
            { key: 'resource', label: 'Resource', render: (val) => <span className="capitalize">{val.replace('_', ' ')}</span> },
            { key: 'action', label: 'Action', render: (val) => (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                val === 'delete' ? 'bg-danger-soft text-red-700' :
                val === 'edit' || val === 'create' ? 'bg-blue-50 text-blue-700' :
                'bg-gray-100 text-text-secondary'
              }`}>
                {val}
              </span>
            )},
            { key: 'description', label: 'Description', render: (val) => <span className="text-text-muted">{val}</span> }
          ]}
        />
      </div>
    </div>
  );
}
