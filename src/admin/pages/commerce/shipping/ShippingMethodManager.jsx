import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { useShipping } from '../../../context/ShippingContext';

export default function ShippingMethodManager() {
  const { shippingMethods } = useShipping();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Shipping Methods</h1>
          <p className="text-sm text-text-muted mt-1">Configure shipping options presented to customers at checkout.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Add Method
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Estimated Delivery</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Base Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {shippingMethods.sort((a, b) => a.sortOrder - b.sortOrder).map(method => (
              <tr key={method.id} className="hover:bg-background">
                <td className="px-6 py-4">
                  <p className="font-medium text-text-primary">{method.name}</p>
                  <p className="text-xs text-text-muted mt-1">{method.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {method.estimatedDelivery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  ${method.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    method.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {method.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-text-muted hover:text-primary transition-colors">
                    <FiEdit2 size={16} />
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
