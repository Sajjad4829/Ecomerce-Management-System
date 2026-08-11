import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { validateStockAdjustment } from '../../../services/inventory/StockValidation';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function StockAdjustment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { inventory, warehouses, adjustStock } = useInventory();
  
  const [formData, setFormData] = useState({
    productId: searchParams.get('product') || '',
    warehouseId: searchParams.get('warehouse') || '',
    adjustmentType: 'Increase',
    quantity: 1,
    reason: 'Stock Count'
  });

  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (formData.productId && formData.warehouseId) {
      const item = inventory.find(i => i.productId === formData.productId && i.warehouseId === formData.warehouseId);
      setSelectedProduct(item || null);
    } else {
      setSelectedProduct(null);
    }
  }, [formData.productId, formData.warehouseId, inventory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateStockAdjustment(formData);
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

    adjustStock(submissionData);
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
          <h1 className="text-2xl font-serif text-neutral-900">Stock Adjustment</h1>
          <p className="text-sm text-neutral-500 mt-1">Record manual inventory corrections</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Product</label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                className={`w-full p-2.5 bg-white border ${errors.productId ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              >
                <option value="">Select a product...</option>
                {uniqueProducts.map(p => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName} ({p.sku})
                  </option>
                ))}
              </select>
              {errors.productId && <p className="text-xs text-red-600">{errors.productId}</p>}
            </div>

            {/* Warehouse Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Warehouse</label>
              <select
                value={formData.warehouseId}
                onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                className={`w-full p-2.5 bg-white border ${errors.warehouseId ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              >
                <option value="">Select a warehouse...</option>
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              {errors.warehouseId && <p className="text-xs text-red-600">{errors.warehouseId}</p>}
            </div>

            {/* Current Stock Display */}
            {selectedProduct && (
              <div className="col-span-full p-4 bg-neutral-50 border border-neutral-100 rounded-md flex items-center gap-4">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                <div className="text-sm">
                  <span className="text-neutral-500">Current available stock: </span>
                  <span className="font-medium text-neutral-900">{selectedProduct.available} units</span>
                </div>
              </div>
            )}

            {/* Adjustment Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Type</label>
              <select
                value={formData.adjustmentType}
                onChange={(e) => setFormData({ ...formData, adjustmentType: e.target.value })}
                className="w-full p-2.5 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="Increase">Increase Stock (+)</option>
                <option value="Decrease">Decrease Stock (-)</option>
                <option value="Damage">Write-off Damage (-)</option>
                <option value="Found">Found Inventory (+)</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) || '' })}
                className={`w-full p-2.5 bg-white border ${errors.quantity ? 'border-red-500' : 'border-neutral-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900`}
              />
              {errors.quantity && <p className="text-xs text-red-600">{errors.quantity}</p>}
            </div>

            {/* Reason */}
            <div className="col-span-full space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Reason / Notes</label>
              <textarea
                rows="3"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full p-2.5 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Explain the reason for this adjustment..."
              ></textarea>
            </div>

          </div>

          <div className="pt-6 border-t border-neutral-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/inventory')}
              className="px-4 py-2 text-neutral-700 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
