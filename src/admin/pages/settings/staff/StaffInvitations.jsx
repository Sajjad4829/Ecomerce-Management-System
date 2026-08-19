import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../../components/cms/DataTable';
import { FiPlus } from 'react-icons/fi';

export default function StaffInvitations() {
  const navigate = useNavigate();
  
  const invitations = [
    { id: 'INV-01', email: 'new.hire@example.com', role: 'Catalog Manager', invitedBy: 'Admin User', date: '2023-10-25', status: 'Pending' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Pending Invitations</h1>
          <p className="text-text-muted text-sm mt-1">Manage outstanding staff invites</p>
        </div>
        <button onClick={() => navigate('/admin/settings/staff/new')} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FiPlus /> New Invite
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={invitations}
          columns={[
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
            { key: 'invitedBy', label: 'Invited By' },
            { key: 'date', label: 'Sent Date' },
            { key: 'status', label: 'Status', render: (val) => (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {val}
              </span>
            )}
          ]}
        />
      </div>
    </div>
  );
}
