import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { validateStockTransfer } from '../../../services/inventory/StockValidation';
import { ArrowLeft, ArrowRight, Save, AlertCircle } from 'lucide-react';

export default function StockTransfer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { inventory, warehouses, transferStock } = useInventory();
  
  const [formData, setFormData] = useState({
    productId: searchParams.get('product') || '',
    sourceWarehouseId: '',
    destinationWarehouseId: '',
    quantity: 1,
    reason: 'Internal Transfer'
  });

  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sourceAvailable, setSourceAvailable] = useState(0);

  useEffect(() => {
    if (formData.productId && formData.sourceWarehouseId) {
      const item = inventory.find(i => i.productId === formData.productId && i.warehouseId === formData.sourceWarehouseId);
      setSelectedProduct(item || null);
      setSourceAvailable(item ? item.available : 0);
    } else {
      setSelectedProduct(null);
      setSourceAvailable(0);
    }
  }, [formData.productId, formData.sourceWarehouseId, inventory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateStockTransfer(formData, sourceAvailable);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const submissionData = {
      ...formData,
      productName: selectedProduct?.productName || 'Custom Product',
      sku: selectedProduct?.sku || 'CUSTOM-SKU',
      quantity: parseInt(formData.quantity, 10)
    };

    transferStock(submissionData);
    navigate('/admin/inventory/movements');
  };

  const uniqueProducts = Array.from(new Set(inventory.map(i => i.productId)))
    .map(id => inventory.find(i => i.productId === id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/inventory')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Transfer Stock</h1>
          <p className="text-sm text-neutral-500 mt-1">Move inventory between warehouse locations</p>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Selection */}
            <div className="col-span-full space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Product</label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                className={`w-full p-2.5 bg-surface border ${errors.productId ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              >
                <option value="">Select a product...</option>
                {uniqueProducts.map(p => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName} ({p.sku})
                  </option>
                ))}
              </select>
              {errors.productId && <p className="text-xs text-danger">{errors.productId}</p>}
            </div>

            {/* Source Warehouse Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Source Warehouse</label>
              <select
                value={formData.sourceWarehouseId}
                onChange={(e) => setFormData({ ...formData, sourceWarehouseId: e.target.value })}
                className={`w-full p-2.5 bg-surface border ${errors.sourceWarehouseId ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              >
                <option value="">Select origin...</option>
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              {errors.sourceWarehouseId && <p className="text-xs text-danger">{errors.sourceWarehouseId}</p>}
              
              {selectedProduct && (
                <div className="mt-2 text-sm text-neutral-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> 
                  Available to transfer: <span className="font-medium text-neutral-900">{sourceAvailable} units</span>
                </div>
              )}
            </div>

            {/* Destination Warehouse Selection */}
            <div className="space-y-2 relative">
              <label className="block text-sm font-medium text-neutral-700">Destination Warehouse</label>
              <select
                value={formData.destinationWarehouseId}
                onChange={(e) => setFormData({ ...formData, destinationWarehouseId: e.target.value })}
                className={`w-full p-2.5 bg-surface border ${errors.destinationWarehouseId ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              >
                <option value="">Select destination...</option>
                {warehouses.map(w => (
                  <option key={w.id} value={w.id} disabled={w.id === formData.sourceWarehouseId}>
                    {w.name}
                  </option>
                ))}
              </select>
              {errors.destinationWarehouseId && <p className="text-xs text-danger">{errors.destinationWarehouseId}</p>}
              
              <div className="hidden md:flex absolute -left-5 top-10 items-center justify-center bg-surface border border-neutral-200 rounded-full w-8 h-8 z-10 text-neutral-400">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Transfer Quantity</label>
              <input
                type="number"
                min="1"
                max={sourceAvailable > 0 ? sourceAvailable : undefined}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) || '' })}
                className={`w-full p-2.5 bg-surface border ${errors.quantity ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              />
              {errors.quantity && <p className="text-xs text-danger">{errors.quantity}</p>}
            </div>

            {/* Reason */}
            <div className="col-span-full space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Reason / Notes</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full p-2.5 bg-surface border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="e.g., Load balancing, fulfillment..."
              />
            </div>

          </div>

          <div className="pt-6 border-t border-neutral-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/inventory')}
              className="px-4 py-2 text-neutral-700 bg-surface border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" /> Execute Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
