/**
 * lib/models/Category.js
 * ----------------------
 * Mongoose schema & model for the "categories" collection.
 *
 * Matches the shape used by CategoryContext.jsx and the categories API.
 */

import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

// ── Schema ────────────────────────────────────────────────────────────────────

const CategorySchema = new Schema(
  {
    // Human-readable unique identifier (e.g. "cat-1")
    // We keep this as a string 'id' alongside MongoDB's '_id' so that
    // existing frontend code that references item.id continues to work.
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [100, 'Category name cannot exceed 100 characters'],
    },

    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase, hyphens only)'],
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    // Parent category ID (string, matching the 'id' field above — not ObjectId)
    // null = root-level category
    parentId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Draft', 'published', 'archived'],
      default: 'Active',
    },

    image: {
      type: String, // URL or path
      default: null,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    // SEO fields
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },

    // Additional free-form metadata
    attributes: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,

    // When converting to JSON (e.g. res.json()), include virtuals
    // and transform _id → keep both _id and id
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        // Remove internal Mongoose version key
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────

CategorySchema.index({ parentId: 1 });
CategorySchema.index({ status: 1 });
CategorySchema.index({ slug: 1 });

// ── Model ─────────────────────────────────────────────────────────────────────

// Guard against model recompilation errors in hot-reload environments
const Category = models.Category || model('Category', CategorySchema);

export default Category;
