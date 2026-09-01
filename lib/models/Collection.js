/**
 * lib/models/Collection.js
 * Mongoose schema for the "collections" collection.
 */
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const RuleSchema = new Schema({
  id: { type: String },
  field: { type: String, default: 'name' },
  operator: { type: String, default: 'contains' },
  value: { type: String, default: '' },
}, { _id: false });

const CollectionSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: [true, 'Collection name is required'], trim: true, maxlength: 150 },
  slug: { type: String, required: true, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  image: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Draft', 'Archived', 'Inactive'], default: 'Draft' },
  type: { type: String, enum: ['manual', 'automatic'], default: 'manual' },
  // Manual: explicit product IDs
  productIds: [{ type: String }],
  // Automatic: rule-based
  rules: { type: [RuleSchema], default: [] },
  matchMode: { type: String, enum: ['all', 'any'], default: 'all' },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  publishedAt: { type: Date, default: null },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_d, r) => { delete r.__v; return r; } },
  toObject: { virtuals: true },
});

CollectionSchema.index({ slug: 1 });
CollectionSchema.index({ status: 1 });
CollectionSchema.index({ type: 1 });

const Collection = models.Collection || model('Collection', CollectionSchema);
export default Collection;
