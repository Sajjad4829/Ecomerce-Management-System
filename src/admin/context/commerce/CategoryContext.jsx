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

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
        setLoading(false);
      });
  }, []);

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
    // Restriction removed per user request. Always allow deletion.
    return true;
  }, []);

  // Get category by ID
  const getCategoryById = useCallback((id) => {
    return categories.find(c => c.id === id) || null;
  }, [categories]);

  // Get category by slug
  const getCategoryBySlug = useCallback((slug) => {
    return categories.find(c => c.slug === slug) || null;
  }, [categories]);

  // Get parent category
  const getParentCategory = useCallback((categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || !category.parentId) return null;
    return categories.find(c => c.id === category.parentId) || null;
  }, [categories]);

  // Get full category hierarchy up to root
  const getCategoryHierarchy = useCallback((categoryId) => {
    const hierarchy = [];
    let currentId = categoryId;
    while (currentId) {
      const cat = categories.find(c => c.id === currentId);
      if (cat) {
        hierarchy.unshift(cat);
        currentId = cat.parentId;
        
      } else {
        break;
      }
    }
    return hierarchy;
  }, [categories]);

  // Create Category
  const addCategory = useCallback(async (categoryData) => {
    const newCategory = {
      ...categoryData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });
      if (res.ok) {
        const savedCategory = await res.json();
        setCategories(prev => [...prev, savedCategory]);
        return savedCategory;
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add category');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }, []);

  // Update Category
  const updateCategory = useCallback(async (id, updates) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, updatedAt: new Date().toISOString() })
      });
      if (res.ok) {
        const updatedCategory = await res.json();
        setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update category');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }, []);

  // Delete Category
  const deleteCategory = useCallback(async (id, products = []) => {
    // Restriction removed per user request
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete category');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
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
    getCategoryBySlug,
    getParentCategory,
    getCategoryHierarchy,
    addCategory,
    updateCategory,
    deleteCategory,
    bulkUpdateStatus,
    bulkSetFeatured,
    bulkDelete
  }), [
    categories, categoryTree, getCategoryTree, getChildren, canDeleteCategory, 
    getCategoryById, getCategoryBySlug, getParentCategory, getCategoryHierarchy, addCategory, updateCategory, deleteCategory, 
    bulkUpdateStatus, bulkSetFeatured, bulkDelete
  ]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
