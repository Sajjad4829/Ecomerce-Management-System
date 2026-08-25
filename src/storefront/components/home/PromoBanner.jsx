import { Link } from 'react-router-dom';

export default function PromoBanner({ data }) {
  const content = data?.content || {};
  const title = content.title !== undefined ? content.title : "Elevate Your Everyday";
  const text = content.text !== undefined ? content.text : "Discover furniture designed to transform your living spaces.";
  const button = content.button !== undefined ? content.button : "Shop Now";
  const image = content.image !== undefined && content.image !== '' ? content.image : (data?.image || "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2000");

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden bg-gray-100 flex items-center min-h-[500px] lg:min-h-[600px]">
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 w-full max-w-xl p-8 md:p-16 lg:p-24 text-white">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6 tracking-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light">
              {text}
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest text-black bg-white hover:bg-gray-100 transition-colors uppercase"
            >
              {button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
