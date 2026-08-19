export default function ProductGridPreview() {
  const products = [
    { id: 1, name: 'Lounge Chair', price: '$890', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'Oak Dining Table', price: '$1,200', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Minimalist Sofa', price: '$2,400', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="py-24 px-8 md:px-16 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-2">New Arrivals</h2>
            <p className="text-text-muted">The latest additions to our collection.</p>
          </div>
          <button className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] text-text-primary border-b-2 border-[#1A1A1A] pb-1 hover:text-text-muted hover:border-gray-500 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-text-primary text-lg">{product.name}</h3>
                <span className="text-sm font-medium text-text-muted">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
