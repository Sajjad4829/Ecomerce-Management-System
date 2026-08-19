import { createContext, useState, useContext, useMemo } from 'react';
import { useCategories } from './CategoryContext';
import { auditService } from '../../services/audit/AuditService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { getCategoryById } = useCategories();

  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      slug: 'the-sovereign-curved-sofa',
      sku: 'AUR-SOF-001',
      name: 'The Sovereign Curved Sofa',
      status: 'published',
      categoryId: 'cat-1-1-1',
      brand: 'Aurelia',
      badge: 'Best Seller',
      price: 12850,
      compareAtPrice: 14500,
      stock: 5,
      updatedAt: '2026-08-08',
      createdAt: '2026-08-01',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      gallery: [
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=1600',
      ],
      description: 'Experience the pinnacle of luxurious seating with The Sovereign Curved Sofa. Handcrafted by master artisans in Italy, this statement piece features a sweeping crescent silhouette that encourages intimate conversation. Upholstered in our exclusive Tuscan Bouclé, it offers unparalleled tactile richness while maintaining exceptional durability for everyday elegance.',
      highlights: ['Free White Glove Delivery', '10-Year Frame Warranty', 'Handcrafted in Italy', 'Stain-resistant Fabric'],
      specifications: [
        { label: 'Material', value: 'Tuscan Bouclé (80% Wool, 20% Alpaca)' },
        { label: 'Frame', value: 'Kiln-dried hardwood' },
        { label: 'Dimensions', value: '110"W x 42"D x 34"H' },
        { label: 'Seat Height', value: '18 inches' },
        { label: 'Weight', value: '245 lbs' }
      ],
      variants: [
        { 
          type: 'Color',
          options: [
            { id: 'v-color-1', label: 'Ivory Bouclé', value: 'ivory', colorCode: '#F4F0EB' },
            { id: 'v-color-2', label: 'Charcoal Velvet', value: 'charcoal', colorCode: '#333333' }
          ]
        }
      ]
    },
    {
      id: 'prod-2',
      slug: 'florentine-marble-dining-table',
      sku: 'AUR-TBL-042',
      name: 'Florentine Marble Dining Table',
      status: 'published',
      categoryId: 'cat-1-1-2',
      brand: 'Aurelia',
      badge: 'Featured',
      price: 8500,
      compareAtPrice: null,
      stock: 2,
      updatedAt: '2026-08-07',
      createdAt: '2026-08-02',
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800',
      gallery: [
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=1600'
      ],
      description: 'The Florentine Marble Dining Table brings monumental elegance to your dining room. A continuous slab of hand-selected Calacatta gold marble rests upon architectural brushed brass pedestals. Seating up to eight guests comfortably, it serves as both a functional gathering place and a breathtaking sculptural centerpiece.',
      highlights: ['Premium Calacatta Marble', 'Seats 8 Guests', 'Stain-protected Sealant'],
      specifications: [
        { label: 'Top Material', value: 'Calacatta Gold Marble' },
        { label: 'Base Material', value: 'Solid Brass' },
        { label: 'Dimensions', value: '96"L x 42"W x 30"H' },
        { label: 'Weight', value: '380 lbs' }
      ],
      variants: []
    },
    {
      id: 'prod-3',
      slug: 'nordic-oak-lounge-chair',
      sku: 'AUR-CHR-015',
      name: 'Nordic Oak Lounge Chair',
      status: 'draft',
      categoryId: 'cat-1-1-1',
      brand: 'Nordic',
      price: 3200,
      compareAtPrice: 3800,
      stock: 0,
      updatedAt: '2026-08-06',
      createdAt: '2026-08-03',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
      gallery: [
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1600'
      ],
      description: 'A study in minimalist perfection. The Nordic Oak Lounge Chair relies on flawless joinery and dramatic sweeping lines rather than ornate detailing. The solid white oak frame is sculpted to cradle the body, while the aniline leather sling develops a beautiful patina over time.',
      highlights: ['Solid White Oak', 'Italian Aniline Leather', 'Ergonomic Pitch'],
      specifications: [
        { label: 'Frame', value: 'Solid White Oak' },
        { label: 'Sling', value: 'Full-grain Aniline Leather' },
        { label: 'Dimensions', value: '28"W x 34"D x 31"H' }
      ],
      variants: [
        {
          type: 'Leather',
          options: [
            { id: 'v-lth-1', label: 'Cognac', value: 'cognac', colorCode: '#8b4513' },
            { id: 'v-lth-2', label: 'Black', value: 'black', colorCode: '#000000' }
          ]
        }
      ]
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
