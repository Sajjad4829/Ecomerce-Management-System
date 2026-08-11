import React, { useState } from 'react';
import { useFinance } from '../../../context/finance/FinanceContext';
import { Search, Filter, ExternalLink, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InvoiceCenter = () => {
  const { invoices } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredInvoices = invoices.filter(i => 
    i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Invoices</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage customer billing and invoices</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <button className="px-3 py-2 border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>
      <div className="flex justify-end"><button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Invoice</button></div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice Number</th>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Amount*</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 text-indigo-600 hover:underline cursor-pointer">{inv.orderId}</td>
                  <td className="px-6 py-4 text-neutral-600">{inv.customer}</td>
                  <td className="px-6 py-4 text-neutral-600">{inv.date}</td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-900">
                    ${inv.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      inv.status === 'Draft' ? 'bg-neutral-100 text-neutral-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/admin/finance/invoices/${inv.id}`)}
                        className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredInvoices.length === 0 && (
           <div className="p-8 text-center text-neutral-500">
             No invoices found.
           </div>
        )}
      </div>
    </div>
  );
};
