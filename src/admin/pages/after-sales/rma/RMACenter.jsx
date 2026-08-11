import React from 'react';
import { useAfterSales } from '../../../context/after-sales/AfterSalesContext';
import { MoreVertical } from 'lucide-react';

export default function RMACenter() {
  const { rmas } = useAfterSales();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">RMA Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Return Merchandise Authorization center</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">RMA Number</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {rmas.map(rma => (
              <tr key={rma.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{rma.id}</td>
                <td className="px-6 py-4 text-neutral-600">{rma.customerName}</td>
                <td className="px-6 py-4 text-neutral-600">{rma.productName}</td>
                <td className="px-6 py-4 text-neutral-600">{rma.type}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {rma.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{new Date(rma.date).toLocaleDateString()}</td>
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
