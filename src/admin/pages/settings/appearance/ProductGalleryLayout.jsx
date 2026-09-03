import React, { useState } from 'react';
import { FiImage, FiArrowRight, FiGrid, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsLayoutSidebarInset, BsLayoutSplit } from 'react-icons/bs';

const ProductGalleryLayout = ({ onBack }) => {
  const [selectedLayout, setSelectedLayout] = useState('vertical');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f6f8fd] overflow-y-auto relative">
      
      {/* Wave Background SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-50 pointer-events-none z-0 overflow-hidden">
         <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full text-[#e8ebfc] fill-current preserve-3d">
            <path d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,208C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6b46c1] flex items-center justify-center text-white shadow-sm">
                <FiImage size={20} />
              </div>
              <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Gallery Layout</span>
            </div>
            <h2 className="text-[32px] font-bold text-[#0f172a] mb-2">Choose Your Gallery Layout</h2>
            <p className="text-stone-500 text-[15px] max-w-lg">
              Select a layout style to display your product gallery beautifully on the website.
            </p>
          </div>
        </div>

        {/* Layout Options - Stacked Rows */}
        <div className="flex flex-col gap-6">
          
          {/* Card 1: Vertical */}
          <div 
            onClick={() => setSelectedLayout('vertical')}
            className={`p-6 rounded-[24px] border-2 bg-white cursor-pointer transition-all ${
              selectedLayout === 'vertical' ? 'border-[#6b46c1] shadow-lg shadow-purple-500/10' : 'border-stone-100 shadow-sm hover:border-purple-200'
            }`}
          >
             <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Left Info */}
                <div className="flex gap-4 w-full md:w-[35%] lg:w-[30%]">
                   <div className="pt-1">
                      <div className={`w-5 h-5 rounded-full border-[2.5px] flex items-center justify-center ${selectedLayout === 'vertical' ? 'border-[#6b46c1]' : 'border-stone-300'}`}>
                        {selectedLayout === 'vertical' && <div className="w-2.5 h-2.5 bg-[#6b46c1] rounded-full"></div>}
                      </div>
                   </div>
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#6b46c1] flex items-center justify-center border border-purple-100">
                          <BsLayoutSidebarInset size={18} />
                        </div>
                        <h4 className="font-bold text-[#0f172a] text-lg">Vertical Gallery</h4>
                      </div>
                      <p className="text-[14px] text-stone-500 leading-relaxed">
                        Thumbnails on the left side with the main image displayed largely on the right. Best for standard desktop views.
                      </p>
                   </div>
                </div>

                {/* Right Preview */}
                <div className="flex-1 w-full bg-[#f8f9fc] rounded-[16px] p-6 flex justify-center items-center">
                   <div className="w-full max-w-sm flex gap-3 h-[240px]">
                      <div className="w-[60px] flex flex-col gap-2 shrink-0">
                        <div className="flex-1 rounded-lg border-[2px] border-[#6b46c1] overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover"/></div>
                        <div className="flex-1 rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover opacity-70"/></div>
                        <div className="flex-1 rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover opacity-70"/></div>
                        <div className="flex-1 rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover opacity-70"/></div>
                      </div>
                      <div className="flex-1 rounded-xl overflow-hidden shadow-sm">
                        <img src="/white-sofa.png" className="w-full h-full object-cover"/>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 2: Horizontal */}
          <div 
            onClick={() => setSelectedLayout('horizontal')}
            className={`p-6 rounded-[24px] border-2 bg-white cursor-pointer transition-all ${
              selectedLayout === 'horizontal' ? 'border-[#6b46c1] shadow-lg shadow-purple-500/10' : 'border-stone-100 shadow-sm hover:border-purple-200'
            }`}
          >
             <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Left Info */}
                <div className="flex gap-4 w-full md:w-[35%] lg:w-[30%]">
                   <div className="pt-1">
                      <div className={`w-5 h-5 rounded-full border-[2.5px] flex items-center justify-center ${selectedLayout === 'horizontal' ? 'border-[#6b46c1]' : 'border-stone-300'}`}>
                        {selectedLayout === 'horizontal' && <div className="w-2.5 h-2.5 bg-[#6b46c1] rounded-full"></div>}
                      </div>
                   </div>
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#6b46c1] flex items-center justify-center border border-purple-100">
                          <BsLayoutSplit className="rotate-90" size={18} />
                        </div>
                        <h4 className="font-bold text-[#0f172a] text-lg">Horizontal Gallery</h4>
                      </div>
                      <p className="text-[14px] text-stone-500 leading-relaxed">
                        Thumbnails placed horizontally below the main image. Great for mobile-first designs.
                      </p>
                   </div>
                </div>

                {/* Right Preview */}
                <div className="flex-1 w-full bg-[#f8f9fc] rounded-[16px] p-6 flex justify-center items-center">
                   <div className="w-full max-w-sm flex flex-col gap-3 h-[280px]">
                      <div className="flex-1 rounded-xl overflow-hidden min-h-0 shadow-sm">
                        <img src="/white-sofa.png" className="w-full h-full object-cover object-center"/>
                      </div>
                      <div className="flex gap-2 items-center shrink-0">
                         <div className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-400 shrink-0"><FiChevronLeft size={14}/></div>
                         <div className="flex-1 flex gap-2">
                           <div className="h-[52px] flex-1 rounded-lg border-[2px] border-[#6b46c1] overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center"/></div>
                           <div className="h-[52px] flex-1 rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center opacity-70"/></div>
                           <div className="h-[52px] flex-1 rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center opacity-70"/></div>
                           <div className="h-[52px] flex-1 rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center opacity-70"/></div>
                         </div>
                         <div className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-400 shrink-0"><FiChevronRight size={14}/></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 3: Grid */}
          <div 
            onClick={() => setSelectedLayout('grid')}
            className={`p-6 rounded-[24px] border-2 bg-white cursor-pointer transition-all ${
              selectedLayout === 'grid' ? 'border-[#6b46c1] shadow-lg shadow-purple-500/10' : 'border-stone-100 shadow-sm hover:border-purple-200'
            }`}
          >
             <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Left Info */}
                <div className="flex gap-4 w-full md:w-[35%] lg:w-[30%]">
                   <div className="pt-1">
                      <div className={`w-5 h-5 rounded-full border-[2.5px] flex items-center justify-center ${selectedLayout === 'grid' ? 'border-[#6b46c1]' : 'border-stone-300'}`}>
                        {selectedLayout === 'grid' && <div className="w-2.5 h-2.5 bg-[#6b46c1] rounded-full"></div>}
                      </div>
                   </div>
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#6b46c1] flex items-center justify-center border border-purple-100">
                          <FiGrid size={18} />
                        </div>
                        <h4 className="font-bold text-[#0f172a] text-lg">Grid Gallery</h4>
                      </div>
                      <p className="text-[14px] text-stone-500 leading-relaxed">
                        One large hero image with a neat 2x2 grid of thumbnails placed right below it.
                      </p>
                   </div>
                </div>

                {/* Right Preview */}
                <div className="flex-1 w-full bg-[#f8f9fc] rounded-[16px] p-6 flex justify-center items-center">
                   <div className="w-full max-w-md flex flex-col gap-3">
                      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm">
                        <img src="/white-sofa.png" className="w-full h-full object-cover object-center"/>
                      </div>
                      <div className="w-[80%] mx-auto grid grid-cols-2 gap-3">
                        <div className="aspect-square rounded-lg overflow-hidden border-[2px] border-[#6b46c1]"><img src="/white-sofa.png" className="w-full h-full object-cover object-center"/></div>
                        <div className="aspect-square rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center opacity-70"/></div>
                        <div className="aspect-square rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center opacity-70"/></div>
                        <div className="aspect-square rounded-lg overflow-hidden"><img src="/white-sofa.png" className="w-full h-full object-cover object-center opacity-70"/></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Floating Save Button */}
        <div className="flex justify-end mt-12">
          <button className="px-6 py-3 bg-[#6b46c1] hover:bg-[#5a32fa] text-white font-medium rounded-full shadow-lg shadow-purple-500/30 transition-all flex items-center gap-3">
            Save Changes <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGalleryLayout;
