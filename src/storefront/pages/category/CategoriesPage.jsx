import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';

export default function CategoriesPage() {
  const { categories } = useCategories();
  
  // Filter only active root categories
  const rootCategories = categories.filter(c => !c.parentId && c.status === 'Active');

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight mb-12 text-center">
          All Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rootCategories.map(category => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="group block relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl"
            >
              <img 
                src={category.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                <span className="text-sm font-medium tracking-widest uppercase border-b border-transparent group-hover:border-white transition-colors pb-1">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
