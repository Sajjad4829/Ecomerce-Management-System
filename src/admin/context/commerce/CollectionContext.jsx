import { createContext, useState, useContext, useMemo } from 'react';
import { useProducts } from './ProductContext';

const CollectionContext = createContext();

export function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function CollectionProvider({ children }) {
  const { products } = useProducts();

  const [collections, setCollections] = useState([
    {
      id: 'col-1',
      name: 'The Sanctuary Collection',
      slug: 'the-sanctuary',
      description: 'A curated selection of minimalist, calming furniture for the modern home.',
      type: 'manual',
      status: 'published',
      featured: true,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400',
      bannerImage: '',
      icon: '',
      productIds: ['prod-1', 'prod-3'],
      rules: [],
      matchMode: 'all', // 'all' or 'any'
      sortMode: 'manual',
      sortOrder: 0,
      startAt: '',
      endAt: '',
      seo: {
        metaTitle: 'The Sanctuary Collection | Aurelia',
        metaDescription: 'Discover the Sanctuary Collection. Minimalist premium furniture.',
        metaKeywords: '',
        canonicalUrl: '',
        ogImage: '',
        robots: 'index, follow'
      },
      createdAt: '2026-08-01',
      updatedAt: '2026-08-08'
    },
    {
      id: 'col-2',
      name: 'Autumn Arrival 2026',
      slug: 'autumn-arrival',
      description: 'New seasonal items dropping for Autumn.',
      type: 'automatic',
      status: 'scheduled',
      featured: false,
      image: 'https://images.unsplash.com/photo-1499933374294-458eb8a200f3?auto=format&fit=crop&q=80&w=400',
      bannerImage: '',
      icon: '',
      productIds: [],
      rules: [
        { field: 'category', operator: 'equals', value: 'Seating' },
        { field: 'price', operator: 'greaterThan', value: '3000' }
      ],
      matchMode: 'all',
      sortMode: 'newest',
      sortOrder: 1,
      startAt: '2026-09-01T00:00:00Z',
      endAt: '',
      seo: {
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
        ogImage: '',
        robots: 'index, follow'
      },
      createdAt: '2026-08-05',
      updatedAt: '2026-08-05'
    }
  ]);

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
