import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CATEGORIES = [
  {
    id: 'living-room',
    title: 'Living Room',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    slug: 'living-room'
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800',
    slug: 'bedroom'
  },
  {
    id: 'dining',
    title: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800',
    slug: 'dining-room'
  },
  {
    id: 'office',
    title: 'Office',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    slug: 'office'
  }
];

export default function CategoryShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Shop by Category</h2>
          </div>
          <Link to="/categories" className="group flex items-center text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
            View All <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(category => (
            <Link key={category.id} to={`/category/${category.slug}`} className="group block relative overflow-hidden bg-gray-100 aspect-[4/5]">
              <img 
                src={category.image} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
