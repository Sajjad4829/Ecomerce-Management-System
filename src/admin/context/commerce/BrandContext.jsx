/**
 * src/admin/context/commerce/BrandContext.jsx
 * --------------------------------------------
 * MongoDB-backed brand state.
 * All data fetched from /api/brands. localStorage removed.
 */
import { createContext, useState, useContext, useCallback, useEffect } from 'react';

const BrandContext = createContext();
const API = '/api/brands';

export function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch brands from MongoDB ──────────────────────────────────────────────
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Failed to load brands: ${res.statusText}`);
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error('BrandContext fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const addBrand = useCallback(async (brandData) => {
    const payload = { ...brandData, id: brandData.id || `brand-${Date.now()}` };
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to create brand'); }
    const newBrand = await res.json();
    setBrands(prev => [...prev, newBrand]);
    return newBrand;
  }, []);

  const updateBrand = useCallback(async (id, updates) => {
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to update brand'); }
    const updatedBrand = await res.json();
    setBrands(prev => prev.map(b => b.id === id ? updatedBrand : b));
    return updatedBrand;
  }, []);

  const deleteBrand = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to delete brand'); }
    setBrands(prev => prev.filter(b => b.id !== id));
  }, []);

  const getBrandById = useCallback((id) =>
    brands.find(b => b.id === id) || null, [brands]);

  const getBrandBySlug = useCallback((slug) =>
    brands.find(b => b.slug === slug) || null, [brands]);

  return (
    <BrandContext.Provider value={{
      brands, loading, error,
      setBrands, addBrand, updateBrand, deleteBrand,
      getBrandById, getBrandBySlug,
    }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) throw new Error('useBrands must be used within a BrandProvider');
  return context;
}
