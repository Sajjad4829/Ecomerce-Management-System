import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiPaperclip } from 'react-icons/fi';
import { useSupport } from '../../../../admin/context/SupportContext';

export default function CustomerTicketCreation() {
  const navigate = useNavigate();
  const { createTicket } = useSupport();
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    relatedOrder: '',
    message: ''
  });

  const categories = [
    'Order Issue',
    'Product Question',
    'Payment Issue',
    'Shipping Issue',
    'Return Request',
    'Warranty',
    'General Inquiry'
  ];

  // Mock orders for dropdown
  const recentOrders = ['ORD-8492', 'ORD-8491', 'ORD-8490'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = createTicket({
      ...formData,
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      email: 'sarah.j@example.com'
    });
    navigate(`/account/support/${newId}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link to="/account/support" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <FiArrowLeft /> Back to Support
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
        <p className="text-gray-500 mt-1">Please provide details about your request so we can help you as quickly as possible.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent outline-none"
                placeholder="Brief description of your issue"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select 
                required
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent outline-none bg-white"
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Order (Optional)</label>
              <select 
                value={formData.relatedOrder}
                onChange={e => setFormData({...formData, relatedOrder: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent outline-none bg-white"
              >
                <option value="">None / Not relevant</option>
                {recentOrders.map(ord => (
                  <option key={ord} value={ord}>{ord}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea 
                required
                rows={6}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent outline-none resize-none"
                placeholder="Please describe your problem or question in detail..."
              />
            </div>

            <div className="md:col-span-2">
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <FiPaperclip className="mx-auto text-gray-400 mb-2" size={24} />
                <p className="text-sm font-medium text-gray-900">Attach files</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className="px-8 py-3 bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-black transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
