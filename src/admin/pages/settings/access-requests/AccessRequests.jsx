import React from 'react';
import DataTable from '../../../../components/cms/DataTable';

export default function AccessRequests() {
  const requests = [
    { id: 'REQ-1', staff: 'Jane Smith', permission: 'catalog.products.delete', reason: 'Need to clean up obsolete products', date: '2023-10-26T10:00:00Z', status: 'Pending' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Access Requests</h1>
          <p className="text-text-muted text-sm mt-1">Manage staff requests for elevated permissions</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={requests}
          columns={[
            { key: 'staff', label: 'Staff Member', render: (val) => <span className="font-medium">{val}</span> },
            { key: 'permission', label: 'Requested Permission', render: (val) => <span className="font-mono text-xs px-2 py-1 bg-gray-100 rounded">{val}</span> },
            { key: 'reason', label: 'Reason' },
            { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
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
