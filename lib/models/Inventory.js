import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  sku: { type: String },
  warehouseId: { type: String, required: true },
  availableQuantity: { type: Number, default: 0 },
  reservedQuantity: { type: Number, default: 0 },
  reorderLevel: { type: Number, default: 0 },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock', 'Not Stocked'], default: 'Not Stocked' }
}, { timestamps: true });

export default mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
