import { inventoryService } from './InventoryService';

// Centralized state container for Inventory (Mock)
export class InventoryStore {
  constructor() {
    this.service = inventoryService;
  }

  loadInventory() {
    return this.service.getInventory();
  }

  adjustStock(sku, warehouse, qty, reason) {
    console.log('Stock adjusted', { sku, warehouse, qty, reason });
  }

  createTransfer(source, dest, items) {
    console.log('Transfer created', { source, dest, items });
  }

  createSupplier(supplier) {
    console.log('Supplier created', supplier);
  }

  createPurchaseOrder(po) {
    console.log('PO created', po);
  }
}

export const inventoryStore = new InventoryStore();
