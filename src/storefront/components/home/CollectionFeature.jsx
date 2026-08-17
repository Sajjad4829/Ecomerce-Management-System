import { Link } from 'react-router-dom';

export default function CollectionFeature() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] relative bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200" 
                alt="The Sanctuary Collection" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="block text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
              Curated Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              The Sanctuary Collection
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              Embrace tranquility with our newest collection. Featuring organic textures, soft neutral tones, and expansive silhouettes designed to turn your home into a restorative retreat.
            </p>
            <Link 
              to="/collections/sanctuary" 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-white bg-black hover:bg-gray-800 transition-colors uppercase"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
