import { useState } from 'react';
import { FiEye, FiRefreshCw, FiCornerUpLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_TRANSACTIONS = [
  { id: 'TXN-1001', orderId: 'ORD-2026-1102', customer: 'John Doe', provider: 'stripe', method: 'online', amount: 150.00, status: 'Succeeded', createdAt: '2026-08-08T10:00:00Z' },
  { id: 'TXN-1002', orderId: 'ORD-2026-1103', customer: 'Jane Smith', provider: 'mfs_gateway', method: 'mfs', amount: 45.50, status: 'Failed', createdAt: '2026-08-08T11:30:00Z' },
  { id: 'TXN-1003', orderId: 'ORD-2026-1104', customer: 'Alice Wong', provider: 'cod', method: 'cod', amount: 89.99, status: 'Pending', createdAt: '2026-08-08T12:15:00Z' },
];

export default function TransactionManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Payment Transactions</h1>
          <p className="text-sm text-text-muted mt-1">Manage and view payment transactions across all providers.</p>
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Order / Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Provider / Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {MOCK_TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    <div className="font-medium text-text-primary">{txn.orderId}</div>
                    <div>{txn.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    <div className="font-medium text-text-primary">{txn.provider}</div>
                    <div className="uppercase text-xs">{txn.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">${txn.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      txn.status === 'Succeeded' ? 'bg-success-soft text-green-800' :
                      txn.status === 'Failed' ? 'bg-danger-soft text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/admin/payments/${txn.id}`} className="text-text-muted hover:text-text-primary transition-colors" title="View Details">
                        <FiEye size={18} />
                      </Link>
                      {txn.status === 'Failed' && (
                        <button className="text-blue-400 hover:text-primary transition-colors" title="Retry Placeholder">
                          <FiRefreshCw size={18} />
                        </button>
                      )}
                      {txn.status === 'Succeeded' && (
                        <button className="text-orange-400 hover:text-orange-600 transition-colors" title="Refund Placeholder">
                          <FiCornerUpLeft size={18} />
                        </button>
                      )}
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
