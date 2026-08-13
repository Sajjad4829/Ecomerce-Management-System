import React, { createContext, useContext, useState, useMemo } from 'react';
import { getStockStatus } from '../../services/inventory/StockValidation';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([
    { id: 'WH-1', code: 'MAIN-NY', name: 'New York Main Hub', location: 'New York, USA', contact: 'John Doe', email: 'ny@example.com', phone: '123-456-7890', capacity: 10000, used: 4500, status: 'Active' },
    { id: 'WH-2', code: 'WEST-CA', name: 'California Distribution', location: 'Los Angeles, USA', contact: 'Jane Smith', email: 'ca@example.com', phone: '987-654-3210', capacity: 8000, used: 7200, status: 'Active' },
    { id: 'WH-3', code: 'EURO-LDN', name: 'London Regional', location: 'London, UK', contact: 'Bob Johnson', email: 'ldn@example.com', phone: '555-555-5555', capacity: 5000, used: 1200, status: 'Inactive' }
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

  const [reservations, setReservations] = useState([
    { id: 'RES-1001', orderId: 'ORD-5001', productId: 'prod-1', warehouseId: 'WH-1', quantity: 5, status: 'Active', date: '2024-05-12T14:30:00Z' }
  ]);

  const getWarehouse = (id) => warehouses.find(w => w.id === id);
  const getProductInventory = (productId) => inventory.filter(i => i.productId === productId);
  
  const addWarehouse = (data) => {
    const newWarehouse = {
      id: `WH-${Date.now()}`,
      ...data,
      capacity: parseInt(data.capacity) || 5000,
      used: 0,
      status: data.status || 'Active'
    };
    setWarehouses([...warehouses, newWarehouse]);
  };

  const updateWarehouse = (id, data) => {
    setWarehouses(warehouses.map(w => w.id === id ? { ...w, ...data } : w));
  };

  const deleteWarehouse = (id) => {
    const hasStock = inventory.some(i => i.warehouseId === id && i.available > 0);
    if (hasStock) {
      throw new Error("Cannot delete warehouse with active stock.");
    }
    setWarehouses(warehouses.filter(w => w.id !== id));
  };

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
    const decreaseMovement = {
      id: `MOV-${Date.now()}-out`,
      productId: data.productId,
      productName: data.productName,
      sku: data.sku,
      variant: data.variant,
      warehouseId: data.sourceWarehouseId,
      type: 'Transfer Out',
      quantity: -data.quantity,
      reason: data.reason || `Transfer to ${data.destinationWarehouseId}`,
      user: 'Current User',
      date: new Date().toISOString()
    };

    const increaseMovement = {
      id: `MOV-${Date.now()}-in`,
      productId: data.productId,
      productName: data.productName,
      sku: data.sku,
      variant: data.variant,
      warehouseId: data.destinationWarehouseId,
      type: 'Transfer In',
      quantity: data.quantity,
      reason: data.reason || `Transfer from ${data.sourceWarehouseId}`,
      user: 'Current User',
      date: new Date().toISOString()
    };

    setMovements([increaseMovement, decreaseMovement, ...movements]);

    setInventory(prev => {
      let updated = [...prev];
      
      // Decrease from source
      const sourceIdx = updated.findIndex(item => item.productId === data.productId && item.warehouseId === data.sourceWarehouseId);
      if (sourceIdx !== -1) {
        updated[sourceIdx] = { ...updated[sourceIdx], available: updated[sourceIdx].available - data.quantity };
      }

      // Increase to destination
      const destIdx = updated.findIndex(item => item.productId === data.productId && item.warehouseId === data.destinationWarehouseId);
      if (destIdx !== -1) {
        updated[destIdx] = { ...updated[destIdx], available: updated[destIdx].available + data.quantity };
      } else {
        // If product doesn't exist in destination warehouse yet, create it
        const sourceItem = updated[sourceIdx];
        const destWarehouse = warehouses.find(w => w.id === data.destinationWarehouseId);
        updated.push({
          id: `INV-${Date.now()}`,
          productId: data.productId,
          productName: data.productName,
          sku: data.sku,
          variant: data.variant,
          warehouseId: data.destinationWarehouseId,
          warehouseName: destWarehouse ? destWarehouse.name : 'Unknown Warehouse',
          available: data.quantity,
          reserved: 0,
          incoming: 0,
          reorderLevel: sourceItem?.reorderLevel || 10
        });
      }

      return updated;
    });
  };

  const reserveStock = (orderId, items) => {
    let newReservations = [];
    let updatedInventory = [...inventory];

    for (const item of items) {
      // Find warehouses that have this product
      const availableSources = updatedInventory
        .filter(i => i.productId === item.id && i.available >= item.quantity)
        .sort((a, b) => b.available - a.available); // Default to warehouse with most stock

      if (availableSources.length === 0) {
        throw new Error(`Insufficient stock for product: ${item.name}`);
      }

      const selectedWarehouse = availableSources[0];

      // Deduct available, add to reserved
      const invIdx = updatedInventory.findIndex(i => i.id === selectedWarehouse.id);
      updatedInventory[invIdx] = {
        ...updatedInventory[invIdx],
        available: updatedInventory[invIdx].available - item.quantity,
        reserved: updatedInventory[invIdx].reserved + item.quantity
      };

      newReservations.push({
        id: `RES-${Date.now()}-${item.id}`,
        orderId,
        productId: item.id,
        productName: item.name,
        sku: item.sku,
        warehouseId: selectedWarehouse.warehouseId,
        quantity: item.quantity,
        status: 'Active',
        date: new Date().toISOString()
      });
    }

    setInventory(updatedInventory);
    setReservations(prev => [...newReservations, ...prev]);
    return newReservations;
  };

  const releaseReservation = (orderId) => {
    const orderReservations = reservations.filter(r => r.orderId === orderId && r.status === 'Active');
    
    if (orderReservations.length === 0) return;

    let updatedInventory = [...inventory];
    orderReservations.forEach(res => {
      const invIdx = updatedInventory.findIndex(i => i.productId === res.productId && i.warehouseId === res.warehouseId);
      if (invIdx !== -1) {
        // Return reserved back to available
        updatedInventory[invIdx] = {
          ...updatedInventory[invIdx],
          available: updatedInventory[invIdx].available + res.quantity,
          reserved: Math.max(0, updatedInventory[invIdx].reserved - res.quantity)
        };
      }
    });

    setInventory(updatedInventory);
    setReservations(prev => prev.map(r => r.orderId === orderId ? { ...r, status: 'Released' } : r));
  };

  const fulfillReservation = (orderId) => {
    const orderReservations = reservations.filter(r => r.orderId === orderId && r.status === 'Active');
    
    if (orderReservations.length === 0) return;

    let updatedInventory = [...inventory];
    let newMovements = [];

    orderReservations.forEach(res => {
      const invIdx = updatedInventory.findIndex(i => i.productId === res.productId && i.warehouseId === res.warehouseId);
      if (invIdx !== -1) {
        // Permanently deduct from reserved (available was already deducted during reservation)
        updatedInventory[invIdx] = {
          ...updatedInventory[invIdx],
          reserved: Math.max(0, updatedInventory[invIdx].reserved - res.quantity)
        };

        newMovements.push({
          id: `MOV-${Date.now()}-${res.productId}-sale`,
          productId: res.productId,
          productName: res.productName || 'Unknown Product',
          sku: res.sku || 'UNKNOWN-SKU',
          warehouseId: res.warehouseId,
          type: 'Sale',
          quantity: -res.quantity,
          reason: `Order ${orderId} fulfillment`,
          user: 'System',
          date: new Date().toISOString()
        });
      }
    });

    setInventory(updatedInventory);
    setMovements(prev => [...newMovements, ...prev]);
    setReservations(prev => prev.map(r => r.orderId === orderId ? { ...r, status: 'Fulfilled' } : r));
  };

  const processReturn = (orderId, items) => {
    // Expected items format: { productId, quantity, warehouseId, condition }
    // conditions: 'restockable', 'damaged', 'rejected'
    
    let updatedInventory = [...inventory];
    let newMovements = [];

    items.forEach(item => {
      // Find the specific warehouse inventory record
      const invIdx = updatedInventory.findIndex(i => 
        i.productId === item.productId && i.warehouseId === item.warehouseId
      );

      if (invIdx !== -1) {
        if (item.condition === 'restockable') {
          // Increase physical available stock
          updatedInventory[invIdx] = {
            ...updatedInventory[invIdx],
            available: updatedInventory[invIdx].available + item.quantity
          };

          newMovements.push({
            id: `MOV-${Date.now()}-${item.productId}-return`,
            productId: item.productId,
            productName: updatedInventory[invIdx].productName,
            sku: updatedInventory[invIdx].sku,
            warehouseId: item.warehouseId,
            type: 'Return',
            quantity: item.quantity,
            reason: `Return restocked for Order ${orderId}`,
            user: 'System',
            date: new Date().toISOString()
          });
        } else if (item.condition === 'damaged' || item.condition === 'defective') {
          // Do NOT increase available stock, record as damaged
          // (Assuming a damaged field or just tracking via movement, we'll track via movement)
          newMovements.push({
            id: `MOV-${Date.now()}-${item.productId}-damaged`,
            productId: item.productId,
            productName: updatedInventory[invIdx].productName,
            sku: updatedInventory[invIdx].sku,
            warehouseId: item.warehouseId,
            type: 'Damaged',
            quantity: item.quantity,
            reason: `Return damaged for Order ${orderId}`,
            user: 'System',
            date: new Date().toISOString()
          });
        }
      }
    });

    setInventory(updatedInventory);
    setMovements(prev => [...newMovements, ...prev]);
  };

  const contextValue = useMemo(() => ({
    inventory: inventory.map(item => ({ ...item, status: getStockStatus(item.available, item.reorderLevel) })),
    warehouses,
    movements,
    reservations,
    getWarehouse,
    getProductInventory,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    adjustStock,
    transferStock,
    reserveStock,
    releaseReservation,
    fulfillReservation,
    processReturn
  }), [inventory, warehouses, movements, reservations]);

  return (
    <InventoryContext.Provider value={contextValue}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
