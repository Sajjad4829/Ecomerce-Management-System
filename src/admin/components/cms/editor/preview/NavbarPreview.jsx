import React from 'react';
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCMS } from '../../../../context/cms/CMSContext';

export default function NavbarPreview({ section = {} }) {
  const settings = section.settings || {};
  const { headerConfig, menus } = useCMS();

  // Use global config for features, not local section content
  const showSearch = headerConfig?.enableSearch ?? true;
  const showUser = headerConfig?.enableAccount ?? true;
  const showCart = headerConfig?.enableCart ?? true;
  const isTransparent = headerConfig?.transparentOnTop ?? false;
  
  const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
  const headerMenu = menus?.find(m => m.id === primaryMenuId)?.items?.filter(i => i.visibility) || [];

  return (
    <div className={`w-full flex items-center justify-between px-8 py-5 ${isTransparent ? 'bg-transparent text-white' : 'bg-white border-b border-gray-100 text-[#1a1a1a]'}`}>
      <div className={`flex items-center ${isTransparent ? 'text-white' : 'text-[#1a1a1a]'}`}>
        {headerConfig?.logoType === 'image' && headerConfig?.logoImage ? (
          <img src={headerConfig.logoImage} alt={headerConfig?.logoText || 'Logo'} className="h-8 md:h-10 object-contain" />
        ) : (
          <span className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none">
            {headerConfig?.logoText || 'DORY'}
          </span>
        )}
      </div>
      
      <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${isTransparent ? 'text-white/90' : 'text-gray-700'}`}>
        {headerMenu.length > 0 ? headerMenu.map((item, idx) => (
          <span key={idx} className="cursor-pointer hover:opacity-75">{item.title} {item.hasDropdown && <ChevronDown size={14} className="inline-block ml-0.5" />}</span>
        )) : (
          <span className="text-gray-400 italic">No Menu Items</span>
        )}
      </div>

      <div className={`flex items-center gap-6 ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
        {showSearch && <Search size={20} className="cursor-pointer hover:opacity-75" />}
        {showUser && <User size={20} className="cursor-pointer hover:opacity-75" />}
        {showCart && (
          <div className="relative cursor-pointer hover:opacity-75">
            <ShoppingBag size={20} />
            <span className={`absolute -top-1.5 -right-2 ${isTransparent ? 'bg-white text-black' : 'bg-[#635BFF] text-white'} text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center`}>2</span>
          </div>
        )}
      </div>
    </div>
  );
}
