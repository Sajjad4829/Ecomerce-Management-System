import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { Plus, Search, Building2, MapPin, MoreVertical, Edit3, ArrowRightLeft, Eye, X } from 'lucide-react';

export default function WarehouseCenter() {
  const { warehouses, inventory, addWarehouse, updateWarehouse } = useInventory();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    contact: '',
    phone: '',
    email: '',
    status: 'Active'
  });

  const handleOpenModal = (warehouse = null) => {
    if (warehouse) {
      setEditingWarehouse(warehouse);
      setFormData({
        name: warehouse.name,
        code: warehouse.code,
        location: warehouse.location,
        contact: warehouse.contact || '',
        phone: warehouse.phone || '',
        email: warehouse.email || '',
        status: warehouse.status
      });
    } else {
      setEditingWarehouse(null);
      setFormData({
        name: '',
        code: '',
        location: '',
        contact: '',
        phone: '',
        email: '',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingWarehouse) {
      updateWarehouse(editingWarehouse.id, formData);
    } else {
      addWarehouse(formData);
    }
    setIsModalOpen(false);
  };

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(w => 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [warehouses, searchTerm]);

  const metrics = useMemo(() => {
    const active = warehouses.filter(w => w.status === 'Active').length;
    const inactive = warehouses.length - active;
    
    // Total Stock Units overall
    const totalStock = inventory.reduce((sum, item) => sum + item.available, 0);
    // Rough mock for inventory value (assuming $50 average per unit for demo purposes)
    const inventoryValue = totalStock * 50; 

    return { total: warehouses.length, active, inactive, totalStock, inventoryValue };
  }, [warehouses, inventory]);

  const getWarehouseStats = (warehouseId) => {
    const warehouseInventory = inventory.filter(i => i.warehouseId === warehouseId);
    const uniqueProducts = new Set(warehouseInventory.map(i => i.productId)).size;
    const stockUnits = warehouseInventory.reduce((sum, item) => sum + item.available, 0);
    const value = stockUnits * 50; // Mock value
    return { uniqueProducts, stockUnits, value };
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Warehouses</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage warehouse locations, stock distribution and inventory transfers.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add Warehouse
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-xs text-neutral-500 font-medium mb-1">Total Warehouses</p>
          <p className="text-2xl font-serif text-neutral-900">{metrics.total}</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-xs text-neutral-500 font-medium mb-1">Active</p>
          <p className="text-2xl font-serif text-success">{metrics.active}</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-xs text-neutral-500 font-medium mb-1">Inactive</p>
          <p className="text-2xl font-serif text-neutral-400">{metrics.inactive}</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-xs text-neutral-500 font-medium mb-1">Total Stock Units</p>
          <p className="text-2xl font-serif text-primary">{metrics.totalStock.toLocaleString()}</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-xs text-neutral-500 font-medium mb-1">Inventory Value</p>
          <p className="text-2xl font-serif text-neutral-900">${metrics.inventoryValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search warehouses by name, code or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Warehouse</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium">Stock Units</th>
                <th className="px-6 py-4 font-medium">Inventory Value</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredWarehouses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-neutral-500">
                    <Building2 className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                    <p className="text-base font-medium text-neutral-900">No warehouses found</p>
                    <p className="text-sm mt-1">Try adjusting your search criteria</p>
                  </td>
                </tr>
              ) : (
                filteredWarehouses.map(warehouse => {
                  const stats = getWarehouseStats(warehouse.id);
                  return (
                    <tr key={warehouse.id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{warehouse.name}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">{warehouse.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-neutral-600">
                          <MapPin className="w-4 h-4 text-neutral-400" />
                          {warehouse.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">{stats.uniqueProducts}</td>
                      <td className="px-6 py-4 font-medium text-neutral-900">{stats.stockUnits.toLocaleString()}</td>
                      <td className="px-6 py-4 text-neutral-600">${stats.value.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          warehouse.status === 'Active' ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {warehouse.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigate(`/admin/inventory/warehouses/${warehouse.id}`)}
                            className="p-1.5 text-neutral-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleOpenModal(warehouse)}
                            className="p-1.5 text-neutral-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                            title="Edit Warehouse"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/inventory/transfers?source=${warehouse.id}`)}
                            className="p-1.5 text-neutral-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                            title="Transfer Stock"
                          >
                            <ArrowRightLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-serif text-neutral-900">
                {editingWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Warehouse Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. Dhaka Main Hub"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Warehouse Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. WH-DHK-01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Location / Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. 123 Warehouse St, Dhaka"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. +880 1234 567890"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. contact@warehouse.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

              </div>
              
              <div className="p-6 border-t border-neutral-100 flex justify-end gap-3 shrink-0 bg-neutral-50/50">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
                >
                  {editingWarehouse ? 'Save Changes' : 'Create Warehouse'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
