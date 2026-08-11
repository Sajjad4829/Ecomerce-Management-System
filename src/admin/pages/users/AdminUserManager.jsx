import { useState } from 'react';
import { FiPlus, FiSearch, FiMoreVertical, FiEdit2, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { PermissionGate } from '../../../auth/components/PermissionGate';

const MOCK_USERS = [
  { id: '1', name: 'Alice Admin', email: 'alice@example.com', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago' },
  { id: '2', name: 'Bob Storeman', email: 'bob@example.com', role: 'Store Manager', status: 'Active', lastLogin: '1 day ago' },
  { id: '3', name: 'Charlie Content', email: 'charlie@example.com', role: 'Catalog Editor', status: 'Inactive', lastLogin: '1 month ago' },
];

export default function AdminUserManager() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Workspace Users</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Manage administrative staff accounts and their assigned roles.
          </p>
        </div>
        
        <PermissionGate permission="users.manage">
          <Link to="/admin/users/new" className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus size={16} /> Invite User
          </Link>
        </PermissionGate>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_USERS.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-bold text-[#1A1A1A]">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <FiShield className="text-gray-400" /> {user.role}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <PermissionGate permission="users.manage" fallback={<span className="text-xs text-gray-400">View Only</span>}>
                        <Link to={`/admin/users/${user.id}/edit`} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                          <FiEdit2 size={16} />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
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
