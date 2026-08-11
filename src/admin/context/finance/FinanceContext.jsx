import React, { createContext, useContext, useState, useMemo } from 'react';

const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { id: 'TXN-001', orderId: 'ORD-1001', customer: 'John Doe', type: 'Payment', paymentMethod: 'Card', gateway: 'Stripe', amount: 1500, currency: 'USD', status: 'Completed', date: '2024-05-10' },
    { id: 'TXN-002', orderId: 'ORD-1002', customer: 'Jane Smith', type: 'Payment', paymentMethod: 'Bank Transfer', gateway: 'Manual', amount: 4500, currency: 'USD', status: 'Pending', date: '2024-05-11' },
    { id: 'TXN-003', orderId: 'ORD-1003', customer: 'Bob Wilson', type: 'Refund', paymentMethod: 'Card', gateway: 'Stripe', amount: 850, currency: 'USD', status: 'Completed', date: '2024-05-09' }
  ]);

  const [payments, setPayments] = useState([
    { id: 'PAY-001', orderId: 'ORD-1001', customer: 'John Doe', amount: 1500, method: 'Card', status: 'Paid', reference: 'ref_123', date: '2024-05-10' },
    { id: 'PAY-002', orderId: 'ORD-1002', customer: 'Jane Smith', amount: 4500, method: 'Bank Transfer', status: 'Pending', reference: 'ref_124', date: '2024-05-11' }
  ]);

  const [refunds, setRefunds] = useState([
    { id: 'REF-001', orderId: 'ORD-1003', transactionId: 'TXN-003', customer: 'Bob Wilson', amount: 850, reason: 'Product Return', method: 'Card', status: 'Completed', date: '2024-05-12' }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-001', invoiceNumber: 'INV-2024-001', orderId: 'ORD-1001', customer: 'John Doe', total: 1500, tax: 150, discount: 0, status: 'Paid', date: '2024-05-10', items: [] }
  ]);
  
  const [creditNotes, setCreditNotes] = useState([
    { id: 'CN-001', invoiceId: 'INV-001', customer: 'John Doe', amount: 100, reason: 'Goodwill', status: 'Issued', date: '2024-05-15' }
  ]);
  
  const [debitNotes, setDebitNotes] = useState([
    { id: 'DN-001', invoiceId: 'INV-002', customer: 'Jane Smith', amount: 50, reason: 'Undercharged Shipping', status: 'Draft', date: '2024-05-16' }
  ]);

  const [taxRules, setTaxRules] = useState([
    { id: 'TR-001', name: 'Standard VAT', rate: 20, appliesTo: 'All Products', status: 'Active', updatedDate: '2024-01-01' },
    { id: 'TR-002', name: 'Reduced VAT', rate: 5, appliesTo: 'Essentials', status: 'Active', updatedDate: '2024-01-01' }
  ]);
  
  const [taxTransactions, setTaxTransactions] = useState([
    { id: 'TT-001', orderId: 'ORD-1001', customer: 'John Doe', taxableAmount: 1250, taxAmount: 250, taxRule: 'Standard VAT', date: '2024-05-10' }
  ]);

  const [customerBalances, setCustomerBalances] = useState([
    { id: 'CB-001', customer: 'John Doe', outstanding: 0, credits: 100, refunds: 0, adjustments: 0, status: 'Good Standing' }
  ]);

  const [adjustments, setAdjustments] = useState([
    { id: 'ADJ-001', customer: 'John Doe', type: 'Credit', amount: 50, reason: 'Service Apology', createdBy: 'Admin', status: 'Approved', date: '2024-05-12' }
  ]);

  const [reconciliations, setReconciliations] = useState([
    { id: 'REC-001', period: 'May 2024', paymentCount: 45, expectedAmount: 15000, receivedAmount: 15000, difference: 0, status: 'Matched' }
  ]);

  const [expenses, setExpenses] = useState([
    { id: 'EXP-001', category: 'Technology', amount: 2500, description: 'Software Subscriptions', status: 'Approved', date: '2024-05-01' }
  ]);

  const [accounts, setAccounts] = useState([
    { id: 'ACC-001', name: 'Sales Revenue', type: 'Revenue', code: '4000', status: 'Active' },
    { id: 'ACC-002', name: 'Software Expenses', type: 'Expense', code: '6000', status: 'Active' }
  ]);

  const [periods, setPeriods] = useState([
    { id: 'PER-001', name: 'May 2024', startDate: '2024-05-01', endDate: '2024-05-31', status: 'Open' }
  ]);
  
  const [payouts, setPayouts] = useState([
    { id: 'PO-001', gateway: 'Stripe', period: '2024-05-01 to 2024-05-07', grossAmount: 12500, fees: 375, netAmount: 12125, status: 'Completed', date: '2024-05-08' }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'PM-1', name: 'Credit Card', provider: 'Stripe', status: 'Enabled' },
    { id: 'PM-2', name: 'Bank Transfer', provider: 'Manual', status: 'Enabled' }
  ]);

  const getTransaction = (id) => transactions.find(t => t.id === id);
  const getPayment = (id) => payments.find(p => p.id === id);
  const getRefund = (id) => refunds.find(r => r.id === id);
  const getInvoice = (id) => invoices.find(i => i.id === id);
  const getReconciliation = (id) => reconciliations.find(r => r.id === id);

  const contextValue = useMemo(() => ({
    transactions,
    payments,
    refunds,
    invoices,
    creditNotes,
    debitNotes,
    taxRules,
    taxTransactions,
    customerBalances,
    adjustments,
    reconciliations,
    expenses,
    accounts,
    periods,
    payouts,
    paymentMethods,
    getTransaction,
    getPayment,
    getRefund,
    getInvoice,
    getReconciliation
  }), [transactions, payments, refunds, invoices, creditNotes, debitNotes, taxRules, taxTransactions, customerBalances, adjustments, reconciliations, expenses, accounts, periods, payouts, paymentMethods]);

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
