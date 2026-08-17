import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden bg-gray-100 flex items-center min-h-[500px] lg:min-h-[600px]">
          <img 
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern living room collection" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 w-full max-w-xl p-8 md:p-16 lg:p-24 text-white">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6 tracking-tight">
              Made for modern living.
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light">
              Explore our curated selection of foundational pieces that anchor your space with effortless style and uncompromising comfort.
            </p>
            <Link 
              to="/collections" 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-black bg-white hover:bg-gray-100 transition-colors uppercase"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
