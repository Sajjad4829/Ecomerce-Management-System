import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFinance } from '../../../context/finance/FinanceContext';
import { ArrowLeft, RefreshCcw, CheckCircle, Clock, FileText } from 'lucide-react';

export const TransactionDetail = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { getTransaction } = useFinance();
  const txn = getTransaction(transactionId);

  if (!txn) return <div className="p-8">Transaction not found.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/finance/transactions')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-3">
            {txn.id}
            <span className={`text-sm font-sans font-medium px-2.5 py-0.5 rounded-full ${
              txn.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
              txn.status === 'Pending' ? 'bg-warning-soft text-amber-800' :
              'bg-neutral-100 text-neutral-800'
            }`}>
              {txn.status}
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Processed on {txn.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-surface rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> View Order
          </button>
          {txn.status === 'Paid' && (
            <button className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Request Refund
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900 mb-4">Transaction Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID</span>
                <span className="font-medium text-primary cursor-pointer hover:underline">{txn.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Customer</span>
                <span className="font-medium text-neutral-900">{txn.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount</span>
                <span className="font-medium text-neutral-900">${txn.amount?.toLocaleString()} {txn.currency}</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-neutral-100">
            <h3 className="font-medium text-neutral-900 mb-4">Payment Method</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Method</span>
                <span className="font-medium text-neutral-900">{txn.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Gateway</span>
                <span className="font-medium text-neutral-900">{txn.gateway}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
          <h3 className="font-medium text-neutral-900 mb-4">Financial Timeline</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            <div className="relative flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-primary shadow shrink-0">
                <Clock className="w-5 h-5"/>
              </div>
              <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                <div className="font-medium text-neutral-900 text-sm">Payment Initiated</div>
                <div className="text-xs text-neutral-500">{txn.date}</div>
              </div>
            </div>
            
            {txn.status === 'Paid' && (
              <div className="relative flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0">
                  <CheckCircle className="w-5 h-5"/>
                </div>
                <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                  <div className="font-medium text-neutral-900 text-sm">Payment Completed</div>
                  <div className="text-xs text-neutral-500">Gateway response received</div>
                </div>
              </div>
            )}
            
            {txn.status === 'Refunded' && (
              <div className="relative flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-neutral-100 text-neutral-600 shadow shrink-0">
                  <RefreshCcw className="w-5 h-5"/>
                </div>
                <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                  <div className="font-medium text-neutral-900 text-sm">Payment Refunded</div>
                  <div className="text-xs text-neutral-500">See Refunds tab for details</div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
