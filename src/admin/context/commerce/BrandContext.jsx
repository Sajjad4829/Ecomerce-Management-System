import { createContext, useState, useContext, useMemo } from 'react';

const BrandContext = createContext();

export function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([]);

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
