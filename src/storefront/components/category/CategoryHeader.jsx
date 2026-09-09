import { FiSliders } from 'react-icons/fi';
import CategoryBreadcrumb from './CategoryBreadcrumb';

export default function CategoryHeader({ category, parentCategory, grandparentCategory, productCount, onOpenFilters }) {
  
  // Helper to split the category name to underline the first word
  const renderTitle = (name) => {
    if (!name) return null;
    const words = name.split(' ');
    if (words.length > 1) {
      const firstWord = words[0];
      const rest = words.slice(1).join(' ');
      return (
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-wide">
          <span className="border-b-2 border-gray-300 pb-1">{firstWord}</span> {rest}
        </h1>
      );
    }
    return (
      <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-wide">
        <span className="border-b-2 border-gray-300 pb-1">{name}</span>
      </h1>
    );
  };

  return (
    <div className="py-6 px-4 md:px-8 lg:px-16 w-full max-w-[1920px] mx-auto bg-white mb-8 relative">
      {/* Filters and Count positioned absolutely on the right for md+ screens, 
          or just normally in flex for smaller screens */}
      <div className="md:absolute md:right-8 lg:right-16 md:top-6 flex justify-between md:justify-end items-center w-full md:w-auto mb-4 md:mb-0 px-4 md:px-0">
        <p className="text-sm text-gray-500 hidden sm:block md:mr-6">
          Showing {productCount} of {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
        <button 
          onClick={onOpenFilters}
          className="flex items-center text-sm font-semibold text-[#1a1a1a] hover:text-black transition-colors"
        >
          <FiSliders size={18} className="mr-2" /> Filters
        </button>
      </div>

      {/* Centered Content: Breadcrumb + Title */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <CategoryBreadcrumb 
            category={category} 
            parentCategory={parentCategory} 
            grandparentCategory={grandparentCategory}
          />
        </div>
        <div>
          {category && renderTitle(category.name)}
        </div>
      </div>
    </div>
  );
}
