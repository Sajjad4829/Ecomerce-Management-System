import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-gray-100 overflow-hidden flex items-center">
        {/* Placeholder for Hero Image - In a real scenario, use an actual optimized image */}
        <div className="absolute inset-0 bg-[#e6e4df]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-gray-900 leading-tight mb-6">
              Designed for the way you live.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg leading-relaxed">
              Discover our new collection of premium furniture. Crafted with unparalleled attention to detail and sustainable materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/collections/new" 
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-white bg-black hover:bg-gray-800 transition-colors uppercase"
              >
                Explore New Arrivals
              </Link>
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-black bg-white border border-black hover:bg-gray-50 transition-colors uppercase"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Foundation) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Shop by Category</h2>
          <Link to="/categories" className="hidden sm:block text-sm font-medium underline hover:text-gray-600 transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Placeholders for categories */}
          <div className="aspect-[4/5] bg-gray-100 p-8 flex flex-col justify-end hover:opacity-90 transition-opacity cursor-pointer">
            <h3 className="text-xl font-bold bg-white/90 p-4 inline-block self-start">Living Room</h3>
          </div>
          <div className="aspect-[4/5] bg-gray-100 p-8 flex flex-col justify-end hover:opacity-90 transition-opacity cursor-pointer">
            <h3 className="text-xl font-bold bg-white/90 p-4 inline-block self-start">Bedroom</h3>
          </div>
          <div className="aspect-[4/5] bg-gray-100 p-8 flex flex-col justify-end hover:opacity-90 transition-opacity cursor-pointer">
            <h3 className="text-xl font-bold bg-white/90 p-4 inline-block self-start">Dining</h3>
          </div>
        </div>
      </section>

      {/* Featured Products (Foundation) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Curated Pieces</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hand-selected items that define the modern aesthetic.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Product Placeholders */}
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="group">
                 <div className="aspect-square bg-gray-200 mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity">
                     <button className="bg-white text-black px-6 py-2 text-sm font-bold shadow-sm hover:scale-105 transition-transform">
                       Quick View
                     </button>
                   </div>
                 </div>
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-medium text-gray-900 mb-1">Premium Chair {i}</h3>
                     <p className="text-sm text-gray-500">Linen / Natural</p>
                   </div>
                   <span className="font-medium text-gray-900">${899 + (i * 100)}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Brand Story (Foundation) */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gray-100"></div>
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Uncompromising Quality</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every piece in our collection is thoughtfully designed and meticulously crafted. We partner with artisans who share our dedication to sustainable materials and enduring design.
            </p>
            <Link to="/about" className="text-sm font-bold tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
