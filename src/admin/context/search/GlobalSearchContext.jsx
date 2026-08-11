import React, { createContext, useContext, useState, useCallback } from 'react';

const GlobalSearchContext = createContext();

export function GlobalSearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    { query: 'Aurora Lounge Chair', timestamp: '2026-08-09T02:00:00Z', resultCount: 4 },
    { query: 'Pending Orders', timestamp: '2026-08-08T15:00:00Z', resultCount: 12 },
    { query: 'sarah.jenkins@example.com', timestamp: '2026-08-08T10:00:00Z', resultCount: 1 }
  ]);
  const [savedSearches, setSavedSearches] = useState([
    { id: 'ss_1', name: 'High Value Pending Orders', query: 'module:Order status:Pending total:>1000', owner: 'System', lastUsed: '2026-08-09T01:00:00Z', updatedAt: '2026-08-01T00:00:00Z' },
    { id: 'ss_2', name: 'Low Stock Priority Products', query: 'module:Inventory stock:<10 category:"Lounge Chairs"', owner: 'Admin', lastUsed: '2026-08-08T00:00:00Z', updatedAt: '2026-08-02T00:00:00Z' }
  ]);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (q) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    // Mock Search Logic
    setTimeout(() => {
      const lowerQ = q.toLowerCase();
      let mockResults = [];
      
      if ('aurora lounge chair'.includes(lowerQ)) {
        mockResults.push({ id: 'PRD-001', type: 'Product', name: 'Aurora Lounge Chair', sku: 'FUR-AUR-001', status: 'Active', category: 'Lounge Chairs', url: '/admin/catalog/products/PRD-001' });
        mockResults.push({ id: 'INV-001', type: 'Inventory', name: 'Aurora Lounge Chair', sku: 'FUR-AUR-001', warehouse: 'Main Hub', stock: 5, url: '/admin/inventory/INV-001' });
      }

      if ('sarah'.includes(lowerQ) || 'jenkins'.includes(lowerQ)) {
        mockResults.push({ id: 'CUST-101', type: 'Customer', name: 'Sarah Jenkins', email: 'sarah.jenkins@example.com', url: '/admin/customers/CUST-101' });
        mockResults.push({ id: 'ORD-1092', type: 'Order', name: 'Order #ORD-1092', customer: 'Sarah Jenkins', status: 'Processing', total: '$1,299.00', url: '/admin/orders/ORD-1092' });
      }

      if ('homepage'.includes(lowerQ)) {
        mockResults.push({ id: 'PAGE-01', type: 'CMS', name: 'Homepage', status: 'Published', url: '/admin/cms/pages/PAGE-01' });
      }
      
      if ('summer'.includes(lowerQ)) {
        mockResults.push({ id: 'CAMP-01', type: 'Marketing', name: 'Summer Sale Announcement', typeDetail: 'Campaign', url: '/admin/communications/campaigns/CAMP-01' });
        mockResults.push({ id: 'PROM-01', type: 'Marketing', name: 'Summer 20% Off', typeDetail: 'Promotion', url: '/admin/marketing/promotions/PROM-01' });
      }

      if (lowerQ === 'create product') {
         mockResults.push({ id: 'CMD-1', type: 'Command', name: 'Create New Product', action: '/admin/catalog/products/new' });
      }

      setResults(mockResults);
      setLoading(false);
    }, 300);
  }, []);

  const addRecentSearch = (q) => {
    if (!q.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(r => r.query !== q);
      return [{ query: q, timestamp: new Date().toISOString(), resultCount: results.length }, ...filtered].slice(0, 5);
    });
  };

  const clearRecentSearches = () => setRecentSearches([]);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  return (
    <GlobalSearchContext.Provider value={{
      query,
      results,
      loading,
      recentSearches,
      savedSearches,
      isOverlayOpen,
      setQuery: performSearch,
      addRecentSearch,
      clearRecentSearches,
      openOverlay,
      closeOverlay
    }}>
      {children}
    </GlobalSearchContext.Provider>
  );
}

export const useGlobalSearch = () => useContext(GlobalSearchContext);
