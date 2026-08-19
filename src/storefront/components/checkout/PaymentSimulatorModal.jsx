import React from 'react';
import { FiCreditCard, FiCheckCircle, FiXCircle, FiLock } from 'react-icons/fi';

export default function PaymentSimulatorModal({ isOpen, onClose, onSuccess, onFailure, payload, selectedMethod }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white p-6 text-center relative">
          <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded-full">
            <FiLock size={12} /> SECURE
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCreditCard size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-serif font-bold mb-1">Payment Gateway</h2>
          <p className="text-white/70 text-sm">Testing Environment Simulator</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-black/5 text-sm">
            <div className="flex justify-between text-gray-500 mb-2">
              <span>Payment Method:</span>
              <span className="font-bold text-[#1A1A1A] capitalize">{selectedMethod?.name || 'Online Payment'}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-2">
              <span>Customer:</span>
              <span className="font-bold text-[#1A1A1A]">{payload?.customerName}</span>
            </div>
            <div className="flex justify-between text-gray-500 pt-2 border-t border-black/5 mt-2">
              <span>Amount to Pay:</span>
              <span className="text-xl font-bold text-[#1A1A1A]">
                ${payload?.totals?.grandTotal?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center mb-6">
            You are in a simulated payment environment. No real transaction will occur. Please choose an outcome below.
          </p>

          <div className="space-y-3">
            <button 
              onClick={onSuccess}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              <FiCheckCircle size={20} /> Simulate Payment Success
            </button>
            <button 
              onClick={onFailure}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
            >
              <FiXCircle size={20} /> Simulate Payment Failure
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={onClose}
              className="text-sm font-medium text-gray-400 hover:text-gray-700 underline"
            >
              Cancel and return to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
