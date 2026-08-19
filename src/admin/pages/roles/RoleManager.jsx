import { useState } from 'react';
import { FiPlus, FiSearch, FiMoreVertical, FiEdit2, FiShield, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { PermissionGate } from '../../../auth/components/PermissionGate';

const MOCK_ROLES = [
  { id: '1', name: 'Super Admin', description: 'Full access to all system features.', users: 2, permissions: 'All', status: 'Active' },
  { id: '2', name: 'Store Manager', description: 'Manages catalog, orders, and customers.', users: 5, permissions: '42', status: 'Active' },
  { id: '3', name: 'Catalog Editor', description: 'Manages products and inventory only.', users: 3, permissions: '12', status: 'Active' },
  { id: '4', name: 'Customer Support', description: 'Views orders and manages customers.', users: 8, permissions: '18', status: 'Active' },
  { id: '5', name: 'Viewer', description: 'Read-only access to most modules.', users: 12, permissions: '8', status: 'Active' },
];

export default function RoleManager() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mb-2">Roles & Permissions</h1>
          <p className="text-sm text-text-muted max-w-xl">
            Manage administrative roles and configure granular access control.
          </p>
        </div>
        
        <PermissionGate permission="roles.manage">
          <Link to="/admin/roles/new" className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus size={16} /> Create Role
          </Link>
        </PermissionGate>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Role</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Users</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Permissions</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_ROLES.map(role => (
                <tr key={role.id} className="hover:bg-background transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-bold text-text-primary">{role.name}</p>
                    <p className="text-xs text-text-muted mt-1">{role.description}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                      <FiUsers className="text-text-muted" /> {role.users}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                      <FiShield className="text-text-muted" /> {role.permissions}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-success-soft text-green-800 border-green-200">
                      {role.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <PermissionGate permission="roles.manage" fallback={<span className="text-xs text-text-muted">View Only</span>}>
                        <Link to={`/admin/roles/${role.id}/edit`} className="p-2 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                          <FiEdit2 size={16} />
                        </Link>
                        <button className="p-2 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                          <FiMoreVertical size={16} />
                        </button>
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
