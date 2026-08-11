import React, { useState } from 'react';
import { useFinance } from '../../../context/finance/FinanceContext';
import { CreditCard, Plus, MoreHorizontal } from 'lucide-react';

export const PaymentMethods = () => {
  const { paymentMethods } = useFinance();
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Payment Methods</h1>
          <p className="text-sm text-neutral-500 mt-1">Configure available checkout payment options</p>
        </div>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Method
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Method Name</th>
                <th className="px-6 py-4 font-medium">Provider / Gateway</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {paymentMethods.map((pm) => (
                <tr key={pm.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900 flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-neutral-400" />
                    {pm.name}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{pm.provider}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      pm.status === 'Enabled' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {pm.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-neutral-400">Note: Actual gateway connectivity requires backend secret configuration.</p>
    </div>
  );
};
