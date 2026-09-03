import React, { useState } from 'react';
import { FiGrid, FiLayout, FiMonitor, FiSmartphone } from 'react-icons/fi';

const ProductDummy = ({ styleClass = "", index = 0 }) => {
  const products = [
    '/mockups/grey_bed_1788438660834.png',
    '/mockups/dining_table_1788438675363.png',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80',
    '/mockups/wooden_cabinet_1788438709580.png',
  ];
  const imgSrc = products[index % products.length];

  return (
    <div className={`bg-white border border-stone-200 rounded-[4px] flex flex-col shadow-sm overflow-hidden ${styleClass}`}>
      <div className="bg-[#f8f9fa] flex-1 flex items-center justify-center relative">
        <img src={imgSrc} alt="furniture" className="w-[95%] h-[95%] object-contain mix-blend-multiply" />
      </div>
      <div className="px-1.5 pb-1.5 pt-1.5 flex flex-col gap-[3px] bg-white">
        <div className="w-full h-[3px] bg-[#dbeafe] rounded-full"></div>
        <div className="w-[60%] h-[3px] bg-[#f1f5f9] rounded-full mb-[2px]"></div>
        <div className="flex gap-[1px]">
          {[1, 2, 3, 4, 5].map(i => (
            <span key={i} className="text-[5px] leading-none text-[#fbbf24]">★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const BrowserMockup = ({ columns = 3, productsCount = 6 }) => {
  return (
    <div className="w-full bg-white rounded-[8px] shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col shrink-0">
      <div className="h-[22px] bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-3 gap-1.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#f87171]"></div>
        <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
        <div className="w-2 h-2 rounded-full bg-[#34d399]"></div>
      </div>
      <div className="p-3 bg-white shrink-0">
        <div 
          className="grid gap-2" 
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: productsCount }).map((_, i) => (
            <ProductDummy key={i} index={i} styleClass="aspect-[4/5]" />
          ))}
        </div>
      </div>
    </div>
  );
};

const PhoneMockup = () => (
  <div className="w-[125px] bg-white rounded-[16px] overflow-hidden flex flex-col shrink-0 mx-auto border-[2px] border-[#1e3a8a]">
    <div className="h-[14px] bg-white flex items-center justify-center shrink-0 border-b border-[#f1f5f9] pt-1">
      <div className="w-8 h-[2px] bg-[#cbd5e1] rounded-full"></div>
      <div className="w-[3px] h-[3px] bg-[#cbd5e1] rounded-full ml-1"></div>
    </div>
    <div className="p-1.5 bg-white shrink-0 flex-1">
      <div className="grid grid-cols-2 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductDummy key={i} index={i} styleClass="aspect-[4/5]" />
        ))}
      </div>
    </div>
    <div className="h-[4px] bg-white shrink-0"></div>
  </div>
);

const ProductGridLayout = () => {
  const [selectedStyle, setSelectedStyle] = useState('style-1');

  const styles = [
    {
      id: 'style-1',
      title: '3 Products Per Row',
      description: 'Clean and simple grid layout with 3 products per row.',
      badgeText: 'Style 1',
      icon: FiGrid,
      iconBg: 'bg-[#1e40af]',
      iconColor: 'text-white',
      badgeBg: 'bg-[#dbeafe]',
      badgeTextColor: 'text-[#1e40af]',
      featureText: '3 products per row',
      bgLeft: 'bg-[#f0f9ff]/70',
      bgRight: 'bg-[#f0f9ff]/40',
      desktopCols: 3,
      desktopItems: 6,
    },
    {
      id: 'style-2',
      title: '4 Products Per Row',
      description: 'Balanced and modern grid layout with 4 products per row.',
      badgeText: 'Style 2',
      icon: FiLayout,
      iconBg: 'bg-[#166534]',
      iconColor: 'text-white',
      badgeBg: 'bg-[#dcfce7]',
      badgeTextColor: 'text-[#166534]',
      featureText: '4 products per row',
      bgLeft: 'bg-[#f0fdf4]/80',
      bgRight: 'bg-[#f0fdf4]/50',
      desktopCols: 4,
      desktopItems: 8,
    },
    {
      id: 'style-3',
      title: '5 Products Per Row',
      description: 'Expanded grid layout with 5 products per row for more variety.',
      badgeText: 'Style 3',
      icon: FiGrid,
      iconBg: 'bg-[#be123c]',
      iconColor: 'text-white',
      badgeBg: 'bg-[#ffe4e6]',
      badgeTextColor: 'text-[#be123c]',
      featureText: '5 products per row',
      bgLeft: 'bg-[#fff1f2]/80',
      bgRight: 'bg-[#fff1f2]/50',
      desktopCols: 5,
      desktopItems: 10,
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-8 py-8 flex items-start gap-4 border-b border-stone-100 shrink-0">
        <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
          <FiGrid size={22} />
        </div>
        <div>
          <h2 className="text-[26px] font-bold text-[#0f172a] tracking-tight mb-1.5 leading-none">Product Grid</h2>
          <p className="text-[15px] text-[#64748b] max-w-[500px] leading-relaxed">
            Choose a layout style to display your products in a beautiful and professional grid on your website.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 flex flex-col gap-6 overflow-y-auto">
        {styles.map((style) => (
          <div 
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`flex flex-col xl:flex-row rounded-[12px] overflow-hidden cursor-pointer bg-white border h-auto shrink-0 shadow-sm transition-all ${
              selectedStyle === style.id 
                ? 'border-[#cbd5e1]' 
                : 'border-[#f1f5f9] hover:border-[#cbd5e1]'
            }`}
          >
            {/* Left Info Pane */}
            <div className={`p-8 xl:w-[28%] shrink-0 border-r border-[#f1f5f9] ${style.bgLeft} flex flex-col justify-start`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full ${style.iconBg} ${style.iconColor} flex items-center justify-center shrink-0 shadow-sm`}>
                  <style.icon size={18} />
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${style.badgeBg} ${style.badgeTextColor}`}>
                  {style.badgeText}
                </div>
              </div>
              
              <h3 className="text-[22px] font-bold text-[#0f172a] mb-3 leading-tight">{style.title}</h3>
              <p className="text-[14px] text-[#475569] leading-relaxed mb-6 pr-4">{style.description}</p>
              
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#1e3a8a] mt-auto">
                <style.icon size={18} />
                {style.featureText}
              </div>
            </div>

            {/* Middle Mockup (Desktop) */}
            <div className={`flex-1 p-6 bg-white flex flex-col items-center justify-center border-r border-[#f1f5f9]`}>
              <BrowserMockup columns={style.desktopCols} productsCount={style.desktopItems} />
              <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#64748b]">
                <FiMonitor size={14} className="text-[#1e3a8a]" />
                Desktop ({style.desktopCols} per row)
              </div>
            </div>

            {/* Right Mockup (Mobile) */}
            <div className={`xl:w-[26%] p-6 ${style.bgRight} flex flex-col items-center justify-center`}>
              <PhoneMockup />
              <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#64748b]">
                <FiSmartphone size={14} className="text-[#1e3a8a]" />
                Mobile (2 per row)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridLayout;
