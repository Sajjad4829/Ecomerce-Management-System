import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import CategoryHero from '../../components/category/CategoryHero';
import CategoryBreadcrumb from '../../components/category/CategoryBreadcrumb';
import CategoryHeader from '../../components/category/CategoryHeader';
import FilterSidebar from '../../components/category/FilterSidebar';
import MobileFilterDrawer from '../../components/category/MobileFilterDrawer';
import ResponsiveProductGrid from '../../components/category/ResponsiveProductGrid';
import FloatingSupportButton from '../../components/category/FloatingSupportButton';

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
      { label: 'Under $1,000', value: '0-1000' },
      { label: '$1,000 - $3,000', value: '1000-3000' },
      { label: 'Over $3,000', value: '3000+' }
    ]
  },
  {
    id: 'material',
    name: 'Material',
    options: [
      { label: 'Oak Wood', value: 'oak' },
      { label: 'Walnut', value: 'walnut' },
      { label: 'Marble', value: 'marble' },
      { label: 'Velvet', value: 'velvet' }
    ]
  }
];

export default function CategoryPage() {
  const { slug } = useParams();
  const { getCategoryBySlug } = useCategories();
  const { products } = useProducts();

  const [category, setCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    const cat = getCategoryBySlug(slug);
    setCategory(cat);
    
    // Quick parent resolution logic for breadcrumb (simplified for UI demonstration)
    if (cat?.parentId) {
      setParentCategory({ name: 'Furniture', slug: 'furniture' }); 
    } else {
      setParentCategory(null);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [slug, getCategoryBySlug]);

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

  // Note: we're using all products for visual testing if category isn't tightly linked
  // A real app would filter products by category.id and activeFilters
  const displayProducts = activeFilters['price']?.length > 0 ? [] : products;

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      <CategoryHero category={category} />
      <CategoryBreadcrumb category={category} parentCategory={parentCategory} />
      <CategoryHeader category={category} productCount={displayProducts.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
