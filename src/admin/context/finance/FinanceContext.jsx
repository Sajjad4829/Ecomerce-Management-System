import React, { createContext, useContext, useState, useMemo } from 'react';

const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  // Core system of record for all financial movements
  const [transactions, setTransactions] = useState([
    { id: 'TXN-001', orderId: 'ORD-5001', customer: 'Eleanor Rigby', type: 'Payment', paymentMethod: 'Card', gateway: 'Stripe', amount: 1245.50, currency: 'USD', status: 'Completed', date: '2024-05-12T14:30:00Z' },
    { id: 'TXN-002', orderId: 'ORD-5002', customer: 'John Doe', type: 'Payment', paymentMethod: 'Bank Transfer', gateway: 'Manual', amount: 3450.00, currency: 'USD', status: 'Completed', date: '2024-05-11T09:15:00Z' },
    { id: 'TXN-003', orderId: 'ORD-5003', customer: 'Alice Smith', type: 'Payment', paymentMethod: 'Card', gateway: 'Stripe', amount: 890.00, currency: 'USD', status: 'Completed', date: '2024-05-10T16:45:00Z' },
    { id: 'TXN-004', orderId: 'ORD-5004', customer: 'Bob Johnson', type: 'Payment', paymentMethod: 'Card', gateway: 'Stripe', amount: 150.00, currency: 'USD', status: 'Completed', date: '2024-05-09T11:20:00Z' },
    { id: 'TXN-005', orderId: 'ORD-5004', customer: 'Bob Johnson', type: 'Refund', paymentMethod: 'Card', gateway: 'Stripe', amount: 150.00, currency: 'USD', status: 'Completed', date: '2024-05-10T10:00:00Z' },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-001', invoiceNumber: 'INV-2024-001', orderId: 'ORD-5001', customer: 'Eleanor Rigby', total: 1245.50, tax: 100, discount: 0, status: 'Paid', date: '2024-05-12', items: [] }
  ]);
  
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'PM-1', name: 'Credit Card', provider: 'Stripe', status: 'Enabled' },
    { id: 'PM-2', name: 'Bank Transfer', provider: 'Manual', status: 'Enabled' }
  ]);

  // Core functions
  const getTransaction = (id) => transactions.find(t => t.id === id);

  // Dynamic calculations for Orders to prevent state drift
  const calculateOrderFinancials = (orderId, orderGrandTotal = 0) => {
    const orderTxns = transactions.filter(t => t.orderId === orderId);
    
    let grossPaid = 0;
    let refunded = 0;

    orderTxns.forEach(txn => {
      if (txn.status === 'Completed') {
        if (txn.type === 'Payment') grossPaid += txn.amount;
        if (txn.type === 'Refund') refunded += txn.amount;
      }
    });

    const netPaid = grossPaid - refunded;
    const balanceDue = Math.max(0, orderGrandTotal - netPaid);
    
    let status = 'Pending';
    if (netPaid > 0 && balanceDue === 0) status = 'Paid';
    else if (netPaid > 0 && balanceDue > 0) status = 'Partially Paid';
    else if (netPaid === 0 && refunded > 0) status = 'Refunded';
    
    if (refunded > 0 && netPaid > 0) status = 'Partially Refunded';

    return {
      grossPaid,
      refunded,
      netPaid,
      balanceDue,
      status,
      transactions: orderTxns
    };
  };

  // System-wide calculations for Dashboard
  const calculateSystemFinancials = () => {
    let grossRevenue = 0;
    let totalRefunds = 0;

    transactions.forEach(txn => {
      if (txn.status === 'Completed') {
        if (txn.type === 'Payment') grossRevenue += txn.amount;
        if (txn.type === 'Refund') totalRefunds += txn.amount;
      }
    });

    const netRevenue = grossRevenue - totalRefunds;

    return {
      grossRevenue,
      totalRefunds,
      netRevenue,
      transactionCount: transactions.length
    };
  };

  // Safe mutation functions
  const processPaymentTransaction = (paymentData) => {
    const newTxn = {
      id: `TXN-\${Date.now()}`,
      type: 'Payment',
      status: 'Completed',
      date: new Date().toISOString(),
      ...paymentData
    };
    setTransactions(prev => [newTxn, ...prev]);
    return newTxn;
  };

  const processRefundTransaction = (refundData) => {
    // Validation Guard: Prevent refunding more than net paid
    const financials = calculateOrderFinancials(refundData.orderId, 0); // orderTotal doesn't matter for this check
    if (refundData.amount > financials.netPaid) {
      throw new Error(`Refund amount (\${refundData.amount}) exceeds net paid amount (\${financials.netPaid}) for order \${refundData.orderId}.`);
    }

    const newTxn = {
      id: `TXN-\${Date.now()}`,
      type: 'Refund',
      status: 'Completed',
      date: new Date().toISOString(),
      ...refundData
    };
    setTransactions(prev => [newTxn, ...prev]);
    return newTxn;
  };

  const contextValue = useMemo(() => ({
    transactions,
    invoices,
    paymentMethods,
    getTransaction,
    calculateOrderFinancials,
    calculateSystemFinancials,
    processPaymentTransaction,
    processRefundTransaction
  }), [transactions, invoices, paymentMethods]);

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
