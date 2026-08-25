import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';

export default function CategoryShowcase({ data }) {
  const { categories } = useCategories();
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : 'Shop by Category';
  
  // Get top-level categories and limit to 4
  const displayCategories = categories?.filter(c => !c.parentId).slice(0, 4) || [];

  if (displayCategories.length === 0) {
    return null; // Graceful empty state
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">{title}</h2>
          </div>
          <Link to="/categories" className="group flex items-center text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
            View All <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map(category => (
            <Link key={category.id} to={`/category/${category.slug}`} className="group block relative overflow-hidden bg-gray-100 aspect-[4/5]">
              <img 
                src={category.image !== undefined && category.image !== '' ? category.image : 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800'} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-xl font-bold text-white tracking-wide">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
