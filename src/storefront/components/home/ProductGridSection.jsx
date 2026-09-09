import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { useProducts } from '../../../admin/context/commerce/ProductContext';

export default function ProductGridSection({ data, title: propTitle, linkTo, ...settings }) {
  const { products: contextProducts } = useProducts();
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : (propTitle || "Featured Products");
  const subtitle = content.subtitle || "";
  
  const resolveSetting = (key, defaultVal) => {
    // Read from standard settings or device-specific overrides from data.responsive
    const baseVal = settings[key] !== undefined ? settings[key] : defaultVal;
    return {
      desktop: data?.responsive?.desktop?.[key] !== undefined ? data.responsive.desktop[key] : baseVal,
      tablet: data?.responsive?.tablet?.[key] !== undefined ? data.responsive.tablet[key] : baseVal,
      mobile: data?.responsive?.mobile?.[key] !== undefined ? data.responsive.mobile[key] : baseVal
    };
  };

  const columns = resolveSetting('columns', '4');
  const getGridClasses = () => {
    return `grid gap-x-8 gap-y-12 grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
  };

  const displayProducts = contextProducts?.slice(0, parseInt(columns.desktop, 10) || 4) || [];

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
          </div>
          {linkTo && (
            <Link to={linkTo} className="group flex items-center text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
              View All <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
        
        <div className={getGridClasses()}>
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
