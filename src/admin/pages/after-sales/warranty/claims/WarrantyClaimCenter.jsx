import React from 'react';
import { useAfterSales } from '../../../../context/after-sales/AfterSalesContext';
import { MoreVertical } from 'lucide-react';

export default function WarrantyClaimCenter() {
  const { warrantyClaims } = useAfterSales();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Warranty Claims</h1>
          <p className="text-sm text-neutral-500 mt-1">Review and process customer warranty claims</p>
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Claim ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Issue</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {warrantyClaims.map(wc => (
              <tr key={wc.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{wc.id}</td>
                <td className="px-6 py-4 text-neutral-600">{wc.customerName}</td>
                <td className="px-6 py-4 text-neutral-600">{wc.productName}</td>
                <td className="px-6 py-4 text-neutral-600">{wc.issue}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning-soft text-amber-800">
                    {wc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{new Date(wc.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded inline-block">
                    <MoreVertical className="w-4 h-4" />
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
