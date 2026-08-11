import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiCornerDownRight } from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export default function RuleBuilder() {
  const navigate = useNavigate();
  const { templates } = useNotification();

  const handleSave = () => {
    navigate('/admin/notifications/rules');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <Link to="/admin/notifications/rules" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
          <FiArrowLeft /> Back to Rules
        </Link>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium">
          <FiSave /> Save Rule
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Build Rule</h1>
        <p className="text-sm text-stone-500 mt-1">Configure automated triggers and target audiences.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200">
          <label className="block text-sm font-medium text-stone-700 mb-1">Rule Name</label>
          <input 
            type="text" 
            className="w-full md:w-1/2 px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none" 
            placeholder="e.g. Trigger Low Stock Alert"
          />
        </div>
        
        <div className="p-6 space-y-8 bg-stone-50/50">
          <div className="flex gap-4">
            <div className="w-20 pt-2 font-bold text-stone-400 text-sm tracking-widest uppercase">When</div>
            <div className="flex-1 bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
              <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Event Occurs</label>
              <select className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
                <option>Inventory - Quantity Changed</option>
                <option>Order - Placed</option>
                <option>Order - Cancelled</option>
                <option>Security - Suspicious Login</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-20 pt-2 font-bold text-stone-400 text-sm tracking-widest uppercase flex flex-col items-center">
              <div>If</div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg border border-stone-200 shadow-sm space-y-4">
              <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Condition is Met</label>
              <div className="flex gap-2">
                <select className="w-1/3 px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
                  <option>Quantity</option>
                  <option>Total Amount</option>
                </select>
                <select className="w-1/3 px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
                  <option>Less than</option>
                  <option>Equals</option>
                  <option>Greater than</option>
                </select>
                <input 
                  type="text"
                  className="w-1/3 px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  placeholder="Value"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-20 pt-2 font-bold text-stone-900 text-sm tracking-widest uppercase">Then</div>
            <div className="flex-1 space-y-4">
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Use Template</label>
                <select className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.channel})</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 text-stone-400 pl-4">
                <FiCornerDownRight />
              </div>
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Notify Audience</label>
                <select className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
                  <option>Inventory Manager (Role)</option>
                  <option>System Admin (Role)</option>
                  <option>Customer (Dynamic)</option>
                  <option>Specific Staff...</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
