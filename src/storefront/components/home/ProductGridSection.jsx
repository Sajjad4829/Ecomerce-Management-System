import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { useProducts } from '../../../admin/context/commerce/ProductContext';

export default function ProductGridSection({ data, title: propTitle, linkTo }) {
  const { products: contextProducts } = useProducts();
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : (propTitle || "Featured Products");
  
  const displayProducts = contextProducts?.slice(0, 4) || [];

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">{title}</h2>
          </div>
          {linkTo && (
            <Link to={linkTo} className="group flex items-center text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
              View All <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
