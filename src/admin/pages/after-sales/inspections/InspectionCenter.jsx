import React from 'react';
import { useAfterSales } from '../../../context/after-sales/AfterSalesContext';
import { MoreVertical } from 'lucide-react';

export default function InspectionCenter() {
  const { inspections } = useAfterSales();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Inspections</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage return inspections and quality checks</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Inspection ID</th>
              <th className="px-6 py-4 font-medium">Return ID</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Condition</th>
              <th className="px-6 py-4 font-medium">Inspector</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {inspections.map(ins => (
              <tr key={ins.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{ins.id}</td>
                <td className="px-6 py-4 text-neutral-600">{ins.returnId}</td>
                <td className="px-6 py-4 text-neutral-600">{ins.productName}</td>
                <td className="px-6 py-4 text-neutral-600">{ins.condition}</td>
                <td className="px-6 py-4 text-neutral-600">{ins.inspector}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {ins.status}
                  </span>
                </td>
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
