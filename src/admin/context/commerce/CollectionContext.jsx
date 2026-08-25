import { createContext, useState, useContext, useMemo } from 'react';
import { useProducts } from './ProductContext';

const CollectionContext = createContext();

export function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function CollectionProvider({ children }) {
  const { products } = useProducts();

  const [collections, setCollections] = useState([]);

  // Evaluates rules against a product
  const evaluateProduct = (product, rules, matchMode) => {
    if (!rules || rules.length === 0) return false;

    const matches = rules.map(rule => {
      const { field, operator, value } = rule;
      let productValue = product[field];
      
      // Convert for numeric comparison
      if (['price', 'stock'].includes(field)) {
        productValue = Number(productValue);
      }

      switch (operator) {
        case 'equals': return String(productValue).toLowerCase() === String(value).toLowerCase();
        case 'notEquals': return String(productValue).toLowerCase() !== String(value).toLowerCase();
        case 'contains': return String(productValue).toLowerCase().includes(String(value).toLowerCase());
        case 'greaterThan': return productValue > Number(value);
        case 'lessThan': return productValue < Number(value);
        default: return false;
      }
    });

    return matchMode === 'any' ? matches.some(m => m) : matches.every(m => m);
  };

  // Derive products for collections dynamically
  const resolvedCollections = useMemo(() => {
    return collections.map(col => {
      let matchedProducts = [];
      
      if (col.type === 'manual') {
        matchedProducts = products.filter(p => col.productIds?.includes(p.id));
      } else if (col.type === 'automatic') {
        matchedProducts = products.filter(p => evaluateProduct(p, col.rules, col.matchMode));
      }

      return {
        ...col,
        productCount: matchedProducts.length,
        resolvedProducts: matchedProducts
      };
    });
  }, [collections, products]);

  const addCollection = (collection) => {
    setCollections(prev => [...prev, { ...collection, id: `col-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
  };

  const updateCollection = (id, updates) => {
    setCollections(prev => prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c));
  };

  const deleteCollection = (id) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const duplicateCollection = (id) => {
    const colToCopy = collections.find(c => c.id === id);
    if (colToCopy) {
      const newCol = {
        ...colToCopy,
        id: `col-${Date.now()}`,
        name: `${colToCopy.name} Copy`,
        slug: `${colToCopy.slug}-copy`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCollections(prev => [...prev, newCol]);
    }
  };

  const bulkDelete = (ids) => {
    setCollections(prev => prev.filter(c => !ids.includes(c.id)));
  };

  const bulkUpdateStatus = (ids, status) => {
    setCollections(prev => prev.map(c => ids.includes(c.id) ? { ...c, status, updatedAt: new Date().toISOString() } : c));
  };

  return (
    <CollectionContext.Provider value={{
      collections: resolvedCollections,
      addCollection,
      updateCollection,
      deleteCollection,
      duplicateCollection,
      bulkDelete,
      bulkUpdateStatus
    }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context;
}
