import { formatCurrency } from '../../utils/formatCurrency';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCommerce } from '../../context/CommerceContext';
import { useAuth } from '../../../auth/context/AuthContext';
import { FiArrowLeft, FiUser, FiMapPin, FiPhone, FiEdit2, FiChevronDown } from 'react-icons/fi';

const DEFAULT_SHIPPING = {
  name: 'Sairu Resort',
  firstName: 'Sairu',
  lastName: 'Resort',
  email: 'sairu@resort.com',
  phone: '01323928709',
  company: 'Sairu Resort',
  streetAddress: 'Sairu Valley',
  city: 'Bandarban',
  state: 'Bandarban',
  country: 'Bangladesh',
  postalCode: '4600',
  area: 'Pakarhat',
  saveAs: 'Resort'
};

const DEFAULT_BILLING = {
  name: 'Labah Resort',
  firstName: 'Labah',
  lastName: 'Resort',
  email: 'sairu@resort.com',
  phone: '01323928709',
  company: 'Labah Resort',
  streetAddress: 'Chimbuk Road',
  city: 'Bandarban',
  state: 'Bandarban',
  country: 'Bangladesh',
  postalCode: '4600',
  saveAs: 'Resort'
};

const PROFILES_STORAGE_KEY = 'customer_address_profiles';

const SEED_PROFILES = {
  'sairu@resort.com': {
    shipping: DEFAULT_SHIPPING,
    billing: DEFAULT_BILLING,
    billingSameAsShipping: false
  }
};

const getStoredProfiles = () => {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (raw) {
      return { ...SEED_PROFILES, ...JSON.parse(raw) };
    }
  } catch (e) {}
  return { ...SEED_PROFILES };
};

const saveStoredProfiles = (profiles) => {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {}
};

const AREA_OPTIONS = [
  'Pakarhat',
  'Bandarban Sadar',
  'Chimbuk',
  'Ruma',
  'Thanchi',
  'Rowangchhari',
  'Lama',
  'Alikadam',
  'Naikhongchhari'
];

export default function CheckoutPage() {
  const { cartItems, cartSubtotal, cartTotalItems, updateQuantity, removeFromCart, clearCart } = useCommerce();
  const { user } = useAuth() || {};
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('shipping'); // 'shipping' | 'billing'
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'

  // Clean up any legacy unkeyed address caches on mount so initial load is clear
  useEffect(() => {
    try {
      localStorage.removeItem('checkout_shipping_address');
      localStorage.removeItem('checkout_billing_address');
      localStorage.removeItem('checkout_billing_same');
    } catch (e) {}
  }, []);

  // Customer email state (starts empty on initial visit, or loads logged-in customer profile if available)
  const [customerEmail, setCustomerEmail] = useState(() => {
    if (user?.email && user.role === 'Customer') {
      const allProfiles = getStoredProfiles();
      if (allProfiles[user.email.toLowerCase()]) {
        return user.email.toLowerCase();
      }
    }
    return '';
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    if (user?.email && user.role === 'Customer') {
      const allProfiles = getStoredProfiles();
      const profile = allProfiles[user.email.toLowerCase()];
      if (profile?.shipping) return profile.shipping;
    }
    // Initially clear when customer enters checkout
    return null;
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(() => {
    if (user?.email && user.role === 'Customer') {
      const allProfiles = getStoredProfiles();
      const profile = allProfiles[user.email.toLowerCase()];
      if (profile) return !!profile.billingSameAsShipping;
    }
    return false;
  });

  const [billingAddress, setBillingAddress] = useState(() => {
    if (user?.email && user.role === 'Customer') {
      const allProfiles = getStoredProfiles();
      const profile = allProfiles[user.email.toLowerCase()];
      if (profile?.billing) return profile.billing;
    }
    // Initially clear when customer enters checkout
    return null;
  });

  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    streetAddress: '',
    state: 'Bandarban',
    city: 'Bandarban',
    country: 'Bangladesh',
    postalCode: '4600',
    saveAs: '',
    area: 'Pakarhat',
    isDefaultShipping: true,
    isDefaultBilling: false
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const allProfiles = getStoredProfiles();
  const normalizedEmail = customerEmail.trim().toLowerCase();
  const hasSavedProfile = !!(
    normalizedEmail &&
    allProfiles[normalizedEmail] &&
    (allProfiles[normalizedEmail].shipping || allProfiles[normalizedEmail].billing)
  );

  const handleCustomerEmailChange = (newEmail) => {
    setCustomerEmail(newEmail);
    const trimmed = (newEmail || '').trim();

    if (!trimmed) {
      setShippingAddress(null);
      setBillingAddress(null);
      setBillingSameAsShipping(false);
      return;
    }

    const emailKey = trimmed.toLowerCase();
    const currentProfiles = getStoredProfiles();
    const profile = currentProfiles[emailKey];

    if (profile) {
      // Saved profile exists: load shipping and billing data
      setShippingAddress(profile.shipping || null);
      setBillingAddress(profile.billing || null);
      setBillingSameAsShipping(!!profile.billingSameAsShipping);
      if (profile.billingSameAsShipping) {
        setAgreed(true);
      }
    } else {
      // New Gmail: all are clear!
      setShippingAddress(null);
      setBillingAddress(null);
      setBillingSameAsShipping(false);
    }
  };

  const handleClearCustomerEmail = () => {
    setCustomerEmail('');
    setShippingAddress(null);
    setBillingAddress(null);
    setBillingSameAsShipping(false);
    setAgreed(false);
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    const parts = [];
    if (addr.streetAddress) parts.push(addr.streetAddress);
    if (addr.city) parts.push(addr.city);
    if (addr.country) parts.push(addr.country);
    return parts.length > 0 ? parts.join(', ') : 'No address provided';
  };

  const openAddressModal = (target = 'shipping', existingAddress = null) => {
    setModalTarget(target);
    if (existingAddress) {
      setModalMode('edit');
      setAddressForm({
        firstName: existingAddress.firstName || '',
        lastName: existingAddress.lastName || '',
        email: existingAddress.email || customerEmail || '',
        phone: existingAddress.phone || '',
        company: existingAddress.company || existingAddress.name || '',
        streetAddress: existingAddress.streetAddress || '',
        state: existingAddress.state || 'Bandarban',
        city: existingAddress.city || 'Bandarban',
        country: existingAddress.country || 'Bangladesh',
        postalCode: existingAddress.postalCode || '4600',
        saveAs: existingAddress.saveAs || '',
        area: existingAddress.area || 'Pakarhat',
        isDefaultShipping: target === 'shipping',
        isDefaultBilling: target === 'billing'
      });
    } else {
      setModalMode('add');
      setAddressForm({
        firstName: '',
        lastName: '',
        email: customerEmail || '',
        phone: '',
        company: '',
        streetAddress: '',
        state: 'Bandarban',
        city: 'Bandarban',
        country: 'Bangladesh',
        postalCode: '4600',
        saveAs: '',
        area: 'Pakarhat',
        isDefaultShipping: target === 'shipping',
        isDefaultBilling: target === 'billing'
      });
    }
    setIsAddressModalOpen(true);
  };

  const handleFillSample = (type = 'sairu') => {
    if (type === 'sairu') {
      const sample = modalTarget === 'shipping' ? DEFAULT_SHIPPING : DEFAULT_BILLING;
      setAddressForm({
        firstName: sample.firstName,
        lastName: sample.lastName,
        email: sample.email,
        phone: sample.phone,
        company: sample.company,
        streetAddress: sample.streetAddress,
        state: sample.state,
        city: sample.city,
        country: sample.country,
        postalCode: sample.postalCode,
        saveAs: sample.saveAs,
        area: sample.area,
        isDefaultShipping: modalTarget === 'shipping',
        isDefaultBilling: modalTarget === 'billing'
      });
    }
  };

  const handleSaveAddress = (e) => {
    if (e) e.preventDefault();

    const fullName = `${addressForm.firstName || ''} ${addressForm.lastName || ''}`.trim();
    const displayName = addressForm.company?.trim() || fullName || addressForm.name || 'Valued Customer';
    const emailToUse = (addressForm.email || customerEmail || '').trim().toLowerCase();

    const formatted = {
      ...addressForm,
      name: displayName,
      email: emailToUse,
      streetAddress: addressForm.streetAddress?.trim() || '',
      city: addressForm.city || 'Bandarban',
      country: addressForm.country || 'Bangladesh',
      state: addressForm.state || 'Bandarban',
      phone: addressForm.phone?.trim() || '',
      area: addressForm.area?.trim() || (modalTarget === 'shipping' ? (shippingAddress?.area || 'Pakarhat') : '')
    };

    if (emailToUse) {
      const currentProfiles = getStoredProfiles();
      const currentProfile = currentProfiles[emailToUse] || {};

      if (modalTarget === 'shipping' || addressForm.isDefaultShipping) {
        currentProfile.shipping = formatted;
      }
      if (modalTarget === 'billing' || addressForm.isDefaultBilling) {
        currentProfile.billing = formatted;
      }
      currentProfiles[emailToUse] = currentProfile;
      saveStoredProfiles(currentProfiles);
      setCustomerEmail(emailToUse);
    }

    if (modalTarget === 'shipping' || addressForm.isDefaultShipping) {
      setShippingAddress(formatted);
    }

    if (modalTarget === 'billing' || addressForm.isDefaultBilling) {
      setBillingAddress(formatted);
    }

    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = () => {
    const emailKey = customerEmail.trim().toLowerCase();
    const currentProfiles = getStoredProfiles();
    const currentProfile = currentProfiles[emailKey] || {};

    if (modalTarget === 'shipping') {
      setShippingAddress(null);
      if (emailKey && currentProfile.shipping) {
        delete currentProfile.shipping;
        currentProfiles[emailKey] = currentProfile;
        saveStoredProfiles(currentProfiles);
      }
    } else {
      setBillingAddress(null);
      if (emailKey && currentProfile.billing) {
        delete currentProfile.billing;
        currentProfiles[emailKey] = currentProfile;
        saveStoredProfiles(currentProfiles);
      }
    }
    setIsAddressModalOpen(false);
  };

  const deliveryCharge = 4280;
  const subTotalAmount = cartSubtotal > 0 ? cartSubtotal : 144000;
  const totalAmount = subTotalAmount + deliveryCharge;

  const displayPrice = (val) => {
    return `${Number(val || 0).toLocaleString('en-US')} BDT`;
  };

  const handleBillingSameToggle = (checked) => {
    setBillingSameAsShipping(checked);
    if (checked) {
      setAgreed(true);
    }
    const emailKey = customerEmail.trim().toLowerCase();
    if (emailKey) {
      const currentProfiles = getStoredProfiles();
      if (currentProfiles[emailKey]) {
        currentProfiles[emailKey].billingSameAsShipping = checked;
        saveStoredProfiles(currentProfiles);
      }
    }
  };

  const hasValidShipping = !!shippingAddress && !!shippingAddress.streetAddress;
  const hasValidBilling = billingSameAsShipping || (!!billingAddress && !!billingAddress.streetAddress);
  const isPlaceOrderActive = hasValidShipping && hasValidBilling && (agreed || billingSameAsShipping);

  const handleShippingAreaChange = (newArea) => {
    if (!shippingAddress) return;
    const updated = { ...shippingAddress, area: newArea };
    setShippingAddress(updated);
    const emailKey = customerEmail.trim().toLowerCase();
    if (emailKey) {
      const currentProfiles = getStoredProfiles();
      if (currentProfiles[emailKey]) {
        currentProfiles[emailKey].shipping = updated;
        saveStoredProfiles(currentProfiles);
      }
    }
  };

  const handlePlaceOrder = () => {
    if (!isPlaceOrderActive) return;
    const orderId = `DF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectiveBilling = billingSameAsShipping ? shippingAddress : billingAddress;
    const orderPayload = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      customer: {
        firstName: shippingAddress?.firstName || 'Customer',
        lastName: shippingAddress?.lastName || '',
        email: customerEmail || shippingAddress?.email || 'customer@example.com',
        phone: shippingAddress?.phone || '01323928709'
      },
      shippingAddress: {
        firstName: shippingAddress?.firstName || '',
        lastName: shippingAddress?.lastName || '',
        address1: shippingAddress?.streetAddress || '',
        area: shippingAddress?.area || 'Pakarhat',
        city: shippingAddress?.city || 'Bandarban',
        state: shippingAddress?.state || 'Bandarban',
        zip: shippingAddress?.postalCode || '4600',
        country: shippingAddress?.country || 'Bangladesh'
      },
      billingAddress: effectiveBilling ? {
        firstName: effectiveBilling.firstName || '',
        lastName: effectiveBilling.lastName || '',
        address1: effectiveBilling.streetAddress || '',
        city: effectiveBilling.city || 'Bandarban',
        state: effectiveBilling.state || 'Bandarban',
        zip: effectiveBilling.postalCode || '4600',
        country: effectiveBilling.country || 'Bangladesh'
      } : null,
      shippingMethod: 'Standard Delivery',
      deliveryCharge,
      items: cartItems,
      subtotal: subTotalAmount,
      total: totalAmount
    };
    try {
      localStorage.setItem('pending_order_payload', JSON.stringify(orderPayload));
    } catch (e) {}
    navigate('/payment/sslcommerz', { state: { payload: orderPayload } });
  };

  const dynamicAreaOptions = AREA_OPTIONS.includes(shippingAddress?.area)
    ? AREA_OPTIONS
    : shippingAddress?.area
      ? [shippingAddress.area, ...AREA_OPTIONS]
      : AREA_OPTIONS;

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-white pb-20 relative">

      {/* Top Navigation */}
      <div className="bg-white py-4 border-b border-gray-100 mb-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[13px] text-gray-500 flex gap-2">
            <Link to="/" className="hover:text-gray-800">Home</Link>
            <span>&gt;</span>
            <span className="text-[#ED1C24]">Checkout</span>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto">

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">

          {/* Left Column - Products */}
          <div className="w-full lg:w-[45%] lg:ml-7 px-4 lg:px-0">
            <div className="border border-gray-100 mb-6 bg-white">
              <div className="bg-[#f7f7f7] px-4 py-3 border-b border-gray-100">
                <h2 className="text-[15px] font-medium text-gray-700">You have ({cartTotalItems}) items in your cart</h2>
              </div>
              <div className="flex flex-col">
                {cartItems.map((item, index) => {
                  const { product, selectedVariants, variantImage, quantity, unitPrice, id } = item;
                  const imageUrl = variantImage || product?.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';
                  
                  return (
                    <div key={id} className={`flex flex-row items-start p-4 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      
                      <div className="w-[120px] h-[120px] flex-shrink-0 mr-5">
                        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between h-full min-h-[120px]">
                        <div>
                           <h3 className="text-[15px] font-bold text-gray-800 mb-1">{product.name}</h3>
                           
                           {(() => {
                             const variantParts = [];
                             if (product?.material) variantParts.push(`Material: ${product.material}`);
                             if (selectedVariants && Object.keys(selectedVariants).length > 0) {
                               Object.entries(selectedVariants).forEach(([type, option]) => {
                                 variantParts.push(`${type.charAt(0).toUpperCase() + type.slice(1)}: ${option?.name}`);
                               });
                             }
                             
                             return variantParts.length > 0 ? (
                               <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">
                                 {variantParts.join(' | ')}
                               </p>
                             ) : null;
                           })()}

                           <p className="text-[15px] text-gray-800 mb-4">
                             <span className="font-bold">Total:</span> <span className="font-bold">{formatCurrency(unitPrice * quantity)}</span>
                           </p>
                        </div>
                        
                        <div className="flex justify-between items-end mt-auto">
                           {/* Quantity Selector */}
                           <div className="flex items-center justify-center border border-gray-200 w-[100px] h-[32px]">
                             <button
                                onClick={() => updateQuantity(id, quantity - 1)}
                                disabled={quantity <= 1}
                                className="flex-1 text-gray-500 hover:bg-gray-50 h-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Decrease quantity"
                             >-</button>
                             <span className="flex-1 text-[13px] border-l border-r border-gray-200 flex items-center justify-center h-full">{quantity}</span>
                             <button
                                onClick={() => updateQuantity(id, quantity + 1)}
                                disabled={product?.stock !== undefined && quantity >= product.stock}
                                className="flex-1 text-gray-500 hover:bg-gray-50 h-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Increase quantity"
                             >+</button>
                           </div>

                           <button onClick={() => removeFromCart(id)} className="text-[#ED1C24] hover:text-[#D3161D] hover:bg-red-50 p-2 rounded-sm transition-colors border border-transparent hover:border-red-100" aria-label="Remove item">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                               <polyline points="3 6 5 6 21 6"></polyline>
                               <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                               <line x1="10" y1="11" x2="10" y2="17"></line>
                               <line x1="14" y1="11" x2="14" y2="17"></line>
                             </svg>
                           </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column - Confirm & Pay */}
          <div className="w-full lg:w-[25%] flex flex-col items-center justify-start pt-2 lg:pt-10">
            <div className="mb-3">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 16.5L11.5 19L15.5 14" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight text-center">Confirm & Pay</h1>
            <p className="text-[14px] text-gray-400 mt-1 text-center">{cartTotalItems} items</p>
          </div>

          {/* Right Column - Forms */}
          <div className="w-full lg:w-[35%] lg:mr-5 px-4 lg:px-0 ml-auto">
            <div className="bg-white">

              {/* Customer Account / Email */}
              <div className="border border-gray-100 p-5 mb-5 shadow-sm rounded-[2px] bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-medium text-gray-800">Customer Email</h3>
                  {customerEmail && (
                    <button
                      type="button"
                      onClick={handleClearCustomerEmail}
                      className="text-[12px] text-[#ED1C24] hover:underline font-medium cursor-pointer"
                    >
                      Clear / New Gmail
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">
                    Email Address <span className="text-[#ED1C24]">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => handleCustomerEmailChange(e.target.value)}
                    placeholder="Enter email (e.g. sairu@resort.com or new gmail)"
                    className="w-full bg-[#f4f5f7] border border-transparent hover:border-gray-200 focus:bg-white focus:border-gray-300 text-gray-800 text-[13.5px] px-3.5 py-2.5 rounded-[2px] focus:outline-none transition-colors"
                  />
                  {customerEmail ? (
                    hasSavedProfile ? (
                      <p className="text-[12px] text-emerald-600 mt-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Saved address loaded for <strong>{customerEmail}</strong></span>
                      </p>
                    ) : (
                      <p className="text-[12px] text-gray-500 mt-2">
                        New gmail detected — no saved address. Click <strong>Add New Address</strong> below.
                      </p>
                    )
                  ) : (
                    <div className="flex items-center justify-between mt-2 pt-0.5">
                      <p className="text-[12px] text-gray-400">
                        Enter your email to load saved address or add new below.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCustomerEmailChange('sairu@resort.com')}
                        className="text-[12px] text-[#4F46E5] hover:underline font-medium whitespace-nowrap ml-2 cursor-pointer"
                      >
                        Sample: sairu@resort.com
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="border border-gray-100 p-5 mb-5 shadow-sm rounded-[2px] bg-white">
                <h3 className="text-[15px] font-medium text-gray-800 mb-4">Shipping Information</h3>
                
                {shippingAddress ? (
                  <div>
                    {/* Recipient Name Row with Edit Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FiUser className="w-[18px] h-[18px] text-gray-500 stroke-[1.75] flex-shrink-0" />
                        <span className="text-[14px] text-gray-800 font-normal">
                          {shippingAddress.name || `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim() || 'Valued Customer'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openAddressModal('shipping', shippingAddress)}
                        className="text-gray-700 hover:text-black p-1 transition-colors cursor-pointer"
                        title="Edit shipping address"
                        aria-label="Edit shipping address"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Address Row */}
                    <div className="flex items-start gap-3 mb-3">
                      <FiMapPin className="w-[18px] h-[18px] text-gray-500 stroke-[1.75] mt-0.5 flex-shrink-0" />
                      <span className="text-[14px] text-gray-700 leading-snug">
                        {formatAddress(shippingAddress)}
                      </span>
                    </div>

                    {/* Phone Row */}
                    <div className="flex items-center gap-3">
                      <FiPhone className="w-[18px] h-[18px] text-gray-500 stroke-[1.75] flex-shrink-0" />
                      <span className="text-[14px] text-gray-700">
                        {shippingAddress.phone || '01323928709'}
                      </span>
                    </div>

                    {/* Area Select Dropdown */}
                    <div className="relative mt-4">
                      <select
                        value={shippingAddress.area || 'Pakarhat'}
                        onChange={(e) => handleShippingAreaChange(e.target.value)}
                        className="w-full bg-[#f4f5f7] border border-transparent hover:border-gray-200 text-gray-700 text-[13.5px] px-3.5 py-2.5 rounded-[2px] appearance-none focus:outline-none cursor-pointer pr-10 transition-colors"
                      >
                        {dynamicAreaOptions.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[13px] text-gray-400 mb-3">No shipping address added yet.</p>
                    <button
                      type="button"
                      onClick={() => openAddressModal('shipping')}
                      className="px-5 py-2 bg-white border border-[#ED1C24] text-[#ED1C24] text-[13px] font-medium hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Add New Address
                    </button>
                  </div>
                )}
              </div>

              {/* Billing Information */}
              <div className="border border-gray-100 p-5 mb-5 shadow-sm rounded-[2px] bg-white">
                <h3 className="text-[15px] font-medium text-gray-800 mb-4">Billing Information</h3>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => handleBillingSameToggle(!billingSameAsShipping)}
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors flex-shrink-0 ${
                      billingSameAsShipping ? 'bg-[#ED1C24] border border-[#ED1C24]' : 'bg-white border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {billingSameAsShipping && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 10" fill="none">
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13.5px] text-gray-700">Billing is same as shipping address</span>
                </label>

                {!billingSameAsShipping && (
                  <div className="mt-4 pt-1">
                    {billingAddress ? (
                      <div>
                        {/* Recipient Name Row with Edit Icon */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <FiUser className="w-[18px] h-[18px] text-gray-500 stroke-[1.75] flex-shrink-0" />
                            <span className="text-[14px] text-gray-800 font-normal">
                              {billingAddress.name || `${billingAddress.firstName || ''} ${billingAddress.lastName || ''}`.trim() || 'Valued Customer'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => openAddressModal('billing', billingAddress)}
                            className="text-gray-700 hover:text-black p-1 transition-colors cursor-pointer"
                            title="Edit billing address"
                            aria-label="Edit billing address"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Address Row */}
                        <div className="flex items-start gap-3 mb-3">
                          <FiMapPin className="w-[18px] h-[18px] text-gray-500 stroke-[1.75] mt-0.5 flex-shrink-0" />
                          <span className="text-[14px] text-gray-700 leading-snug">
                            {formatAddress(billingAddress)}
                          </span>
                        </div>

                        {/* Phone Row */}
                        <div className="flex items-center gap-3">
                          <FiPhone className="w-[18px] h-[18px] text-gray-500 stroke-[1.75] flex-shrink-0" />
                          <span className="text-[14px] text-gray-700">
                            {billingAddress.phone || '01323928709'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[13px] text-gray-400 mb-3">No billing address added yet.</p>
                        <button
                          type="button"
                          onClick={() => openAddressModal('billing')}
                          className="px-5 py-2 bg-white border border-[#ED1C24] text-[#ED1C24] text-[13px] font-medium hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Add New Address
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="border border-gray-100 p-5 mb-5 shadow-sm rounded-[2px] bg-white">
                <h3 className="text-[15px] font-medium text-gray-800 mb-4">Payment</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="payment_method" defaultChecked className="w-4 h-4 mt-0.5 border-gray-300 text-[#0066FF] focus:ring-[#0066FF] cursor-pointer" />
                  <div>
                    <span className="block text-[14px] text-gray-800 mb-1.5">Credit Card/Debit Card</span>
                    <span className="block text-[12px] text-gray-500 leading-relaxed max-w-sm">All valid VISA/Master/AMEX Credit Cards, Debit Cards and renowned MFS from recognized Banks are accepted.</span>
                  </div>
                </label>
              </div>

              {/* Totals */}
              <div className="pt-2 mb-8 border-t border-gray-100 mt-6">
                <div className="flex justify-between items-center text-[13.5px] text-gray-700 mb-3.5 mt-4">
                  <span>Sub Total</span>
                  <span className="font-normal">{displayPrice(subTotalAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-[13.5px] text-gray-700 mb-3.5">
                  <span>Delivery Charge</span>
                  <span className="font-normal">{displayPrice(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between items-center text-[14.5px] font-bold text-gray-900 mb-5">
                  <span>Total</span>
                  <span className="font-bold">{displayPrice(totalAmount)}</span>
                </div>
                <label className="flex items-center gap-2.5 text-[13.5px] text-gray-700 cursor-pointer select-none">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors flex-shrink-0 ${
                      agreed ? 'bg-[#ED1C24] border border-[#ED1C24]' : 'bg-white border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {agreed && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 10" fill="none">
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span>Agree to <span className="text-[#ED1C24] hover:underline">Terms & Conditions</span></span>
                </label>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6">
                <Link to="/cart" className="flex items-center gap-2 text-[#ED1C24] text-[13.5px] font-medium hover:underline">
                  <FiArrowLeft size={16} className="text-[#ED1C24]" /> Back to Cart
                </Link>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!isPlaceOrderActive}
                  className={`px-6 py-2.5 border text-[13px] font-medium rounded-none transition-colors ${
                    isPlaceOrderActive
                      ? 'bg-white border-[#ED1C24] text-[#ED1C24] hover:bg-red-50 cursor-pointer shadow-none'
                      : 'bg-white border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Place Your Order
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Address Modal Popup */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-3xl rounded-[2px] relative shadow-2xl flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-[18px] font-bold text-gray-700">
                {modalMode === 'edit'
                  ? `Edit ${modalTarget === 'shipping' ? 'Shipping' : 'Billing'} Address`
                  : `Add New ${modalTarget === 'shipping' ? 'Shipping' : 'Billing'} Address`}
              </h2>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white p-1 rounded-sm transition-colors"
                title="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSaveAddress} className="p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <span className="text-[12.5px] text-gray-500">
                  {modalMode === 'edit' ? 'Update address fields below:' : 'Enter customer address fields below:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleFillSample('sairu')}
                  className="text-[12px] text-[#4F46E5] hover:underline font-medium bg-indigo-50 px-2.5 py-1 rounded cursor-pointer"
                >
                  + Fill Sample Data ({modalTarget === 'shipping' ? 'Sairu Resort' : 'Labah Resort'})
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                {/* First Name & Last Name */}
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">First Name <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="text"
                    required
                    value={addressForm.firstName}
                    onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Last Name <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="text"
                    required
                    value={addressForm.lastName}
                    onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* Email & Phone Number */}
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Email <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="email"
                    required
                    value={addressForm.email}
                    onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Phone Number <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* Company & Street Address */}
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Company / Resort Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sairu Resort"
                    value={addressForm.company}
                    onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Street Address <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sairu Valley"
                    value={addressForm.streetAddress}
                    onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* State/Province & City */}
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">State/Province/Division <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">City / District <span className="text-[#ED1C24]">*</span></label>
                  <select
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400 bg-white"
                  >
                    <option value="Bandarban">Bandarban</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Cox's Bazar">Cox's Bazar</option>
                    <option value="Jamalpur">Jamalpur</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Dinajpur">Dinajpur</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Comilla">Comilla</option>
                  </select>
                </div>

                {/* Country & Postal Code */}
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Country <span className="text-[#ED1C24]">*</span></label>
                  <select
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400 bg-white"
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Postal Code <span className="text-[#ED1C24]">*</span></label>
                  <input
                    type="text"
                    required
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* Area & Save As */}
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Area / Thana / Upazila</label>
                  <input
                    type="text"
                    placeholder="e.g. Pakarhat"
                    value={addressForm.area}
                    onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-600 mb-1.5">Save As (e.g. Home, Work, Resort)</label>
                  <input
                    type="text"
                    placeholder="e.g. Resort"
                    value={addressForm.saveAs}
                    onChange={(e) => setAddressForm({ ...addressForm, saveAs: e.target.value })}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* Default Shipping Checkbox */}
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefaultShipping}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefaultShipping: e.target.checked })}
                      className="w-4 h-4 rounded-sm border-gray-300 text-[#4F46E5] focus:ring-0 cursor-pointer"
                    />
                    Use as my default shipping address
                  </label>
                </div>

                {/* Default Billing Checkbox */}
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefaultBilling}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefaultBilling: e.target.checked })}
                      className="w-4 h-4 rounded-sm border-gray-300 text-[#4F46E5] focus:ring-0 cursor-pointer"
                    />
                    Use as my default billing address
                  </label>
                </div>

              </div>

              {/* Footer */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                {modalMode === 'edit' ? (
                  <button
                    type="button"
                    onClick={handleDeleteAddress}
                    className="text-red-500 hover:text-red-700 text-[13px] font-medium transition-colors"
                  >
                    Remove address
                  </button>
                ) : (
                  <div></div>
                )}
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(false)}
                    className="px-6 py-2 bg-[#999999] hover:bg-[#888888] text-white text-[13px] font-medium rounded-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[13px] font-medium rounded-sm transition-colors shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

