import React from 'react';

export default function ProductGridPreview({ section = {} }) {
  const content = section.content || {};
  const settings = section.settings || {};
  const columns = settings.columns || '4';

  const products = [
    { name: 'Wireless Headphones', price: '$159.00', originalPrice: '$199.00', badge: 'Sale', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Smart Watch Series 8', price: '$249.00', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400' },
    { name: 'Leather Backpack', price: '$129.00', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' },
    { name: 'Running Shoes', price: '$99.00', originalPrice: '$129.00', badge: 'Sale', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' },
    { name: 'Ceramic Mug', price: '$24.00', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400' }
  ].slice(0, parseInt(columns, 10));

  const gridColsClass = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5'
  }[columns] || 'grid-cols-4';

  return (
    <div className="w-full bg-[#fcfdff] py-16 px-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">{content.title || 'Featured Products'}</h2>
          {content.subtitle && <p className="text-sm text-gray-500 mt-1">{content.subtitle}</p>}
        </div>
        <a href="#" className="text-xs font-semibold text-[#635BFF] hover:underline">View All</a>
      </div>
      
      <div className={`grid ${gridColsClass} gap-6`}>
        {products.map((product, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="w-full aspect-square bg-[#f5f6f8] rounded-xl mb-4 relative overflow-hidden flex items-center justify-center p-6">
              {product.badge && (
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm z-10 uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs font-medium text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
