import React from 'react';
import { useReturns } from '../../../context/ReturnContext';
import { Link } from 'react-router-dom';

export default function RefundManager() {
  const { refunds } = useReturns();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Refunds</h1>
          <p className="text-sm text-text-muted mt-1">Manage and process customer refunds.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Refund ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Return Ref</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {refunds.map(ref => (
              <tr key={ref.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{ref.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary hover:underline">
                  <Link to={`/admin/returns/${ref.returnId}`}>{ref.returnId}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{ref.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">${ref.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{ref.method}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                     ref.status === 'Completed' ? 'bg-success-soft text-green-800' : 'bg-yellow-100 text-yellow-800'
                   }`}>
                     {ref.status}
                   </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-primary hover:underline">Process Placeholder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
