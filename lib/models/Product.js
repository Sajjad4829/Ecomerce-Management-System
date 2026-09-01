/**
 * lib/models/Product.js
 * Mongoose schema for the "products" collection.
 */
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const VariantSchema = new Schema({
  id: { type: String, required: true },
  sku: { type: String, default: '' },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  comparePrice: { type: Number, default: null },
  stock: { type: Number, default: 0 },
  attributes: { type: Map, of: String, default: {} },
  image: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive', 'Draft'], default: 'Active' },
}, { _id: false });

const ImageSchema = new Schema({
  id: { type: String },
  url: { type: String, default: '' },
  alt: { type: String, default: '' },
  isPrimary: { type: Boolean, default: false },
}, { _id: false });

const SEOSchema = new Schema({
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  keywords: [{ type: String }],
}, { _id: false });

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 200 },
  slug: { type: String, required: true, trim: true, lowercase: true },
  sku: { type: String, default: '', trim: true },
  description: { type: String, default: '', trim: true },
  shortDescription: { type: String, default: '', trim: true },
  price: { type: Number, required: true, min: 0, default: 0 },
  comparePrice: { type: Number, default: null },
  costPrice: { type: Number, default: null },
  status: { type: String, enum: ['Active', 'Draft', 'Archived', 'Inactive'], default: 'Draft' },
  categoryId: { type: String, default: null },
  brandId: { type: String, default: null },
  tags: [{ type: String }],
  images: { type: [ImageSchema], default: [] },
  variants: { type: [VariantSchema], default: [] },
  hasVariants: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  trackInventory: { type: Boolean, default: true },
  weight: { type: Number, default: 0 },
  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    unit: { type: String, default: 'cm' },
  },
  seo: { type: SEOSchema, default: () => ({}) },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  publishedAt: { type: Date, default: null },
  attributes: { type: Map, of: Schema.Types.Mixed, default: {} },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_d, r) => { delete r.__v; return r; } },
  toObject: { virtuals: true },
});

ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ brandId: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ name: 'text', description: 'text', sku: 'text' });

const Product = models.Product || model('Product', ProductSchema);
export default Product;
