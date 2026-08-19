import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-[#F7F7F7]">
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
        alt="Premium modern living room setup"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          <span className="block text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-90 text-gray-200">
            NEW COLLECTION
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-bold tracking-tight leading-[1.05] mb-6">
            Designed for the way you live
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light text-gray-100 max-w-xl">
            Premium furniture crafted with timeless design, exceptional comfort and lasting quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest text-black bg-white hover:bg-gray-200 transition-colors uppercase"
            >
              Shop Collection
            </Link>
            <Link 
              to="/collections/new" 
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest text-white border border-white hover:bg-white/10 transition-colors uppercase"
            >
              Explore New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
