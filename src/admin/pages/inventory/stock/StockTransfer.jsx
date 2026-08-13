import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { ArrowLeft, ArrowRightLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function StockTransfer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { inventory, warehouses, transferStock } = useInventory();
  
  const [formData, setFormData] = useState({
    sourceWarehouseId: searchParams.get('source') || '',
    destinationWarehouseId: '',
    productId: searchParams.get('product') || '',
    quantity: 1,
    reason: 'Internal Transfer'
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Derive active warehouses
  const activeWarehouses = useMemo(() => warehouses.filter(w => w.status === 'Active'), [warehouses]);

  // Derive products available in the selected source warehouse
  const sourceProducts = useMemo(() => {
    if (!formData.sourceWarehouseId) return [];
    return inventory.filter(i => i.warehouseId === formData.sourceWarehouseId && i.available > 0);
  }, [inventory, formData.sourceWarehouseId]);

  // Selected Product Details
  const selectedProduct = useMemo(() => {
    if (!formData.productId || !formData.sourceWarehouseId) return null;
    return sourceProducts.find(p => p.productId === formData.productId);
  }, [formData.productId, formData.sourceWarehouseId, sourceProducts]);

  // Destination Product Details (to show preview)
  const destProduct = useMemo(() => {
    if (!formData.productId || !formData.destinationWarehouseId) return null;
    return inventory.find(i => i.productId === formData.productId && i.warehouseId === formData.destinationWarehouseId);
  }, [formData.productId, formData.destinationWarehouseId, inventory]);

  // Reset product if it doesn't exist in new source
  useEffect(() => {
    if (formData.sourceWarehouseId && formData.productId) {
      const exists = sourceProducts.some(p => p.productId === formData.productId);
      if (!exists) {
        setFormData(prev => ({ ...prev, productId: '' }));
      }
    }
  }, [formData.sourceWarehouseId, sourceProducts]);

  const validateTransfer = () => {
    if (!formData.sourceWarehouseId) return "Please select a source warehouse.";
    if (!formData.destinationWarehouseId) return "Please select a destination warehouse.";
    if (formData.sourceWarehouseId === formData.destinationWarehouseId) return "Source and destination warehouses cannot be the same.";
    if (!formData.productId) return "Please select a product to transfer.";
    
    const qty = parseInt(formData.quantity, 10);
    if (isNaN(qty) || qty <= 0) return "Transfer quantity must be greater than zero.";
    if (!selectedProduct) return "Selected product is not available in the source warehouse.";
    if (qty > selectedProduct.available) return `Insufficient stock. Only ${selectedProduct.available} units are available.`;
    
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateTransfer();
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);

    transferStock({
      productId: selectedProduct.productId,
      productName: selectedProduct.productName,
      sku: selectedProduct.sku,
      variant: selectedProduct.variant,
      sourceWarehouseId: formData.sourceWarehouseId,
      destinationWarehouseId: formData.destinationWarehouseId,
      quantity: parseInt(formData.quantity, 10),
      reason: formData.reason
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/admin/inventory/movements');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/inventory/warehouses')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Stock Transfer</h1>
          <p className="text-sm text-neutral-500 mt-1">Move inventory securely between warehouse locations</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center text-success">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-serif text-neutral-900">Transfer Successful</h2>
              <p className="text-neutral-500 mt-2">Redirecting to movement history...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {error && (
              <div className="p-4 bg-danger/10 text-danger-dark rounded-lg flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
              {/* Source */}
              <div className="space-y-6 p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                <h3 className="font-medium text-neutral-900 flex items-center gap-2">
                  Source
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">From Warehouse</label>
                    <select
                      value={formData.sourceWarehouseId}
                      onChange={(e) => setFormData({ ...formData, sourceWarehouseId: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select source...</option>
                      {activeWarehouses.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Product</label>
                    <select
                      value={formData.productId}
                      onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                      disabled={!formData.sourceWarehouseId}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-neutral-100 disabled:text-neutral-400"
                    >
                      <option value="">Select product to transfer...</option>
                      {sourceProducts.map(p => (
                        <option key={p.productId} value={p.productId}>
                          {p.productName} ({p.sku}) - {p.available} available
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Transfer Icon indicator */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-neutral-200 rounded-full items-center justify-center text-neutral-400 shadow-sm z-10">
                <ArrowRightLeft className="w-5 h-5" />
              </div>

              {/* Destination */}
              <div className="space-y-6 p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                <h3 className="font-medium text-neutral-900 flex items-center gap-2">
                  Destination
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">To Warehouse</label>
                    <select
                      value={formData.destinationWarehouseId}
                      onChange={(e) => setFormData({ ...formData, destinationWarehouseId: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select destination...</option>
                      {activeWarehouses.map(w => (
                        <option key={w.id} value={w.id} disabled={w.id === formData.sourceWarehouseId}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Transfer Reason</label>
                    <input
                      type="text"
                      required
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="e.g. Internal Transfer"
                      className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Quantity and Preview */}
            <div className="pt-6 border-t border-neutral-100">
              <div className="flex flex-col md:flex-row gap-8 items-end">
                <div className="w-full md:w-1/3 space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Transfer Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct?.available || 1}
                    disabled={!selectedProduct}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 text-lg bg-background border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-neutral-50 disabled:text-neutral-400"
                  />
                </div>

                <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface border border-neutral-200 rounded-lg">
                    <p className="text-xs text-neutral-500 mb-1">Source Remaining</p>
                    <p className="text-xl font-medium text-neutral-900">
                      {selectedProduct ? Math.max(0, selectedProduct.available - parseInt(formData.quantity || 0, 10)) : '-'}
                    </p>
                  </div>
                  <div className="p-4 bg-surface border border-neutral-200 rounded-lg">
                    <p className="text-xs text-neutral-500 mb-1">Destination New Total</p>
                    <p className="text-xl font-medium text-neutral-900">
                      {formData.destinationWarehouseId && selectedProduct ? (destProduct?.available || 0) + parseInt(formData.quantity || 0, 10) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
              >
                Confirm Transfer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
