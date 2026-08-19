import { createContext, useState, useContext, useEffect } from 'react';
import { useCommerce } from './CommerceContext';
import { useNavigate } from 'react-router-dom';

export const CheckoutContext = createContext(null);

const MOCK_SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Delivery', price: 0, estimatedDelivery: '5-7 Business Days', description: 'Curbside delivery' },
  { id: 'express', name: 'Express Delivery', price: 49, estimatedDelivery: '2-3 Business Days', description: 'Front door delivery' },
  { id: 'white_glove', name: 'Premium White-Glove', price: 149, estimatedDelivery: '7-10 Business Days', description: 'Room of choice, unboxing, and debris removal' }
];

export function CheckoutProvider({ children }) {
  const { cartItems, cartSubtotal, clearCart } = useCommerce();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState('information'); // information, delivery, review
  
  const [contactInfo, setContactInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    area: '',
    city: '', // District
    state: '', // Division
    zip: ''
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    area: '',
    city: '', // District
    state: '', // Division
    zip: ''
  });

  const [shippingMethod, setShippingMethod] = useState(MOCK_SHIPPING_METHODS[0]);
  const [orderNotes, setOrderNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const discount = 0; // Placeholder
  const tax = cartSubtotal * 0.08; // 8% tax placeholder
  const shippingCost = shippingMethod?.price || 0;
  const grandTotal = cartSubtotal - discount + tax + shippingCost;

  const validateStep = (step) => {
    const errors = [];
    if (step === 'information') {
      if (!contactInfo.email) errors.push('Email is required');
      if (!shippingAddress.firstName) errors.push('First Name is required');
      if (!shippingAddress.lastName) errors.push('Last Name is required');
      if (!shippingAddress.phone) errors.push('Phone Number is required');
      if (!shippingAddress.address1) errors.push('Address is required');
      if (!shippingAddress.city) errors.push('City/District is required');
      if (!shippingAddress.state) errors.push('State/Division is required');
      if (!shippingAddress.zip) errors.push('ZIP/Area Code is required');
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const nextStep = () => {
    if (currentStep === 'information' && validateStep('information')) {
      setCurrentStep('delivery');
    } else if (currentStep === 'delivery') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const prevStep = () => {
    if (currentStep === 'review') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('delivery');
    else if (currentStep === 'delivery') setCurrentStep('information');
  };

  // Synchronously constructs the payload for the Payment/Review step to use.
  const createOrderPayload = (transaction = null) => {
    const orderId = `#DF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString();

    const orderPayload = {
      id: orderId,
      createdAt,
      status: 'Pending',
      paymentStatus: transaction?.status === 'Succeeded' ? 'Paid' : 'Pending',
      fulfillmentStatus: 'Unfulfilled',
      transaction,
      date: createdAt,
      customer: contactInfo,
      customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
      email: contactInfo.email,
      items: cartItems.map(item => ({
        ...item,
        productId: item.productId || item.id
      })),
      shippingAddress,
      billingAddress: billingSameAsShipping ? shippingAddress : billingAddress,
      shippingMethod: shippingMethod?.name || 'Standard Delivery',
      total: grandTotal,
      currency: 'USD',
      totals: {
        subtotal: cartSubtotal,
        discount,
        tax,
        shipping: shippingCost,
        grandTotal
      },
      notes: orderNotes
    };

    return orderPayload;
  };

  const value = {
    currentStep,
    setCurrentStep,
    contactInfo,
    setContactInfo,
    shippingAddress,
    setShippingAddress,
    billingSameAsShipping,
    setBillingSameAsShipping,
    billingAddress,
    setBillingAddress,
    shippingMethod,
    setShippingMethod,
    orderNotes,
    setOrderNotes,
    shippingMethods: MOCK_SHIPPING_METHODS,
    nextStep,
    prevStep,
    createOrderPayload,
    validationErrors,
    isProcessing,
    setIsProcessing,
    totals: {
      subtotal: cartSubtotal,
      discount,
      tax,
      shipping: shippingCost,
      grandTotal
    }
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
