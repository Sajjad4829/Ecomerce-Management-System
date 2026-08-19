import React, { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import FilterSidebar from '../../components/category/FilterSidebar';
import MobileFilterDrawer from '../../components/category/MobileFilterDrawer';
import ResponsiveProductGrid from '../../components/category/ResponsiveProductGrid';
import CategoryBreadcrumb from '../../components/category/CategoryBreadcrumb';
import FloatingSupportButton from '../../components/category/FloatingSupportButton';
import { Link } from 'react-router-dom';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

const FILTER_CONFIG = [
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { label: 'In Stock', value: 'in-stock' },
      { label: 'Out of Stock', value: 'out-of-stock' }
    ]
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { label: 'Under $5,000', value: '0-5000' },
      { label: '$5,000 - $10,000', value: '5000-10000' },
      { label: 'Over $10,000', value: '10000+' }
    ]
  },
  {
    id: 'material',
    name: 'Material',
    options: [
      { label: 'Oak Wood', value: 'oak' },
      { label: 'Marble', value: 'marble' },
      { label: 'Leather', value: 'leather' },
      { label: 'Bouclé', value: 'boucle' }
    ]
  }
];

export default function ShopPage() {
  const { products } = useProducts();
  const { activeTheme } = useStorefrontTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filterId, optionValue) => {
    setActiveFilters(prev => {
      const current = prev[filterId] || [];
      if (current.includes(optionValue)) {
        return { ...prev, [filterId]: current.filter(v => v !== optionValue) };
      }
      return { ...prev, [filterId]: [...current, optionValue] };
    });
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setIsMobileFilterOpen(false);
  };

  const displayProducts = useMemo(() => {
    let filtered = products.filter(p => p.status === 'published');

    // Filter by availability
    if (activeFilters['availability']?.length > 0) {
      filtered = filtered.filter(p => {
        const inStock = p.stock > 0;
        if (activeFilters['availability'].includes('in-stock') && inStock) return true;
        if (activeFilters['availability'].includes('out-of-stock') && !inStock) return true;
        return false;
      });
    }

    // Filter by price
    if (activeFilters['price']?.length > 0) {
      filtered = filtered.filter(p => {
        return activeFilters['price'].some(range => {
          if (range === '0-5000') return p.price < 5000;
          if (range === '5000-10000') return p.price >= 5000 && p.price <= 10000;
          if (range === '10000+') return p.price > 10000;
          return false;
        });
      });
    }

    // Filter by material (dummy matching against highlights/specs)
    if (activeFilters['material']?.length > 0) {
      filtered = filtered.filter(p => {
        const productText = (p.description + ' ' + (p.highlights || []).join(' ') + ' ' + (p.specifications || []).map(s => s.value).join(' ')).toLowerCase();
        return activeFilters['material'].some(mat => productText.includes(mat.toLowerCase()));
      });
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          const aFeatured = a.badge ? 1 : 0;
          const bFeatured = b.badge ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
    }

    return filtered;
  }, [products, activeFilters, sortOption]);

  return (
    <div className={`w-full min-h-screen pb-24 ${activeTheme.tokens.background}`}>
      <div className={`${activeTheme.tokens.surface} border-b ${activeTheme.tokens.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <CategoryBreadcrumb category={{ name: 'Shop' }} />
          <h1 className={`text-4xl md:text-5xl font-serif font-bold mt-4 ${activeTheme.tokens.text.primary}`}>Shop All Furniture</h1>
          <p className={`mt-4 max-w-2xl text-lg ${activeTheme.tokens.text.secondary}`}>Discover our complete curated collection of premium furniture designed for the modern home.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="flex items-start gap-12">
          <FilterSidebar 
            filters={FILTER_CONFIG}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
          
          <ResponsiveProductGrid 
            products={displayProducts} 
            isLoading={isLoading}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            sortOption={sortOption}
            onSortChange={(e) => setSortOption(e.target.value)}
          />
        </div>
      </div>

      <MobileFilterDrawer 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={FILTER_CONFIG}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
      />

      <FloatingSupportButton />
    </div>
  );
}
