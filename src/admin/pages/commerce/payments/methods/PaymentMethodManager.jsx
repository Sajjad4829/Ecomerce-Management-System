import { useState } from 'react';
import { FiEdit2, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const MOCK_METHODS = [
  { id: 'online', name: 'Online Payment', provider: 'stripe', type: 'Credit Card', status: 'Active', sortOrder: 1 },
  { id: 'mfs', name: 'Mobile Financial Services', provider: 'mfs_gateway', type: 'Mobile Wallet', status: 'Active', sortOrder: 2 },
  { id: 'bank_transfer', name: 'Bank Transfer', provider: 'manual', type: 'Manual', status: 'Inactive', sortOrder: 3 },
  { id: 'cod', name: 'Cash on Delivery', provider: 'cod', type: 'Offline', status: 'Active', sortOrder: 4 },
];

export default function PaymentMethodManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-sm text-gray-500 mt-1">Manage methods available to customers at checkout.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider / Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sort Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_METHODS.map((method) => (
              <tr key={method.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{method.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="font-medium text-gray-900">{method.provider}</div>
                  <div className="text-xs">{method.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{method.sortOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {method.status === 'Active' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FiCheckCircle size={12} /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <FiXCircle size={12} /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end gap-1 ml-auto">
                    <FiEdit2 size={16} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
