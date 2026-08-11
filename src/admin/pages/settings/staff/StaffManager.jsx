import React from 'react';
import { useNavigate } from 'react-router-dom';
import { rbacService } from '../../../services/RBACService';
import DataTable from '../../../../components/cms/DataTable';
import { FiPlus, FiDownload, FiShield } from 'react-icons/fi';

export default function StaffManager() {
  const navigate = useNavigate();
  const staff = rbacService.getStaff();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Staff Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage enterprise staff access and roles</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50 transition-colors">
            <FiDownload /> Export
          </button>
          <button 
            onClick={() => navigate('/admin/settings/staff/new')}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FiPlus /> New Staff
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={staff}
          searchPlaceholder="Search staff by name, email, department..."
          columns={[
            { key: 'name', label: 'Name', render: (val, row) => (
              <div>
                <div className="font-medium">{val}</div>
                <div className="text-xs text-gray-500">{row.email}</div>
              </div>
            )},
            { key: 'department', label: 'Department' },
            { key: 'roles', label: 'Roles', render: (val) => (
              <div className="flex flex-wrap gap-1">
                {val.map(role => (
                  <span key={role} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">
                    {role === 'super_admin' && <FiShield className="w-3 h-3 text-red-500" />}
                    {role}
                  </span>
                ))}
              </div>
            )},
            { key: 'status', label: 'Status', render: (val) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                val === 'Active' ? 'bg-green-100 text-green-800' :
                val === 'Suspended' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {val}
              </span>
            )},
            { key: 'lastActive', label: 'Last Active', render: (val) => new Date(val).toLocaleDateString() }
          ]}
          onRowClick={(row) => navigate(`/admin/settings/staff/${row.id}`)}
        />
      </div>
    </div>
  );
}
