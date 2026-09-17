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

  const getProp = (key) => {
    // Check local section settings first, then global headerConfig
    const config = settings[key] !== undefined ? settings : (headerConfig || {});
    if (device === 'desktop') return config[key];
    if (device === 'tablet') return config[`${key}_tablet`] !== undefined ? config[`${key}_tablet`] : config[key];
    if (device === 'mobile') return config[`${key}_mobile`] !== undefined ? config[`${key}_mobile`] : (config[`${key}_tablet`] !== undefined ? config[`${key}_tablet`] : config[key]);
  };

  // Use global config for features, not local section content
  const showSearch = getProp('enableSearch') ?? true;
  const showUser = getProp('enableAccount') ?? true;
  const showCart = getProp('enableCart') ?? true;
  const isTransparent = getProp('transparentOnTop') ?? getProp('transparentOnTop') ?? false;
  
  const primaryMenuId = getProp('primaryMenuId') || 'MNU-001';
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
          background-color: ${getProp('hoverBgColor') || 'transparent'} !important;
        }
        .group:hover .${previewId}-text {
          color: ${getProp('hoverTextColor') || getProp('menuColor') || 'inherit'} !important;
        }
      `}</style>
      <div 
        className={`w-full ${isTransparent ? 'absolute inset-x-0 top-0 z-50' : 'bg-white border-b border-gray-100'}`}
        style={!isTransparent && getProp('backgroundColor') ? { backgroundColor: headerConfig.backgroundColor } : {}}
      >
        <div 
          className={`w-full flex items-center justify-between px-8 py-5 ${previewId} ${isTransparent ? 'text-white' : 'text-[#1a1a1a]'}`}
        >
          <div 
            className={`flex items-center ${previewId}-text ${isTransparent ? 'text-white' : 'text-[#1a1a1a]'}`}
            style={getProp('menuColor') ? { color: getProp('menuColor') } : {}}
          >
            {getProp('logoType') === 'image' && getProp('logoImage') ? (
              <img src={headerConfig.logoImage} alt={getProp('logoText') || 'Logo'} className="h-8 md:h-10 object-contain" />
            ) : (
              <span className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none">
                {getProp('logoText') || 'DORY'}
              </span>
            )}
          </div>
          
          {device === 'desktop' ? (
            <div 
              className={`flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-sm font-semibold ${previewId}-text ${isTransparent ? 'text-white/90' : 'text-gray-700'}`}
              style={getProp('menuColor') ? { color: getProp('menuColor') } : {}}
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
            style={{ color: getProp('iconColor') || getProp('textColor') || getProp('menuColor') || undefined }}
          >
            {showSearch && device === 'desktop' && <Search size={20} className="cursor-pointer hover:opacity-75" />}
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
        
        {/* Mobile Search Bar - Displayed under the nav on mobile */}
        {showSearch && device !== 'desktop' && (
          <div className="w-full px-3 pb-3 shrink-0">
            <div 
              className="w-full flex items-center justify-between bg-[#f4f5f7] rounded-md py-2.5 px-3"
              style={{ boxShadow: isTransparent ? '0 2px 10px rgba(0,0,0,0.1)' : 'none' }}
            >
              <span className="text-[#6c757d] text-[15px] font-normal">Search</span>
              <Search size={18} className="text-[#333333]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
