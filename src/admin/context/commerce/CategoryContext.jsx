/**
 * src/admin/context/commerce/CategoryContext.jsx
 * -----------------------------------------------
 * MongoDB-backed category state.
 * All data fetched from /api/categories and persisted via REST.
 * localStorage has been removed.
 */
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

const CategoryContext = createContext(null);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used within a CategoryProvider');
  return context;
};

export const generateSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const API = '/api/categories';

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Load categories from MongoDB on mount ──────────────────────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Failed to load categories: ${res.statusText}`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('CategoryContext fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ── Tree structure ─────────────────────────────────────────────────────────
  const getCategoryTree = useCallback((cats = categories, parentId = null) => {
    return cats
      .filter(cat => cat.parentId === parentId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(cat => ({ ...cat, children: getCategoryTree(cats, cat.id) }));
  }, [categories]);

  const categoryTree = useMemo(() => getCategoryTree(), [getCategoryTree]);

  const getChildren = useCallback((categoryId) =>
    categories.filter(c => c.parentId === categoryId), [categories]);

  const getCategoryById = useCallback((id) =>
    categories.find(c => c.id === id) || null, [categories]);

  const getCategoryBySlug = useCallback((slug) =>
    categories.find(c => c.slug === slug) || null, [categories]);

  const getParentCategory = useCallback((categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || !category.parentId) return null;
    return categories.find(c => c.id === category.parentId) || null;
  }, [categories]);

  const getCategoryHierarchy = useCallback((categoryId) => {
    const hierarchy = [];
    let currentId = categoryId;
    while (currentId) {
      const cat = categories.find(c => c.id === currentId);
      if (cat) { hierarchy.unshift(cat); currentId = cat.parentId; } else break;
    }
    return hierarchy;
  }, [categories]);

  const canDeleteCategory = useCallback(() => true, []);

  // ── CRUD — all changes go to MongoDB ──────────────────────────────────────

  const addCategory = useCallback(async (categoryData) => {
    const payload = {
      ...categoryData,
      id: categoryData.id || `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to create category'); }
    const newCategory = await res.json();
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback(async (id, updates) => {
    const payload = { ...updates, updatedAt: new Date().toISOString() };
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to update category'); }
    const updatedCategory = await res.json();
    setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
    return updatedCategory;
  }, []);

  const deleteCategory = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to delete category'); }
    setCategories(prev => prev.filter(c => c.id !== id));
    return true;
  }, []);

  const refreshCategories = useCallback(async () => {
    const res = await fetch(API);
    if (res.ok) { const data = await res.json(); setCategories(data); }
  }, []);

  return (
    <CategoryContext.Provider value={{
      categories, categoryTree, loading, error,
      getCategoryTree, getChildren, getCategoryById, getCategoryBySlug,
      getParentCategory, getCategoryHierarchy, canDeleteCategory,
      addCategory, updateCategory, deleteCategory, refreshCategories,
    }}>
      {children}
    </CategoryContext.Provider>
  );
}
