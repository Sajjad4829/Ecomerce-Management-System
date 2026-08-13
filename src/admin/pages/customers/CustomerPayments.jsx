import React, { useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ExternalLink, CreditCard, ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../context/finance/FinanceContext';

export function CustomerPayments() {
  const { customer } = useOutletContext();
  const { transactions } = useFinance();

  const customerPayments = useMemo(() => {
    if (!customer) return [];
    return transactions.filter(t => 
      t.type === 'Payment' && 
      (t.customer === `${customer.firstName} ${customer.lastName}` || t.orderId === `ORD-${customer.id}`)
    );
  }, [customer, transactions]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Payment History</h3>
        <span className="text-sm text-neutral-500">
          Total Payments: {customerPayments.length}
        </span>
      </div>

      <div className="border border-neutral-200 rounded-md overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-500 font-medium uppercase tracking-wider">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-neutral-200">
            {customerPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-500">
                  No payments found for this customer.
                </td>
              </tr>
            ) : (
              customerPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-medium text-neutral-900">{payment.id}</td>
                  <td className="p-4 text-neutral-600">{new Date(payment.date).toLocaleString()}</td>
                  <td className="p-4">
                    <Link to={`/admin/orders/${payment.orderId}`} className="text-primary hover:underline">
                      {payment.orderId}
                    </Link>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-neutral-600">
                      <CreditCard className="w-4 h-4 mr-2" />
                      {payment.paymentMethod}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'Completed' ? 'bg-success-soft text-green-800' : 
                      payment.status === 'Failed' ? 'bg-error-soft text-error' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-success-700 flex items-center">
                    <ArrowDownLeft className="w-3 h-3 mr-1" />
                    ৳{payment.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
