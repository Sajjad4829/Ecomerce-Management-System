import { Link } from 'react-router-dom';

export default function EditorialSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
          <img 
            src="https://images.unsplash.com/photo-1600607687959-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior Inspiration" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 text-center text-white p-8 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">
              Create spaces worth coming home to.
            </h2>
            <Link 
              to="/inspiration" 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-black bg-white hover:bg-gray-100 transition-colors uppercase"
            >
              Explore Inspiration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
