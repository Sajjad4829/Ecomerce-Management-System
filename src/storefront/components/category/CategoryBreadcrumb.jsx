import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function CategoryBreadcrumb({ category, parentCategory }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto overflow-x-auto whitespace-nowrap scrollbar-hide">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-500">
          <li>
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          </li>
          
          {parentCategory && (
            <>
              <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
              <li>
                <Link to={`/category/${parentCategory.slug}`} className="hover:text-gray-900 transition-colors">
                  {parentCategory.name}
                </Link>
              </li>
            </>
          )}

          {category && (
            <>
              <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
              <li>
                <span className="text-gray-900" aria-current="page">
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
