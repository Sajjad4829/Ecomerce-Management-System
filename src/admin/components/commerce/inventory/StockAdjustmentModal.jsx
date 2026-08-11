import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

export default function StockAdjustmentModal({ isOpen, onClose, item }) {
  const [adjustmentType, setAdjustmentType] = useState('add');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('correction');
  const [notes, setNotes] = useState('');

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-black/5 shrink-0 bg-[#F7F5F2]">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Adjust Stock</h2>
              <p className="text-sm text-gray-500 mt-1">{item.product} - {item.variant}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto">
            <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-xs font-mono font-bold text-gray-500 uppercase">Current Available</p>
                <p className="text-xl font-bold text-[#1A1A1A] mt-1">{item.onHand - item.reserved}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono font-bold text-gray-500 uppercase">Location</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{item.warehouse}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-3">Adjustment Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setAdjustmentType('add')}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold border transition-colors ${
                      adjustmentType === 'add' ? 'bg-green-50 border-green-600 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    + Add
                  </button>
                  <button 
                    onClick={() => setAdjustmentType('remove')}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold border transition-colors ${
                      adjustmentType === 'remove' ? 'bg-red-50 border-red-600 text-red-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    - Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Quantity</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-lg font-bold text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Reason</label>
                  <select 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
                  >
                    <option value="correction">Inventory Correction</option>
                    <option value="received">Received New Stock</option>
                    <option value="damaged">Damaged/Defective</option>
                    <option value="return">Customer Return</option>
                    <option value="loss">Inventory Loss</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional reference or details..."
                  className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-black/5 bg-[#F7F5F2] flex justify-end gap-3 shrink-0">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 font-medium hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
            >
              <FiCheck size={16} /> Confirm Adjustment
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
