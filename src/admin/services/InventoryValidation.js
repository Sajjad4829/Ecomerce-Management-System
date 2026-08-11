export function validateStockAdjustment(skuId, warehouseId, currentQty, adjustQty) {
  if (!skuId || !warehouseId) throw new Error('SKU and Warehouse are required');
  if (currentQty + adjustQty < 0) throw new Error('Stock cannot be negative');
  return true;
}

export function validateTransfer(sourceId, destId, items) {
  if (sourceId === destId) throw new Error('Source and Destination cannot be the same');
  if (!items || items.length === 0) throw new Error('Items required for transfer');
  return true;
}

export function validatePurchaseOrder(supplierId, warehouseId, items) {
  if (!supplierId || !warehouseId) throw new Error('Supplier and Warehouse are required');
  if (!items || items.length === 0) throw new Error('Items required for PO');
  return true;
}

export function validateReceiving(poId, receivedItems) {
  if (!poId) throw new Error('Purchase Order required');
  if (!receivedItems || receivedItems.length === 0) throw new Error('No items received');
  return true;
}
