import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCopy, FiCheck, FiUser, FiCreditCard, FiSmartphone, FiHome, FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';

export default function SSLCommerzGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCommerce();

  // Retrieve passed payload or fallback to pending_order_payload / sample
  const [payload, setPayload] = useState(() => {
    if (location.state?.payload) return location.state.payload;
    try {
      const saved = localStorage.getItem('pending_order_payload');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: '#DF-2026-8815',
      total: 148280,
      subtotal: 144000,
      deliveryCharge: 4280,
      customer: { firstName: 'Sairu', lastName: 'Resort', phone: '01323928709' }
    };
  });

  const [activeTab, setActiveTab] = useState('mobile'); // 'card' | 'mobile' | 'netbanking'
  const [selectedProvider, setSelectedProvider] = useState('bkash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpNumber, setOtpNumber] = useState('');
  const [pinNumber, setPinNumber] = useState('');
  const [otpStep, setOtpStep] = useState('phone'); // 'phone' | 'otp' | 'pin'

  // Live 10-minute countdown timer matching screenshot 09:39
  const [secondsLeft, setSecondsLeft] = useState(579); // 09:39 = 579 seconds

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const rawTotal = payload?.total || 148280;
  const formattedTotal = Number(rawTotal).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const trxId = '2eb230e86c86f58f42d009ee00d9a64408a78f10';
  const trxIdShort = '2eb230e86c86f58f42d0...';

  const handleCopyTrxId = () => {
    navigator.clipboard?.writeText(trxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedPayment = () => {
    setShowOtpModal(true);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (clearCart) clearCart();
      const orderId = payload?.id || `DF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const completedOrder = {
        ...payload,
        id: orderId,
        paymentStatus: 'Paid',
        gateway: 'SSLCOMMERZ',
        trxId,
        paymentMethod: selectedProvider.toUpperCase(),
        paidAt: new Date().toISOString()
      };
      navigate(`/order-confirmation/${orderId}`, { state: { payload: completedOrder } });
    }, 1200);
  };

  // 12 Mobile Banking Providers matching the screenshot
  const mobileProviders = [
    {
      id: 'bkash',
      name: 'bKash',
      color: '#E2136E',
      logo: (
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-[#E2136E]" viewBox="0 0 40 40" fill="currentColor">
            <path d="M22 6l-9 15 13-3-4-12zm-3 16l-8-2-4 12 12-10zm5-1l7 12 5-16-12 4z" />
          </svg>
          <span className="font-extrabold text-[15px] tracking-tight text-[#E2136E]">bKash</span>
        </div>
      )
    },
    {
      id: 'rocket',
      name: 'Rocket',
      color: '#8C3494',
      logo: (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#8C3494]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.5s-4 4-4 9c0 3 1.5 5 4 8 2.5-3 4-5 4-8 0-5-4-9-4-9zm-1 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
            </svg>
            <span className="font-extrabold text-[13.5px] text-[#8C3494] tracking-tighter">রকেট</span>
          </div>
        </div>
      )
    },
    {
      id: 'nagad',
      name: 'Nagad',
      color: '#F35B25',
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#F35B25] to-[#FDB813] flex items-center justify-center text-white text-[8px] font-bold">
            ন
          </div>
          <span className="font-extrabold text-[15px] text-[#F35B25] tracking-tight">নগদ</span>
        </div>
      )
    },
    {
      id: 'upay',
      name: 'Upay',
      color: '#003B73',
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded-full bg-[#F8A01B] border-2 border-[#003B73]"></div>
          <span className="font-black text-[14px] text-[#003B73] tracking-tighter">উপায়</span>
        </div>
      )
    },
    {
      id: 'cellfin',
      name: 'Cellfin',
      color: '#008744',
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-sm bg-[#008744] flex items-center justify-center text-white text-[9px] font-bold">
            C
          </div>
          <span className="font-bold text-[13px] text-[#008744]">Cell<span className="text-gray-800">fin</span></span>
        </div>
      )
    },
    {
      id: 'mcash',
      name: 'MCash',
      color: '#0B7539',
      logo: (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded bg-[#0B7539] flex flex-col items-center justify-center text-white leading-none">
            <span className="text-[12px] font-black text-[#FDB813]">M</span>
            <span className="text-[6.5px] tracking-tighter">cash</span>
          </div>
        </div>
      )
    },
    {
      id: 'cashbaba',
      name: 'cashbaba',
      color: '#00A3E0',
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded-full bg-[#00A3E0] flex items-center justify-center text-white text-[8px]">
            ©
          </div>
          <span className="font-bold text-[12px] text-[#00A3E0]">cash<span className="text-gray-800">baba</span></span>
        </div>
      )
    },
    {
      id: 'rainbow',
      name: 'Rainbow',
      color: '#FF4081',
      logo: (
        <div className="flex flex-col items-center">
          <div className="w-7 h-2.5 rounded-t-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 to-blue-500"></div>
          <span className="font-semibold text-[10px] text-gray-700 tracking-tight">Rainbow</span>
        </div>
      )
    },
    {
      id: 'tap',
      name: 'tap',
      color: '#E60000',
      logo: (
        <div className="w-7 h-7 rounded-full bg-[#E60000] flex items-center justify-center text-white font-black text-[12px] tracking-tighter shadow-xs">
          tap
        </div>
      )
    },
    {
      id: 'okwallet',
      name: 'OK Wallet',
      color: '#FDB813',
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-[#FDB813] flex items-center justify-center text-black font-extrabold text-[9px]">
            ok
          </div>
          <span className="font-extrabold text-[11px] text-gray-900 leading-none">wallet</span>
        </div>
      )
    },
    {
      id: 'gpay',
      name: 'GPay',
      color: '#34A853',
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
            <span className="bg-[#4285F4] rounded-2xs"></span>
            <span className="bg-[#EA4335] rounded-2xs"></span>
            <span className="bg-[#FBBC05] rounded-2xs"></span>
            <span className="bg-[#34A853] rounded-2xs"></span>
          </div>
          <span className="font-bold text-[12.5px] text-gray-800">gpay</span>
        </div>
      )
    },
    {
      id: 'rupalicash',
      name: 'Rupali Cash',
      color: '#D32F2F',
      logo: (
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full border border-red-600 flex items-center justify-center text-red-600 text-[8px]">
            🌳
          </div>
          <span className="text-[8px] font-bold text-red-700 mt-0.5">রূপালী ক্যাশ</span>
        </div>
      )
    }
  ];

  // Card Options
  const cardOptions = [
    { id: 'visa', name: 'VISA', color: '#1A1F71' },
    { id: 'mastercard', name: 'Mastercard', color: '#EB001B' },
    { id: 'amex', name: 'AMEX', color: '#006FCF' },
    { id: 'nexus', name: 'DBBL Nexus', color: '#8C3494' }
  ];

  // Net Banking Options
  const netBankingOptions = [
    { id: 'citytouch', name: 'City Touch (City Bank)', code: 'CBL' },
    { id: 'ibbl', name: 'iRecharge (Islami Bank)', code: 'IBBL' },
    { id: 'dbbl_net', name: 'DBBL Internet Banking', code: 'DBBL' },
    { id: 'brac', name: 'BRAC Bank', code: 'BRAC' },
    { id: 'mtb', name: 'MTB Internet Banking', code: 'MTB' },
    { id: 'bankasia', name: 'Bank Asia', code: 'BA' }
  ];

  return (
    <div className="min-h-screen bg-[#F1F4F8] flex flex-col justify-between py-6 sm:py-10 px-4 select-none">
      
      {/* Top Simulated Browser Banner / Notice (Optional, subtle) */}
      <div className="w-full max-w-[940px] mx-auto mb-2 flex items-center justify-between text-[11px] text-gray-400 px-2">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>pay.sslcommerz.com/{trxId}</span>
        </div>
        <span>256-Bit SSL Encrypted</span>
      </div>

      {/* Main SSLCOMMERZ Modal / Container Card */}
      <div className="w-full max-w-[940px] mx-auto bg-white rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row overflow-hidden my-auto">

        {/* LEFT COLUMN: Transaction Details & Merchant Summary */}
        <div className="w-full md:w-[48%] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 bg-white">
          <div>
            
            {/* Header: Back Arrow, Merchant Info, Countdown Timer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="text-gray-500 hover:text-gray-800 p-1 -ml-1 transition-colors"
                  title="Cancel & Return to Checkout"
                  aria-label="Back to checkout"
                >
                  <FiArrowLeft size={19} />
                </button>

                <div className="flex items-center gap-2.5">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#E51B24] flex items-center justify-center text-white font-extrabold text-[9.5px] tracking-tight shadow-xs">
                    HATIL
                  </div>
                  <div>
                    <div className="font-bold text-[14.5px] text-gray-900 leading-tight">HATIL</div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono mt-0.5">
                      <span>Trx ID: {trxIdShort}</span>
                      <button
                        type="button"
                        onClick={handleCopyTrxId}
                        className="hover:text-gray-700 p-0.5 transition-colors"
                        title="Copy Transaction ID"
                      >
                        {copied ? <FiCheck size={11} className="text-emerald-500" /> : <FiCopy size={11} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="text-[13px] text-gray-600 font-mono font-medium tracking-wide">
                {formatTimer(secondsLeft)}
              </div>
            </div>

            {/* "You are paying" Box */}
            <div className="bg-[#EBF4FE] rounded-[8px] p-4 sm:p-5 mt-6 mb-5 border border-[#DCEAF8]">
              <div className="text-[12px] text-gray-500 font-normal">You are paying</div>
              <div className="text-[26px] sm:text-[28px] font-extrabold text-gray-900 mt-1 mb-2.5 tracking-tight flex items-baseline">
                <span className="text-[24px] sm:text-[26px] mr-1">৳</span>
                <span>{formattedTotal}</span>
              </div>
              <div className="border-t border-[#D5E6F8] pt-2.5 flex items-center justify-between text-[11.5px]">
                <span className="text-gray-700 font-medium">EMI is available.</span>
                <button type="button" className="text-[#0066CC] hover:underline font-medium">
                  Participating Banks
                </button>
              </div>
            </div>

            {/* Summary Lines */}
            <div className="space-y-2.5 text-[13px] text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="text-gray-800">৳{formattedTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Convenience Charge</span>
                <span className="text-gray-800">৳0.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-[13.5px] text-gray-800">
                <span>Total amount</span>
                <span>৳{formattedTotal}</span>
              </div>
            </div>

            {/* Special Offers and Savings */}
            <div className="border-t border-gray-100 pt-5">
              <div className="font-semibold text-[13.5px] text-gray-800">Special Offers and Savings</div>
              <div className="text-[11px] text-gray-400 mt-0.5 mb-4">Automatically Applied with Eligible Payments</div>

              <div className="border-t border-gray-100 pt-6 pb-2 flex flex-col items-center justify-center text-center">
                <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                </div>
                <span className="text-[11.5px] text-gray-400">No offers available for this transaction</span>
              </div>
            </div>

          </div>

          {/* Left Column Bottom Footer */}
          <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between text-[11.5px] text-[#0066CC]">
            <div className="flex gap-4">
              <button type="button" className="hover:underline">Support</button>
              <button type="button" className="hover:underline">FAQ</button>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline">
              <FiGlobe size={13} />
              <span>English</span>
              <FiChevronDown size={11} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Tabs, Methods Grid & Pay Button */}
        <div className="w-full md:w-[52%] p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            
            {/* Top Row: Welcome & Login */}
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-gray-700 font-normal">Welcome!</span>
              <button type="button" className="text-[#0066CC] font-medium flex items-center gap-1.5 hover:underline">
                <FiUser size={13} />
                <span>Login</span>
              </button>
            </div>

            {/* 3 Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2.5 my-4">
              
              {/* Card Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`h-[48px] rounded-[6px] border flex flex-col items-center justify-center transition-all ${
                  activeTab === 'card'
                    ? 'bg-[#0073E6] border-[#0073E6] text-white shadow-xs'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiCreditCard size={15} />
                <span className="text-[11px] font-medium mt-1">Card</span>
              </button>

              {/* Mobile Banking Tab (ACTIVE by default) */}
              <button
                type="button"
                onClick={() => setActiveTab('mobile')}
                className={`h-[48px] rounded-[6px] border flex flex-col items-center justify-center transition-all ${
                  activeTab === 'mobile'
                    ? 'bg-[#0073E6] border-[#0073E6] text-white shadow-xs'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiSmartphone size={15} />
                <span className="text-[11px] font-medium mt-1">Mobile Banking</span>
              </button>

              {/* Net Banking Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`h-[48px] rounded-[6px] border flex flex-col items-center justify-center transition-all ${
                  activeTab === 'netbanking'
                    ? 'bg-[#0073E6] border-[#0073E6] text-white shadow-xs'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiHome size={15} />
                <span className="text-[11px] font-medium mt-1">Net Banking</span>
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'mobile' && (
              <div>
                <div className="text-[12.5px] text-gray-500 mb-3 font-normal">Pay with Mobile Banking</div>
                
                {/* 12 Mobile Banking Providers Grid (4 cols x 3 rows) */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {mobileProviders.map((provider) => {
                    const isSelected = selectedProvider === provider.id;
                    return (
                      <div
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider.id)}
                        className={`h-[50px] border rounded-[6px] p-1 flex items-center justify-center cursor-pointer transition-all bg-white hover:border-blue-400 relative ${
                          isSelected
                            ? 'border-2 border-[#0073E6] shadow-xs'
                            : 'border-gray-200'
                        }`}
                        title={provider.name}
                      >
                        {provider.logo}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'card' && (
              <div className="mb-6">
                <div className="text-[12.5px] text-gray-500 mb-3">Pay with Debit or Credit Card</div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {cardOptions.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedProvider(card.id)}
                      className={`h-[48px] border rounded-[6px] p-2 flex items-center justify-center font-bold text-[11px] cursor-pointer ${
                        selectedProvider === card.id ? 'border-2 border-[#0073E6]' : 'border-gray-200'
                      }`}
                    >
                      {card.name}
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="CVC / CVV"
                      className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'netbanking' && (
              <div className="mb-6">
                <div className="text-[12.5px] text-gray-500 mb-3">Select your bank</div>
                <div className="grid grid-cols-2 gap-2">
                  {netBankingOptions.map((bank) => (
                    <div
                      key={bank.id}
                      onClick={() => setSelectedProvider(bank.id)}
                      className={`h-[44px] border rounded-[6px] px-3 flex items-center justify-between text-xs cursor-pointer ${
                        selectedProvider === bank.id ? 'border-2 border-[#0073E6]' : 'border-gray-200'
                      }`}
                    >
                      <span className="truncate">{bank.name}</span>
                      <span className="text-[10px] text-gray-400 ml-1">{bank.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              onClick={handleProceedPayment}
              disabled={isProcessing}
              className={`w-full py-3 rounded-[6px] text-[14px] font-semibold transition-all ${
                selectedProvider || activeTab === 'mobile'
                  ? 'bg-[#0073E6] text-white hover:bg-[#0062C4] shadow-sm cursor-pointer'
                  : 'bg-[#C5CCD6] text-[#4B5563] cursor-pointer'
              }`}
            >
              Pay ৳{formattedTotal}
            </button>

            {/* Terms Disclaimer */}
            <p className="text-[10px] text-gray-400 text-center mt-2.5 leading-snug">
              By clicking the &quot;Pay&quot; button you agree to our{' '}
              <span className="text-[#0066CC] hover:underline cursor-pointer">Terms of Service</span> which is limited
              to facilitating your payment to HATIL.
            </p>

          </div>

          {/* Right Column Bottom Footer: SSLCOMMERZ Branding & Security Badges */}
          <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <span>Powered by</span>
              <span className="bg-[#0066CC] text-white font-black text-[9.5px] px-1.5 py-0.5 rounded tracking-tighter">
                sslcommerz
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Secured by</span>
              <div className="flex items-center gap-1">
                <span className="border border-gray-200 px-1 py-0.5 rounded text-[8px] font-bold bg-gray-50 text-gray-600">
                  PCI-DSS
                </span>
                <span className="border border-gray-200 px-1 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-700">
                  CERTIFIED
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Mobile Banking Payment Modal (e.g. bKash / Nagad PIN Simulation) */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div
              className="p-5 text-white text-center relative"
              style={{
                backgroundColor:
                  selectedProvider === 'bkash'
                    ? '#E2136E'
                    : selectedProvider === 'nagad'
                    ? '#F35B25'
                    : selectedProvider === 'rocket'
                    ? '#8C3494'
                    : '#0073E6'
              }}
            >
              <button
                onClick={() => setShowOtpModal(false)}
                className="absolute top-3 right-3 text-white/80 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
              <div className="text-2xl font-black mb-1 capitalize">{selectedProvider} Payment</div>
              <p className="text-white/80 text-xs">Merchant: HATIL</p>
              <p className="text-white font-bold text-lg mt-2">৳{formattedTotal}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {otpStep === 'phone' && (
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-gray-700">
                    Your {selectedProvider.toUpperCase()} Account Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={payload?.customer?.phone || '01323928709'}
                    placeholder="e.g. 017xxxxxxxx"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-gray-400">
                    By clicking Confirm, you will receive a verification code.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOtpStep('otp')}
                    className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded hover:bg-black transition-colors"
                  >
                    Confirm & Send Code
                  </button>
                </div>
              )}

              {otpStep === 'otp' && (
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-gray-700">
                    Enter Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    value={otpNumber}
                    onChange={(e) => setOtpNumber(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm tracking-widest text-center font-mono focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-emerald-600 font-medium">
                    Demo OTP: Enter any 6-digit number or 123456
                  </p>
                  <button
                    type="button"
                    onClick={() => setOtpStep('pin')}
                    className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded hover:bg-black transition-colors"
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {otpStep === 'pin' && (
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-gray-700">
                    Enter Your 5-digit PIN
                  </label>
                  <input
                    type="password"
                    maxLength={5}
                    value={pinNumber}
                    onChange={(e) => setPinNumber(e.target.value)}
                    placeholder="•••••"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm tracking-widest text-center font-mono focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-gray-400">
                    Demo PIN: Enter any 5-digit PIN (e.g. 12345)
                  </p>
                  <button
                    type="button"
                    onClick={handleCompletePayment}
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing Transaction...' : 'Complete Payment'}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-4 block"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Page Bottom Copyright */}
      <div className="text-center text-[11px] text-gray-400 mt-4">
        © 2026 SSLCOMMERZ Payment Gateway. All rights reserved.
      </div>

    </div>
  );
}
