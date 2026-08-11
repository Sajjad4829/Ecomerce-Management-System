import { cn } from '../../../../utils/cn';

export default function PreviewCanvas({ activeSection, device }) {
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
        
        {/* Announcement Bar */}
        <div className={cn(
          "py-2 text-center text-xs font-semibold tracking-wider uppercase transition-colors",
          activeSection === 'announcement' ? "bg-[#A69076] text-white ring-2 ring-blue-500 ring-inset" : "bg-[#1A1A1A] text-white opacity-90"
        )}>
          Free shipping on all orders over $200
        </div>

        {/* Header */}
        <header className={cn(
          "border-b border-black/5 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 bg-white/95 backdrop-blur z-10 transition-colors",
          activeSection === 'header' && "ring-2 ring-blue-500 ring-inset bg-blue-50/10"
        )}>
          <div className="font-serif font-bold text-xl tracking-tight">LUXE</div>
          <nav className={cn(
            "hidden md:flex items-center gap-6 text-sm font-medium transition-colors p-2 rounded",
            activeSection === 'mega-menu' && "ring-2 ring-blue-500 ring-inset bg-blue-50/10"
          )}>
            <span className="text-[#1A1A1A] hover:text-[#A69076] cursor-pointer">Collections</span>
            <span className="text-[#1A1A1A] hover:text-[#A69076] cursor-pointer">Designers</span>
            <span className="text-[#1A1A1A] hover:text-[#A69076] cursor-pointer">About</span>
          </nav>
          <div className="flex gap-4 items-center">
             <div className="text-xs font-semibold uppercase hidden md:block">Search</div>
             <div className="w-4 h-4 rounded-full bg-black/10"></div>
             <div className="w-4 h-4 rounded-full bg-black/10"></div>
          </div>
        </header>

        {/* Mock Content */}
        <div className="flex-1 flex flex-col opacity-50 pointer-events-none">
          <div className="bg-[#F7F5F2] py-20 px-6 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 max-w-2xl">
              Elevate Your Space
            </h1>
            <p className="text-gray-500 mb-8 max-w-lg font-sans">
              Page content placeholder.
            </p>
          </div>
          <div className="py-16 px-6 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[3/4] bg-gray-100 rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={cn(
          "bg-[#1A1A1A] text-white/50 py-12 px-6 text-sm shrink-0 transition-colors",
          activeSection === 'footer' && "ring-2 ring-blue-500 ring-inset"
        )}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="col-span-2 md:col-span-1">
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
             <div className="col-span-2">
                <div className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Join the Club</div>
                <div className="flex w-full gap-2">
                   <div className="flex-1 bg-white/10 px-3 py-2 text-xs">Email address</div>
                   <div className="bg-white text-black px-4 py-2 text-xs font-bold">JOIN</div>
                </div>
             </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
