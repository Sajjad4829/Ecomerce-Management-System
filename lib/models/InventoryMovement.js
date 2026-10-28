import mongoose from 'mongoose';

const inventoryMovementSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  sku: { type: String },
  type: { type: String, enum: ['Initial', 'Adjustment', 'Sale', 'Return', 'Transfer', 'Damaged', 'Correction'], required: true },
  quantity: { type: Number, required: true },
  reason: { type: String },
  fromWarehouseId: { type: String },
  toWarehouseId: { type: String },
  warehouseId: { type: String }, // For single warehouse changes like adjustments
}, { timestamps: true });

export default mongoose.models.InventoryMovement || mongoose.model('InventoryMovement', inventoryMovementSchema);
