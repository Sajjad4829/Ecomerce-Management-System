import { createContext, useState, useContext, useMemo } from 'react';
import { useCategories } from './CategoryContext';
import { auditService } from '../../services/audit/AuditService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { getCategoryById } = useCategories();

  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      sku: 'AUR-SOF-001',
      name: 'The Sovereign Curved Sofa',
      status: 'published',
      categoryId: 'cat-1-1-1',
      brand: 'Aurelia',
      badge: 'Best Seller',
      price: 12850,
      stock: 5,
      updatedAt: '2026-08-08',
      createdAt: '2026-08-01',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'prod-2',
      sku: 'AUR-TBL-042',
      name: 'Florentine Marble Dining Table',
      status: 'published',
      categoryId: 'cat-1-1-2',
      brand: 'Aurelia',
      badge: 'Featured',
      price: 8500,
      stock: 2,
      updatedAt: '2026-08-07',
      createdAt: '2026-08-02',
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'prod-3',
      sku: 'AUR-CHR-015',
      name: 'Nordic Oak Lounge Chair',
      status: 'draft',
      categoryId: 'cat-1-1-1',
      brand: 'Nordic',
      price: 3200,
      stock: 0,
      updatedAt: '2026-08-06',
      createdAt: '2026-08-03',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  const resolvedProducts = useMemo(() => {
    return products.map(p => {
      const cat = getCategoryById(p.categoryId);
      return {
        ...p,
        category: cat ? cat.name : 'Uncategorized'
      };
    });
  }, [products, getCategoryById]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: `prod-${Date.now()}` };
    setProducts(prev => [...prev, newProduct]);
    auditService.createAuditEvent({
      action: 'CREATE',
      module: 'Products',
      resourceType: 'Product',
      resourceId: newProduct.id,
      resourceName: newProduct.name,
      metadata: { newValue: newProduct }
    });
  };

  const updateProduct = (id, updates) => {
    const oldProduct = products.find(p => p.id === id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    auditService.createAuditEvent({
      action: 'UPDATE',
      module: 'Products',
      resourceType: 'Product',
      resourceId: id,
      resourceName: oldProduct?.name || id,
      metadata: { oldValue: oldProduct, newValue: { ...oldProduct, ...updates } }
    });
  };

  const deleteProduct = (id) => {
    const oldProduct = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    auditService.createAuditEvent({
      action: 'DELETE',
      module: 'Products',
      resourceType: 'Product',
      resourceId: id,
      resourceName: oldProduct?.name || id,
      severity: 'High'
    });
  };

  const bulkDelete = (ids) => {
    setProducts(prev => prev.filter(p => !ids.includes(p.id)));
  };

  const bulkUpdateStatus = (ids, status) => {
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status } : p));
  };

  return (
    <ProductContext.Provider value={{
      products: resolvedProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      bulkDelete,
      bulkUpdateStatus
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
