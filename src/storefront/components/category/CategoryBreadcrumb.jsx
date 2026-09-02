import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function CategoryBreadcrumb({ category, parentCategory, grandparentCategory }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-transparent w-full">
      <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide flex justify-center">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-500">
          <li>
            <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
          </li>
          
          {grandparentCategory && (
            <>
              <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
              <li>
                <Link to={`/categories/${grandparentCategory.slug}`} className="hover:text-gray-900 transition-colors">
                  {grandparentCategory.name}
                </Link>
              </li>
            </>
          )}

          {parentCategory && (
            <>
              <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
              <li>
                <Link to={`/categories/${parentCategory.slug}`} className="hover:text-gray-900 transition-colors">
                  {parentCategory.name}
                </Link>
              </li>
            </>
          )}

          {category && (
            <>
              <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
              <li>
                <span className="text-red-600 font-semibold" aria-current="page">
                  {category.name}
                </span>
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  );
}
