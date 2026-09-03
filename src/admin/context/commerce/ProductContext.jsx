/**
 * src/admin/context/commerce/ProductContext.jsx
 * ----------------------------------------------
 * MongoDB-backed product state.
 * All data fetched from /api/products. localStorage removed.
 */
import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useCategories } from './CategoryContext';
import { auditService } from '../../services/audit/AuditService';

const ProductContext = createContext();
const API = '/api/products';

export function ProductProvider({ children }) {
  const { getCategoryById } = useCategories();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 100 });

  // ── Fetch products from MongoDB ────────────────────────────────────────────
  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API}${query ? '?' + query : ''}`);
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.products || []);
      setProducts(list);
      if (data.total !== undefined) setPagination({ total: data.total, page: data.page, limit: data.limit });
    } catch (err) {
      console.error('ProductContext fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Resolve category name and image for each product ─────────────────────────────────
  const resolvedProducts = products.map(p => {
    const cat = getCategoryById(p.categoryId);
    const primaryImage = p.images?.find(img => img.isPrimary)?.url || p.images?.[0]?.url || '';
    return { ...p, category: cat ? cat.name : (p.category || 'Uncategorized'), image: primaryImage };
  });

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const addProduct = useCallback(async (product) => {
    const payload = { ...product, id: `prod-${Date.now()}` };
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to create product'); }
    const newProduct = await res.json();
    setProducts(prev => [newProduct, ...prev]);
    auditService.createAuditEvent({ action: 'CREATE', module: 'Products', resourceType: 'Product', resourceId: newProduct.id, resourceName: newProduct.name, metadata: { newValue: newProduct } });
    return newProduct;
  }, []);

  const updateProduct = useCallback(async (id, updates) => {
    const oldProduct = products.find(p => p.id === id);
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to update product'); }
    const updatedProduct = await res.json();
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
    auditService.createAuditEvent({ action: 'UPDATE', module: 'Products', resourceType: 'Product', resourceId: id, resourceName: oldProduct?.name || id, metadata: { oldValue: oldProduct, newValue: updatedProduct } });
    return updatedProduct;
  }, [products]);

  const deleteProduct = useCallback(async (id) => {
    const oldProduct = products.find(p => p.id === id);
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to delete product'); }
    setProducts(prev => prev.filter(p => p.id !== id));
    auditService.createAuditEvent({ action: 'DELETE', module: 'Products', resourceType: 'Product', resourceId: id, resourceName: oldProduct?.name || id, severity: 'High' });
  }, [products]);

  const bulkDelete = useCallback(async (ids) => {
    const res = await fetch(`${API}/bulk-delete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids }) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Bulk delete failed'); }
    setProducts(prev => prev.filter(p => !ids.includes(p.id)));
  }, []);

  const bulkUpdateStatus = useCallback(async (ids, status) => {
    const res = await fetch(`${API}/bulk-status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, status }) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Bulk status update failed'); }
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status } : p));
  }, []);

  const getProductBySlug = useCallback((slug) =>
    resolvedProducts.find(p => p.slug === slug), [resolvedProducts]);

  return (
    <ProductContext.Provider value={{
      products: resolvedProducts, loading, error, pagination,
      fetchProducts, addProduct, updateProduct, deleteProduct,
      bulkDelete, bulkUpdateStatus, getProductBySlug,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
}
