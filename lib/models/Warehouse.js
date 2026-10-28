import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String },
  location: { type: String },
  contact: { type: String },
  phone: { type: String },
  email: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

export default mongoose.models.Warehouse || mongoose.model('Warehouse', warehouseSchema);
