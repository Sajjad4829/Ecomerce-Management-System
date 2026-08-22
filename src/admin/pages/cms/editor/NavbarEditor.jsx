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
  
  const [links, setLinks] = useState([
    { id: 1, text: 'Home' },
    { id: 2, text: 'Shop', hasDropdown: true },
    { id: 3, text: 'Categories', hasDropdown: true },
    { id: 4, text: 'About' },
    { id: 5, text: 'Blog' },
    { id: 6, text: 'Contact' },
  ]);

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
                <div key={link.id} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg group shadow-sm hover:border-gray-300 transition-colors">
                  <FiMenu className="text-gray-400 cursor-grab active:cursor-grabbing" />
                  <input 
                    type="text"
                    value={link.text}
                    onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, text: e.target.value } : l))}
                    className="flex-1 text-sm font-medium text-gray-900 border-none p-0 focus:ring-0"
                  />
                  <button onClick={() => removeLink(link.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiTrash2 size={16} />
                  </button>
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
        <div className="flex-1 overflow-auto relative bg-gray-100 flex items-start justify-start">
          
          <div className="w-full min-w-max bg-white relative">
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
        </div>

      </div>
    </div>
  );
}
