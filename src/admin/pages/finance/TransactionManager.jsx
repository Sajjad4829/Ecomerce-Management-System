import React, { useState } from 'react';
import { useFinance } from '../../context/finance/FinanceContext';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TransactionManager() {
  const { transactions } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = filterType === 'All' || t.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Transaction Management</h1>
          <p className="text-sm text-neutral-500 mt-1">View and manage all financial transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Order, or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-neutral-200 rounded-lg text-sm py-2 px-3 outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Types</option>
                <option value="Payment">Payment</option>
                <option value="Refund">Refund</option>
                <option value="Adjustment">Adjustment</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {filteredTransactions.map(t => (
                <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">{t.id}</td>
                  <td className="px-6 py-4 text-neutral-500">{new Date(t.date).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \${
                      t.type === 'Payment' ? 'bg-success-soft text-green-800' : 
                      t.type === 'Refund' ? 'bg-warning-soft text-yellow-800' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/orders/\${t.orderId}`} className="text-primary hover:underline font-medium">
                      {t.orderId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{t.customer}</td>
                  <td className="px-6 py-4 text-neutral-600">{t.paymentMethod}</td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    <div className="flex items-center gap-1">
                      {t.type === 'Refund' ? <ArrowDownRight className="w-4 h-4 text-danger" /> : <ArrowUpRight className="w-4 h-4 text-success" />}
                      ${Math.abs(t.amount).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \${
                      t.status === 'Completed' ? 'bg-success-soft text-green-800' :
                      t.status === 'Pending' ? 'bg-warning-soft text-yellow-800' :
                      'bg-danger-soft text-red-800'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/finance/transactions/\${t.id}`} className="text-primary hover:text-indigo-900 font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-neutral-500">
                    No transactions found matching your criteria.
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
