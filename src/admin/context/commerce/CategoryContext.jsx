import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const CategoryContext = createContext(null);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

// Helper: Generates a slug from a string
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Initial dummy data as requested for hierarchy
const initialCategories = [
  {
    id: 'cat-1',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Premium furniture for your entire home.',
    parentId: null,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: true,
    sortOrder: 1,
    seo: {
      metaTitle: 'Furniture | Aurelia',
      metaDescription: 'Shop our premium furniture collection.',
      metaKeywords: 'furniture, premium, luxury',
      canonicalUrl: '',
      ogImage: '',
      robots: 'index,follow'
    },
    createdAt: new Date('2026-08-01').toISOString(),
    updatedAt: new Date('2026-08-08').toISOString(),
  },
  {
    id: 'cat-1-1',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Luxury living room furniture including sofas and coffee tables.',
    parentId: 'cat-1',
    image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&q=80&w=400',
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: false,
    sortOrder: 1,
    seo: {},
    createdAt: new Date('2026-08-02').toISOString(),
    updatedAt: new Date('2026-08-07').toISOString(),
  },
  {
    id: 'cat-1-1-1',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Modern and classic sofas for ultimate comfort.',
    parentId: 'cat-1-1',
    image: null,
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: true,
    sortOrder: 1,
    seo: {},
    createdAt: new Date('2026-08-03').toISOString(),
    updatedAt: new Date('2026-08-06').toISOString(),
  },
  {
    id: 'cat-1-1-2',
    name: 'Coffee Tables',
    slug: 'coffee-tables',
    description: 'Elegant coffee tables to complete your living space.',
    parentId: 'cat-1-1',
    image: null,
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: false,
    sortOrder: 2,
    seo: {},
    createdAt: new Date('2026-08-03').toISOString(),
    updatedAt: new Date('2026-08-05').toISOString(),
  },
  {
    id: 'cat-1-2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Beds, wardrobes, and bedside tables for your sanctuary.',
    parentId: 'cat-1',
    image: null,
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: false,
    sortOrder: 2,
    seo: {},
    createdAt: new Date('2026-08-02').toISOString(),
    updatedAt: new Date('2026-08-07').toISOString(),
  },
  {
    id: 'cat-1-2-1',
    name: 'Beds',
    slug: 'beds',
    description: 'Premium beds for a perfect night\'s sleep.',
    parentId: 'cat-1-2',
    image: null,
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: true,
    sortOrder: 1,
    seo: {},
    createdAt: new Date('2026-08-03').toISOString(),
    updatedAt: new Date('2026-08-06').toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Illuminate your space with our curated lighting collection.',
    parentId: null,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?auto=format&fit=crop&q=80&w=400',
    bannerImage: null,
    icon: null,
    status: 'published',
    featured: true,
    sortOrder: 2,
    seo: {},
    createdAt: new Date('2026-08-01').toISOString(),
    updatedAt: new Date('2026-08-08').toISOString(),
  }
];

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories);

  // Get full category hierarchy (Tree structure)
  const getCategoryTree = useCallback((cats = categories, parentId = null) => {
    return cats
      .filter(cat => cat.parentId === parentId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(cat => ({
        ...cat,
        children: getCategoryTree(cats, cat.id)
      }));
  }, [categories]);

  const categoryTree = useMemo(() => getCategoryTree(), [getCategoryTree]);

  // Get children of a specific category
  const getChildren = useCallback((categoryId) => {
    return categories.filter(c => c.parentId === categoryId);
  }, [categories]);

  // Check if a category has products or children (for delete protection)
  const canDeleteCategory = useCallback((categoryId, products = []) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return false;
    
    const children = getChildren(categoryId);
    const hasProducts = products.some(p => p.categoryId === categoryId);
    return children.length === 0 && !hasProducts;
  }, [categories, getChildren]);

  // Get category by ID
  const getCategoryById = useCallback((id) => {
    return categories.find(c => c.id === id) || null;
  }, [categories]);

  // Create Category
  const addCategory = useCallback((categoryData) => {
    const newCategory = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, []);

  // Update Category
  const updateCategory = useCallback((id, updates) => {
    setCategories(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ));
  }, []);

  // Delete Category
  const deleteCategory = useCallback((id, products = []) => {
    if (!canDeleteCategory(id, products)) {
      throw new Error("Cannot delete category with active products or child categories.");
    }
    setCategories(prev => prev.filter(c => c.id !== id));
  }, [canDeleteCategory]);

  // Bulk Actions
  const bulkUpdateStatus = useCallback((ids, status) => {
    setCategories(prev => prev.map(c => 
      ids.includes(c.id) ? { ...c, status, updatedAt: new Date().toISOString() } : c
    ));
  }, []);

  const bulkSetFeatured = useCallback((ids, featured) => {
    setCategories(prev => prev.map(c => 
      ids.includes(c.id) ? { ...c, featured, updatedAt: new Date().toISOString() } : c
    ));
  }, []);

  const bulkDelete = useCallback((ids, products = []) => {
    // Only delete those that are safe to delete
    const safeToDeleteIds = ids.filter(id => canDeleteCategory(id, products));
    if (safeToDeleteIds.length === 0) {
      throw new Error("None of the selected categories can be deleted because they contain products or children.");
    }
    if (safeToDeleteIds.length < ids.length) {
      // Partial deletion
      console.warn(`Only ${safeToDeleteIds.length} out of ${ids.length} categories were safe to delete.`);
    }
    
    setCategories(prev => prev.filter(c => !safeToDeleteIds.includes(c.id)));
    return safeToDeleteIds.length;
  }, [canDeleteCategory]);

  const value = useMemo(() => ({
    categories,
    categoryTree,
    getCategoryTree,
    getChildren,
    canDeleteCategory,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    bulkUpdateStatus,
    bulkSetFeatured,
    bulkDelete
  }), [
    categories, categoryTree, getCategoryTree, getChildren, canDeleteCategory, 
    getCategoryById, addCategory, updateCategory, deleteCategory, 
    bulkUpdateStatus, bulkSetFeatured, bulkDelete
  ]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
