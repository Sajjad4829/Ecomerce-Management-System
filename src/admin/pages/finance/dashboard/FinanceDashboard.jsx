import React from 'react';
import { useFinance } from '../../../context/finance/FinanceContext';
import { DollarSign, RefreshCcw, ArrowLeftRight, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FinanceDashboard = () => {
  const { transactions, invoices, calculateSystemFinancials } = useFinance();
  const navigate = useNavigate();

  const { grossRevenue, totalRefunds, netRevenue, transactionCount } = calculateSystemFinancials();
  
  const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;
  const failedTransactions = transactions.filter(t => t.status === 'Failed').length;
  
  // Separate out refunds for display
  const refundTransactions = transactions.filter(t => t.type === 'Refund');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Finance Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Real-time overview of financial transactions and revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Net Revenue</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">${netRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" /> Derived from {transactions.length} records
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Transactions</h3>
            <div className="p-2 bg-blue-50 text-primary rounded">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">{transactionCount}</p>
          <div className="text-xs text-neutral-400 mt-2">
            {pendingTransactions} pending • {failedTransactions} failed
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Refunds</h3>
            <div className="p-2 bg-warning-soft text-warning rounded">
              <RefreshCcw className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">${totalRefunds.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="text-xs text-neutral-400 mt-2">
            {refundTransactions.length} completed refunds
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-500">Gross Revenue</h3>
            <div className="p-2 bg-primary-soft text-primary rounded">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-neutral-900">${grossRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="text-xs text-neutral-400 mt-2">
            Before refunds and discounts
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Transactions</h2>
            <button onClick={() => navigate('/admin/finance/transactions')} className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {transactions.slice(0, 5).map(txn => (
              <div key={txn.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900 flex items-center gap-2">
                    {txn.id}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${txn.type === 'Refund' ? 'bg-danger-soft text-danger' : 'bg-success-soft text-success'}`}>
                      {txn.type}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">{txn.customer} • {new Date(txn.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${txn.type === 'Refund' ? 'text-danger' : 'text-emerald-600'}`}>
                    {txn.type === 'Refund' ? '-' : '+'}${txn.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </div>
                  <div className={`text-xs font-medium mt-0.5 ${
                    txn.status === 'Completed' ? 'text-emerald-600' :
                    txn.status === 'Pending' ? 'text-warning' :
                    txn.status === 'Failed' ? 'text-danger' : 'text-neutral-500'
                  }`}>
                    {txn.status}
                  </div>
                </div>
              </div>
            ))}
            {transactions.length === 0 && <div className="p-4 text-center text-sm text-neutral-500">No transactions recorded.</div>}
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">System Integrity Alerts</h2>
          </div>
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold">Dynamic Synchronization Active</h4>
                <p className="text-xs mt-1">Financial metrics are being calculated in real-time based on the unified transaction ledger. State drift is structurally prevented.</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button onClick={() => navigate('/admin/finance/reconciliation')} className="px-4 py-2 border border-border text-text-secondary bg-background rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Run Discrepancy Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
