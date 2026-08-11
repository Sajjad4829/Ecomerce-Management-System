import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiArrowRight } from 'react-icons/fi';

export default function StockTransferModal({ isOpen, onClose, item }) {
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
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
              <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Transfer Stock</h2>
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
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl text-center">
                <p className="text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">Source</p>
                <p className="text-sm font-bold text-[#1A1A1A]">{item.warehouse}</p>
                <p className="text-xs text-green-600 mt-1">Available: {item.onHand - item.reserved}</p>
              </div>
              <FiArrowRight className="text-gray-400 shrink-0" size={24} />
              <div className="flex-1 p-4 bg-[#F7F5F2] border border-black/10 rounded-xl">
                <p className="text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">Destination</p>
                <select 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#1A1A1A] focus:outline-none"
                >
                  <option value="">Select Warehouse...</option>
                  <option value="east">East Coast Center</option>
                  <option value="eu">EU Distribution Hub</option>
                  <option value="retail_ny">New York Retail</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Quantity to Transfer</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  max={item.onHand - item.reserved}
                  className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-lg font-bold text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Transfer Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Reference number or reason..."
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
              disabled={!quantity || !destination}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCheck size={16} /> Initiate Transfer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
