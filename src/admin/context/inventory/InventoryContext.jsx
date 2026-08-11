import React, { createContext, useContext, useState, useMemo } from 'react';
import { getStockStatus } from '../../services/inventory/StockValidation';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([
    { id: 'WH-1', code: 'MAIN-NY', name: 'New York Main Hub', location: 'New York, USA', capacity: 10000, used: 4500, status: 'active' },
    { id: 'WH-2', code: 'WEST-CA', name: 'California Distribution', location: 'Los Angeles, USA', capacity: 8000, used: 7200, status: 'active' },
    { id: 'WH-3', code: 'EURO-LDN', name: 'London Regional', location: 'London, UK', capacity: 5000, used: 1200, status: 'active' }
  ]);

  const [inventory, setInventory] = useState([
    { id: 'INV-1', productId: 'prod-1', productName: 'Velvet Sofa', sku: 'SOFA-VEL-BLU', warehouseId: 'WH-1', warehouseName: 'New York Main Hub', available: 45, reserved: 5, incoming: 10, reorderLevel: 20 },
    { id: 'INV-2', productId: 'prod-1', productName: 'Velvet Sofa', sku: 'SOFA-VEL-BLU', warehouseId: 'WH-2', warehouseName: 'California Distribution', available: 12, reserved: 0, incoming: 0, reorderLevel: 15 },
    { id: 'INV-3', productId: 'prod-2', productName: 'Oak Dining Table', sku: 'TAB-OAK-LG', warehouseId: 'WH-1', warehouseName: 'New York Main Hub', available: 8, reserved: 2, incoming: 5, reorderLevel: 10 },
    { id: 'INV-4', productId: 'prod-3', productName: 'Ceramic Vase', sku: 'VASE-CER-WHT', warehouseId: 'WH-3', warehouseName: 'London Regional', available: 0, reserved: 0, incoming: 50, reorderLevel: 20 },
    { id: 'INV-5', productId: 'prod-4', productName: 'Throw Pillow', sku: 'PIL-COT-WHT', warehouseId: 'WH-1', warehouseName: 'New York Main Hub', available: 120, reserved: 10, incoming: 0, reorderLevel: 50 },
  ]);

  const [movements, setMovements] = useState([
    { id: 'MOV-1001', productId: 'prod-1', productName: 'Velvet Sofa', sku: 'SOFA-VEL-BLU', warehouseId: 'WH-1', type: 'Purchase', quantity: 50, reason: 'Restock', user: 'System', date: '2024-05-01T10:00:00Z' },
    { id: 'MOV-1002', productId: 'prod-1', productName: 'Velvet Sofa', sku: 'SOFA-VEL-BLU', warehouseId: 'WH-1', type: 'Sale', quantity: -5, reason: 'Order Fulfillment', user: 'Admin', date: '2024-05-12T14:30:00Z' },
    { id: 'MOV-1003', productId: 'prod-3', productName: 'Ceramic Vase', sku: 'VASE-CER-WHT', warehouseId: 'WH-3', type: 'Adjustment', quantity: -2, reason: 'Damage', user: 'Warehouse Staff', date: '2024-05-14T09:15:00Z' },
  ]);

  const getWarehouse = (id) => warehouses.find(w => w.id === id);
  const getProductInventory = (productId) => inventory.filter(i => i.productId === productId);
  
  const adjustStock = (data) => {
    const newMovement = {
      id: `MOV-${Date.now()}`,
      productId: data.productId,
      productName: data.productName || 'Unknown Product',
      sku: data.sku || 'UNKNOWN-SKU',
      warehouseId: data.warehouseId,
      type: data.adjustmentType,
      quantity: data.adjustmentType === 'Decrease' || data.adjustmentType === 'Damage' ? -data.quantity : data.quantity,
      reason: data.reason,
      user: 'Current User',
      date: new Date().toISOString()
    };

    setMovements([newMovement, ...movements]);

    setInventory(inventory.map(item => {
      if (item.productId === data.productId && item.warehouseId === data.warehouseId) {
        return { ...item, available: item.available + newMovement.quantity };
      }
      return item;
    }));
  };

  const transferStock = (data) => {
    // Basic mock implementation for transfer
    const decreaseMovement = {
      id: `MOV-${Date.now()}-out`,
      productId: data.productId,
      productName: data.productName,
      sku: data.sku,
      warehouseId: data.sourceWarehouseId,
      type: 'Transfer Out',
      quantity: -data.quantity,
      reason: `Transfer to ${data.destinationWarehouseId}`,
      user: 'Current User',
      date: new Date().toISOString()
    };

    const increaseMovement = {
      id: `MOV-${Date.now()}-in`,
      productId: data.productId,
      productName: data.productName,
      sku: data.sku,
      warehouseId: data.destinationWarehouseId,
      type: 'Transfer In',
      quantity: data.quantity,
      reason: `Transfer from ${data.sourceWarehouseId}`,
      user: 'Current User',
      date: new Date().toISOString()
    };

    setMovements([increaseMovement, decreaseMovement, ...movements]);

    setInventory(inventory.map(item => {
      if (item.productId === data.productId && item.warehouseId === data.sourceWarehouseId) {
        return { ...item, available: item.available - data.quantity };
      }
      if (item.productId === data.productId && item.warehouseId === data.destinationWarehouseId) {
        return { ...item, available: item.available + data.quantity };
      }
      return item;
    }));
  };

  const contextValue = useMemo(() => ({
    inventory: inventory.map(item => ({ ...item, status: getStockStatus(item.available, item.reorderLevel) })),
    warehouses,
    movements,
    getWarehouse,
    getProductInventory,
    adjustStock,
    transferStock
  }), [inventory, warehouses, movements]);

  return (
    <InventoryContext.Provider value={contextValue}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
