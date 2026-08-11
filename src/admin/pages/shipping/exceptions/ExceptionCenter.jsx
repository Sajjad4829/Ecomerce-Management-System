import React from 'react';
import { useShipping } from '../../../context/shipping/ShippingContext';
import { AlertTriangle } from 'lucide-react';

export const ExceptionCenter = () => {
  const { exceptions } = useShipping();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Shipping Exceptions</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage delivery delays, damages, and issues</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Exception ID</th>
              <th className="px-6 py-4 font-medium">Shipment</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {exceptions.map((exc) => (
              <tr key={exc.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">{exc.id}</td>
                <td className="px-6 py-4 text-indigo-600 hover:underline cursor-pointer">{exc.shipmentId}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-neutral-900">{exc.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-600 truncate max-w-xs">{exc.description}</td>
                <td className="px-6 py-4 text-neutral-600">{exc.date}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {exc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
