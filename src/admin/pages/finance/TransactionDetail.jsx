import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFinance } from '../../context/finance/FinanceContext';
import { ArrowLeft, CreditCard, RefreshCcw, DollarSign, Calendar, Hash, FileText } from 'lucide-react';

export default function TransactionDetail() {
  const { txnId } = useParams();
  const navigate = useNavigate();
  const { getTransaction } = useFinance();
  const transaction = getTransaction(txnId);

  if (!transaction) {
    return (
      <div className="p-8 text-center text-neutral-500">
        <p className="mb-4">Transaction not found.</p>
        <button 
          onClick={() => navigate('/admin/finance/transactions')}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors"
        >
          Back to Transactions
        </button>
      </div>
    );
  }

  const isRefund = transaction.type === 'Refund';

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      <button 
        onClick={() => navigate('/admin/finance/transactions')}
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Transactions
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-3">
            {transaction.id}
            <span className={`px-2 py-1 rounded-full text-xs font-medium \${
              transaction.status === 'Completed' ? 'bg-success-soft text-green-800' :
              transaction.status === 'Pending' ? 'bg-warning-soft text-yellow-800' :
              'bg-danger-soft text-red-800'
            }`}>
              {transaction.status}
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Processed on {new Date(transaction.date).toLocaleString()}</p>
        </div>
        <div className={`text-2xl font-serif font-bold \${isRefund ? 'text-danger' : 'text-success'}`}>
          {isRefund ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
            <h3 className="font-serif text-lg text-neutral-900">Transaction Details</h3>
          </div>
          <div className="p-6 space-y-4 text-sm">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-2"><Hash className="w-4 h-4" /> Type</span>
              <span className="font-medium text-neutral-900">{transaction.type}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Method</span>
              <span className="font-medium text-neutral-900">{transaction.paymentMethod} ({transaction.gateway})</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Currency</span>
              <span className="font-medium text-neutral-900">{transaction.currency}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Date</span>
              <span className="font-medium text-neutral-900">{new Date(transaction.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 flex items-center gap-2"><FileText className="w-4 h-4" /> Customer</span>
              <span className="font-medium text-neutral-900">{transaction.customer}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="font-serif text-lg text-neutral-900">Related Order</h3>
            </div>
            <div className="p-6 text-sm flex flex-col gap-3">
              <p className="text-neutral-600">This transaction is linked to an order.</p>
              <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium text-neutral-900">{transaction.orderId}</span>
                <Link to={`/admin/orders/\${transaction.orderId}`} className="text-primary hover:underline font-medium">
                  View Order
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="font-serif text-lg text-neutral-900">Timeline</h3>
            </div>
            <div className="p-6">
              <div className="relative pl-6 border-l-2 border-neutral-200 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-success ring-4 ring-white" />
                  <p className="text-sm font-medium text-neutral-900">Transaction Completed</p>
                  <p className="text-xs text-neutral-500 mt-1">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-neutral-300 ring-4 ring-white" />
                  <p className="text-sm font-medium text-neutral-900">Transaction Initiated</p>
                  <p className="text-xs text-neutral-500 mt-1">Before {new Date(transaction.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
