import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
const Inv = mongoose.connection.collection('inventories');

const bad = await Inv.find({ availableQuantity: { $lt: 0 } }).toArray();
console.log('Negative stock records found:', bad.length);
bad.forEach(r => console.log(' -', r.productId, 'warehouse:', r.warehouseId, 'qty:', r.availableQuantity));

const result = await Inv.updateMany(
  { availableQuantity: { $lt: 0 } },
  { $set: { availableQuantity: 0, status: 'Out of Stock' } }
);
console.log('Fixed:', result.modifiedCount, 'records');
await mongoose.disconnect();
