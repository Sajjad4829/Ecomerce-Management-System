import React from 'react';
import { useFinance } from '../../../context/finance/FinanceContext';
import { useOrders } from '../../../context/orders/OrderContext';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Search, RefreshCw } from 'lucide-react';

export const ReconciliationCenter = () => {
  const { calculateOrderFinancials } = useFinance();
  const { orders } = useOrders();

  const discrepancies = [];

  // Run reconciliation logic across all orders
  orders.forEach(order => {
    const orderTotal = order.total || 0;
    const financials = calculateOrderFinancials(order.id, orderTotal);
    
    // Check 1: Order is fulfilled but not fully paid
    if ((order.fulfillmentStatus === 'shipped' || order.fulfillmentStatus === 'delivered') && financials.status !== 'Paid') {
      discrepancies.push({
        id: `DISC-F-00${discrepancies.length + 1}`,
        orderId: order.id,
        customer: order.customerName,
        type: 'Fulfillment Risk',
        description: `Order is marked as \${order.fulfillmentStatus} but payment status is \${financials.status}.`,
        severity: 'High',
        expected: orderTotal,
        actual: financials.netPaid
      });
    }

    // Check 2: Refund exceeds paid amount (Should be blocked by guards, but audit is good)
    if (financials.refunded > financials.grossPaid) {
      discrepancies.push({
        id: `DISC-R-00${discrepancies.length + 1}`,
        orderId: order.id,
        customer: order.customerName,
        type: 'Over-Refunded',
        description: `Refunded amount (\$\${financials.refunded.toFixed(2)}) exceeds gross paid (\$\${financials.grossPaid.toFixed(2)}).`,
        severity: 'Critical',
        expected: financials.grossPaid,
        actual: financials.refunded
      });
    }

    // Check 3: State Drift (Order manual status differs from dynamic transaction status)
    if (order.paymentStatus && order.paymentStatus.toLowerCase() === 'paid' && financials.status !== 'Paid') {
      discrepancies.push({
        id: `DISC-S-00${discrepancies.length + 1}`,
        orderId: order.id,
        customer: order.customerName,
        type: 'State Drift',
        description: `Manual order status is 'paid' but transaction ledger shows '\${financials.status}'.`,
        severity: 'Medium',
        expected: orderTotal,
        actual: financials.netPaid
      });
    }
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Payment Reconciliation</h1>
          <p className="text-sm text-neutral-500 mt-1">Cross-reference order state against the immutable transaction ledger</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
          <RefreshCw className="w-4 h-4" /> Run Full Audit
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        {discrepancies.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Alert ID</th>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {discrepancies.map(disc => (
                <tr key={disc.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium text-neutral-900">{disc.id}</td>
                  <td className="px-6 py-4 text-primary hover:underline cursor-pointer">
                    <Link to={`/admin/orders/\${disc.orderId}`}>{disc.orderId}</Link>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{disc.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold \${
                      disc.severity === 'Critical' ? 'bg-danger-soft text-danger' : 
                      disc.severity === 'High' ? 'bg-warning-soft text-warning' : 
                      'bg-blue-50 text-primary'
                    }`}>
                      {disc.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{disc.description}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/orders/\${disc.orderId}`} className="text-sm font-medium text-primary hover:underline">
                      Resolve
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-900">Ledger is Synchronized</h3>
            <p className="text-sm text-neutral-500 mt-2">No financial discrepancies detected between orders and transactions.</p>
          </div>
        )}
      </div>
    </div>
  );
};
