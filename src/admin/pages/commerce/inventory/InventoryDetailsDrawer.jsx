import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiActivity, FiBox, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import { useInventory } from '../../../context/inventory/InventoryContext';

export default function InventoryDetailsDrawer({ isOpen, onClose, selectedItem }) {
  const { movements } = useInventory();

  const itemMovements = useMemo(() => {
    if (!selectedItem) return [];
    return movements
      .filter(m => m.productId === selectedItem.productId && m.warehouseId === selectedItem.warehouseId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [movements, selectedItem]);

  if (!isOpen || !selectedItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col border-l border-black/5"
        >
          <div className="flex items-center justify-between p-6 border-b border-black/5">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Inventory Details</h2>
              <p className="text-sm text-text-muted mt-1">{selectedItem.sku}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:bg-black/5 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Product Header */}
            <div className="flex items-start gap-4">
              {selectedItem.image ? (
                <img src={selectedItem.image} alt={selectedItem.productName} className="w-16 h-16 rounded-xl object-cover border border-black/5" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-black/5 flex items-center justify-center">
                  <FiBox className="w-6 h-6 text-text-muted" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-text-primary">{selectedItem.productName}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/5 text-text-secondary">
                    {selectedItem.category}
                  </span>
                  {selectedItem.status === 'In Stock' && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600">In Stock</span>
                  )}
                  {selectedItem.status === 'Low Stock' && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-500/10 text-orange-600">Low Stock</span>
                  )}
                  {selectedItem.status === 'Out of Stock' && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>

            {/* Current Stock Levels */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiBox className="w-4 h-4 text-text-muted" />
                Stock Levels
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background border border-black/5">
                  <div className="text-xs font-medium text-text-muted mb-1">Available</div>
                  <div className="text-2xl font-bold text-text-primary">{selectedItem.available}</div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-black/5">
                  <div className="text-xs font-medium text-text-muted mb-1">Reserved</div>
                  <div className="text-2xl font-bold text-text-primary">{selectedItem.reserved}</div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-black/5 col-span-2 flex items-center justify-between">
                  <div className="text-xs font-medium text-text-muted">Total Expected</div>
                  <div className="text-lg font-bold text-text-primary">{selectedItem.available + selectedItem.reserved}</div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-text-muted" />
                Warehouse Location
              </h4>
              <div className="p-4 rounded-xl bg-background border border-black/5">
                <div className="font-medium text-text-primary">{selectedItem.warehouseName}</div>
                <div className="text-sm text-text-muted mt-1">Warehouse ID: {selectedItem.warehouseId}</div>
              </div>
            </div>

            {/* Movement History */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiActivity className="w-4 h-4 text-text-muted" />
                Movement History
              </h4>
              <div className="space-y-4">
                {itemMovements.length > 0 ? (
                  itemMovements.map((movement, idx) => (
                    <div key={movement.id} className="relative pl-6 pb-4 last:pb-0">
                      {idx !== itemMovements.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-black/10"></div>
                      )}
                      <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-surface border-2 border-primary/20 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${movement.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      
                      <div className="bg-background rounded-xl p-4 border border-black/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-text-primary">{movement.type}</span>
                          <span className={`text-sm font-bold ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{movement.reason}</p>
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <div className="flex items-center gap-1.5">
                            <FiUser className="w-3.5 h-3.5" />
                            {movement.user}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FiClock className="w-3.5 h-3.5" />
                            {new Date(movement.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-sm text-text-muted bg-background rounded-xl border border-dashed border-black/10">
                    No movement history found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
