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
        setCollections(data);
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
    const payload = { ...collection, id: `col-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to create collection'); }
    const newCollection = await res.json();
    setCollections(prev => [newCollection, ...prev]);
    return newCollection;
  }, []);

  const updateCollection = useCallback(async (id, updates) => {
    const payload = { ...updates, updatedAt: new Date().toISOString() };
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to update collection'); }
    const updatedCollection = await res.json();
    setCollections(prev => prev.map(c => c.id === id ? updatedCollection : c));
    return updatedCollection;
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
