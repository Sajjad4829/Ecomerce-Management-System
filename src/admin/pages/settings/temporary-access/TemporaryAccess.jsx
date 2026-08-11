import React from 'react';
import DataTable from '../../../../components/cms/DataTable';
import { FiPlus } from 'react-icons/fi';

export default function TemporaryAccess() {
  const access = [
    { id: 'TEMP-1', staff: 'Mike Johnson', role: 'Seasonal Content Editor', start: '2023-11-01T00:00:00Z', end: '2023-12-31T23:59:59Z', status: 'Scheduled' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Temporary Access</h1>
          <p className="text-gray-500 text-sm mt-1">Manage time-bound roles and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FiPlus /> Grant Access
        </button>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={access}
          columns={[
            { key: 'staff', label: 'Staff Member', render: (val) => <span className="font-medium">{val}</span> },
            { key: 'role', label: 'Role / Permission' },
            { key: 'start', label: 'Start Date', render: (val) => new Date(val).toLocaleDateString() },
            { key: 'end', label: 'End Date', render: (val) => new Date(val).toLocaleDateString() },
            { key: 'status', label: 'Status', render: (val) => (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {val}
              </span>
            )}
          ]}
        />
      </div>
    </div>
  );
}
