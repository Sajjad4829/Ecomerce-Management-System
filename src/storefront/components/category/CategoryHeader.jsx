import { FiSliders } from 'react-icons/fi';
import CategoryBreadcrumb from './CategoryBreadcrumb';

export default function CategoryHeader({ category, parentCategory, grandparentCategory, productCount, onOpenFilters }) {
  return (
    <div className="py-2 px-4 md:px-8 lg:px-16 w-full max-w-[1920px] mx-auto bg-white mb-8">
      <div className="grid grid-cols-3 items-center">
        {/* Left: Filters Button */}
        <div className="flex items-center">
          <button 
            onClick={onOpenFilters}
            className="flex items-center text-sm font-semibold text-[#1a1a1a] hover:text-black transition-colors"
          >
            <FiSliders size={18} className="mr-2" /> Filters
          </button>
        </div>

        {/* Center: Breadcrumb (Replacing Title) */}
        <div className="flex items-center justify-center w-full">
          <CategoryBreadcrumb 
            category={category} 
            parentCategory={parentCategory} 
            grandparentCategory={grandparentCategory}
          />
        </div>

        {/* Right: Product Count */}
        <div className="flex items-center justify-end">
          <p className="text-sm text-gray-500">
            Showing {productCount} of {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>
    </div>
  );
}
