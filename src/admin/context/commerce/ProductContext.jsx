import { createContext, useState, useContext, useMemo } from 'react';
import { useCategories } from './CategoryContext';
import { auditService } from '../../services/audit/AuditService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { getCategoryById } = useCategories();

  const [products, setProducts] = useState([]);

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

  const getProductBySlug = (slug) => {
    return resolvedProducts.find(p => p.slug === slug);
  };

  return (
    <ProductContext.Provider value={{
      products: resolvedProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      bulkDelete,
      bulkUpdateStatus,
      getProductBySlug
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
