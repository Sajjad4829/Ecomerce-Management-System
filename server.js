/**
 * server.js
 * ---------
 * Express API server — powered by MongoDB via Mongoose.
 * Covers: Categories, Navbar, Products, Brands, Collections, CMS Pages, CMS Config
 *
 * Start with:   node server.js
 * Seed first:   node lib/seed.js
 */

import 'dotenv/config';
import express from 'express';
import connectDB from './lib/db.js';
import Category from './lib/models/Category.js';
import Navbar from './lib/models/Navbar.js';
import Product from './lib/models/Product.js';
import Brand from './lib/models/Brand.js';
import Collection from './lib/models/Collection.js';
import CMSPage from './lib/models/CMSPage.js';
import CMSConfig from './lib/models/CMSConfig.js';
import SectionConfiguration from './lib/models/SectionConfiguration.js';
import MediaAsset from './lib/models/MediaAsset.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS for local dev (Vite proxy handles this in prod)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const PORT = process.env.PORT || 3001;

// Connect to MongoDB before handling any requests
await connectDB();

// =============================================================================
// HEALTH CHECK
// =============================================================================

app.get('/api/health', (_req, res) => {
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: 'ok',
    mongodb: states[mongoose.connection.readyState] || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

// =============================================================================
// CATEGORIES API
// =============================================================================

app.get('/api/categories', async (req, res) => {
  try {
    const { status, hasChildren, parentId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (parentId !== undefined) filter.parentId = parentId === 'null' ? null : parentId;

    let categories = await Category.find(filter).lean();

    if (hasChildren === 'true') {
      const allCategories = await Category.find({}).lean();
      const parentIds = new Set(allCategories.filter(c => c.parentId).map(c => c.parentId));
      categories = categories.filter(c => parentIds.has(c.id));
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/categories/:id/breadcrumb', async (req, res) => {
  try {
    const allCategories = await Category.find({}).lean();
    let currentId = req.params.id;
    const hierarchy = [];
    while (currentId) {
      const cat = allCategories.find(c => c.id === currentId);
      if (cat) { hierarchy.unshift(cat); currentId = cat.parentId; } else break;
    }
    res.json(hierarchy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category({ ...req.body, id: req.body.id || `cat-${Date.now()}` });
    await newCategory.save();
    res.status(201).json(newCategory.toJSON());
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    if (error.code === 11000) return res.status(409).json({ error: 'Category with this ID or slug already exists.' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const childCount = await Category.countDocuments({ parentId: id });
    if (childCount > 0) return res.status(400).json({ error: 'Cannot delete category because it has child categories.' });

    const navbar = await Navbar.findOne({ storeId: 'default' }).lean();
    if (navbar) {
      let usedInNavbar = false;
      for (const item of navbar.navItems || []) {
        if (item.megaMenu?.columns) {
          for (const col of item.megaMenu.columns) {
            for (const group of col.groups || []) {
              if (group.referenceId === id) usedInNavbar = true;
              for (const menuItem of group.items || []) { if (menuItem.referenceId === id) usedInNavbar = true; }
            }
          }
        }
      }
      if (usedInNavbar) return res.status(400).json({ error: 'Cannot delete category because it is referenced in the Navbar Builder.' });
    }

    const deleted = await Category.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// NAVBAR API
// =============================================================================

app.get('/api/navbar', async (req, res) => {
  try {
    const navbar = await Navbar.findOne({ storeId: 'default' }).lean();
    if (!navbar) {
      const newNavbar = await Navbar.create({ storeId: 'default', navItems: [] });
      return res.json(newNavbar.toJSON());
    }
    const allCategories = await Category.find({}).lean();
    const categoryMap = new Map(allCategories.map(c => [c.id, c]));
    const hydratedNavItems = (navbar.navItems || []).map(item => {
      if (item.megaMenu?.columns) {
        return { ...item, megaMenu: { ...item.megaMenu, columns: item.megaMenu.columns.map(col => ({ ...col, groups: (col.groups || []).map(group => ({ ...group, _resolvedCategory: categoryMap.get(group.referenceId) || null, items: (group.items || []).map(menuItem => ({ ...menuItem, _resolvedCategory: categoryMap.get(menuItem.referenceId) || null })) })) })) } };
      }
      return item;
    });
    res.json({ ...navbar, navItems: hydratedNavItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/navbar', async (req, res) => {
  try {
    const navbarData = req.body;
    const allCategories = await Category.find({}).lean();
    const categoryMap = new Map(allCategories.map(c => [c.id, c]));
    for (const item of navbarData.navItems || []) {
      if (item.megaMenu?.columns) {
        for (const col of item.megaMenu.columns) {
          const usedIds = new Set();
          for (const group of col.groups || []) {
            if (group.referenceType === 'category' && group.referenceId) {
              const cat = categoryMap.get(group.referenceId);
              if (!cat || (cat.status !== 'Active' && cat.status !== 'published')) return res.status(400).json({ error: `Category "${group.referenceId}" does not exist or is not published.` });
              if (usedIds.has(group.referenceId)) return res.status(400).json({ error: `Duplicate category "${group.referenceId}" in column.` });
              usedIds.add(group.referenceId);
            }
          }
        }
      }
    }
    const cleanNavItems = (navbarData.navItems || []).map(item => {
      if (item.megaMenu?.columns) {
        return { ...item, megaMenu: { ...item.megaMenu, columns: item.megaMenu.columns.map(col => ({ ...col, groups: (col.groups || []).map(({ _resolvedCategory, ...g }) => ({ ...g, items: (g.items || []).map(({ _resolvedCategory: _rc, ...i }) => i) })) })) } };
      }
      return item;
    });
    await Navbar.findOneAndUpdate({ storeId: 'default' }, { $set: { navItems: cleanNavItems, settings: navbarData.settings || {} } }, { upsert: true, new: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// PRODUCTS API
// =============================================================================

app.get('/api/products', async (req, res) => {
  try {
    const { status, categoryId, brandId, search, page = 1, limit = 100 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (categoryId) filter.categoryId = categoryId;
    if (brandId) filter.brandId = brandId;
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Product.countDocuments(filter)
    ]);
    res.json({ products, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, id: req.body.id || `prod-${Date.now()}` });
    await newProduct.save();
    res.status(201).json(newProduct.toJSON());
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    if (error.code === 11000) return res.status(409).json({ error: 'Product with this ID already exists.' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate({ id: req.params.id }, { $set: { ...req.body, updatedAt: new Date() } }, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'ids array is required' });
    const result = await Product.deleteMany({ id: { $in: ids } });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/bulk-status', async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!Array.isArray(ids) || !status) return res.status(400).json({ error: 'ids and status are required' });
    const result = await Product.updateMany({ id: { $in: ids } }, { $set: { status } });
    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// BRANDS API
// =============================================================================

app.get('/api/brands', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const brands = await Brand.find(filter).sort({ name: 1 }).lean();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findOne({ id: req.params.id }).lean();
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/brands', async (req, res) => {
  try {
    const newBrand = new Brand({ ...req.body, id: req.body.id || `brand-${Date.now()}` });
    await newBrand.save();
    res.status(201).json(newBrand.toJSON());
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    if (error.code === 11000) return res.status(409).json({ error: 'Brand with this ID already exists.' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/brands/:id', async (req, res) => {
  try {
    const updated = await Brand.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Brand not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/brands/:id', async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Brand not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// COLLECTIONS API
// =============================================================================

app.get('/api/collections', async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const collections = await Collection.find(filter).sort({ createdAt: -1 }).lean();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/collections/:id', async (req, res) => {
  try {
    const collection = await Collection.findOne({ id: req.params.id }).lean();
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/collections', async (req, res) => {
  try {
    const newCollection = new Collection({ ...req.body, id: req.body.id || `col-${Date.now()}` });
    await newCollection.save();
    res.status(201).json(newCollection.toJSON());
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    if (error.code === 11000) return res.status(409).json({ error: 'Collection with this ID already exists.' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/collections/:id', async (req, res) => {
  try {
    const updated = await Collection.findOneAndUpdate({ id: req.params.id }, { $set: { ...req.body, updatedAt: new Date() } }, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Collection not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/collections/:id', async (req, res) => {
  try {
    const deleted = await Collection.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Collection not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/collections/:id/duplicate', async (req, res) => {
  try {
    const original = await Collection.findOne({ id: req.params.id }).lean();
    if (!original) return res.status(404).json({ error: 'Collection not found' });
    const { _id, id, ...rest } = original;
    const newId = `col-${Date.now()}`;
    const duplicate = new Collection({ ...rest, id: newId, name: `${rest.name} Copy`, slug: `${rest.slug}-copy-${Date.now()}` });
    await duplicate.save();
    res.status(201).json(duplicate.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/collections/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'ids array is required' });
    const result = await Collection.deleteMany({ id: { $in: ids } });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/collections/bulk-status', async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!Array.isArray(ids) || !status) return res.status(400).json({ error: 'ids and status are required' });
    const result = await Collection.updateMany({ id: { $in: ids } }, { $set: { status } });
    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// CMS SECTION PREVIEW MAP API
// =============================================================================

/**
 * GET /api/cms/sections/preview-map
 * ---------------------------------
 * Aggregates real saved section instances from all CMS pages and returns a
 * map keyed by section type:  { HERO_BANNER: { type, content, settings, ... } }
 *
 * Priority:  sectionsDraft  >  sectionsPublished
 * For each type, the first (most recently updated page) instance is used.
 *
 * This is a read-only, zero-write endpoint used exclusively by the
 * Section Library to show real saved preview data instead of static defaults.
 */
app.get('/api/cms/sections/preview-map', async (req, res) => {
  try {
    // Fetch all pages sorted newest-first; only retrieve section arrays (lean)
    const pages = await CMSPage.find(
      {},
      { sectionsDraft: 1, sectionsPublished: 1, updatedAt: 1 }
    )
      .sort({ updatedAt: -1 })
      .lean();

    const previewMap = {};

    for (const page of pages) {
      // Prefer draft; fall back to published if draft is empty
      const sections =
        page.sectionsDraft && page.sectionsDraft.length > 0
          ? page.sectionsDraft
          : page.sectionsPublished || [];

      for (const sec of sections) {
        if (!sec || !sec.type) continue;
        // Only record the first (newest-page) instance for each type
        if (!previewMap[sec.type]) {
          previewMap[sec.type] = {
            type: sec.type,
            content: sec.content || {},
            settings: sec.settings || {},
            responsive: sec.responsive || {},
            name: sec.name,
          };
        }
      }
    }

    res.json(previewMap);
  } catch (error) {
    console.error('/api/cms/sections/preview-map error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// CMS LIBRARY CONFIGURATIONS API
// =============================================================================

app.get('/api/cms/library/configurations', async (req, res) => {
  try {
    const configs = await SectionConfiguration.find({}).lean();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/cms/library/configurations/:sectionType', async (req, res) => {
  try {
    const { sectionType } = req.params;
    const { content, settings } = req.body;
    
    const config = await SectionConfiguration.findOneAndUpdate(
      { sectionType },
      { $set: { content, settings } },
      { new: true, upsert: true }
    );
    
    // SYNC TO ALL PAGES
    const pages = await CMSPage.find({
      $or: [
        { "sectionsDraft.type": sectionType },
        { "sectionsPublished.type": sectionType }
      ]
    });
    
    for (const page of pages) {
      if (page.sectionsDraft && page.sectionsDraft.length > 0) {
        page.sectionsDraft.forEach(s => {
          if (s.type === sectionType) {
            s.content = content;
            s.settings = settings;
          }
        });
        page.markModified('sectionsDraft');
      }
      if (page.sectionsPublished && page.sectionsPublished.length > 0) {
        page.sectionsPublished.forEach(s => {
          if (s.type === sectionType) {
            s.content = content;
            s.settings = settings;
          }
        });
        page.markModified('sectionsPublished');
      }
      await page.save();
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// CMS PAGES API
// =============================================================================

app.get('/api/cms/pages', async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    // Return pages without heavy sections content for list view
    const pages = await CMSPage.find(filter, { sectionsDraft: 0, sectionsPublished: 0 }).sort({ createdAt: -1 }).lean();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cms/pages/:id', async (req, res) => {
  try {
    const page = await CMSPage.findOne({ id: req.params.id }).lean();
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/cms/pages', async (req, res) => {
  try {
    const newPage = new CMSPage({ ...req.body, id: req.body.id || `page-${Date.now()}` });
    await newPage.save();
    res.status(201).json(newPage.toJSON());
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join('; ') });
    if (error.code === 11000) return res.status(409).json({ error: 'Page with this ID or slug already exists.' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/cms/pages/:id', async (req, res) => {
  try {
    const { sectionsDraft, sectionsPublished, ...metadata } = req.body;
    const updated = await CMSPage.findOneAndUpdate({ id: req.params.id }, { $set: { ...metadata, updatedAt: new Date() } }, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Page not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/cms/pages/:id', async (req, res) => {
  try {
    const deleted = await CMSPage.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Page not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save draft sections for a page
app.put('/api/cms/pages/:id/sections/draft', async (req, res) => {
  try {
    const { sections } = req.body;
    const updated = await CMSPage.findOneAndUpdate({ id: req.params.id }, { $set: { sectionsDraft: sections || [], updatedAt: new Date() } }, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Page not found' });
    
    // AUTO-SYNC TO LIBRARY AND ALL OTHER PAGES
    if (sections && sections.length > 0) {
      for (const sec of sections) {
        if (!sec.type) continue;
        // Update library
        await SectionConfiguration.findOneAndUpdate(
          { sectionType: sec.type },
          { $set: { content: sec.content, settings: sec.settings } },
          { new: true, upsert: true }
        );
        // Update all other pages
        const otherPages = await CMSPage.find({
          id: { $ne: req.params.id },
          $or: [
            { "sectionsDraft.type": sec.type },
            { "sectionsPublished.type": sec.type }
          ]
        });
        for (const page of otherPages) {
          if (page.sectionsDraft && page.sectionsDraft.length > 0) {
            page.sectionsDraft.forEach(s => {
              if (s.type === sec.type) {
                s.content = sec.content;
                s.settings = sec.settings;
              }
            });
            page.markModified('sectionsDraft');
          }
          if (page.sectionsPublished && page.sectionsPublished.length > 0) {
            page.sectionsPublished.forEach(s => {
              if (s.type === sec.type) {
                s.content = sec.content;
                s.settings = sec.settings;
              }
            });
            page.markModified('sectionsPublished');
          }
          await page.save();
        }
      }
    }
    
    res.json({ success: true, page: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Publish: copy draft sections → published sections, update status
app.put('/api/cms/pages/:id/sections/publish', async (req, res) => {
  try {
    const { sections } = req.body;
    const updated = await CMSPage.findOneAndUpdate(
      { id: req.params.id },
      { $set: { sectionsDraft: sections || [], sectionsPublished: sections || [], status: 'published', publishedAt: new Date(), updatedAt: new Date() } },
      { new: true }
    ).lean();
    if (!updated) return res.status(404).json({ error: 'Page not found' });
    
    // AUTO-SYNC TO LIBRARY AND ALL OTHER PAGES
    if (sections && sections.length > 0) {
      for (const sec of sections) {
        if (!sec.type) continue;
        // Update library
        await SectionConfiguration.findOneAndUpdate(
          { sectionType: sec.type },
          { $set: { content: sec.content, settings: sec.settings } },
          { new: true, upsert: true }
        );
        // Update all other pages
        const otherPages = await CMSPage.find({
          id: { $ne: req.params.id },
          $or: [
            { "sectionsDraft.type": sec.type },
            { "sectionsPublished.type": sec.type }
          ]
        });
        for (const page of otherPages) {
          if (page.sectionsDraft && page.sectionsDraft.length > 0) {
            page.sectionsDraft.forEach(s => {
              if (s.type === sec.type) {
                s.content = sec.content;
                s.settings = sec.settings;
              }
            });
            page.markModified('sectionsDraft');
          }
          if (page.sectionsPublished && page.sectionsPublished.length > 0) {
            page.sectionsPublished.forEach(s => {
              if (s.type === sec.type) {
                s.content = sec.content;
                s.settings = sec.settings;
              }
            });
            page.markModified('sectionsPublished');
          }
          await page.save();
        }
      }
    }
    
    res.json({ success: true, page: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Duplicate a page
app.post('/api/cms/pages/:id/duplicate', async (req, res) => {
  try {
    const original = await CMSPage.findOne({ id: req.params.id }).lean();
    if (!original) return res.status(404).json({ error: 'Page not found' });
    const { _id, id, ...rest } = original;
    const newId = `page-${Date.now()}`;
    const duplicate = new CMSPage({ ...rest, id: newId, title: `${rest.title} Copy`, slug: `${rest.slug}-copy-${Date.now()}`, status: 'draft' });
    await duplicate.save();
    res.status(201).json(duplicate.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// CMS CONFIG API (Header, Footer, Page Types, Global Styles)
// =============================================================================

app.get('/api/cms/config', async (req, res) => {
  try {
    let config = await CMSConfig.findOne({ storeId: 'default' }).lean();
    if (!config) {
      config = await CMSConfig.create({ storeId: 'default' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/cms/config', async (req, res) => {
  try {
    const config = await CMSConfig.findOneAndUpdate(
      { storeId: 'default' },
      { $set: { ...req.body, updatedAt: new Date() } },
      { upsert: true, new: true, runValidators: true }
    ).lean();
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convenience: update just the header config
app.put('/api/cms/config/header', async (req, res) => {
  try {
    const config = await CMSConfig.findOneAndUpdate(
      { storeId: 'default' },
      { $set: { headerConfig: req.body, updatedAt: new Date() } },
      { upsert: true, new: true }
    ).lean();
    res.json({ success: true, headerConfig: config.headerConfig });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convenience: update just the menus
app.put('/api/cms/config/menus', async (req, res) => {
  try {
    const config = await CMSConfig.findOneAndUpdate(
      { storeId: 'default' },
      { $set: { menus: req.body, updatedAt: new Date() } },
      { upsert: true, new: true }
    ).lean();
    res.json({ success: true, menus: config.menus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// MEDIA UPLOAD API (Cloudinary)
// =============================================================================

// Cloudinary will automatically configure itself if CLOUDINARY_URL is in process.env
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, mimetype, size } = req.file;

    // Determine type
    let type = 'Document';
    if (mimetype.startsWith('image/')) type = 'Image';
    else if (mimetype.startsWith('video/')) type = 'Video';

    const fallbackToBase64 = () => {
      const b64Url = `data:${mimetype};base64,${req.file.buffer.toString('base64')}`;
      const newAsset = new MediaAsset({
        id: `ast-${Date.now()}`,
        filename: originalname,
        title: originalname.split('.')[0],
        altText: '',
        type,
        mimeType: mimetype,
        size: size,
        width: null,
        height: null,
        url: b64Url,
        publicId: `local-${Date.now()}`,
        folderId: 'all'
      });
      newAsset.save().then(() => {
        res.status(201).json(newAsset.toJSON());
      }).catch(dbError => {
        console.error("DB Save Error:", dbError);
        res.status(500).json({ error: 'Failed to save asset record in DB' });
      });
    };

    if (!process.env.CLOUDINARY_URL || process.env.CLOUDINARY_URL.includes('<your_api_key>')) {
      return fallbackToBase64();
    }

    try {
      // Upload to Cloudinary using stream
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'premium-furniture-ecommerce',
          resource_type: 'auto' // automatically detect image/video/raw
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            // Fallback on error
            return fallbackToBase64();
          }

          try {
            // Create a record in MongoDB
            const newAsset = new MediaAsset({
              id: `ast-${Date.now()}`,
              filename: originalname,
              title: originalname.split('.')[0],
              altText: '',
              type,
              mimeType: mimetype,
              size: size,
              width: result.width || null,
              height: result.height || null,
              url: result.secure_url,
              publicId: result.public_id,
              folderId: 'all'
            });

            await newAsset.save();
            res.status(201).json(newAsset.toJSON());
          } catch (dbError) {
            console.error("DB Save Error:", dbError);
            res.status(500).json({ error: 'Failed to save asset record in DB' });
          }
        }
      );

      // Send the buffer to Cloudinary
      uploadStream.end(req.file.buffer);
    } catch (cloudinaryError) {
      console.error("Cloudinary synchronous initialization error:", cloudinaryError.message);
      return fallbackToBase64();
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/media', async (req, res) => {
  try {
    const assets = await MediaAsset.find({}).sort({ createdAt: -1 }).lean();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/media/:id', async (req, res) => {
  try {
    const asset = await MediaAsset.findOne({ id: req.params.id });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    if (asset.publicId) {
      try {
        await cloudinary.uploader.destroy(asset.publicId);
      } catch (cloudErr) {
        console.error("Cloudinary Delete Error:", cloudErr);
      }
    }

    await MediaAsset.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log(`\n🚀  Express API server running on http://localhost:${PORT}`);
  console.log(`📦  MongoDB Atlas → furniture-ecommerce database\n`);
});
