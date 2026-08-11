export default function CategoryGridPreview() {
  const categories = [
    { title: 'Living Room', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=600' },
    { title: 'Dining', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
    { title: 'Bedroom', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="py-24 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-12 text-center">Shop by Room</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative h-96 overflow-hidden cursor-pointer">
              <img 
                src={cat.image} 
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
