import { createContext, useState, useContext } from 'react';

export const PaymentContext = createContext(null);

export const PAYMENT_METHODS = [
  {
    id: 'online',
    name: 'Online Payment',
    description: 'Pay securely using credit/debit card.',
    provider: 'stripe'
  },
  {
    id: 'mfs',
    name: 'Mobile Financial Services',
    description: 'Pay with bKash, Nagad, etc.',
    provider: 'mfs_gateway'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Manual bank transfer.',
    provider: 'manual'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive the product.',
    provider: 'cod'
  }
];

export function PaymentProvider({ children }) {
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const [paymentStatus, setPaymentStatus] = useState('Idle'); // Idle, Processing, Succeeded, Failed
  const [transaction, setTransaction] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const selectPaymentMethod = (method) => {
    setSelectedMethod(method);
    setPaymentError(null);
  };

  const processPaymentPlaceholder = async () => {
    setPaymentStatus('Processing');
    setPaymentError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        // Mocking a response from the provider abstraction
        // In a real app, this would redirect or show a modal from the payment provider (e.g. Stripe Elements)
        setPaymentStatus('Succeeded');
        
        const txn = {
          id: `TXN-${Date.now()}`,
          provider: selectedMethod.provider,
          method: selectedMethod.id,
          amount: 0, 
          status: 'Succeeded',
          reference: 'MOCK_REF_PLACEHOLDER',
          createdAt: new Date().toISOString()
        };
        
        setTransaction(txn);
        resolve(txn);
      }, 1500);
    });
  };

  const retryPayment = () => {
    setPaymentStatus('Idle');
    setPaymentError(null);
  };

  const cancelPayment = () => {
    setPaymentStatus('Cancelled');
  };

  const resetPayment = () => {
    setPaymentStatus('Idle');
    setTransaction(null);
    setPaymentError(null);
  };

  const value = {
    selectedMethod,
    paymentStatus,
    transaction,
    paymentError,
    setPaymentStatus,
    setPaymentError,
    selectPaymentMethod,
    processPaymentPlaceholder,
    retryPayment,
    cancelPayment,
    resetPayment,
    availableMethods: PAYMENT_METHODS
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
