import { createContext, useState, useContext, useMemo } from 'react';

const BrandContext = createContext();

export function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([
    {
      id: 'brand-1',
      name: 'Aurelia Signature',
      slug: 'aurelia-signature',
      status: 'published',
      featured: true,
      productCount: 156,
      updatedAt: '2026-08-08',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'brand-2',
      name: 'Nordic Heritage',
      slug: 'nordic-heritage',
      status: 'published',
      featured: false,
      productCount: 34,
      updatedAt: '2026-08-01',
      logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200',
    }
  ]);

  const value = useMemo(() => ({
    brands,
    setBrands
  }), [brands]);

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrands must be used within a BrandProvider');
  }
  return context;
}
