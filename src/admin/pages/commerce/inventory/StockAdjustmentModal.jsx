import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiInfo } from 'react-icons/fi';
import { useInventory } from '../../../context/inventory/InventoryContext';

export default function StockAdjustmentModal({ isOpen, onClose, selectedItem }) {
  const { adjustStock } = useInventory();
  const [formData, setFormData] = useState({
    adjustmentType: 'Add Stock',
    quantity: '',
    reason: 'Restock',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        adjustmentType: 'Add Stock',
        quantity: '',
        reason: 'Restock',
        notes: ''
      });
    }
  }, [isOpen]);

  if (!isOpen || !selectedItem) return null;

  const currentStock = selectedItem.available || 0;
  const quantityNum = parseInt(formData.quantity) || 0;
  
  let newStock = currentStock;
  let calculationStr = '';
  
  if (formData.adjustmentType === 'Add Stock') {
    newStock = currentStock + quantityNum;
    calculationStr = `${currentStock} + ${quantityNum} = ${newStock}`;
  } else if (formData.adjustmentType === 'Remove Stock') {
    newStock = currentStock - quantityNum;
    calculationStr = `${currentStock} - ${quantityNum} = ${newStock}`;
  } else if (formData.adjustmentType === 'Set Stock') {
    newStock = quantityNum;
    calculationStr = `${currentStock} → ${newStock}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantityNum <= 0 && formData.adjustmentType !== 'Set Stock') return;
    if (formData.adjustmentType === 'Set Stock' && quantityNum < 0) return;

    let adjustmentTypeForContext = 'Adjustment';
    let qtyForContext = quantityNum;

    if (formData.adjustmentType === 'Set Stock') {
      const diff = quantityNum - currentStock;
      if (diff === 0) return;
      adjustmentTypeForContext = diff > 0 ? 'Increase' : 'Decrease';
      qtyForContext = Math.abs(diff);
    } else if (formData.adjustmentType === 'Add Stock') {
      adjustmentTypeForContext = 'Increase';
    } else if (formData.adjustmentType === 'Remove Stock') {
      adjustmentTypeForContext = 'Decrease';
    }

    adjustStock({
      productId: selectedItem.productId,
      productName: selectedItem.productName,
      sku: selectedItem.sku,
      warehouseId: selectedItem.warehouseId,
      adjustmentType: adjustmentTypeForContext,
      quantity: qtyForContext,
      reason: formData.reason
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-black/5">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Adjust Stock</h2>
              <p className="text-sm text-text-muted mt-1">{selectedItem.productName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:bg-black/5 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-background rounded-xl border border-black/5">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">SKU</label>
                <div className="font-medium text-text-primary">{selectedItem.sku}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">Warehouse</label>
                <div className="font-medium text-text-primary">{selectedItem.warehouseName}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Adjustment Type</label>
                <select
                  value={formData.adjustmentType}
                  onChange={(e) => setFormData({ ...formData, adjustmentType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:ring-1 focus:ring-black/20 focus:border-black/20 outline-none transition-all"
                >
                  <option value="Add Stock">Add Stock</option>
                  <option value="Remove Stock">Remove Stock</option>
                  <option value="Set Stock">Set Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:ring-1 focus:ring-black/20 focus:border-black/20 outline-none transition-all"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
              <FiInfo className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary mb-1">Stock Preview</p>
                <p className="text-sm text-text-secondary font-mono bg-white/50 py-1 px-2 rounded mt-2 inline-block">
                  {calculationStr}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Reason</label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:ring-1 focus:ring-black/20 focus:border-black/20 outline-none transition-all"
              >
                <option value="Restock">Restock</option>
                <option value="Damage">Damage / Shrinkage</option>
                <option value="Return">Customer Return</option>
                <option value="Correction">Inventory Count Correction</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:ring-1 focus:ring-black/20 focus:border-black/20 outline-none transition-all resize-none"
                rows="2"
                placeholder="Additional details..."
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-black/5">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-surface rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
              >
                <FiCheck className="w-4 h-4" />
                Confirm Adjustment
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
