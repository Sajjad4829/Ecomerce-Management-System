import React from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Clock, RotateCcw } from 'lucide-react';
import { useFinance } from '../../context/finance/FinanceContext';

export default function PaymentStatusPanel({ order }) {
  const { calculateOrderFinancials } = useFinance();
  const financials = calculateOrderFinancials(order.id, order.total);
  const status = financials.status.toLowerCase();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'partially paid': return <Clock className="w-5 h-5 text-warning" />;
      case 'refunded': return <RotateCcw className="w-5 h-5 text-neutral-600" />;
      case 'partially refunded': return <RotateCcw className="w-5 h-5 text-neutral-500" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-danger" />;
      default: return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'paid': return 'Payment Complete';
      case 'partially paid': return 'Partially Paid';
      case 'refunded': return 'Payment Refunded';
      case 'partially refunded': return 'Partially Refunded';
      case 'failed': return 'Payment Failed';
      default: return 'Payment Pending';
    }
  };

  const latestPaymentTxn = financials.transactions.find(t => t.type === 'Payment');
  const paymentMethod = latestPaymentTxn ? latestPaymentTxn.paymentMethod : 'N/A';
  const transactionId = latestPaymentTxn ? latestPaymentTxn.id : 'N/A';
  const paymentDate = latestPaymentTxn ? new Date(latestPaymentTxn.date).toLocaleDateString() : 'N/A';

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> Payment
        </h3>
        <span className="text-sm font-medium text-neutral-900 uppercase">
          {financials.status}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="mt-0.5">
            {getStatusIcon(status)}
          </div>
          <div>
            <h4 className="font-medium text-neutral-900">{getStatusText(status)}</h4>
            <p className="text-sm text-neutral-500 mt-1">
              Gateway: {latestPaymentTxn ? latestPaymentTxn.gateway : 'N/A'}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-100 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Method</span>
            <span className="font-medium text-neutral-900">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Transaction ID</span>
            <span className="font-medium text-neutral-900">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Payment Date</span>
            <span className="font-medium text-neutral-900">{paymentDate}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-neutral-100">
            <span className="text-neutral-500">Order Total</span>
            <span className="font-medium text-neutral-900">${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Paid Amount</span>
            <span className="font-medium text-neutral-900">${financials.grossPaid.toFixed(2)}</span>
          </div>
          {financials.refunded > 0 && (
            <div className="flex justify-between text-danger">
              <span>Refunded Amount</span>
              <span className="font-medium">-${financials.refunded.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium">
            <span className="text-neutral-900">Due Amount</span>
            <span className="text-neutral-900">${financials.balanceDue.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-4 py-2 text-neutral-600 bg-surface border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium">
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
