/**
 * lib/seed.js
 * -----------
 * Seeds all collections in the "furniture-ecommerce" MongoDB database.
 * Safe to run multiple times — uses upsert and checks for existing docs.
 *
 * Run with:  node lib/seed.js
 */

import 'dotenv/config';
import connectDB from './db.js';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Navbar from './models/Navbar.js';
import Product from './models/Product.js';
import Brand from './models/Brand.js';
import Collection from './models/Collection.js';
import CMSPage from './models/CMSPage.js';
import CMSConfig from './models/CMSConfig.js';

console.log('\n🌱  Starting database seed...\n');

await connectDB();

// ── Helper: upsert a document by its string 'id' field ───────────────────────
const upsert = async (Model, docs) => {
  let count = 0;
  for (const doc of docs) {
    await Model.findOneAndUpdate({ id: doc.id }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
    count++;
  }
  return count;
};

// =============================================================================
// CATEGORIES
// =============================================================================

const categories = [
  { id: 'cat-living', name: 'Living Room', slug: 'living-room', parentId: null, status: 'Active', description: 'Sofas, armchairs, coffee tables and more', image: '', sortOrder: 1, seo: { metaTitle: 'Living Room Furniture', metaDescription: '' } },
  { id: 'cat-bedroom', name: 'Bedroom', slug: 'bedroom', parentId: null, status: 'Active', description: 'Beds, wardrobes, nightstands and dressers', image: '', sortOrder: 2, seo: { metaTitle: 'Bedroom Furniture', metaDescription: '' } },
  { id: 'cat-dining', name: 'Dining Room', slug: 'dining-room', parentId: null, status: 'Active', description: 'Dining tables, chairs and sideboards', image: '', sortOrder: 3, seo: { metaTitle: 'Dining Room Furniture', metaDescription: '' } },
  { id: 'cat-office', name: 'Home Office', slug: 'home-office', parentId: null, status: 'Active', description: 'Desks, chairs and office storage', image: '', sortOrder: 4, seo: { metaTitle: 'Home Office Furniture', metaDescription: '' } },
  { id: 'cat-outdoor', name: 'Outdoor', slug: 'outdoor', parentId: null, status: 'Active', description: 'Patio furniture and garden seating', image: '', sortOrder: 5, seo: { metaTitle: 'Outdoor Furniture', metaDescription: '' } },
  { id: 'cat-sofa', name: 'Sofas', slug: 'sofas', parentId: 'cat-living', status: 'Active', description: '3-seater, L-shape and sofa beds', image: '', sortOrder: 1 },
  { id: 'cat-bed', name: 'Beds', slug: 'beds', parentId: 'cat-bedroom', status: 'Active', description: 'Single, double, queen and king', image: '', sortOrder: 1 },
];

const catCount = await upsert(Category, categories);
console.log(`✅  Seeded ${catCount} categories into MongoDB.`);

// =============================================================================
// BRANDS
// =============================================================================

const brands = [
  { id: 'brand-hatil', name: 'HATIL', slug: 'hatil', description: 'Premium Bangladeshi furniture brand since 1989', logo: '', website: 'https://hatil.com', status: 'Active', country: 'Bangladesh', foundedYear: 1989, isFeatured: true },
  { id: 'brand-otobi', name: 'Otobi', slug: 'otobi', description: 'Affordable quality furniture for modern homes', logo: '', website: 'https://otobi.com.bd', status: 'Active', country: 'Bangladesh', foundedYear: 1975, isFeatured: true },
  { id: 'brand-navana', name: 'Navana', slug: 'navana', description: 'Contemporary furniture designs', logo: '', website: '', status: 'Active', country: 'Bangladesh', foundedYear: 2000, isFeatured: false },
  { id: 'brand-otobi-int', name: 'Ashley Furniture', slug: 'ashley-furniture', description: "America's largest furniture manufacturer", logo: '', website: 'https://ashleyfurniture.com', status: 'Active', country: 'USA', foundedYear: 1945, isFeatured: true },
  { id: 'brand-ikea', name: 'IKEA', slug: 'ikea', description: 'Flat-pack modern furniture at affordable prices', logo: '', website: 'https://ikea.com', status: 'Active', country: 'Sweden', foundedYear: 1943, isFeatured: true },
];

const brandCount = await upsert(Brand, brands);
console.log(`✅  Seeded ${brandCount} brands into MongoDB.`);

// =============================================================================
// PRODUCTS
// =============================================================================

const products = [
  {
    id: 'prod-001', name: 'Nordic L-Shape Sofa', slug: 'nordic-l-shape-sofa', sku: 'SOFA-NL-001',
    description: 'Premium Nordic-style L-shape sofa with deep cushioning and solid wood legs. Upholstered in high-grade linen fabric.',
    shortDescription: 'Premium Nordic L-shape sofa with solid wood legs', price: 85000, comparePrice: 95000,
    status: 'Active', categoryId: 'cat-sofa', brandId: 'brand-hatil',
    tags: ['sofa', 'living-room', 'nordic', 'featured'], stock: 12, isFeatured: true,
    images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', alt: 'Nordic L-Shape Sofa', isPrimary: true }],
    seo: { metaTitle: 'Nordic L-Shape Sofa – Premium Linen', metaDescription: 'Premium Nordic-style L-shape sofa' },
  },
  {
    id: 'prod-002', name: 'Milano Bed Frame King', slug: 'milano-bed-frame-king', sku: 'BED-ML-001',
    description: 'Elegant Milano-style king-size bed frame with upholstered headboard and solid beechwood slats. Available in grey and cream.',
    shortDescription: 'King-size Milano bed frame with upholstered headboard', price: 65000, comparePrice: 72000,
    status: 'Active', categoryId: 'cat-bed', brandId: 'brand-hatil',
    tags: ['bed', 'bedroom', 'king-size', 'featured'], stock: 8, isFeatured: true,
    images: [{ id: 'img-2', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', alt: 'Milano Bed Frame', isPrimary: true }],
    seo: { metaTitle: 'Milano King Bed Frame – Upholstered', metaDescription: '' },
  },
  {
    id: 'prod-003', name: 'Scandinavian Dining Table', slug: 'scandinavian-dining-table', sku: 'DIN-SC-001',
    description: 'Solid oak dining table with clean Scandinavian lines. Seats 6 comfortably. Perfect for family gatherings.',
    shortDescription: '6-seater solid oak Scandinavian dining table', price: 45000, comparePrice: null,
    status: 'Active', categoryId: 'cat-dining', brandId: 'brand-otobi',
    tags: ['dining', 'dining-table', 'oak', 'scandinavian'], stock: 15, isFeatured: false,
    images: [{ id: 'img-3', url: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800', alt: 'Dining Table', isPrimary: true }],
    seo: { metaTitle: 'Scandinavian Dining Table – Solid Oak', metaDescription: '' },
  },
  {
    id: 'prod-004', name: 'Executive Office Desk', slug: 'executive-office-desk', sku: 'DESK-EX-001',
    description: 'Wide executive desk with built-in cable management, lockable drawer and tempered glass top. Ideal for home office.',
    shortDescription: 'Executive office desk with glass top and storage', price: 38000, comparePrice: 42000,
    status: 'Active', categoryId: 'cat-office', brandId: 'brand-navana',
    tags: ['desk', 'office', 'executive', 'home-office'], stock: 20, isFeatured: true,
    images: [{ id: 'img-4', url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', alt: 'Executive Desk', isPrimary: true }],
    seo: { metaTitle: 'Executive Home Office Desk', metaDescription: '' },
  },
  {
    id: 'prod-005', name: 'Velvet Accent Armchair', slug: 'velvet-accent-armchair', sku: 'CHAIR-VA-001',
    description: 'Statement velvet accent chair in deep teal. Solid birch wood frame with hand-tufted cushioning. A perfect reading chair.',
    shortDescription: 'Velvet tufted accent armchair – deep teal', price: 28000, comparePrice: 32000,
    status: 'Active', categoryId: 'cat-living', brandId: 'brand-hatil',
    tags: ['armchair', 'velvet', 'accent', 'living-room'], stock: 25, isFeatured: true,
    images: [{ id: 'img-5', url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', alt: 'Velvet Armchair', isPrimary: true }],
    seo: { metaTitle: 'Velvet Accent Armchair – Teal', metaDescription: '' },
  },
  {
    id: 'prod-006', name: 'Rattan Outdoor Sofa Set', slug: 'rattan-outdoor-sofa-set', sku: 'OUT-RT-001',
    description: 'Weather-resistant PE rattan outdoor sofa set (3-seater + 2 armchairs + coffee table). All-weather cushions included.',
    shortDescription: 'PE rattan 5-piece outdoor sofa set with cushions', price: 72000, comparePrice: 82000,
    status: 'Active', categoryId: 'cat-outdoor', brandId: 'brand-ikea',
    tags: ['outdoor', 'rattan', 'garden', 'patio'], stock: 6, isFeatured: false,
    images: [{ id: 'img-6', url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=800', alt: 'Rattan Outdoor Set', isPrimary: true }],
    seo: { metaTitle: 'Rattan Outdoor Sofa Set – 5 Piece', metaDescription: '' },
  },
  {
    id: 'prod-007', name: 'Wooden Wardrobe 3-Door', slug: 'wooden-wardrobe-3-door', sku: 'WARD-WD-001',
    description: '3-door engineered wood wardrobe with hanging rail, 4 shelves and a built-in mirror. Available in oak and walnut finish.',
    shortDescription: '3-door wardrobe with mirror and shelving', price: 52000, comparePrice: null,
    status: 'Active', categoryId: 'cat-bedroom', brandId: 'brand-otobi',
    tags: ['wardrobe', 'bedroom', 'storage', '3-door'], stock: 10, isFeatured: false,
    images: [{ id: 'img-7', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', alt: 'Wooden Wardrobe', isPrimary: true }],
    seo: { metaTitle: '3-Door Wooden Wardrobe with Mirror', metaDescription: '' },
  },
  {
    id: 'prod-008', name: 'Marble Coffee Table', slug: 'marble-coffee-table', sku: 'TABLE-MC-001',
    description: 'Italian marble top coffee table on a black powder-coated steel frame. A luxurious centrepiece for any living room.',
    shortDescription: 'Marble top coffee table with steel frame', price: 32000, comparePrice: 38000,
    status: 'Active', categoryId: 'cat-living', brandId: 'brand-hatil',
    tags: ['coffee-table', 'marble', 'living-room', 'luxury'], stock: 18, isFeatured: true,
    images: [{ id: 'img-8', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', alt: 'Marble Coffee Table', isPrimary: true }],
    seo: { metaTitle: 'Marble Coffee Table – Italian Marble', metaDescription: '' },
  },
  {
    id: 'prod-009', name: 'Ergonomic Office Chair', slug: 'ergonomic-office-chair', sku: 'CHAIR-ERG-001',
    description: 'High-back ergonomic mesh office chair with lumbar support, adjustable armrests, and breathable mesh back. For all-day comfort.',
    shortDescription: 'Ergonomic mesh office chair with lumbar support', price: 22000, comparePrice: 26000,
    status: 'Active', categoryId: 'cat-office', brandId: 'brand-otobi-int',
    tags: ['chair', 'office', 'ergonomic', 'mesh'], stock: 30, isFeatured: false,
    images: [{ id: 'img-9', url: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&q=80&w=800', alt: 'Ergonomic Chair', isPrimary: true }],
    seo: { metaTitle: 'Ergonomic Mesh Office Chair', metaDescription: '' },
  },
  {
    id: 'prod-010', name: 'Minimal Dining Chair (Set of 2)', slug: 'minimal-dining-chair-set-2', sku: 'CHAIR-DIN-001',
    description: 'Set of 2 minimal Scandinavian dining chairs with solid beechwood legs and padded seat. Available in 4 colours.',
    shortDescription: 'Set of 2 Scandinavian dining chairs', price: 14000, comparePrice: 16000,
    status: 'Active', categoryId: 'cat-dining', brandId: 'brand-ikea',
    tags: ['dining-chair', 'dining', 'scandinavian', 'set-of-2'], stock: 40, isFeatured: false,
    images: [{ id: 'img-10', url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', alt: 'Dining Chairs', isPrimary: true }],
    seo: { metaTitle: 'Scandinavian Dining Chairs – Set of 2', metaDescription: '' },
  },
];

const prodCount = await upsert(Product, products);
console.log(`✅  Seeded ${prodCount} products into MongoDB.`);

// =============================================================================
// COLLECTIONS
// =============================================================================

const collections = [
  {
    id: 'col-featured', name: 'Featured Products', slug: 'featured-products',
    description: 'Our hand-picked featured items', status: 'Active', type: 'automatic',
    rules: [{ id: 'r1', field: 'isFeatured', operator: 'equals', value: 'true' }], matchMode: 'all',
    isFeatured: true, seo: { metaTitle: 'Featured Furniture', metaDescription: '' },
  },
  {
    id: 'col-living', name: 'Living Room Collection', slug: 'living-room-collection',
    description: 'Everything you need for the perfect living room', status: 'Active', type: 'manual',
    productIds: ['prod-001', 'prod-005', 'prod-008'], isFeatured: true,
    seo: { metaTitle: 'Living Room Furniture Collection', metaDescription: '' },
  },
  {
    id: 'col-bestsellers', name: 'Best Sellers', slug: 'best-sellers',
    description: 'Our most popular furniture pieces', status: 'Active', type: 'manual',
    productIds: ['prod-001', 'prod-002', 'prod-004', 'prod-005'], isFeatured: true,
    seo: { metaTitle: 'Best Selling Furniture', metaDescription: '' },
  },
  {
    id: 'col-office', name: 'Home Office Setup', slug: 'home-office-setup',
    description: 'Create your perfect work from home space', status: 'Active', type: 'manual',
    productIds: ['prod-004', 'prod-009'], isFeatured: false,
    seo: { metaTitle: 'Home Office Furniture', metaDescription: '' },
  },
];

const colCount = await upsert(Collection, collections);
console.log(`✅  Seeded ${colCount} collections into MongoDB.`);

// =============================================================================
// NAVBAR
// =============================================================================

const navbarExists = await Navbar.findOne({ storeId: 'default' });
if (!navbarExists) {
  await Navbar.create({ storeId: 'default', navItems: [] });
  console.log(`✅  Seeded Navbar configuration into MongoDB.`);
} else {
  console.log(`ℹ️   Navbar already exists, skipping.`);
}

// =============================================================================
// CMS PAGES
// =============================================================================

const cmsPages = [
  {
    id: 'page-home', title: 'Home Page', slug: 'home', type: 'home',
    status: 'published', author: 'Admin', template: 'default-home',
    seo: { metaTitle: 'Home – Premium Furniture Store', metaDescription: 'Discover premium furniture for every room of your home.' },
    sectionsDraft: [], sectionsPublished: [],
  },
  {
    id: 'page-about', title: 'About Us', slug: 'about', type: 'custom',
    status: 'published', author: 'Admin', template: 'about',
    seo: { metaTitle: 'About Us – Premium Furniture Store', metaDescription: 'Learn about our story and craftsmanship.' },
    sectionsDraft: [], sectionsPublished: [],
  },
  {
    id: 'page-contact', title: 'Contact Us', slug: 'contact', type: 'custom',
    status: 'published', author: 'Admin', template: 'contact',
    seo: { metaTitle: 'Contact Us – Premium Furniture Store', metaDescription: 'Get in touch with our team.' },
    sectionsDraft: [], sectionsPublished: [],
  },
];

const pageCount = await upsert(CMSPage, cmsPages);
console.log(`✅  Seeded ${pageCount} CMS pages into MongoDB.`);

// =============================================================================
// CMS CONFIG (Header + Page Types)
// =============================================================================

const cmsConfigExists = await CMSConfig.findOne({ storeId: 'default' });
if (!cmsConfigExists) {
  await CMSConfig.create({ storeId: 'default' });
  console.log(`✅  Seeded CMS Config (header + page types) into MongoDB.`);
} else {
  console.log(`ℹ️   CMS Config already exists, skipping.`);
}

// =============================================================================
// DONE
// =============================================================================

console.log('\n🎉  Database seeding complete!\n');

await mongoose.connection.close();
console.log('🔌  MongoDB connection closed.\n');
