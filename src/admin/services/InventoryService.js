export class InventoryService {
  constructor() {
    this.skus = [
      { id: 'SKU-001', product: 'Aero Lounge Chair', variant: 'Leather / Black', code: 'AERO-LTH-BLK', warehouseStock: 45, available: 40, reserved: 5, incoming: 0, reorderLevel: 10, status: 'In Stock' },
      { id: 'SKU-002', product: 'Aero Lounge Chair', variant: 'Leather / Tan', code: 'AERO-LTH-TAN', warehouseStock: 8, available: 8, reserved: 0, incoming: 20, reorderLevel: 10, status: 'Low Stock' },
      { id: 'SKU-003', product: 'Strata Coffee Table', variant: 'Oak / 48"', code: 'STRATA-OAK-48', warehouseStock: 0, available: 0, reserved: 0, incoming: 50, reorderLevel: 5, status: 'Out of Stock' }
    ];

    this.warehouses = [
      { id: 'WH-001', name: 'West Coast Distribution Center', code: 'WC-DC', location: 'Los Angeles, CA', status: 'Active', skuCount: 1250, stock: 45200 },
      { id: 'WH-002', name: 'East Coast Distribution Center', code: 'EC-DC', location: 'Newark, NJ', status: 'Active', skuCount: 840, stock: 32100 },
      { id: 'WH-003', name: 'Central Return Hub', code: 'CEN-RET', location: 'Chicago, IL', status: 'Active', skuCount: 420, stock: 5400 }
    ];

    this.movements = [
      { id: 'MOV-10492', sku: 'SKU-001', product: 'Aero Lounge Chair', warehouse: 'West Coast Distribution Center', type: 'Sale', quantity: -2, reference: 'ORD-9921', user: 'System', date: '2023-10-24T14:22:00Z', status: 'Completed' },
      { id: 'MOV-10491', sku: 'SKU-003', product: 'Strata Coffee Table', warehouse: 'East Coast Distribution Center', type: 'Purchase', quantity: 50, reference: 'PO-2023-088', user: 'J. Smith', date: '2023-10-23T09:15:00Z', status: 'Completed' },
      { id: 'MOV-10490', sku: 'SKU-002', product: 'Aero Lounge Chair', warehouse: 'Central Return Hub', type: 'Return', quantity: 1, reference: 'RET-4492', user: 'System', date: '2023-10-22T16:45:00Z', status: 'Completed' }
    ];

    this.transfers = [
      { id: 'TRF-0091', source: 'West Coast Distribution Center', destination: 'East Coast Distribution Center', items: 2, quantities: 45, status: 'In Transit', createdBy: 'A. Chen', date: '2023-10-20T10:00:00Z' }
    ];

    this.suppliers = [
      { id: 'SUP-001', name: 'Global Furniture Corp', code: 'GFC', contact: 'orders@globalfurniture.com', products: 145, purchaseOrders: 12, status: 'Active' },
      { id: 'SUP-002', name: 'Nordic Woods', code: 'NWD', contact: 'sales@nordicwoods.fi', products: 42, purchaseOrders: 8, status: 'Active' },
      { id: 'SUP-003', name: 'Modern Metals Inc', code: 'MMI', contact: 'supply@modernmetals.com', products: 86, purchaseOrders: 24, status: 'Active' }
    ];

    this.purchaseOrders = [
      { id: 'PO-2023-089', supplier: 'Global Furniture Corp', warehouse: 'West Coast Distribution Center', items: 5, total: '$14,500', status: 'Ordered', expectedDate: '2023-11-15', createdDate: '2023-10-10' },
      { id: 'PO-2023-090', supplier: 'Nordic Woods', warehouse: 'East Coast Distribution Center', items: 2, total: '$8,200', status: 'Pending Approval', expectedDate: '2023-12-01', createdDate: '2023-10-22' },
      { id: 'PO-2023-088', supplier: 'Modern Metals Inc', warehouse: 'East Coast Distribution Center', items: 8, total: '$22,400', status: 'Received', expectedDate: '2023-10-20', createdDate: '2023-09-15' }
    ];

    this.receiving = [
       { id: 'REC-0042', po: 'PO-2023-088', supplier: 'Modern Metals Inc', warehouse: 'East Coast Distribution Center', items: 8, quantities: 120, receiver: 'M. Johnson', date: '2023-10-23', status: 'Received' }
    ];
  }

  getInventory() { return { skus: this.skus, totalSkus: 2510, totalStock: 82700, lowStock: 145, outOfStock: 22 }; }
  getSKUs() { return this.skus; }
  getWarehouses() { return this.warehouses; }
  getMovements() { return this.movements; }
  getTransfers() { return this.transfers; }
  getLowStock() { return this.skus.filter(s => s.status === 'Low Stock'); }
  getOutOfStock() { return this.skus.filter(s => s.status === 'Out of Stock'); }
  getSuppliers() { return this.suppliers; }
  getPurchaseOrders() { return this.purchaseOrders; }
  getReceiving() { return this.receiving; }
}

export const inventoryService = new InventoryService();
