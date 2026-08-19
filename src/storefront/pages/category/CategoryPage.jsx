import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import CategoryHero from '../../components/category/CategoryHero';
import CategoryBreadcrumb from '../../components/category/CategoryBreadcrumb';
import CategoryHeader from '../../components/category/CategoryHeader';
import FilterSidebar from '../../components/category/FilterSidebar';
import MobileFilterDrawer from '../../components/category/MobileFilterDrawer';
import ResponsiveProductGrid from '../../components/category/ResponsiveProductGrid';
import FloatingSupportButton from '../../components/category/FloatingSupportButton';
import EmptyState from '../../components/category/EmptyState';

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

export default function CategoryPage() {
  const { slug } = useParams();
  const { getCategoryBySlug, getParentCategory, categories } = useCategories();
  const { products } = useProducts();

  const [category, setCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    setIsLoading(true);
    const cat = getCategoryBySlug(slug);
    setCategory(cat);
    
    if (cat) {
      setParentCategory(getParentCategory(cat.id));
    } else {
      setParentCategory(null);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [slug, getCategoryBySlug, getParentCategory]);

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

  const getDescendantCategoryIds = (catId) => {
    const ids = [catId];
    const children = categories.filter(c => c.parentId === catId);
    children.forEach(child => {
      ids.push(...getDescendantCategoryIds(child.id));
    });
    return ids;
  };

  const displayProducts = useMemo(() => {
    if (!category) return [];

    const allowedCategoryIds = getDescendantCategoryIds(category.id);
    let filtered = products.filter(p => p.status === 'published' && allowedCategoryIds.includes(p.categoryId));

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
  }, [category, products, activeFilters, sortOption, categories]);

  if (!isLoading && !category) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-24">
        <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-4">Category Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn't find the category you're looking for.</p>
        <Link to="/shop" className="bg-[#1A1A1A] text-white px-8 py-3 font-semibold tracking-wide hover:bg-black transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

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
