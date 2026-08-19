import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiZap } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function FlashSaleManager() {
  const { flashSales } = usePromotion();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Flash Sales</h1>
          <p className="text-sm text-text-muted mt-1">Manage limited-time flash sales and highly discounted events.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus /> New Flash Sale
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
          <h2 className="font-bold text-text-primary">Scheduled Sales</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background border-b border-border text-text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Sale Name</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Discount</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium">Schedule</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {flashSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-background">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary flex items-center gap-2">
                      <FiZap className="text-amber-500" /> {sale.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      sale.status === 'Active' ? 'bg-success-soft text-success' :
                      sale.status === 'Scheduled' ? 'bg-warning-soft text-warning' :
                      'bg-gray-100 text-text-secondary'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {sale.discountValue}% Off
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {sale.productsCount} items
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-xs">
                    {new Date(sale.startDate).toLocaleString()} <br/>to {new Date(sale.endDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-blue-800 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {flashSales.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-text-muted">
                    No flash sales scheduled.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
