import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiEdit2, FiRepeat, FiBox } from 'react-icons/fi';
import { notificationService } from '../../services/notification/NotificationService';
import { useInventory } from '../../context/inventory/InventoryContext';

export default function ProductInventoryDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { warehouses, refreshInventory } = useInventory();

  const [product, setProduct] = useState(null);
  const [inventoryList, setInventoryList] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'add', 'adjust', 'transfer'
  
  // Forms state
  const [addStockData, setAddStockData] = useState({ warehouseId: '', quantity: 0, reason: 'New Stock' });
  const [adjustStockData, setAdjustStockData] = useState({ warehouseId: '', quantity: 0, reason: 'Correction', notes: '' });
  const [transferStockData, setTransferStockData] = useState({ sourceWarehouseId: '', destinationWarehouseId: '', quantity: 0, reason: 'Warehouse Transfer' });

  const fetchProductData = async () => {
    try {
      setLoading(true);
      // Fetch product to get basic info
      const prodRes = await fetch(`/api/products/${productId}`);
      if (!prodRes.ok) throw new Error("Failed to fetch product");
      const prodData = await prodRes.json();
      setProduct(prodData);

      // Fetch inventory for this product
      const invRes = await fetch('/api/inventory');
      if (invRes.ok) {
        const invData = await invRes.json();
        setInventoryList(invData.filter(i => i.productId === productId));
      }

      // Fetch movements
      const movRes = await fetch('/api/inventory/movements');
      if (movRes.ok) {
        const movData = await movRes.json();
        setMovements(movData.filter(m => m.productId === productId).sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)));
      }
    } catch (err) {
      console.error(err);
      notificationService.createNotification({ type: 'Inventory', title: 'Error', message: 'Failed to load inventory data', priority: 'High' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          warehouseId: addStockData.warehouseId,
          quantity: Number(addStockData.quantity),
          reason: addStockData.reason,
          type: 'Increase'
        })
      });
      if (res.ok) {
        notificationService.createNotification({ type: 'Inventory', title: 'Stock Added', message: `Added ${addStockData.quantity} units.` });
        setActiveModal(null);
        fetchProductData();
        refreshInventory();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add stock");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdjustStock = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          warehouseId: adjustStockData.warehouseId,
          quantity: Number(adjustStockData.quantity),
          reason: adjustStockData.reason,
          type: Number(adjustStockData.quantity) < 0 ? 'Decrease' : 'Increase'
        })
      });
      if (res.ok) {
        notificationService.createNotification({ type: 'Inventory', title: 'Stock Adjusted', message: `Adjusted by ${adjustStockData.quantity} units.` });
        setActiveModal(null);
        fetchProductData();
        refreshInventory();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to adjust stock");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTransferStock = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inventory/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          sourceWarehouseId: transferStockData.sourceWarehouseId,
          destinationWarehouseId: transferStockData.destinationWarehouseId,
          quantity: Number(transferStockData.quantity),
          reason: transferStockData.reason
        })
      });
      if (res.ok) {
        notificationService.createNotification({ type: 'Inventory', title: 'Stock Transferred', message: `Transferred ${transferStockData.quantity} units.` });
        setActiveModal(null);
        fetchProductData();
        refreshInventory();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to transfer stock");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading || !product) {
    return <div className="p-8">Loading inventory details...</div>;
  }

  // Derived summaries
  const totalStock = product.inventorySummary?.totalStock || 0;
  const reservedStock = product.inventorySummary?.reservedStock || 0;
  const availableStock = product.inventorySummary?.availableStock || 0;
  
  let stockStatus = 'Out of Stock';
  if (availableStock > 10) stockStatus = 'In Stock';
  else if (availableStock > 0) stockStatus = 'Low Stock';

  const getWarehouseName = (id) => warehouses.find(w => w.id === id)?.name || id;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-border rounded-lg hover:bg-surface">
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">{product.name || 'Product'}</h1>
          <p className="text-sm text-text-muted">SKU: {product.sku || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="text-sm text-text-muted mb-1">Total Stock</div>
          <div className="text-3xl font-bold text-text-primary">{totalStock}</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="text-sm text-text-muted mb-1">Available</div>
          <div className="text-3xl font-bold text-green-600">{availableStock}</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="text-sm text-text-muted mb-1">Reserved</div>
          <div className="text-3xl font-bold text-orange-600">{reservedStock}</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="text-sm text-text-muted mb-1">Stock Status</div>
          <div className={`text-xl font-bold mt-2 ${stockStatus === 'In Stock' ? 'text-green-600' : stockStatus === 'Low Stock' ? 'text-orange-600' : 'text-red-600'}`}>
            {stockStatus}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiBox /> Warehouse Stock</h2>
          <div className="flex gap-2">
            <button onClick={() => setActiveModal('add')} className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover flex items-center gap-1">
              <FiPlus /> Add Stock
            </button>
            <button onClick={() => setActiveModal('adjust')} className="px-3 py-1.5 border border-border text-text-primary text-sm font-medium rounded-lg hover:bg-background flex items-center gap-1">
              <FiEdit2 /> Adjust Stock
            </button>
            <button onClick={() => setActiveModal('transfer')} className="px-3 py-1.5 border border-border text-text-primary text-sm font-medium rounded-lg hover:bg-background flex items-center gap-1">
              <FiRepeat /> Transfer Stock
            </button>
          </div>
        </div>
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-background text-xs uppercase font-semibold text-text-muted border-b border-border">
            <tr>
              <th className="px-6 py-4">Warehouse</th>
              <th className="px-6 py-4">Available</th>
              <th className="px-6 py-4">Reserved</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventoryList.filter(i => i.warehouseId !== 'unassigned').map(inv => (
              <tr key={inv._id || inv.warehouseId} className="hover:bg-background">
                <td className="px-6 py-4 font-medium text-text-primary">{getWarehouseName(inv.warehouseId)}</td>
                <td className="px-6 py-4">{inv.availableQuantity || inv.available || 0}</td>
                <td className="px-6 py-4">{inv.reservedQuantity || inv.reserved || 0}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${inv.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {inv.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
            {inventoryList.filter(i => i.warehouseId !== 'unassigned').length === 0 && (
              <tr><td colSpan="4" className="px-6 py-8 text-center">No assigned warehouses.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">Stock Movement History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-background text-xs uppercase font-semibold text-text-muted border-b border-border">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {movements.map(mov => (
                <tr key={mov._id || mov.id} className="hover:bg-background">
                  <td className="px-6 py-4">{new Date(mov.createdAt || mov.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{mov.type}</td>
                  <td className="px-6 py-4">{getWarehouseName(mov.warehouseId)}</td>
                  <td className={`px-6 py-4 font-bold ${mov.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                  </td>
                  <td className="px-6 py-4">{mov.reason}</td>
                </tr>
              ))}
              {movements.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-8 text-center">No movements recorded.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-text-primary">Add Stock</h2>
              <button onClick={() => setActiveModal(null)} className="text-text-muted hover:text-text-primary">&times;</button>
            </div>
            <form onSubmit={handleAddStock} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Product</label>
                <input type="text" value={product.name || 'Unknown Product'} readOnly className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-muted cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Price</label>
                <input type="text" value={`$${product.price || 0}`} readOnly className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-muted cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Warehouse</label>
                <select required value={addStockData.warehouseId} onChange={e => setAddStockData({...addStockData, warehouseId: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm">
                  <option value="">Select Warehouse</option>
                  {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Quantity</label>
                <input type="number" required min="1" value={addStockData.quantity} onChange={e => setAddStockData({...addStockData, quantity: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Reason</label>
                <input type="text" required value={addStockData.reason} onChange={e => setAddStockData({...addStockData, reason: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" placeholder="New Stock / Purchase" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-background">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">Add Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'adjust' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-text-primary">Adjust Stock</h2>
              <button onClick={() => setActiveModal(null)} className="text-text-muted hover:text-text-primary">&times;</button>
            </div>
            <form onSubmit={handleAdjustStock} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Warehouse</label>
                <select required value={adjustStockData.warehouseId} onChange={e => setAdjustStockData({...adjustStockData, warehouseId: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm">
                  <option value="">Select Warehouse</option>
                  {inventoryList.filter(i => i.warehouseId !== 'unassigned').map(inv => (
                    <option key={inv.warehouseId} value={inv.warehouseId}>{getWarehouseName(inv.warehouseId)} (Avail: {inv.availableQuantity || inv.available || 0})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Adjustment (+ or -)</label>
                <input type="number" required value={adjustStockData.quantity} onChange={e => setAdjustStockData({...adjustStockData, quantity: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" placeholder="e.g. -2 or 5" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Reason</label>
                <input type="text" required value={adjustStockData.reason} onChange={e => setAdjustStockData({...adjustStockData, reason: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" placeholder="Damaged / Correction" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-background">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">Save Adjustment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'transfer' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-text-primary">Transfer Stock</h2>
              <button onClick={() => setActiveModal(null)} className="text-text-muted hover:text-text-primary">&times;</button>
            </div>
            <form onSubmit={handleTransferStock} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">From Warehouse</label>
                <select required value={transferStockData.sourceWarehouseId} onChange={e => setTransferStockData({...transferStockData, sourceWarehouseId: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm">
                  <option value="">Select Source</option>
                  {inventoryList.filter(i => i.warehouseId !== 'unassigned').map(inv => (
                    <option key={inv.warehouseId} value={inv.warehouseId}>{getWarehouseName(inv.warehouseId)} (Avail: {inv.availableQuantity || inv.available || 0})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">To Warehouse</label>
                <select required value={transferStockData.destinationWarehouseId} onChange={e => setTransferStockData({...transferStockData, destinationWarehouseId: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm">
                  <option value="">Select Destination</option>
                  {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5">Quantity</label>
                <input type="number" required min="1" value={transferStockData.quantity} onChange={e => setTransferStockData({...transferStockData, quantity: e.target.value})} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-background">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">Transfer Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
