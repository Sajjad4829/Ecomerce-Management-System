import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiCheckCircle } from 'react-icons/fi';
import { useReturns } from '../../../../admin/context/ReturnContext';

export default function NewReturnRequest() {
  const { returnReasons } = useReturns();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [reason, setReason] = useState('');
  const [resolution, setResolution] = useState('Refund');
  const [description, setDescription] = useState('');

  // Mock data for eligible orders
  const eligibleOrders = [
    { id: 'ORD-8492', date: '2026-08-01', items: [{ id: 'prod_1', name: 'Modern Leather Sofa' }] },
    { id: 'ORD-7210', date: '2026-07-15', items: [{ id: 'prod_2', name: 'Ceramic Table Lamp' }, { id: 'prod_3', name: 'Velvet Throw Pillow' }] }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <div>
        <Link to="/account/returns" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] mb-4 transition-colors">
          <FiArrowLeft /> Cancel Request
        </Link>
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Start a Return</h2>
        <p className="text-gray-500 mt-2">Follow the steps below to request a return, exchange, or replacement.</p>
      </div>

      {step < 4 && (
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`} />
        </div>
      )}

      {step === 1 && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 space-y-6">
          <h3 className="text-xl font-bold text-[#1A1A1A]">1. Select Item to Return</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Order</label>
            <select 
              value={selectedOrder} 
              onChange={(e) => setSelectedOrder(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-gray-900"
            >
              <option value="">Choose an eligible order...</option>
              {eligibleOrders.map(o => (
                <option key={o.id} value={o.id}>{o.id} (Delivered {new Date(o.date).toLocaleDateString()})</option>
              ))}
            </select>
          </div>
          
          {selectedOrder && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
              <div className="space-y-3">
                {eligibleOrders.find(o => o.id === selectedOrder)?.items.map(item => (
                  <label key={item.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedProduct === item.id ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="product" 
                      value={item.id}
                      checked={selectedProduct === item.id}
                      onChange={() => setSelectedProduct(item.id)}
                      className="w-5 h-5 text-[#1A1A1A] focus:ring-[#1A1A1A] border-gray-300"
                    />
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 text-right">
            <button 
              onClick={() => setStep(2)}
              disabled={!selectedProduct}
              className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Details
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 space-y-6">
          <h3 className="text-xl font-bold text-[#1A1A1A]">2. Return Details</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Why are you returning this?</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-gray-900"
            >
              <option value="">Select a reason...</option>
              {returnReasons.filter(r => r.customerVisible).map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Can you tell us more?</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-gray-900"
              rows="4"
              placeholder="What happened with the product?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Media (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
              <FiCamera size={32} className="mb-2" />
              <p className="font-medium text-gray-700">Click to upload photos or videos</p>
              <p className="text-sm mt-1">Helpful for damage or defect claims.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              disabled={!reason}
              className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Resolution
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 space-y-6">
          <h3 className="text-xl font-bold text-[#1A1A1A]">3. How would you like this resolved?</h3>
          
          <div className="space-y-4">
             <label className={`flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-all ${
                resolution === 'Refund' ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input 
                  type="radio" 
                  value="Refund"
                  checked={resolution === 'Refund'}
                  onChange={() => setResolution('Refund')}
                  className="w-5 h-5 mt-0.5 text-[#1A1A1A] focus:ring-[#1A1A1A] border-gray-300"
                />
                <div>
                  <span className="block font-bold text-gray-900 text-lg">Refund</span>
                  <span className="block text-gray-500 mt-1">Return the item and get money back to your original payment method.</span>
                </div>
              </label>

              <label className={`flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-all ${
                resolution === 'Exchange' ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input 
                  type="radio" 
                  value="Exchange"
                  checked={resolution === 'Exchange'}
                  onChange={() => setResolution('Exchange')}
                  className="w-5 h-5 mt-0.5 text-[#1A1A1A] focus:ring-[#1A1A1A] border-gray-300"
                />
                <div>
                  <span className="block font-bold text-gray-900 text-lg">Exchange</span>
                  <span className="block text-gray-500 mt-1">Return the item and swap it for a different color, size, or style.</span>
                </div>
              </label>

              <label className={`flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-all ${
                resolution === 'Replacement' ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input 
                  type="radio" 
                  value="Replacement"
                  checked={resolution === 'Replacement'}
                  onChange={() => setResolution('Replacement')}
                  className="w-5 h-5 mt-0.5 text-[#1A1A1A] focus:ring-[#1A1A1A] border-gray-300"
                />
                <div>
                  <span className="block font-bold text-gray-900 text-lg">Replacement</span>
                  <span className="block text-gray-500 mt-1">Receive an exact replacement for a damaged or defective item.</span>
                </div>
              </label>
          </div>

          <div className="pt-8 flex justify-between border-t border-gray-100">
            <button type="button" onClick={() => setStep(2)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-black/5 text-center space-y-6">
          <FiCheckCircle className="mx-auto text-green-500" size={64} />
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Request Submitted</h3>
            <p className="text-gray-500 mt-2 text-lg">Your return request has been sent for review.</p>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto">
            We'll review your request within 24-48 hours. If approved, we will send you instructions on how to schedule a pickup or print a shipping label.
          </p>
          <div className="pt-6">
            <button onClick={() => navigate('/account/returns')} className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors">
              View My Returns
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
