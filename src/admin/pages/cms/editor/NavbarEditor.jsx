import React, { useState } from 'react';
import { FiLayout, FiImage, FiType, FiSearch, FiUser, FiShoppingCart, FiHeart, FiSettings, FiCheck, FiPlus, FiTrash2, FiMenu, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../../../context/cms/CMSContext';

export default function NavbarEditor() {
  const { setSections } = useCMS();
  const [logoType, setLogoType] = useState('text');
  const [logoText, setLogoText] = useState('AURELIAN');
  const [logoImage, setLogoImage] = useState('https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop');
  const [isSticky, setIsSticky] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showUser, setShowUser] = useState(true);
  const [showCart, setShowCart] = useState(true);
  const [activeLinkId, setActiveLinkId] = useState(null);
  
  const [links, setLinks] = useState([
    { id: 1, text: 'Home' },
    { id: 2, text: 'Shop', hasDropdown: true },
    { id: 3, text: 'Categories', hasDropdown: true },
    { id: 4, text: 'About' },
    { id: 5, text: 'Blog' },
    { id: 6, text: 'Contact' },
  ]);

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
    setLinks([...links, { id: Date.now(), text: 'New Link' }]);
  };

  const handlePublish = () => {
    const newNavbarSection = {
      id: `lib-navbar-${Date.now()}`,
      type: 'NAVBAR',
      name: 'Custom Global Navbar',
      category: 'Header Section',
      description: 'Your published custom navbar.',
      icon: 'FiLayout',
      defaultContent: {
        logoType,
        logoText,
        logoImage,
        links
      },
      defaultSettings: {
        isSticky,
        isTransparent,
        showSearch,
        showUser,
        showCart
      },
      status: 'Active'
    };
    
    setSections(prev => [newNavbarSection, ...prev.filter(s => s.type !== 'NAVBAR')]);
    alert('Navbar successfully published and added to the Section Library!');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-[#f9fafb] font-sans">
      {/* Top Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-20">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Navbar Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Design your premium global header.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">
            Reset Changes
          </button>
          <button onClick={handlePublish} className="px-5 py-2 bg-[#635BFF] text-white text-sm font-medium rounded-lg hover:bg-[#524be0] transition-colors shadow-sm flex items-center gap-2">
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
                        onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, hasDropdown: e.target.checked } : l))}
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
            <button onClick={addLink} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2 transition-colors">
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
            </div>
          </div>

        </div>

        {/* Center Live Preview */}
        <div className="flex-1 overflow-auto relative bg-gray-100 flex items-start justify-start p-8">
          
          {activeLinkId && activeLink ? (
             <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-bold text-gray-900">Mega Menu Builder: {activeLink.text}</h2>
                  <button onClick={() => {
                    const newCol = { id: `col-${Date.now()}`, groups: [] };
                    const updatedCols = [...(activeLink.columns || []), newCol];
                    setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                  }} className="px-4 py-2 bg-[#635BFF] text-white text-sm font-medium rounded-lg hover:bg-[#524be0] transition-colors flex items-center gap-2">
                    <FiPlus /> Add Column
                  </button>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {(activeLink.columns || []).map((col, colIdx) => (
                    <div key={col.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50 relative">
                      <button 
                        onClick={() => {
                          const updatedCols = activeLink.columns.filter(c => c.id !== col.id);
                          setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                        }}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <h4 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">Column {colIdx + 1}</h4>
                      
                      <div className="space-y-4">
                        {col.groups.map(group => (
                          <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <input 
                                type="text" 
                                value={group.title}
                                placeholder="Group Title"
                                onChange={(e) => {
                                  const updatedCols = [...activeLink.columns];
                                  const g = updatedCols[colIdx].groups.find(g => g.id === group.id);
                                  if (g) g.title = e.target.value;
                                  setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                                }}
                                className="text-sm font-bold border-b border-dashed border-gray-300 focus:border-[#635BFF] outline-none bg-transparent"
                              />
                              <button onClick={() => {
                                  const updatedCols = [...activeLink.columns];
                                  updatedCols[colIdx].groups = updatedCols[colIdx].groups.filter(g => g.id !== group.id);
                                  setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                              }} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button>
                            </div>
                            <input 
                              type="text" 
                              value={group.link || ''}
                              placeholder="Group Link (e.g. /category)"
                              onChange={(e) => {
                                const updatedCols = [...activeLink.columns];
                                const g = updatedCols[colIdx].groups.find(g => g.id === group.id);
                                if (g) g.link = e.target.value;
                                setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                              }}
                              className="text-xs text-gray-500 w-full mb-4 outline-none border-b border-gray-100 pb-1"
                            />

                            <div className="space-y-2">
                              {group.items.map((linkItem) => (
                                <div key={linkItem.id} className="flex items-center gap-2 group/link">
                                  <input 
                                    type="text" 
                                    value={linkItem.title}
                                    onChange={(e) => {
                                      const updatedCols = [...activeLink.columns];
                                      const l = updatedCols[colIdx].groups.find(g => g.id === group.id).items.find(i => i.id === linkItem.id);
                                      if (l) l.title = e.target.value;
                                      setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                                    }}
                                    className="text-xs flex-1 bg-transparent border-none outline-none text-gray-700"
                                    placeholder="Link Text"
                                  />
                                  <input 
                                    type="text" 
                                    value={linkItem.link || ''}
                                    onChange={(e) => {
                                      const updatedCols = [...activeLink.columns];
                                      const l = updatedCols[colIdx].groups.find(g => g.id === group.id).items.find(i => i.id === linkItem.id);
                                      if (l) l.link = e.target.value;
                                      setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                                    }}
                                    className="text-[10px] w-24 bg-transparent border-none outline-none text-gray-400 placeholder-gray-300"
                                    placeholder="URL"
                                  />
                                  <button onClick={() => {
                                      const updatedCols = [...activeLink.columns];
                                      const grp = updatedCols[colIdx].groups.find(g => g.id === group.id);
                                      grp.items = grp.items.filter(i => i.id !== linkItem.id);
                                      setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                                  }} className="opacity-0 group-hover/link:opacity-100 text-red-500"><FiTrash2 size={12} /></button>
                                </div>
                              ))}
                              <button onClick={() => {
                                  const updatedCols = [...activeLink.columns];
                                  updatedCols[colIdx].groups.find(g => g.id === group.id).items.push({ id: `lnk-${Date.now()}`, title: 'New Link', link: '/' });
                                  setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                              }} className="text-xs text-[#635BFF] font-medium hover:underline mt-2 flex items-center gap-1"><FiPlus size={10} /> Add Item</button>
                            </div>
                          </div>
                        ))}
                        
                        <button onClick={() => {
                            const updatedCols = [...activeLink.columns];
                            updatedCols[colIdx].groups.push({ id: `grp-${Date.now()}`, title: 'New Group', link: '/', items: [] });
                            setLinks(links.map(l => l.id === activeLink.id ? { ...l, columns: updatedCols } : l));
                        }} className="text-xs font-bold text-gray-500 hover:text-gray-900 w-full text-center bg-white border border-dashed border-gray-300 p-3 rounded-lg transition-colors">
                          + Add Link Group
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!activeLink.columns || activeLink.columns.length === 0) && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
                      <p className="text-gray-500 text-sm">No columns added yet. Add a column to start building your mega menu.</p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">Promotional Banner (Optional)</h4>
                  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Image URL</label>
                      <input type="text" value={activeLink.promoBanner?.imageUrl || ''} onChange={(e) => {
                         const pb = { ...(activeLink.promoBanner || {}), imageUrl: e.target.value };
                         setLinks(links.map(l => l.id === activeLink.id ? { ...l, promoBanner: pb } : l));
                      }} className="w-full text-sm border p-2.5 rounded-lg border-gray-300 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Link</label>
                      <input type="text" value={activeLink.promoBanner?.link || ''} onChange={(e) => {
                         const pb = { ...(activeLink.promoBanner || {}), link: e.target.value };
                         setLinks(links.map(l => l.id === activeLink.id ? { ...l, promoBanner: pb } : l));
                      }} className="w-full text-sm border p-2.5 rounded-lg border-gray-300 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none" placeholder="/sale" />
                    </div>
                  </div>
                </div>
             </div>
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

              {/* Actions */}
              <div className={`flex items-center gap-5 ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
                {showSearch && <FiSearch size={20} className="cursor-pointer hover:text-[#635BFF] transition-colors" />}
                {showUser && <FiUser size={20} className="cursor-pointer hover:text-[#635BFF] transition-colors" />}
                {showCart && (
                  <div className="relative cursor-pointer hover:text-[#635BFF] transition-colors">
                    <FiShoppingCart size={20} />
                    <span className="absolute -top-1.5 -right-2 bg-[#635BFF] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">2</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dummy Content below to show context */}
            <div className="w-full h-[600px] bg-[#fcfdff] p-12 relative">
              <div className="max-w-xl">
                <div className="inline-block px-3 py-1 bg-[#635BFF]/10 text-[#635BFF] text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
                  Preview Context
                </div>
                <h1 className="text-4xl font-extrabold text-[#1a1a1a] leading-tight mb-6 font-sans">
                  See how your navbar looks over content.
                </h1>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                  This area simulates the rest of your page so you can visualize transparent or sticky navbar behaviors.
                </p>
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gray-50 rounded-tl-full opacity-50 pointer-events-none" />
            </div>
          </div>
          )}
        </div>

      </div>
    </div>
  );
}
