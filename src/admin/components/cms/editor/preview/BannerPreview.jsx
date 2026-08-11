export default function BannerPreview() {
  return (
    <div className="bg-[#1A1A1A] text-white py-16 px-8 text-center flex flex-col items-center justify-center">
      <h2 className="text-2xl font-serif font-bold mb-4 max-w-2xl mx-auto">
        Join our newsletter for 10% off your first order.
      </h2>
      <div className="flex w-full max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
        />
        <button className="px-6 py-3 bg-white text-[#1A1A1A] text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
}
