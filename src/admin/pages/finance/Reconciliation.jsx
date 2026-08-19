import React, { useState } from 'react';
import { useFinance } from '../../context/finance/FinanceContext';
import { useOrders } from '../../context/orders/OrderContext';
import { ShieldAlert, CheckCircle, RefreshCcw, Search, AlertTriangle, FileCheck2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Reconciliation() {
  const { transactions, calculateOrderFinancials } = useFinance();
  const { orders } = useOrders();
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(new Date().toISOString());

  // Detect discrepancies
  const discrepancies = [];

  // Logic 1: Order marked paid but no successful payment
  orders.forEach(order => {
    if (order.paymentStatus === 'paid') {
      const financials = calculateOrderFinancials(order.id, order.total);
      if (financials.netPaid < order.total) {
        discrepancies.push({
          id: `DISC-\${order.id}-1`,
          type: 'Missing Payment',
          severity: 'High',
          orderId: order.id,
          description: `Order is marked as Paid but net successful payments ($\${financials.netPaid}) is less than order total ($\${order.total}).`
        });
      }
    }
  });

  // Logic 2: Payment recorded but order not marked paid
  // Wait, we don't have order data to test this easily if we rely on FinanceContext for everything, 
  // but let's check if the calculated order financials differ from the order's paymentStatus
  orders.forEach(order => {
    const financials = calculateOrderFinancials(order.id, order.total);
    if (financials.netPaid >= order.total && order.paymentStatus !== 'paid') {
      discrepancies.push({
        id: `DISC-\${order.id}-2`,
        type: 'Status Mismatch',
        severity: 'Medium',
        orderId: order.id,
        description: `Order has enough successful payments ($\${financials.netPaid}) to be Paid, but status is '\${order.paymentStatus}'.`
      });
    }
  });

  // Logic 3: Refund amount greater than paid amount
  orders.forEach(order => {
    const financials = calculateOrderFinancials(order.id, order.total);
    if (financials.refunded > financials.grossPaid) {
      discrepancies.push({
        id: `DISC-\${order.id}-3`,
        type: 'Over Refunded',
        severity: 'Critical',
        orderId: order.id,
        description: `Refunded amount ($\${financials.refunded}) exceeds gross paid amount ($\${financials.grossPaid}).`
      });
    }
  });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScan(new Date().toISOString());
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Financial Reconciliation</h1>
          <p className="text-sm text-neutral-500 mt-1">Identify inconsistencies between recorded orders and financial transactions.</p>
        </div>
        <button 
          onClick={handleScan}
          disabled={isScanning}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 \${isScanning ? 'animate-spin' : ''}`} /> 
          {isScanning ? 'Scanning...' : 'Run Reconciliation Scan'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-success-soft rounded-lg text-success">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-neutral-500 text-sm font-medium">System Integrity</h3>
            <p className="text-2xl font-serif font-semibold text-neutral-900 mt-1">
              {discrepancies.length === 0 ? 'Optimal' : 'Issues Found'}
            </p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-lg \${discrepancies.length > 0 ? 'bg-danger-soft text-danger' : 'bg-neutral-100 text-neutral-600'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-neutral-500 text-sm font-medium">Discrepancies</h3>
            <p className="text-2xl font-serif font-semibold text-neutral-900 mt-1">{discrepancies.length}</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-neutral-500 text-sm font-medium">Last Scan</h3>
            <p className="text-sm font-medium text-neutral-900 mt-1">{new Date(lastScan).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-neutral-700" />
          <h3 className="font-serif text-lg text-neutral-900">Discrepancy Report</h3>
        </div>
        
        {discrepancies.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-success mb-4" />
            <p className="text-lg font-medium text-neutral-900">No discrepancies found.</p>
            <p className="mt-1">Order states and financial transactions are fully synchronized.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white border-b border-neutral-200 text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Severity</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Order</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {discrepancies.map(d => (
                  <tr key={d.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-neutral-900">{d.id}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \${
                        d.severity === 'Critical' ? 'bg-danger-soft text-red-800' :
                        d.severity === 'High' ? 'bg-warning-soft text-yellow-800' :
                        'bg-blue-50 text-blue-800'
                      }`}>
                        {d.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-700">{d.type}</td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/orders/\${d.orderId}`} className="text-primary hover:underline font-medium">
                        {d.orderId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 whitespace-normal min-w-[300px]">{d.description}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-indigo-900 font-medium text-xs border border-neutral-200 rounded px-3 py-1.5 hover:bg-neutral-50 transition-colors">
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
