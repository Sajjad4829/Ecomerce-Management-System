/**
 * lib/models/CMSPage.js
 * Mongoose schema for CMS pages and their section content.
 */
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

// A single content section block within a page
const SectionSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // 'hero', 'banner', 'grid', 'text', etc.
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  data: { type: Schema.Types.Mixed, default: {} }, // free-form section config
}, { _id: false, strict: false });

const CMSPageSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: [true, 'Page title is required'], trim: true },
  slug: { type: String, required: true, trim: true, lowercase: true },
  type: { type: String, default: 'custom' }, // 'home','landing','category', etc.
  pageTypeId: { type: String, default: null },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  // Two-stage content: draft is the work-in-progress, published is what's live
  sectionsDraft: { type: [SectionSchema], default: [] },
  sectionsPublished: { type: [SectionSchema], default: [] },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
    ogImage: { type: String, default: '' },
  },
  publishedAt: { type: Date, default: null },
  author: { type: String, default: 'admin' },
  template: { type: String, default: 'blank' },
  settings: { type: Schema.Types.Mixed, default: {} },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_d, r) => { delete r.__v; return r; } },
  toObject: { virtuals: true },
});

CMSPageSchema.index({ slug: 1 });
CMSPageSchema.index({ status: 1 });
CMSPageSchema.index({ type: 1 });

const CMSPage = models.CMSPage || model('CMSPage', CMSPageSchema);
export default CMSPage;
