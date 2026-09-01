/**
 * lib/models/Brand.js
 * Mongoose schema for the "brands" collection.
 */
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const BrandSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: [true, 'Brand name is required'], trim: true, maxlength: 100 },
  slug: { type: String, required: true, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  logo: { type: String, default: '' },
  website: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive', 'Draft'], default: 'Active' },
  country: { type: String, default: '' },
  foundedYear: { type: Number, default: null },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  productCount: { type: Number, default: 0 },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_d, r) => { delete r.__v; return r; } },
  toObject: { virtuals: true },
});

BrandSchema.index({ slug: 1 });
BrandSchema.index({ status: 1 });

const Brand = models.Brand || model('Brand', BrandSchema);
export default Brand;
