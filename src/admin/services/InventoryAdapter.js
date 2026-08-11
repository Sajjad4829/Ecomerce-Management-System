export class InventoryAdapter {
  constructor() {
    this.apiBase = '/api/inventory';
  }

  // Future integration points
  async fetchInventory() {
    return Promise.resolve([]);
  }

  async syncWithERP() {
    return Promise.resolve(true);
  }
}

export const inventoryAdapter = new InventoryAdapter();
