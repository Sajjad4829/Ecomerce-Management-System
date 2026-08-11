import React, { useState } from 'react';
import { useFinance } from '../../../context/finance/FinanceContext';
import { Search, Filter, ExternalLink } from 'lucide-react';

export const PayoutCenter = () => {
  const { payouts } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayouts = payouts.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.gateway.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Payouts</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage payment gateway disbursements</p>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Payouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <button className="px-3 py-2 border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Payout ID</th>
                <th className="px-6 py-4 font-medium">Gateway</th>
                <th className="px-6 py-4 font-medium">Period</th>
                <th className="px-6 py-4 font-medium text-right">Gross Amount*</th>
                <th className="px-6 py-4 font-medium text-right">Fees*</th>
                <th className="px-6 py-4 font-medium text-right">Net Amount*</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredPayouts.map((po) => (
                <tr key={po.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">{po.id}</td>
                  <td className="px-6 py-4 text-neutral-600">{po.gateway}</td>
                  <td className="px-6 py-4 text-neutral-600">{po.period}</td>
                  <td className="px-6 py-4 text-right text-neutral-600">${po.grossAmount?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-danger">-${po.fees?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-900">
                    ${po.netAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      po.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      po.status === 'Pending' ? 'bg-warning-soft text-amber-800' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-primary hover:bg-primary-soft rounded transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayouts.length === 0 && (
           <div className="p-8 text-center text-neutral-500">
             No payouts found.
           </div>
        )}
      </div>
    </div>
  );
};
