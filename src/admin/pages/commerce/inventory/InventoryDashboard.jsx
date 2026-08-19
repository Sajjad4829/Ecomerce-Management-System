import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiSearch, FiFilter, FiBox, FiAlertCircle, FiCheckCircle, FiArchive, FiDollarSign } from 'react-icons/fi';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { useProducts } from '../../../context/commerce/ProductContext';
import CatalogInventoryTable from './CatalogInventoryTable';
import StockAdjustmentModal from './StockAdjustmentModal';
import InventoryDetailsDrawer from './InventoryDetailsDrawer';

export default function CommerceInventoryDashboard() {
  const { inventory, warehouses } = useInventory();
  // We use useProducts assuming it returns { products, resolvedProducts, etc. }
  // depending on the exact context implementation. We'll access what's available.
  const productContext = useProducts();
  const products = productContext?.resolvedProducts || productContext?.products || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [warehouseFilter, setWarehouseFilter] = useState('All Warehouses');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [variantFilter, setVariantFilter] = useState('All Variants');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const [selectedAdjustmentItem, setSelectedAdjustmentItem] = useState(null);
  const [selectedDetailsItem, setSelectedDetailsItem] = useState(null);

  // Join inventory with product data to get images and categories
  const joinedInventory = useMemo(() => {
    return inventory.map(item => {
      const product = products.find(p => p.id === item.productId || p.sku === item.sku);
      return {
        ...item,
        image: product?.image || null,
        category: product?.category || 'Uncategorized',
        variant: product?.variant || null,
        price: product?.price || 0,
      };
    });
  }, [inventory, products]);

  // Derive categories for filter
  const categories = useMemo(() => {
    const cats = new Set(joinedInventory.map(item => item.category).filter(Boolean));
    return ['All Categories', ...Array.from(cats)];
  }, [joinedInventory]);

  const variants = useMemo(() => {
    const vars = new Set(joinedInventory.map(item => item.variant).filter(Boolean));
    return ['All Variants', ...Array.from(vars)];
  }, [joinedInventory]);

  // Product Type is often implicit or we can extract it, assuming it exists
  const productTypes = useMemo(() => {
    const types = new Set(joinedInventory.map(item => item.productType).filter(Boolean));
    return ['All Types', ...Array.from(types)];
  }, [joinedInventory]);

  // Filter logic
  const filteredData = useMemo(() => {
    return joinedInventory.filter(item => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
      const matchesWarehouse = warehouseFilter === 'All Warehouses' || item.warehouseN
      ame === warehouseFilter;
      const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
      const matchesVariant = variantFilter === 'All Variants' || item.variant === variantFilter;
      const matchesType = typeFilter === 'All Types' || item.productType === typeFilter;

      return matchesSearch && matchesStatus && matchesWarehouse && matchesCategory && matchesVariant && matchesType;
    });
  }, [joinedInventory, searchQuery, statusFilter, warehouseFilter, categoryFilter, variantFilter, typeFilter]);

  // Metrics calculation
  const metrics = useMemo(() => {
    let totalStock = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let reservedStock = 0;
    let inventoryValue = 0;
    const uniqueProducts = new Set();

    joinedInventory.forEach(item => {
      uniqueProducts.add(item.productId);
      totalStock += item.available;
      reservedStock += item.reserved;
      inventoryValue += (item.available * (item.price || 0));

      if (item.status === 'Low Stock') lowStockCount++;
      if (item.status === 'Out of Stock') outOfStockCount++;
    });

    return {
      totalProducts: uniqueProducts.size,
      totalStock,
      lowStockCount,
      outOfStockCount,
      reservedStock,
      inventoryValue
    };
  }, [joinedInventory]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
            <Link to="/admin/catalog" className="hover:text-primary transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-text-primary font-medium">Inventory</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Inventory</h1>
          <p className="text-text-secondary mt-1">Manage product stock, availability, variants and inventory information.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setSelectedAdjustmentItem(joinedInventory[0])} // Quick shortcut if needed, though usually triggered from row
            className="flex items-center gap-2 px-4 py-2 bg-primary text-surface rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            <FiBox className="w-4 h-4" />
            Adjust Stock
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-surface p-4 rounded-xl shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FiBox className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{metrics.totalProducts}</div>
          <div className="text-xs font-medium text-text-muted mt-1">Total Products</div>
        </div>

        <div className="bg-surface p-4 rounded-xl shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{metrics.totalStock}</div>
          <div className="text-xs font-medium text-text-muted mt-1">Total Stock (Avail)</div>
        </div>

        <div className="bg-surface p-4 rounded-xl shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <FiAlertCircle className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{metrics.lowStockCount}</div>
          <div className="text-xs font-medium text-text-muted mt-1">Low Stock SKUs</div>
        </div>

        <div className="bg-surface p-4 rounded-xl shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <FiAlertCircle className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{metrics.outOfStockCount}</div>
          <div className="text-xs font-medium text-text-muted mt-1">Out of Stock SKUs</div>
        </div>

        <div className="bg-surface p-4 rounded-xl shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FiArchive className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{metrics.reservedStock}</div>
          <div className="text-xs font-medium text-text-muted mt-1">Reserved Stock</div>
        </div>

        <div className="bg-surface p-4 rounded-xl shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FiDollarSign className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            ${metrics.inventoryValue.toLocaleString()}
          </div>
          <div className="text-xs font-medium text-text-muted mt-1">Inventory Value</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-2 rounded-xl shadow-sm border border-black/5">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
          <input
            type="text"
            placeholder="Search products, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg text-sm text-text-muted shrink-0 border border-black/5">
            <FiFilter className="w-4 h-4" />
            <span>Filters</span>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-background rounded-lg text-sm text-text-primary border border-black/5 focus:ring-2 focus:ring-primary/20 outline-none shrink-0"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {productTypes.length > 1 && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg text-sm text-text-primary border border-black/5 focus:ring-2 focus:ring-primary/20 outline-none shrink-0"
            >
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}

          {variants.length > 1 && (
            <select
              value={variantFilter}
              onChange={(e) => setVariantFilter(e.target.value)}
              className="px-3 py-2 bg-background rounded-lg text-sm text-text-primary border border-black/5 focus:ring-2 focus:ring-primary/20 outline-none shrink-0"
            >
              {variants.map(variant => (
                <option key={variant} value={variant}>{variant}</option>
              ))}
            </select>
          )}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background rounded-lg text-sm text-text-primary border border-black/5 focus:ring-2 focus:ring-primary/20 outline-none shrink-0"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre-Order">Pre-Order</option>
          </select>

          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="px-3 py-2 bg-background rounded-lg text-sm text-text-primary border border-black/5 focus:ring-2 focus:ring-primary/20 outline-none shrink-0"
          >
            <option value="All Warehouses">All Warehouses</option>
            {warehouses.map(w => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>

          {(searchQuery || statusFilter !== 'All Statuses' || warehouseFilter !== 'All Warehouses' || categoryFilter !== 'All Categories' || variantFilter !== 'All Variants' || typeFilter !== 'All Types') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All Statuses');
                setWarehouseFilter('All Warehouses');
                setCategoryFilter('All Categories');
                setVariantFilter('All Variants');
                setTypeFilter('All Types');
              }}
              className="px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors shrink-0 whitespace-nowrap font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <CatalogInventoryTable
        data={filteredData}
        onAdjustStock={setSelectedAdjustmentItem}
        onViewDetails={setSelectedDetailsItem}
      />

      {/* Modals & Drawers */}
      <StockAdjustmentModal
        isOpen={!!selectedAdjustmentItem}
        onClose={() => setSelectedAdjustmentItem(null)}
        selectedItem={selectedAdjustmentItem}
      />

      <InventoryDetailsDrawer
        isOpen={!!selectedDetailsItem}
        onClose={() => setSelectedDetailsItem(null)}
        selectedItem={selectedDetailsItem}
      />
    </div>
  );
}
