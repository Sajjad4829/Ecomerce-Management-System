import React, { useState } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Menu } from 'lucide-react';
import { useCMS } from '../../../../context/cms/CMSContext';
import { useCategories } from '../../../../context/commerce/CategoryContext';
import { useProducts } from '../../../../context/commerce/ProductContext';
import { useCollections } from '../../../../context/commerce/CollectionContext';
import { useBrands } from '../../../../context/commerce/BrandContext';

export default function NavbarPreview({ section = {}, device = 'desktop' }) {
  const settings = section.settings || {};
  const [isHovered, setIsHovered] = useState(false);
  const { headerConfig, menus } = useCMS();
  const { categories } = useCategories();
  const { products } = useProducts();
  const { collections } = useCollections();
  const { brands } = useBrands();

  // Use global config for features, not local section content
  const showSearch = headerConfig?.enableSearch ?? true;
  const showUser = headerConfig?.enableAccount ?? true;
  const showCart = headerConfig?.enableCart ?? true;
  const isTransparent = settings.transparentOnTop ?? headerConfig?.transparentOnTop ?? false;
  
  const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
  const headerMenu = menus?.find(m => m.id === primaryMenuId)?.items?.filter(i => i.visibility !== false) || [];

  const resolveItemTitle = (item) => {
    if (item.referenceType && item.referenceId) {
      if (item.referenceType === 'category') return categories.find(c => c.id === item.referenceId)?.name || 'Category';
      if (item.referenceType === 'product') return products.find(p => p.id === item.referenceId)?.name || 'Product';
      if (item.referenceType === 'collection') return collections.find(c => c.id === item.referenceId)?.name || 'Collection';
      if (item.referenceType === 'brand') return brands.find(b => b.id === item.referenceId)?.name || 'Brand';
    }
    return item.title || 'Menu Item';
  };

  const previewId = `nav-prev-${section.id || 'default'}`;

  return (
    <>
      <style>{`
        .group:hover .${previewId} {
          background-color: ${settings.hoverBgColor || 'transparent'} !important;
        }
        .group:hover .${previewId}-text {
          color: ${settings.hoverTextColor || settings.menuColor || 'inherit'} !important;
        }
      `}</style>
      <div 
        className={`w-full flex items-center justify-between px-8 py-5 ${previewId} ${isTransparent ? 'absolute inset-x-0 top-0 z-50 text-white' : 'bg-white border-b border-gray-100 text-[#1a1a1a]'}`}
      >
        <div 
          className={`flex items-center ${previewId}-text ${isTransparent ? 'text-white' : 'text-[#1a1a1a]'}`}
          style={settings.menuColor ? { color: settings.menuColor } : {}}
        >
          {headerConfig?.logoType === 'image' && headerConfig?.logoImage ? (
            <img src={headerConfig.logoImage} alt={headerConfig?.logoText || 'Logo'} className="h-8 md:h-10 object-contain" />
          ) : (
            <span className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none">
              {headerConfig?.logoText || 'DORY'}
            </span>
          )}
        </div>
        
        {device === 'desktop' ? (
          <div 
            className={`flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-sm font-semibold ${previewId}-text ${isTransparent ? 'text-white/90' : 'text-gray-700'}`}
            style={settings.menuColor ? { color: settings.menuColor } : {}}
          >
            {headerMenu.length > 0 ? headerMenu.map((item, idx) => (
              <span key={idx} className="cursor-pointer whitespace-nowrap">{resolveItemTitle(item)} {item.hasDropdown && <ChevronDown size={14} className="inline-block ml-0.5" />}</span>
            )) : (
              <span className="text-gray-400 italic">No Menu Items</span>
            )}
          </div>
        ) : (
          <div className="flex-1"></div>
        )}

        <div 
          className={`flex items-center gap-6 ${previewId}-text ${isTransparent ? 'text-white' : 'text-gray-700'}`}
          style={headerConfig?.iconColor ? { color: headerConfig.iconColor } : (settings.menuColor ? { color: settings.menuColor } : {})}
        >
        {showSearch && <Search size={20} className="cursor-pointer hover:opacity-75" />}
        {showUser && <User size={20} className="cursor-pointer hover:opacity-75" />}
        {showCart && (
          <div className="relative cursor-pointer hover:opacity-75">
            <ShoppingBag size={20} />
            <span className={`absolute -top-1.5 -right-2 ${isTransparent ? 'bg-white text-black' : 'bg-[#635BFF] text-white'} text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center`}>2</span>
          </div>
        )}
        {device !== 'desktop' && (
          <Menu size={24} className="cursor-pointer hover:opacity-75 ml-2" />
        )}
      </div>
    </div>
    </>
  );
}
