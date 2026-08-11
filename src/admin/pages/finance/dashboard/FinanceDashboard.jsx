import React from 'react';
import { useFinance } from '../../../context/finance/FinanceContext';
import { DollarSign, RefreshCcw, ArrowLeftRight, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FinanceDashboard = () => {
  const { transactions, refunds, invoices } = useFinance();
  const navigate = useNavigate();

  const totalRevenue = transactions.filter(t => t.status === 'Paid').reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalRefunds = refunds.filter(r => r.status === 'Completed').reduce((sum, r) => sum + (r.amount || 0), 0);
  
  const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;
  const failedTransactions = transactions.filter(t => t.status === 'Failed').length;
  
  const netRevenue = totalRevenue - totalRefunds;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Finance Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Overview of transactions, refunds, and revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Net Revenue*</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">${netRevenue.toLocaleString()}</p>
          <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" /> +12% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Transactions</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">{transactions.length}</p>
          <div className="text-xs text-neutral-400 mt-2">
            {pendingTransactions} pending • {failedTransactions} failed
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Refunds</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded">
              <RefreshCcw className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">${totalRefunds.toLocaleString()}</p>
          <div className="text-xs text-neutral-400 mt-2">
            {refunds.length} completed refunds
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Invoices</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">{invoices.length}</p>
          <div className="text-xs text-neutral-400 mt-2">
            {invoices.filter(i => i.status === 'Paid').length} paid invoices
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400">*Financial values are backend-dependent placeholders</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Transactions</h2>
            <button onClick={() => navigate('/admin/finance/transactions')} className="text-sm text-indigo-600 font-medium">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {transactions.slice(0, 5).map(txn => (
              <div key={txn.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900">{txn.id}</div>
                  <div className="text-xs text-neutral-500">{txn.customer} • {txn.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-neutral-900">${txn.amount.toLocaleString()}</div>
                  <div className={`text-xs font-medium mt-0.5 ${
                    txn.status === 'Paid' ? 'text-emerald-600' :
                    txn.status === 'Pending' ? 'text-amber-600' :
                    txn.status === 'Failed' ? 'text-red-600' : 'text-neutral-500'
                  }`}>
                    {txn.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Refunds</h2>
            <button onClick={() => navigate('/admin/finance/refunds')} className="text-sm text-indigo-600 font-medium">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {refunds.slice(0, 5).map(ref => (
              <div key={ref.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900">{ref.id}</div>
                  <div className="text-xs text-neutral-500">{ref.customer} • {ref.reason}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-neutral-900">-${ref.amount.toLocaleString()}</div>
                  <div className="text-xs font-medium text-emerald-600 mt-0.5">{ref.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
