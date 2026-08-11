import { cn } from '../../../../utils/cn';

export default function ThemePreview({ activeSection, device }) {
  
  const getContainerWidth = () => {
    switch(device) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      default: return 'w-full';
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl border border-black/5 flex-1 relative overflow-hidden flex justify-center h-[calc(100vh-14rem)]">
      {/* Canvas Area */}
      <div className={cn(
        "bg-white h-full shadow-2xl transition-all duration-300 overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar border-x border-black/5",
        getContainerWidth()
      )}>
        
        {/* Mock Header */}
        <header className="border-b border-black/5 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 bg-white/90 backdrop-blur z-10">
          <div className="font-serif font-bold text-xl tracking-tight">LUXE</div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <span className="text-[#1A1A1A] hover:text-[#A69076] cursor-pointer transition-colors">Collections</span>
            <span className="text-[#1A1A1A] hover:text-[#A69076] cursor-pointer transition-colors">Designers</span>
            <span className="text-[#1A1A1A] hover:text-[#A69076] cursor-pointer transition-colors">About</span>
          </nav>
          <div className="flex gap-4 items-center">
            <div className="w-4 h-4 rounded-full bg-black/10"></div>
            <div className="w-4 h-4 rounded-full bg-black/10"></div>
          </div>
        </header>

        {/* Mock Content */}
        <div className="flex-1 flex flex-col">
          {/* Hero */}
          <div className="bg-[#F7F5F2] py-20 px-6 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 max-w-2xl">
              Elevate Your Living Space
            </h1>
            <p className="text-gray-500 mb-8 max-w-lg font-sans">
              Discover our new collection of premium, handcrafted furniture designed for modern comfort and timeless style.
            </p>
            <button className="px-8 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">
              Shop Collection
            </button>
          </div>

          {/* Cards / Products */}
          <div className="py-16 px-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
               <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">New Arrivals</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="group">
                  <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative">
                     {/* Placeholder Image */}
                     <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] text-sm">Minimalist Oak Chair</h3>
                      <p className="text-gray-500 text-xs mt-1">Dining Collection</p>
                    </div>
                    <span className="font-mono text-sm">$899</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form / Newsletter */}
          <div className="border-t border-black/5 py-16 px-6 flex flex-col items-center text-center">
             <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">Join the Club</h2>
             <p className="text-gray-500 text-sm mb-6 max-w-md">Subscribe to receive updates, access to exclusive deals, and more.</p>
             <div className="flex w-full max-w-md gap-2">
               <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-gray-50 border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors" />
               <button className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shrink-0">
                 Subscribe
               </button>
             </div>
          </div>
        </div>

        {/* Mock Footer */}
        <footer className="bg-[#1A1A1A] text-white/50 py-12 px-6 text-sm shrink-0">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
             <div>
               <div className="font-serif font-bold text-white text-lg mb-4">LUXE</div>
               <p className="text-xs max-w-[200px]">Premium furniture for the modern home.</p>
             </div>
             <div>
               <div className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Shop</div>
               <ul className="space-y-2 text-xs">
                 <li>All Products</li>
                 <li>New Arrivals</li>
                 <li>Collections</li>
               </ul>
             </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
