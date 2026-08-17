import { Link } from 'react-router-dom';

export default function BrandStory() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              Crafted with intention
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Every piece in our collection is designed to balance comfort, material quality, and timeless form. We partner with master artisans who share our dedication to sustainable practices and enduring design.
            </p>
            <Link 
              to="/about" 
              className="inline-flex text-sm font-bold tracking-widest uppercase text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Discover Our Story
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-square relative bg-gray-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
                alt="Craftsmanship detail" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
