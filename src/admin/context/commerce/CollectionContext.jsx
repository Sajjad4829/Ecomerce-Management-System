/**
 * src/admin/context/commerce/CollectionContext.jsx
 * -------------------------------------------------
 * MongoDB-backed collection state.
 * All data fetched from /api/collections. localStorage removed.
 * Automatic rule-evaluation is done client-side against loaded products.
 */
import { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import { useProducts } from './ProductContext';

const CollectionContext = createContext();
const API = '/api/collections';

export function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function CollectionProvider({ children }) {
  const { products } = useProducts();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch collections from MongoDB ─────────────────────────────────────────
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Failed to load collections: ${res.statusText}`);
        const data = await res.json();
        const mappedData = data.map(col => ({
          ...col,
          status: ['Active', 'published'].includes(col.status) ? 'published' : (['Draft', 'draft'].includes(col.status) ? 'draft' : (['Archived', 'archived'].includes(col.status) ? 'archived' : 'draft')),
          featured: col.featured || col.isFeatured || false,
          bestSeller: col.bestSeller || col.isBestSeller || false
        }));
        setCollections(mappedData);
      } catch (err) {
        console.error('CollectionContext fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  // ── Rule evaluation for automatic collections ──────────────────────────────
  const evaluateProduct = (product, rules, matchMode) => {
    if (!rules || rules.length === 0) return false;
    const matches = rules.map(rule => {
      const { field, operator, value } = rule;
      let pv = product[field];
      if (['price', 'stock'].includes(field)) pv = Number(pv);
      switch (operator) {
        case 'equals': return String(pv).toLowerCase() === String(value).toLowerCase();
        case 'notEquals': return String(pv).toLowerCase() !== String(value).toLowerCase();
        case 'contains': return String(pv).toLowerCase().includes(String(value).toLowerCase());
        case 'greaterThan': return pv > Number(value);
        case 'lessThan': return pv < Number(value);
        default: return false;
      }
    });
    return matchMode === 'any' ? matches.some(m => m) : matches.every(m => m);
  };

  // ── Resolve products into collections ──────────────────────────────────────
  const resolvedCollections = useMemo(() => {
    return collections.map(col => {
      let matchedProducts = [];
      if (col.type === 'manual') {
        matchedProducts = products.filter(p => col.productIds?.includes(p.id));
      } else if (col.type === 'automatic') {
        matchedProducts = products.filter(p => evaluateProduct(p, col.rules, col.matchMode));
      }
      return { ...col, productCount: matchedProducts.length, resolvedProducts: matchedProducts };
    });
  }, [collections, products]);

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const addCollection = useCallback(async (collection) => {
    const payload = { 
      ...collection, 
      status: ['published', 'Active'].includes(collection.status) ? 'published' : 'draft',
      featured: collection.featured,
      bestSeller: collection.bestSeller,
      id: `col-${Date.now()}`, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to create collection'); }
    const newCol = await res.json();
    const mappedCol = {
      ...newCol,
      status: ['Active', 'published'].includes(newCol.status) ? 'published' : 'draft',
      featured: newCol.featured || newCol.isFeatured || false,
      bestSeller: newCol.bestSeller || newCol.isBestSeller || false
    };
    setCollections(prev => [mappedCol, ...prev]);
    return mappedCol;
  }, []);

  const updateCollection = useCallback(async (id, updates) => {
    const payload = { 
      ...updates, 
      status: ['published', 'Active'].includes(updates.status) ? 'published' : 'draft',
      featured: updates.featured !== undefined ? updates.featured : undefined,
      bestSeller: updates.bestSeller !== undefined ? updates.bestSeller : undefined,
      updatedAt: new Date().toISOString() 
    };
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to update collection'); }
    const updatedCollection = await res.json();
    const mappedCol = {
      ...updatedCollection,
      status: ['Active', 'published'].includes(updatedCollection.status) ? 'published' : (['Draft', 'draft'].includes(updatedCollection.status) ? 'draft' : (['Archived', 'archived'].includes(updatedCollection.status) ? 'archived' : 'published')),
      featured: updatedCollection.featured || updatedCollection.isFeatured || false,
      bestSeller: updatedCollection.bestSeller || updatedCollection.isBestSeller || false
    };
    setCollections(prev => prev.map(c => c.id === id ? mappedCol : c));
    return mappedCol;
  }, []);

  const deleteCollection = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to delete collection'); }
    setCollections(prev => prev.filter(c => c.id !== id));
  }, []);

  const duplicateCollection = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}/duplicate`, { method: 'POST' });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to duplicate collection'); }
    const newCol = await res.json();
    setCollections(prev => [...prev, newCol]);
    return newCol;
  }, []);

  const bulkDelete = useCallback(async (ids) => {
    const res = await fetch(`${API}/bulk-delete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids }) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Bulk delete failed'); }
    setCollections(prev => prev.filter(c => !ids.includes(c.id)));
  }, []);

  const bulkUpdateStatus = useCallback(async (ids, status) => {
    const res = await fetch(`${API}/bulk-status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, status }) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Bulk status update failed'); }
    setCollections(prev => prev.map(c => ids.includes(c.id) ? { ...c, status } : c));
  }, []);

  return (
    <CollectionContext.Provider value={{
      collections: resolvedCollections, loading, error,
      addCollection, updateCollection, deleteCollection,
      duplicateCollection, bulkDelete, bulkUpdateStatus,
    }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error('useCollections must be used within a CollectionProvider');
  return context;
}
