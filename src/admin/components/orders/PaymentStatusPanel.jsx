import React from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function PaymentStatusPanel({ order }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'refunded': return <RotateCcw className="w-5 h-5 text-neutral-600" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-danger" />;
      default: return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'paid': return 'Payment Complete';
      case 'refunded': return 'Payment Refunded';
      case 'failed': return 'Payment Failed';
      default: return 'Payment Pending';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> Payment
        </h3>
        <span className="text-sm font-medium text-neutral-900 uppercase">
          {order.paymentStatus}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="mt-0.5">
            {getStatusIcon(order.paymentStatus)}
          </div>
          <div>
            <h4 className="font-medium text-neutral-900">{getStatusText(order.paymentStatus)}</h4>
            <p className="text-sm text-neutral-500 mt-1">
              Gateway: Stripe (Placeholder)
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-100 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Method</span>
            <span className="font-medium text-neutral-900">Visa ending in **** 4242</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Transaction ID</span>
            <span className="font-medium text-neutral-900">ch_1234567890</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Captured Amount</span>
            <span className="font-medium text-neutral-900">${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-4 py-2 text-neutral-600 bg-surface border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium">
            View Gateway
          </button>
          <button className="flex-1 px-4 py-2 text-danger bg-surface border border-red-200 rounded-md hover:bg-danger-soft transition-colors text-sm font-medium">
            Refund
          </button>
        </div>
      </div>
    </div>
  );
}
