import React, { useState } from 'react';
import { FiLayout, FiImage, FiType, FiSearch, FiUser, FiShoppingCart, FiHeart, FiSettings, FiCheck, FiPlus, FiTrash2, FiMenu, FiChevronDown } from 'react-icons/fi';
import { Search, User, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../../../context/cms/CMSContext';
import MegaMenuBuilder from '../../../components/cms/navigation/MegaMenuBuilder';

export default function NavbarEditor() {
  const { headerConfig, setHeaderConfig, menus, setMenus } = useCMS();
  
  const [logoType, setLogoType] = useState(headerConfig?.logoType || 'text');
  const [logoText, setLogoText] = useState(headerConfig?.logoText || 'AURELIAN');
  const [logoImage, setLogoImage] = useState(headerConfig?.logoImage || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop');
  const [isSticky, setIsSticky] = useState(headerConfig?.stickyOnScroll ?? true);
  const [isTransparent, setIsTransparent] = useState(headerConfig?.transparentOnTop ?? false);
  const [hoverTransparent, setHoverTransparent] = useState(headerConfig?.hoverTransparent ?? false);
  const [showSearch, setShowSearch] = useState(headerConfig?.enableSearch ?? true);
  const [showUser, setShowUser] = useState(headerConfig?.enableUser ?? true);
  const [showCart, setShowCart] = useState(headerConfig?.enableCart ?? true);
  const [activeLinkId, setActiveLinkId] = useState(null);
  
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Load from CMSContext
    const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
    const globalMenu = menus?.find(m => m.id === primaryMenuId);
    
    if (globalMenu && globalMenu.items && globalMenu.items.length > 0) {
      const mappedLinks = globalMenu.items.map((item, idx) => ({
        id: item.id || `link-${idx}`,
        text: item.title,
        hasDropdown: item.megaMenu ? true : false,
        dropdownData: item.megaMenu || null
      }));
      setLinks(mappedLinks);
    } else {
      setLinks([
        { id: 'home', text: 'Home' },
        { id: 'categories', text: 'Categories', hasDropdown: true }
      ]);
    }
    setLoading(false);
  }, [menus, headerConfig]);

  const activeLink = links.find(l => l.id === activeLinkId);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLink = (id) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const addLink = () => {
    setLinks([...links, { id: `link-${Date.now()}`, text: 'New Menu Item' }]);
  };

  const handlePublish = () => {
    // Validation: Check for duplicate group categories within any column
    for (const link of links) {
      if (link.hasDropdown && link.dropdownData && link.dropdownData.columns) {
        for (const col of link.dropdownData.columns) {
          const usedIds = new Set();
          for (const group of (col.groups || [])) {
            if (group.referenceId) {
              if (usedIds.has(group.referenceId)) {
                alert(`Validation Error: The menu "${link.text}" has a column with duplicate categories. Please remove duplicates before publishing.`);
                return;
              }
              usedIds.add(group.referenceId);
            }
          }
        }
      }
    }

    // Save to CMSContext
    setHeaderConfig({
      ...headerConfig,
      logoType,
      logoText,
      logoImage,
      stickyOnScroll: isSticky,
      transparentOnTop: isTransparent,
      hoverTransparent: hoverTransparent,
      enableSearch: showSearch,
      enableUser: showUser,
      enableCart: showCart,
      primaryMenuId: 'MNU-001'
    });

    const newNavItems = links.map(link => ({
      id: link.id,
      title: link.text,
      visibility: true,
      referenceType: link.text.toLowerCase() === 'home' ? 'page' : 'custom',
      referenceId: link.text.toLowerCase() === 'home' ? '/' : null,
      link: link.text.toLowerCase() === 'home' ? '/' : '#',
      megaMenu: link.hasDropdown ? link.dropdownData : null
    }));

    setMenus(prevMenus => {
      const existingMenuIndex = prevMenus.findIndex(m => m.id === 'MNU-001');
      if (existingMenuIndex >= 0) {
        const updatedMenus = [...prevMenus];
        updatedMenus[existingMenuIndex] = { ...updatedMenus[existingMenuIndex], items: newNavItems };
        return updatedMenus;
      }
      return [...prevMenus, { id: 'MNU-001', name: 'Global Navigation', items: newNavItems }];
    });

    alert('Navbar successfully published to your CMS!');
  };

  if (loading) return <div className="p-8">Loading Navbar...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-[#f9fafb] font-sans">
      {/* Top Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-20">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Navbar Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Design your premium global header.</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">
            Reset Changes
          </button>
          <button type="button" onClick={handlePublish} className="px-5 py-2 bg-[#635BFF] text-white text-sm font-medium rounded-lg hover:bg-[#524be0] transition-colors shadow-sm flex items-center gap-2">
            <FiCheck /> Publish Navbar
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Settings Panel */}
        <div className="w-[340px] shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto custom-scrollbar flex flex-col p-6 gap-8">
          
          {/* Logo Settings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <FiImage /> Logo Configuration
            </h3>
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
              <button 
                onClick={() => setLogoType('text')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${logoType === 'text' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Text
              </button>
              <button 
                onClick={() => setLogoType('image')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${logoType === 'image' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Image
              </button>
            </div>
            {logoType === 'text' ? (
              <input 
                type="text" 
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
                placeholder="Enter logo text"
              />
            ) : (
              <div className="flex flex-col gap-2">
                <label className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-[#635BFF] rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden cursor-pointer transition-colors relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {logoImage ? (
                    <>
                      <img src={logoImage} alt="Logo Preview" className="h-full object-contain p-2 group-hover:opacity-50 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded shadow-sm">Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-[#635BFF] transition-colors">
                      <FiImage size={24} className="mb-2" />
                      <span className="text-xs font-medium">Click to upload image</span>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <FiMenu /> Navigation Links
            </h3>
            <div className="space-y-2 mb-3">
              {links.map((link) => (
                <div key={link.id} className={`flex flex-col p-3 bg-white border rounded-lg group shadow-sm transition-colors ${activeLinkId === link.id ? 'border-[#635BFF] bg-[#635BFF]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <FiMenu className="text-gray-400 cursor-grab active:cursor-grabbing" />
                    <input 
                      type="text"
                      value={link.text}
                      onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, text: e.target.value } : l))}
                      className="flex-1 text-sm font-medium text-gray-900 border-none p-0 focus:ring-0 bg-transparent"
                    />
                    <button onClick={() => removeLink(link.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-2 flex justify-between items-center pl-7">
                    <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={link.hasDropdown || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLinks(links.map(l => l.id === link.id ? { 
                            ...l, 
                            hasDropdown: isChecked,
                            dropdownData: isChecked ? (l.dropdownData || { columns: [{ id: `col-${Date.now()}`, groups: [] }] }) : null
                          } : l));
                        }}
                        className="rounded text-[#635BFF]"
                      />
                      Mega Menu
                    </label>
                    {link.hasDropdown && (
                      <button 
                        onClick={() => setActiveLinkId(activeLinkId === link.id ? null : link.id)}
                        className={`text-xs font-medium px-2 py-1 rounded ${activeLinkId === link.id ? 'bg-[#635BFF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {activeLinkId === link.id ? 'Close Editor' : 'Edit Content'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addLink} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2 transition-colors">
              <FiPlus /> Add Link
            </button>
          </div>

          {/* Actions & Utilities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <FiSettings /> Actions & Utilities
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FiSearch className={showSearch ? 'text-[#635BFF]' : 'text-gray-400'} />
                  <span className="text-sm font-medium text-gray-700">Search Icon</span>
                </div>
                <div className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${showSearch ? 'bg-[#635BFF]' : 'bg-gray-300'}`} onClick={(e) => { e.preventDefault(); setShowSearch(!showSearch); }}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${showSearch ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </label>
              
              <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FiUser className={showUser ? 'text-[#635BFF]' : 'text-gray-400'} />
                  <span className="text-sm font-medium text-gray-700">User Account</span>
                </div>
                <div className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${showUser ? 'bg-[#635BFF]' : 'bg-gray-300'}`} onClick={(e) => { e.preventDefault(); setShowUser(!showUser); }}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${showUser ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FiShoppingCart className={showCart ? 'text-[#635BFF]' : 'text-gray-400'} />
                  <span className="text-sm font-medium text-gray-700">Shopping Cart</span>
                </div>
                <div className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${showCart ? 'bg-[#635BFF]' : 'bg-gray-300'}`} onClick={(e) => { e.preventDefault(); setShowCart(!showCart); }}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${showCart ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </label>
            </div>
          </div>
          
          {/* Layout & Style */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <FiLayout /> Layout & Style
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-700">Sticky on Scroll</span>
                <div className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${isSticky ? 'bg-[#635BFF]' : 'bg-gray-300'}`} onClick={(e) => { e.preventDefault(); setIsSticky(!isSticky); }}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isSticky ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-700">Transparent on Top</span>
                <div className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${isTransparent ? 'bg-[#635BFF]' : 'bg-gray-300'}`} onClick={(e) => { e.preventDefault(); setIsTransparent(!isTransparent); }}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isTransparent ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-700">Solid on Hover</span>
                <div className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${hoverTransparent ? 'bg-[#635BFF]' : 'bg-gray-300'}`} onClick={(e) => { e.preventDefault(); setHoverTransparent(!hoverTransparent); }}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${hoverTransparent ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Center Live Preview */}
        <div className="flex-1 overflow-auto relative bg-gray-100 flex items-start justify-start p-8">
          
          {activeLinkId && activeLink ? (
             <MegaMenuBuilder 
                activeLink={activeLink} 
                onChange={(updated) => setLinks(links.map(l => l.id === activeLink.id ? updated : l))} 
                onBack={() => setActiveLinkId(null)} 
             />
          ) : (
          <div className="w-full min-w-max bg-white relative shadow-sm rounded-lg overflow-hidden border border-gray-200">
            {/* The Navbar Live Preview */}
            <div className={`w-full flex items-center justify-between px-8 py-5 border-b border-gray-100 ${isTransparent ? 'bg-black/5 absolute top-0 left-0 right-0 border-b-0' : 'bg-white'}`}>
              
              {/* Logo */}
              <div className={`flex items-center text-xl font-black tracking-widest font-serif ${isTransparent ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {logoType === 'text' ? (
                  logoText
                ) : (
                  logoImage ? <img src={logoImage} alt="Logo" className="h-8 object-contain" /> : 'LOGO'
                )}
              </div>
              
              {/* Links */}
              <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${isTransparent ? 'text-white/80' : 'text-gray-700'}`}>
                {links.map(link => (
                  <span key={link.id} className={`flex items-center gap-1 cursor-pointer hover:text-[#635BFF] transition-colors`}>
                    {link.text} 
                    {link.hasDropdown && (
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </span>
                ))}
              </div>

              {/* Actions & Utilities */}
              <div className={`flex items-center gap-6 ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
                {showSearch && <Search size={20} />}
                {showUser && <User size={20} />}
                {showCart && (
                  <div className="relative">
                    <ShoppingBag size={20} />
                    <span className="absolute -top-2 -right-2.5 bg-[#635BFF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Content Area */}
            <div className={`pt-32 pb-48 px-12 text-center flex flex-col items-start justify-center transition-colors ${isTransparent ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 ${isTransparent ? 'bg-white/20 text-white' : 'bg-[#635BFF]/10 text-[#635BFF]'}`}>
                Preview Context
              </span>
              <h1 className="text-4xl font-black tracking-tight mb-4 text-left">
                See how your navbar looks over content.
              </h1>
              <p className={`text-sm max-w-md text-left mb-8 ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>
                This area simulates the rest of your page so you can visualize transparent or sticky navbar behaviors.
              </p>
              <div className={`w-32 h-8 rounded-full ${isTransparent ? 'bg-white/10' : 'bg-gray-200'}`} />
            </div>
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gray-50 rounded-tl-full opacity-50 pointer-events-none" />
          </div>
          )}
        </div>

      </div>
    </div>
  );
}
