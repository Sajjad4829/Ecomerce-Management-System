import { createContext, useState, useContext, useEffect } from 'react';
import { useCommerce } from './CommerceContext';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../admin/context/inventory/InventoryContext';
import { useOrders } from '../../admin/context/orders/OrderContext';

export const CheckoutContext = createContext(null);

const MOCK_SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Delivery', price: 0, estimatedDelivery: '5-7 Business Days', description: 'Curbside delivery' },
  { id: 'express', name: 'Express Delivery', price: 49, estimatedDelivery: '2-3 Business Days', description: 'Front door delivery' },
  { id: 'white_glove', name: 'Premium White-Glove', price: 149, estimatedDelivery: '7-10 Business Days', description: 'Room of choice, unboxing, and debris removal' }
];

export function CheckoutProvider({ children }) {
  const { cartItems, cartSubtotal, clearCart } = useCommerce();
  const navigate = useNavigate();
  const { reserveStock } = useInventory();
  const { addOrder } = useOrders();

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
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: ''
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: ''
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
      if (!shippingAddress.address1) errors.push('Address is required');
      if (!shippingAddress.city) errors.push('City is required');
      if (!shippingAddress.zip) errors.push('ZIP is required');
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

  const createOrder = async (transaction = null) => {
    setIsProcessing(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockOrder = {
      id: `ORD-2026-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      status: 'Pending',
      paymentStatus: transaction?.status === 'Succeeded' ? 'Paid' : 'Pending',
      fulfillmentStatus: 'Unfulfilled',
      transaction,
      date: new Date().toISOString(), // Changed to 'date' for Admin compatibility
      customer: contactInfo,
      customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
      email: contactInfo.email,
      items: cartItems.map(item => ({
        ...item,
        productId: item.id // Ensure we have a standard productId format
      })),
      shippingAddress,
      billingAddress: billingSameAsShipping ? shippingAddress : billingAddress,
      shippingMethod: shippingMethod?.name || 'Standard Delivery',
      total: grandTotal, // Add simple 'total' for Admin compatibility
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

    try {
      // 1. Reserve stock across necessary warehouses
      const reservedItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        sku: item.sku || `SKU-${item.id}`,
        quantity: item.quantity
      }));
      
      reserveStock(mockOrder.id, reservedItems);

      // 2. Add to global orders
      addOrder(mockOrder);

      setIsProcessing(false);
      clearCart();
      navigate(`/order-confirmation/${mockOrder.id}`, { state: { order: mockOrder } });
    } catch (error) {
      setIsProcessing(false);
      setValidationErrors([error.message || 'Failed to reserve stock. Some items may be out of stock.']);
      setCurrentStep('review'); // Bring user back to see the error
    }
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
    createOrder,
    validationErrors,
    isProcessing,
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
