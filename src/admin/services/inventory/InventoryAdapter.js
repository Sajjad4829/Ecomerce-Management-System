export class InventoryAdapter {
  constructor(client) {
    this.client = client;
  }
  
  toDomain(apiItem) {
    return {
      id: apiItem.id,
      productId: apiItem.product_id,
      warehouseId: apiItem.warehouse_id,
      available: apiItem.available_qty,
      reserved: apiItem.reserved_qty,
      status: apiItem.status
    };
  }
}
