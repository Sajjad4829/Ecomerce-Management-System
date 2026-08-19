import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { inventoryService } from '../services/InventoryService';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mock load
    setData(inventoryService.getInventory());
  }, []);

  const adjustStock = (skuId, adjustment, reason = '') => {
    const sku = inventoryService.skus.find(s => s.id === skuId);
    if (!sku) return;
    
    const oldStock = sku.warehouseStock;
    const newStock = oldStock + adjustment;
    
    // In a real app, you would mutate state or call an API. Here we just mock the audit log
    import('../services/audit/AuditService').then(({ auditService }) => {
      auditService.createAuditEvent({
        action: 'STOCK_ADJUSTED',
        module: 'Inventory',
        resourceType: 'SKU',
        resourceId: skuId,
        resourceName: sku.product,
        severity: 'Medium',
        metadata: { oldStock, newStock, adjustment, reason }
      });
    });

    import('../services/notification/NotificationService').then(({ notificationService }) => {
      if (newStock <= 0) {
        notificationService.createNotification({
          type: 'Inventory',
          title: `Out of Stock: ${sku.product}`,
          message: `Stock for ${sku.product} (${sku.variant}) has reached zero.`,
          priority: 'Critical',
          module: 'Inventory',
          entityId: skuId,
          entityType: 'SKU',
          eventId: `inv_oos_${skuId}_${newStock}`,
          actionUrl: `/admin/inventory/skus/${skuId}`
        });
      } else if (newStock <= (sku.reorderLevel || 10)) {
        notificationService.createNotification({
          type: 'Inventory',
          title: `Low Stock: ${sku.product}`,
          message: `Stock for ${sku.product} (${sku.variant}) has dropped below threshold (${newStock} left).`,
          priority: 'High',
          module: 'Inventory',
          entityId: skuId,
          entityType: 'SKU',
          eventId: `inv_low_${skuId}_${newStock}`,
          actionUrl: `/admin/inventory/skus/${skuId}`
        });
      }
    });
  };

  const value = useMemo(() => ({
    data,
    service: inventoryService,
    adjustStock
  }), [data]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
