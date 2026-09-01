import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const MediaAssetSchema = new Schema({
  id: { type: String, required: true, unique: true },
  filename: { type: String, required: true },
  title: { type: String, default: '' },
  altText: { type: String, default: '' },
  type: { type: String, default: 'Image' }, // Image, Video, Document
  mimeType: { type: String, default: 'application/octet-stream' },
  size: { type: Number, default: 0 },
  width: { type: Number, default: null },
  height: { type: Number, default: null },
  url: { type: String, required: true }, // Cloudinary secure_url
  publicId: { type: String, default: '' }, // Cloudinary public_id for deletion
  folderId: { type: String, default: 'all' },
  collectionIds: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['Active', 'Archived'], default: 'Active' },
  isFavorite: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_d, r) => { delete r.__v; return r; } },
  toObject: { virtuals: true }
});

MediaAssetSchema.index({ type: 1 });
MediaAssetSchema.index({ status: 1 });

const MediaAsset = models.MediaAsset || model('MediaAsset', MediaAssetSchema);
export default MediaAsset;
