/**
 * lib/models/CMSConfig.js
 * Singleton config document for CMS global settings:
 * header config, footer config, global styles, page types.
 */
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const CMSConfigSchema = new Schema({
  storeId: { type: String, required: true, unique: true, default: 'default' },

  // Header/Navbar configuration
  headerConfig: {
    type: Schema.Types.Mixed,
    default: {
      primaryMenuId: 'MNU-001',
      logoType: 'text',
      logoText: 'HATIL',
      logoImage: '',
      enableSearch: true,
      enableUser: true,
      enableCart: true,
      navbarStyle: 'default',
      backgroundColor: '#FFFFFF',
      textColor: '#111111',
      textHoverColor: '#6F4CFF',
      borderBottomStyle: 'solid',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      borderRadius: 0,
      containerWidth: 'Full Width',
      contentAlignment: 'center',
      verticalAlignment: 'center',
      height: 72,
      paddingTop: 16, paddingRight: 24, paddingBottom: 16, paddingLeft: 24,
      fontFamily: 'Inter',
      fontSize: 15,
      fontWeight: '500',
      textTransform: 'None',
      letterSpacing: 0,
    },
  },

  // Footer configuration
  footerConfig: { type: Schema.Types.Mixed, default: {} },

  // Navigation Menus
  menus: {
    type: Schema.Types.Mixed,
    default: [
      { id: 'MNU-001', name: 'Main Header Navigation', type: 'Header', status: 'Active', items: [] },
      { id: 'MNU-002', name: 'Footer Links', type: 'Footer', status: 'Active', items: [] },
      { id: 'MNU-003', name: 'Mobile Sidebar', type: 'Mobile', status: 'Active', items: [] },
    ],
  },

  // Global theme / style settings
  globalStyles: { type: Schema.Types.Mixed, default: {} },

  // Page types (Home, Landing, Category, etc.)
  pageTypes: {
    type: Schema.Types.Mixed,
    default: [
      { id: 'PT-001', name: 'Home', slug: 'home', description: 'Homepage templates', template: 'default-home', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-002', name: 'Landing Page', slug: 'landing-page', description: 'Marketing landing pages', template: 'landing', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-003', name: 'Category Page', slug: 'category', description: 'Product category pages', template: 'category', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-004', name: 'Collection Page', slug: 'collection', description: 'Curated collections', template: 'collection', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-005', name: 'Campaign Page', slug: 'campaign', description: 'Time-bound campaigns', template: 'campaign', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-006', name: 'Product Listing Page', slug: 'plp', description: 'Standard product listings', template: 'plp', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-007', name: 'Brand Page', slug: 'brand', description: 'Brand story pages', template: 'brand', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-008', name: 'About Page', slug: 'about', description: 'Company information', template: 'about', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-009', name: 'Contact Page', slug: 'contact', description: 'Contact forms and info', template: 'contact', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-010', name: 'Blog / Content Page', slug: 'blog', description: 'Articles and content', template: 'blog', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'PT-011', name: 'Custom Page', slug: 'custom', description: 'Blank canvas', template: 'blank', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    ],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_d, r) => { delete r.__v; return r; } },
});

const CMSConfig = models.CMSConfig || model('CMSConfig', CMSConfigSchema);
export default CMSConfig;
