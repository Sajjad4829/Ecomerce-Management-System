import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFinance } from '../../../context/finance/FinanceContext';
import { ArrowLeft, RefreshCcw, CheckCircle, Clock } from 'lucide-react';

export const RefundDetail = () => {
  const { refundId } = useParams();
  const navigate = useNavigate();
  const { getRefund } = useFinance();
  const ref = getRefund(refundId);

  if (!ref) return <div className="p-8">Refund not found.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/finance/refunds')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-3">
            {ref.id}
            <span className={`text-sm font-sans font-medium px-2.5 py-0.5 rounded-full ${
              ref.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
              ref.status === 'Requested' ? 'bg-warning-soft text-amber-800' :
              'bg-neutral-100 text-neutral-800'
            }`}>
              {ref.status}
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Processed on {ref.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900 mb-4">Refund Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID</span>
                <span className="font-medium text-primary cursor-pointer hover:underline">{ref.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Transaction ID</span>
                <span className="font-medium text-primary cursor-pointer hover:underline">{ref.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Customer</span>
                <span className="font-medium text-neutral-900">{ref.customer}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-100 pt-3">
                <span className="text-neutral-500">Refund Amount</span>
                <span className="font-medium text-danger">-${ref.amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-neutral-100">
            <h3 className="font-medium text-neutral-900 mb-4">Reason for Refund</h3>
            <p className="text-sm text-neutral-600">{ref.reason}</p>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
          <h3 className="font-medium text-neutral-900 mb-4">Timeline</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            <div className="relative flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-primary shadow shrink-0">
                <Clock className="w-5 h-5"/>
              </div>
              <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                <div className="font-medium text-neutral-900 text-sm">Refund Requested</div>
                <div className="text-xs text-neutral-500">{ref.date}</div>
              </div>
            </div>
            
            {ref.status === 'Completed' && (
              <div className="relative flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0">
                  <CheckCircle className="w-5 h-5"/>
                </div>
                <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                  <div className="font-medium text-neutral-900 text-sm">Refund Completed</div>
                  <div className="text-xs text-neutral-500">Funds returned to customer</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
