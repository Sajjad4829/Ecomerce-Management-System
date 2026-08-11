import React from 'react';
import DataTable from '../../../../components/cms/DataTable';

export default function SessionManager() {
  const sessions = [
    { id: 'SESS-1', staff: 'Admin User', ip: '192.168.1.1', location: 'New York, US', device: 'Chrome on MacOS', started: '2023-10-25T09:00:00Z', status: 'Active' },
    { id: 'SESS-2', staff: 'Catalog Manager', ip: '192.168.1.5', location: 'London, UK', device: 'Safari on iOS', started: '2023-10-24T14:30:00Z', status: 'Active' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Active Sessions</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor and revoke staff sessions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={sessions}
          columns={[
            { key: 'staff', label: 'Staff Member', render: (val) => <span className="font-medium">{val}</span> },
            { key: 'device', label: 'Device / Browser' },
            { key: 'location', label: 'Location', render: (val, row) => (
              <div>
                <div>{val}</div>
                <div className="text-xs text-gray-500">{row.ip}</div>
              </div>
            )},
            { key: 'started', label: 'Started', render: (val) => new Date(val).toLocaleString() },
            { key: 'actions', label: '', render: () => (
              <button className="text-red-600 hover:underline text-sm font-medium">Revoke</button>
            )}
          ]}
        />
      </div>
    </div>
  );
}
