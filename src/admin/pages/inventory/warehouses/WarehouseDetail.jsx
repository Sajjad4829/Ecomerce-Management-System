import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { ArrowLeft, MapPin, Phone, Mail, Building2, Search, ArrowRightLeft, Edit3, X } from 'lucide-react';

export default function WarehouseDetail() {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const { warehouses, inventory, adjustStock } = useInventory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState(null);
  
  const [adjustForm, setAdjustForm] = useState({
    adjustmentType: 'Increase',
    quantity: 1,
    reason: 'Stock correction'
  });

  const warehouse = useMemo(() => warehouses.find(w => w.id === warehouseId), [warehouses, warehouseId]);
  const warehouseInventory = useMemo(() => inventory.filter(i => i.warehouseId === warehouseId), [inventory, warehouseId]);

  const filteredInventory = useMemo(() => {
    return warehouseInventory.filter(i => 
      (i.productName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
      (i.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (i.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }, [warehouseInventory, searchTerm]);

  const metrics = useMemo(() => {
    const totalProducts = new Set(warehouseInventory.map(i => i.productId)).size;
    const totalUnits = warehouseInventory.reduce((sum, item) => sum + item.available, 0);
    const lowStock = warehouseInventory.filter(i => i.status === 'Low Stock').length;
    const outOfStock = warehouseInventory.filter(i => i.status === 'Out of Stock').length;
    const inventoryValue = totalUnits * 50; // Mock value
    return { totalProducts, totalUnits, lowStock, outOfStock, inventoryValue };
  }, [warehouseInventory]);

  if (!warehouse) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-serif text-neutral-900 mb-2">Warehouse Not Found</h2>
        <button onClick={() => navigate('/admin/inventory/warehouses')} className="text-primary hover:underline">
          Return to Warehouses
        </button>
      </div>
    );
  }

  const handleOpenAdjust = (item) => {
    setAdjustingProduct(item);
    setAdjustForm({
      adjustmentType: 'Increase',
      quantity: 1,
      reason: 'Physical count'
    });
    setIsAdjustOpen(true);
  };

  const handleSaveAdjust = (e) => {
    e.preventDefault();
    if (!adjustingProduct) return;
    
    adjustStock({
      productId: adjustingProduct.productId,
      productName: adjustingProduct.productName,
      sku: adjustingProduct.sku,
      variant: adjustingProduct.variant,
      warehouseId: warehouse.id,
      adjustmentType: adjustForm.adjustmentType,
      quantity: parseInt(adjustForm.quantity, 10),
      reason: adjustForm.reason
    });
    
    setIsAdjustOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/inventory/warehouses')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">{warehouse.name}</h1>
          <p className="text-sm text-neutral-500 mt-1 flex items-center gap-2">
            <span className="font-medium">{warehouse.code}</span>
            <span>&bull;</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              warehouse.status === 'Active' ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {warehouse.status}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-medium text-neutral-900 border-b border-neutral-100 pb-2">Location & Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-neutral-600">
                <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                <span>{warehouse.location}</span>
              </div>
              {warehouse.contact && (
                <div className="flex items-center gap-3 text-neutral-600">
                  <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{warehouse.contact}</span>
                </div>
              )}
              {warehouse.phone && (
                <div className="flex items-center gap-3 text-neutral-600">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{warehouse.phone}</span>
                </div>
              )}
              {warehouse.email && (
                <div className="flex items-center gap-3 text-neutral-600">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{warehouse.email}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-medium text-neutral-900 border-b border-neutral-100 pb-2">Inventory Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Total Products</p>
                <p className="text-xl font-serif text-neutral-900">{metrics.totalProducts}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Total Units</p>
                <p className="text-xl font-serif text-neutral-900">{metrics.totalUnits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Low Stock</p>
                <p className="text-xl font-serif text-warning">{metrics.lowStock}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Out of Stock</p>
                <p className="text-xl font-serif text-danger">{metrics.outOfStock}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-neutral-100">
                <p className="text-xs text-neutral-500 mb-1">Inventory Value</p>
                <p className="text-xl font-serif text-primary">${metrics.inventoryValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Product List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products by name, SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button 
              onClick={() => navigate(`/admin/inventory/transfers?source=${warehouse.id}`)}
              className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <ArrowRightLeft className="w-4 h-4" /> Transfer Stock
            </button>
          </div>

          <div className="bg-surface border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Product & SKU</th>
                    <th className="px-6 py-4 font-medium">Variant / Category</th>
                    <th className="px-6 py-4 font-medium text-right">Available</th>
                    <th className="px-6 py-4 font-medium text-right">Reserved</th>
                    <th className="px-6 py-4 font-medium text-center">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-neutral-500">
                        No inventory found in this warehouse.
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map(item => (
                      <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-medium text-neutral-900">{item.productName}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{item.sku}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-neutral-900">{item.variant || '-'}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{item.category || '-'}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-neutral-900">
                          {item.available}
                        </td>
                        <td className="px-6 py-4 text-right text-neutral-500">
                          {item.reserved || 0}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'In Stock' ? 'bg-success/10 text-success' :
                            item.status === 'Low Stock' ? 'bg-warning/10 text-warning-dark' :
                            'bg-danger/10 text-danger'
                          }`}>
                            {item.status || 'In Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleOpenAdjust(item)}
                            className="p-1.5 text-neutral-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            title="Adjust Stock"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {isAdjustOpen && adjustingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif text-neutral-900">Adjust Stock</h2>
                <p className="text-xs text-neutral-500">{adjustingProduct.productName} ({adjustingProduct.sku})</p>
              </div>
              <button 
                onClick={() => setIsAdjustOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAdjust} className="p-6 space-y-5">
              
              <div className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-neutral-600">Current Available:</span>
                <span className="text-lg font-semibold text-neutral-900">{adjustingProduct.available}</span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Adjustment Type</label>
                <select
                  value={adjustForm.adjustmentType}
                  onChange={e => setAdjustForm({...adjustForm, adjustmentType: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Increase">Add Stock</option>
                  <option value="Decrease">Remove Stock</option>
                  <option value="Damage">Mark as Damaged</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={adjustForm.quantity}
                  onChange={e => setAdjustForm({...adjustForm, quantity: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Reason</label>
                <select
                  value={adjustForm.reason}
                  onChange={e => setAdjustForm({...adjustForm, reason: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Physical count">Physical count</option>
                  <option value="Stock correction">Stock correction</option>
                  <option value="New shipment">New shipment</option>
                  <option value="Damaged stock">Damaged stock</option>
                  <option value="Manual adjustment">Manual adjustment</option>
                </select>
              </div>
              
              {/* Preview */}
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg flex items-center justify-between mt-6">
                <span className="text-sm text-primary font-medium">New Stock Preview:</span>
                <span className="text-lg font-bold text-primary">
                  {adjustForm.adjustmentType === 'Increase' 
                    ? adjustingProduct.available + parseInt(adjustForm.quantity || 0, 10)
                    : Math.max(0, adjustingProduct.available - parseInt(adjustForm.quantity || 0, 10))}
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdjustOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
                >
                  Apply Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
