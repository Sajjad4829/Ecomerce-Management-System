import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';

export default function ProductBreadcrumb({ product, category }) {
  const { getCategoryHierarchy } = useCategories();
  if (!product) return null;

  const hierarchy = category ? getCategoryHierarchy(category.id) : [];

  return (
    <nav aria-label="Breadcrumb" className="py-4 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-500">
          <li>
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          </li>
          
          <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
          <li>
            <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
          </li>
          
          {hierarchy.map((cat) => (
            <React.Fragment key={cat.id}>
              <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
              <li>
                <Link to={`/category/${cat.slug}`} className="hover:text-gray-900 transition-colors">
                  {cat.name}
                </Link>
              </li>
            </React.Fragment>
          ))}

          <li><FiChevronRight size={14} className="mx-1 text-gray-300" /></li>
          <li>
            <span className="text-[#EE2737] font-semibold" aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
