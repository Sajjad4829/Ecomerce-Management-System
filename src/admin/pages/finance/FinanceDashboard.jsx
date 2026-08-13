import React from 'react';
import { useFinance } from '../../context/finance/FinanceContext';
import { DollarSign, ArrowUpRight, ArrowDownRight, RefreshCcw, AlertTriangle, CreditCard, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => (
  <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-').replace('-soft', '')}`} />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-success-soft text-green-800' : 'bg-danger-soft text-red-800'}`}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
      )}
    </div>
    <h3 className="text-neutral-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-serif font-semibold text-neutral-900 mt-1">{value}</p>
  </div>
);

export default function FinanceDashboard() {
  const { calculateSystemFinancials, transactions } = useFinance();
  const financials = calculateSystemFinancials();

  const pendingPayments = transactions.filter(t => t.type === 'Payment' && t.status === 'Pending').length;
  const failedPayments = transactions.filter(t => t.type === 'Payment' && t.status === 'Failed').length;
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Financial Overview</h1>
        <p className="text-sm text-neutral-500 mt-1">Monitor payments, revenue, refunds and financial transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue (Gross)" 
          value={`$\${financials.grossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={DollarSign}
          colorClass="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Net Revenue" 
          value={`$\${financials.netRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={ArrowUpRight}
          colorClass="bg-success-soft text-success"
        />
        <StatCard 
          title="Refunds Amount" 
          value={`$\${financials.totalRefunds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={RefreshCcw}
          colorClass="bg-warning-soft text-warning"
        />
        <StatCard 
          title="Total Payments" 
          value={financials.transactionCount}
          icon={CreditCard}
          colorClass="bg-indigo-50 text-indigo-600"
        />
        <StatCard 
          title="Pending Payments" 
          value={pendingPayments}
          icon={Clock}
          colorClass="bg-neutral-100 text-neutral-600"
        />
        <StatCard 
          title="Failed Payments" 
          value={failedPayments}
          icon={AlertTriangle}
          colorClass="bg-danger-soft text-danger"
        />
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
          <h3 className="font-serif text-lg text-neutral-900">Recent Transactions</h3>
          <Link to="/admin/finance/transactions" className="text-sm font-medium text-primary hover:text-indigo-900 transition-colors">
            View All
          </Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {recentTransactions.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.id}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \${
                    t.type === 'Payment' ? 'bg-success-soft text-green-800' : 
                    t.type === 'Refund' ? 'bg-warning-soft text-yellow-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {t.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  <Link to={`/admin/orders/\${t.orderId}`} className="hover:underline hover:text-primary">
                    {t.orderId}
                  </Link>
                </td>
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {t.type === 'Refund' ? '-' : ''}${Math.abs(t.amount).toFixed(2)}
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
                <td className="px-6 py-4 text-neutral-500">
                  {new Date(t.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
