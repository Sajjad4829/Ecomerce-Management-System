import { cn } from '../../../../utils/cn';
import { FiSearch, FiShoppingBag, FiMenu, FiChevronRight } from 'react-icons/fi';

export default function NavigationPreview({ device, viewMode }) {
  
  const getContainerWidth = () => {
    switch(device) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      default: return 'w-full';
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl border border-black/5 flex-1 relative overflow-hidden flex justify-center h-full">
      {/* Canvas Area */}
      <div className={cn(
        "bg-surface h-full shadow-2xl transition-all duration-300 flex flex-col border-x border-black/5 relative",
        getContainerWidth()
      )}>
        
        {device === 'mobile' ? (
          // Mobile Drawer Preview
          <div className="flex-1 flex flex-col bg-surface overflow-hidden">
             <div className="p-4 border-b border-black/5 flex justify-between items-center bg-background/50">
                <span className="font-serif font-bold text-lg">Menu</span>
                <button className="text-text-muted hover:text-black">&times;</button>
             </div>
             <div className="p-4 border-b border-black/5">
                <div className="bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2 text-text-muted">
                   <FiSearch size={14} />
                   <span className="text-sm">Search...</span>
                </div>
             </div>
             <div className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b border-black/5 hover:bg-background cursor-pointer">
                   <span className="font-semibold text-sm">Living Room</span>
                   <FiChevronRight className="text-text-muted" />
                </div>
                <div className="flex justify-between items-center p-4 border-b border-black/5 hover:bg-background cursor-pointer">
                   <span className="font-semibold text-sm">Bedroom</span>
                   <FiChevronRight className="text-text-muted" />
                </div>
                <div className="flex justify-between items-center p-4 border-b border-black/5 hover:bg-background cursor-pointer">
                   <span className="font-semibold text-sm">Dining</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-black/5 hover:bg-background cursor-pointer">
                   <span className="font-semibold text-sm">Collections</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-black/5 hover:bg-background cursor-pointer">
                   <span className="font-semibold text-sm">About Us</span>
                </div>
             </div>
          </div>
        ) : (
          // Desktop / Tablet Header Preview
          <div className="flex-1 bg-background flex flex-col relative overflow-hidden">
             <header className="bg-surface/90 backdrop-blur border-b border-black/5 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10">
                <div className="font-serif font-bold text-xl tracking-tight">LUXE</div>
                
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium h-full">
                  <div className={cn(
                    "h-full flex items-center cursor-pointer transition-colors relative group",
                    viewMode === 'mega-menu' ? "text-[#A69076]" : "text-text-primary hover:text-[#A69076]"
                  )}>
                    Living Room
                    {/* Active Indicator */}
                    {viewMode === 'mega-menu' && (
                      <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#A69076]"></div>
                    )}
                  </div>
                  <span className="text-text-primary hover:text-[#A69076] cursor-pointer transition-colors">Bedroom</span>
                  <span className="text-text-primary hover:text-[#A69076] cursor-pointer transition-colors">Dining</span>
                  <span className="text-text-primary hover:text-[#A69076] cursor-pointer transition-colors">Collections</span>
                  <span className="text-text-muted cursor-not-allowed">About Us</span>
                </nav>

                <div className="flex gap-4 items-center text-text-secondary">
                  <FiSearch size={18} className="cursor-pointer hidden sm:block" />
                  <FiShoppingBag size={18} className="cursor-pointer hidden sm:block" />
                  <FiMenu size={20} className="md:hidden cursor-pointer" />
                </div>
             </header>

             {/* Mega Menu Overlay (if active) */}
             {viewMode === 'mega-menu' && device !== 'mobile' && (
                <div className="absolute top-[61px] left-0 right-0 bg-surface shadow-xl border-b border-black/5 z-20 animate-in slide-in-from-top-2">
                   <div className="max-w-7xl mx-auto px-6 py-8 flex gap-12">
                      <div className="flex gap-12 flex-1">
                         <div className="space-y-4">
                            <h4 className="font-bold text-sm text-text-primary">Sofas & Sectionals</h4>
                            <ul className="space-y-2 text-sm text-text-muted">
                               <li className="hover:text-black cursor-pointer">Sectionals</li>
                               <li className="hover:text-black cursor-pointer">Loveseats</li>
                               <li className="hover:text-black cursor-pointer">Sleeper Sofas</li>
                               <li className="hover:text-black cursor-pointer">Modular Sofas</li>
                            </ul>
                         </div>
                         <div className="space-y-4">
                            <h4 className="font-bold text-sm text-text-primary">Chairs</h4>
                            <ul className="space-y-2 text-sm text-text-muted">
                               <li className="hover:text-black cursor-pointer">Accent Chairs</li>
                               <li className="hover:text-black cursor-pointer">Recliners</li>
                               <li className="hover:text-black cursor-pointer">Chaise Lounges</li>
                               <li className="hover:text-black cursor-pointer">Benches</li>
                            </ul>
                         </div>
                         <div className="space-y-4">
                            <h4 className="font-bold text-sm text-text-primary">Tables</h4>
                            <ul className="space-y-2 text-sm text-text-muted">
                               <li className="hover:text-black cursor-pointer">Coffee Tables</li>
                               <li className="hover:text-black cursor-pointer">Side Tables</li>
                               <li className="hover:text-black cursor-pointer">Console Tables</li>
                               <li className="hover:text-black cursor-pointer">Ottomans</li>
                            </ul>
                         </div>
                      </div>
                      
                      {/* Promotional Block */}
                      <div className="w-80 shrink-0 bg-background p-4 rounded-xl">
                         <div className="aspect-[4/3] bg-gray-200 mb-4 rounded-lg"></div>
                         <h4 className="font-bold text-text-primary mb-1">Summer Collection</h4>
                         <p className="text-xs text-text-muted mb-3">Explore our new premium outdoor living sets.</p>
                         <button className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5">Shop Now</button>
                      </div>
                   </div>
                </div>
             )}
             
             {/* Dim background if mega menu is open */}
             {viewMode === 'mega-menu' && device !== 'mobile' && (
               <div className="absolute inset-0 bg-black/5 mt-[61px] z-10 pointer-events-none"></div>
             )}

             {/* Dummy Page Content */}
             <div className="flex-1 p-8 text-center text-text-muted flex flex-col items-center justify-center opacity-30">
               <span className="font-serif text-2xl font-bold mb-2">Page Content</span>
               <p className="text-sm">Navigation overlay preview</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
