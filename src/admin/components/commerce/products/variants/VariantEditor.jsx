import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiImage, FiDollarSign } from 'react-icons/fi';
import ProductStatusBadge from '../ProductStatusBadge';

export default function VariantEditor({ variant, isOpen, onClose, onSave, attributes }) {
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (variant) {
      setFormData({ ...variant });
      setActiveTab('basic');
    }
  }, [variant]);

  if (!variant || !formData) return null;

  const handleSave = () => {
    onSave(formData);
  };

  const name = formData.attributes.map(a => a.valueLabel).join(' / ');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#F7F5F2] shadow-2xl z-50 flex flex-col border-l border-stone-200"
          >
            <div className="flex items-center justify-between p-6 bg-white border-b border-stone-200 shrink-0">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">{name}</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">{formData.sku}</span>
                  <ProductStatusBadge status={formData.status} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-2"
                >
                  <FiCheck size={16} /> Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white border-b border-stone-200 px-6 shrink-0 flex gap-6 overflow-x-auto">
              {[
                { id: 'basic', label: 'Pricing & Basic' },
                { id: 'media', label: 'Variant Media' },
                { id: 'inventory', label: 'Inventory' },
                { id: 'specs', label: 'Specs Overrides' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-stone-900 text-stone-900' 
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl border border-stone-200 p-6"
                >
                  {activeTab === 'basic' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Variant Status</label>
                          <select 
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">SKU</label>
                          <input 
                            type="text" 
                            value={formData.sku}
                            onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-mono text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Barcode / UPC</label>
                          <input 
                            type="text" 
                            placeholder="Optional"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-mono text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Price ($)</label>
                          <div className="relative">
                            <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input 
                              type="number" 
                              value={formData.price}
                              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                              className="w-full pl-8 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Compare-at Price ($)</label>
                          <div className="relative">
                            <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input 
                              type="number" 
                              value={formData.compareAtPrice}
                              onChange={(e) => setFormData(prev => ({ ...prev, compareAtPrice: Number(e.target.value) }))}
                              className="w-full pl-8 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'media' && (
                    <div className="space-y-6">
                      <div className="border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 p-8 flex flex-col items-center justify-center text-center hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-400 mb-3">
                          <FiImage size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-stone-900 mb-1">Assign Variant Image</h3>
                        <p className="text-xs text-stone-500">This image will show when a customer selects this variant.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'inventory' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Available Stock</label>
                          <input 
                            type="number" 
                            value={formData.stock}
                            onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Low Stock Threshold</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 5"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-900"></div>
                          <span className="ml-3 text-sm font-bold text-stone-900">Continue selling when out of stock (Backorder)</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-4">
                      <p className="text-sm text-stone-500 mb-6">
                        Override product-level specifications for this specific variant (e.g., this specific size is heavier).
                      </p>
                      
                      {['Width', 'Weight', 'Depth'].map(spec => (
                        <div key={spec} className="flex items-center gap-4">
                          <label className="w-32 text-sm font-bold text-stone-900">{spec}</label>
                          <input 
                            type="text" 
                            placeholder="Product default..."
                            className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
