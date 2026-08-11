export default function HeroPreview() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[#F7F5F2]">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
      
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1A1A1A] mb-6 tracking-tight">
          Crafted for Life
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
          Discover our new collection of meticulously crafted wooden furniture. Designed for modern living, built to last generations.
        </p>
        <button className="px-8 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-colors">
          Shop Collection
        </button>
      </div>
    </div>
  );
}
