import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryGridSection({ data }) {
  if (!data || !data.content) return null;

  const { title, categories } = data.content;
  const { columns = '5', imageRatio = 'square', gap = 'medium' } = data.settings || {};

  // Tailwind classes mapping based on user settings
  const getGridCols = () => {
    switch (columns) {
      case '3': return 'grid-cols-2 md:grid-cols-3';
      case '4': return 'grid-cols-2 md:grid-cols-4';
      case '6': return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6';
      case '5':
      default:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5';
    }
  };

  const getGridGap = () => {
    switch (gap) {
      case 'small': return 'gap-4';
      case 'large': return 'gap-8 md:gap-12';
      case 'medium': 
      default:
        return 'gap-6 md:gap-8';
    }
  };

  const getAspectRatio = () => {
    switch (imageRatio) {
      case 'portrait': return 'aspect-[3/4]';
      case 'landscape': return 'aspect-[4/3]';
      case 'square':
      default:
        return 'aspect-square';
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {title && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
        )}

        {(!categories || categories.length === 0) ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-gray-100">
            No categories added yet. Open the Advanced Settings to add categories.
          </div>
        ) : (
          <div className={`grid ${getGridGap()} ${getGridCols()}`}>
            {categories.map((cat, index) => {
              const CardContent = () => (
                <div className="w-[200px] h-[200px] mx-auto group flex flex-col bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-gray-200 p-[2px]">
                  <div className="w-full flex-1 overflow-hidden bg-gray-50 relative">
                    {cat.image ? (
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                        <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 md:p-4 shrink-0 flex flex-col justify-center text-center">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name || 'Untitled Category'}
                    </h3>
                  </div>
                </div>
              );

              if (cat.link) {
                return (
                  <Link key={cat.id || index} to={cat.link} className="block w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <CardContent />
                  </Link>
                );
              }

              return (
                <div key={cat.id || index} className="w-full">
                  <CardContent />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
