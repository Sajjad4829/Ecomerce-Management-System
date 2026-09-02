import React, { useState, useEffect } from 'react';
import { 
  FiLayout, FiImage, FiType, FiSearch, FiUser, FiShoppingCart, 
  FiCheck, FiPlus, FiTrash2, FiMenu, FiSettings, FiNavigation,
  FiBox, FiMonitor, FiSmartphone, FiTablet, FiChevronDown, FiX
} from 'react-icons/fi';
import { Search, User, ShoppingBag, ChevronRight, ChevronsRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCMS } from '../../../context/cms/CMSContext';
import MegaMenuBuilder from '../../../components/cms/navigation/MegaMenuBuilder';

const TABS = [
  { id: 'style', label: 'Style', icon: FiLayout },
  { id: 'layout', label: 'Layout & Alignment', icon: FiLayout },
  { id: 'colors', label: 'Colors', icon: FiImage },
  { id: 'typography', label: 'Typography', icon: FiType },
  { id: 'menu', label: 'Menu Items', icon: FiNavigation },
  { id: 'megamenu', label: 'Mega Menu', icon: FiBox },
  { id: 'icons', label: 'Icons & Logo', icon: FiSearch },
  { id: 'behavior', label: 'Behavior', icon: FiSettings }
];

export default function NavbarEditor() {
  const { headerConfig, setHeaderConfig, menus, setMenus, configLoading } = useCMS();
  
  const [activeTab, setActiveTab] = useState('style');
  const [config, setConfig] = useState(headerConfig || {});

  // Sync config once data loads from backend (on browser reload)
  useEffect(() => {
    if (!configLoading && headerConfig) {
      setConfig(headerConfig);
    }
  }, [configLoading, headerConfig]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLinkId, setActiveLinkId] = useState(null);
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateConfig = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
    const globalMenu = menus?.find(m => m.id === primaryMenuId);
    if (globalMenu && globalMenu.items && globalMenu.items.length > 0) {
      setLinks(globalMenu.items.map((item, idx) => ({
        id: item.id || `link-${idx}`,
        text: item.title,
        hasDropdown: !!item.megaMenu,
        dropdownData: item.megaMenu || null
      })));
    } else {
      setLinks([
        { id: 'home', text: 'Home' },
        { id: 'categories', text: 'Categories', hasDropdown: true }
      ]);
    }
    setLoading(false);
  }, [menus, headerConfig]);

  const activeLink = links.find(l => l.id === activeLinkId);

  // Logo is stored as base64 directly in MongoDB (inside headerConfig).
  // This keeps the logo self-contained — no external CDN dependency.
  // The localStorage cache (CMSContext) makes it load instantly on every reload.
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig('logoImage', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInverseImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig('logoImageInverse', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    setHeaderConfig({ ...headerConfig, ...config, primaryMenuId: 'MNU-001' });
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
    alert('Navbar successfully published!');
  };

  if (loading) return <div className="p-8">Loading Navbar...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-[#f9fafb] font-sans">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-xl font-black shrink-0">
            {config.logoType === 'text' ? (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-lg tracking-wider">{config.logoText || ''}</span>
            ) : (
              config.logoImage ? <img src={config.logoImage} alt="Logo" className="h-8 object-contain" /> : <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-lg tracking-wider">LOGO</span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Navbar Editor</h1>
            <p className="text-sm text-gray-500">Customize and design your website navigation</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mr-2">
          <button type="button" onClick={() => setConfig(headerConfig)} className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-full transition-all">
            Reset
          </button>
          
          <button type="button" className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-full transition-all">
             Preview
          </button>

          <button type="button" onClick={handlePublish} className="px-6 py-2.5 bg-gradient-to-r from-[#9b27b0] to-[#ff5252] text-white text-[12px] font-bold uppercase tracking-widest rounded-full shadow-[0_8px_16px_-4px_rgba(255,82,82,0.5)] hover:shadow-[0_12px_20px_-4px_rgba(255,82,82,0.6)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 transition-all duration-300">
            Publish <ChevronsRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col p-4 gap-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-[#635BFF]/10 text-[#635BFF]' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
          <div className="mt-auto p-4 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-bold text-gray-900 mb-1">Need Help?</h4>
            <p className="text-xs text-gray-500 mb-3">Learn how to create beautiful navigation</p>
            <button className="w-full py-2 text-xs font-semibold border border-gray-200 rounded hover:bg-gray-50">View Docs</button>
          </div>
        </div>

        {/* Middle Settings Column */}
        <div className="w-80 shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto p-6">
          <SettingsPanel activeTab={activeTab} config={config} updateConfig={updateConfig} links={links}
           setLinks={setLinks} activeLinkId={activeLinkId} setActiveLinkId={setActiveLinkId}
           handleImageUpload={handleImageUpload} handleInverseImageUpload={handleInverseImageUpload} />
        </div>

        {/* Right Preview Area */}
        <div className="flex-1 overflow-auto bg-white flex flex-col relative custom-scrollbar">
          <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shrink-0 z-10">
            <h3 className="font-bold text-gray-900">Live Preview</h3>
            <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <button onClick={() => setDevice('desktop')} className={`p-2 ${device==='desktop' ? 'bg-gray-100 text-[#635BFF]':'text-gray-400'}`}><FiMonitor size={18} /></button>
              <button onClick={() => setDevice('tablet')} className={`p-2 border-l border-r border-gray-200 ${device==='tablet' ? 'bg-gray-100 text-[#635BFF]':'text-gray-400'}`}><FiTablet size={18} /></button>
              <button onClick={() => setDevice('mobile')} className={`p-2 ${device==='mobile' ? 'bg-gray-100 text-[#635BFF]':'text-gray-400'}`}><FiSmartphone size={18} /></button>
            </div>
          </div>

          {activeLinkId && activeLink ? (
             <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
               <MegaMenuBuilder 
                  activeLink={activeLink} 
                  onChange={(updated) => setLinks(links.map(l => l.id === activeLink.id ? updated : l))} 
                  onBack={() => setActiveLinkId(null)} 
               />
             </div>
          ) : (
            <div className={`w-full flex-1 bg-white relative transition-all overflow-x-auto custom-scrollbar ${
              device === 'mobile' ? 'max-w-[375px] mx-auto shadow-lg border-x border-gray-200' : device === 'tablet' ? 'max-w-[768px] mx-auto shadow-lg border-x border-gray-200' : 'max-w-full'
            }`}>
              
              {/* Dynamic Navbar Render */}
              {(() => {
                const navAlignment = config.navAlignment || 'space-between';
                let containerClasses = 'w-full min-w-max flex items-center justify-between';
                let logoClasses = 'flex items-center text-xl font-black shrink-0';
                let menuClasses = 'flex items-center flex-1 flex-nowrap';
                let actionsClasses = 'flex items-center gap-5 shrink-0 ml-4';
                let menuJustify = config.contentAlignment || 'center';

                if (device === 'desktop') {
                  if (navAlignment === 'space-between') {
                    containerClasses += ' grid grid-cols-3';
                    logoClasses += ' justify-self-start';
                    actionsClasses = 'flex items-center gap-5 shrink-0 justify-self-end';
                  } else {
                    containerClasses += ' gap-8';
                    if (navAlignment === 'left') menuJustify = 'flex-start';
                    if (navAlignment === 'center') menuJustify = 'center';
                    if (navAlignment === 'right') menuJustify = 'flex-end';
                  }
                }
                
                return (
              <div 
                style={{
                  backgroundColor: config.backgroundColor,
                  color: config.textColor,
                  borderBottom: 'none',
                  height: `${config.height || 72}px`,
                  paddingTop: `${config.paddingTop || 0}px`,
                  paddingBottom: `${config.paddingBottom || 0}px`,
                  paddingLeft: `${config.paddingLeft || 24}px`,
                  paddingRight: `${config.paddingRight || 24}px`,
                  fontFamily: config.fontFamily || 'Inter',
                }}
                className={`${containerClasses} custom-scrollbar ${config.navbarStyle === 'transparent' ? 'absolute top-0 left-0 z-10 !bg-transparent !border-none text-white' : ''} ${config.navbarStyle === 'dark' ? '!bg-gray-900 !text-white' : ''}`}
              >
                {/* Inject hover styles for preview */}
                {config.textHoverColor && (
                  <style>{`
                    .preview-nav-link:hover {
                      color: ${config.textHoverColor} !important;
                    }
                  `}</style>
                )}
                {/* Logo */}
                <div className={logoClasses}>
                  {config.logoType === 'text' ? (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-lg tracking-wider">{config.logoText || ''}</span>
                  ) : (
                    config.logoImage ? <img src={config.logoImage} alt="Logo" className="h-8 object-contain" /> : 'LOGO'
                  )}
                </div>
                
                {/* Links */}
                {device === 'desktop' && (
                  <div className={menuClasses} style={{ gap: `${config.spaceBetweenItems ?? 16}px`, justifyContent: menuJustify }}>
                    {links.map(link => (
                      <span 
                        key={link.id} 
                        className="preview-nav-link cursor-pointer transition-colors relative group flex items-center gap-1 whitespace-nowrap"
                        style={{
                          fontSize: `${config.fontSize || 15}px`,
                          fontWeight: config.fontWeight || '500',
                          textTransform: config.uppercase ? 'uppercase' : config.textTransform || 'none',
                          letterSpacing: `${config.letterSpacing || 0}px`
                        }}
                      >
                        {link.text}
                        {config.underlineOnHover && <div className="absolute left-0 bottom-[-4px] w-0 h-px bg-current group-hover:w-full transition-all duration-300" />}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Actions */}
                <div 
                  className={actionsClasses}
                  style={config.iconColor ? { color: config.iconColor } : {}}
                >
                  {config.enableSearch && (
                    <button className="preview-nav-icon transition-colors hover:opacity-70 p-1">
                      <Search size={20} />
                    </button>
                  )}
                  {config.enableUser && (
                    <div className="flex items-center gap-1 preview-nav-icon transition-colors hover:opacity-70 p-1 cursor-pointer">
                      <User size={20} /><FiChevronDown size={14} className="text-gray-600" />
                    </div>
                  )}
                  {config.enableCart && (
                    <div className="relative preview-nav-icon transition-colors hover:opacity-70 p-1 cursor-pointer">
                      <ShoppingBag size={20} />
                      <span className="absolute -top-2 -right-2 bg-[#e60000] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </div>
                  )}
                  {device !== 'desktop' && (
                    <button onClick={() => setIsMobileMenuOpen(true)} className="ml-2 text-gray-900 preview-nav-icon transition-colors hover:opacity-70 p-1">
                      <FiMenu size={26} />
                    </button>
                  )}
                </div>
              </div>
              );})()}

              {/* Mobile Sidebar Menu */}
              {device !== 'desktop' && isMobileMenuOpen && (
                <div className="absolute inset-0 z-50 flex">
                  {/* Sidebar */}
                  <div className="w-[80%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 relative z-50">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                      <div className="flex items-center text-xl font-black shrink-0">
                        {config.logoType === 'text' ? (
                          <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-lg tracking-wider">{config.logoText || ''}</span>
                        ) : (
                          config.logoImage ? <img src={config.logoImage} alt="Logo" className="h-8 object-contain" /> : <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-lg tracking-wider">LOGO</span>
                        )}
                      </div>
                      <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                        <FiX size={24} />
                      </button>
                    </div>
                    <div className="flex flex-col p-4 overflow-y-auto">
                      {links.map((link, idx) => (
                        <div key={link.id} className={`flex items-center justify-between py-4 border-b border-gray-50 ${idx === 0 ? 'text-[#e60000]' : 'text-gray-800'}`}>
                          <span className="text-base font-medium">{link.text}</span>
                          {link.hasDropdown && <FiChevronDown size={18} className="text-gray-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
                </div>
              )}

              {/* Dummy Hero content for transparent preview */}
              {(() => {
                const getLuminance = (hex) => {
                  if (!hex) return 1;
                  const h = hex.replace('#', '');
                  if (h.length !== 3 && h.length !== 6) return 1;
                  const fullHex = h.length === 3 ? h.split('').map(x => x + x).join('') : h;
                  const r = parseInt(fullHex.substring(0, 2), 16);
                  const g = parseInt(fullHex.substring(2, 4), 16);
                  const b = parseInt(fullHex.substring(4, 6), 16);
                  return isNaN(r) ? 1 : (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                };
                
                const isTransparent = config.navbarStyle === 'transparent';
                // If text is dark (luminance < 0.5), we need a light background for the transparent preview
                const needsLightBackground = isTransparent && config.textColor && getLuminance(config.textColor) < 0.5;
                
                const bgClass = isTransparent 
                  ? (needsLightBackground ? 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200' : 'bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-black')
                  : 'bg-white';
                  
                const textColorClass = isTransparent
                  ? (needsLightBackground ? 'text-gray-800' : 'text-white')
                  : 'text-gray-800';
                  
                const pColorClass = isTransparent
                  ? (needsLightBackground ? 'text-gray-500' : 'text-gray-200')
                  : 'text-gray-500';

                return (
                  <div className={`h-[500px] flex flex-col items-center justify-center relative ${bgClass}`}>
                    {isTransparent && (
                      <div className={`absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=1200&q=80')] bg-cover bg-center ${needsLightBackground ? 'mix-blend-multiply opacity-20' : 'mix-blend-overlay'}`}></div>
                    )}
                    <div className="relative z-10 text-center">
                      <h1 className={`text-4xl font-bold mb-4 ${textColorClass}`}>Hero Section</h1>
                      <p className={`text-sm max-w-md mx-auto leading-relaxed ${pColorClass}`}>
                        This is how your transparent navbar will look overlaid onto a {needsLightBackground ? 'light' : 'dark'} image or vibrant gradient.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({ activeTab, config, updateConfig, links, setLinks, activeLinkId, setActiveLinkId, handleImageUpload, handleInverseImageUpload }) {
  if (activeTab === 'style') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
        <h2 className="font-bold text-gray-900 text-lg mb-6">Navbar Style</h2>
        
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-900 block">Type</label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
             {['default', 'transparent', 'sticky', 'dark'].map((style) => (
                <div key={style} className="relative w-full">
                  {config.navbarStyle === style ? (
                    <>
                      <div className="absolute inset-0 bg-white border border-[#574fef]/30 rounded-full translate-x-1 translate-y-1"></div>
                      <button
                        onClick={() => updateConfig('navbarStyle', style)}
                        className="relative z-10 w-full py-2.5 px-2 bg-gradient-to-r from-[#827af7] to-[#574fef] text-white text-[11px] font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-1 transition-transform active:translate-x-1 active:translate-y-1"
                      >
                        {style} <ChevronRight size={14} strokeWidth={3} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => updateConfig('navbarStyle', style)}
                      className="w-full py-2.5 px-2 bg-white text-gray-500 border border-gray-200 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 hover:text-gray-800 transition-colors"
                    >
                      {style}
                    </button>
                  )}
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Background Color</label>
          <div className="flex gap-2 items-center">
             <input type="color" value={config.backgroundColor || '#ffffff'} onChange={(e) => updateConfig('backgroundColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
             <input type="text" value={config.backgroundColor || ''} onChange={(e) => updateConfig('backgroundColor', e.target.value)} placeholder="Transparent" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
             <button onClick={() => updateConfig('backgroundColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
               <FiX size={16} />
             </button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Hover Background Color</label>
          <div className="flex gap-2 items-center">
             <input type="color" value={config.navbarHoverBgColor || '#f9fafb'} onChange={(e) => updateConfig('navbarHoverBgColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
             <input type="text" value={config.navbarHoverBgColor || ''} onChange={(e) => updateConfig('navbarHoverBgColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
             <button onClick={() => updateConfig('navbarHoverBgColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
               <FiX size={16} />
             </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Hover Text Color</label>
          <div className="flex gap-2 items-center">
             <input type="color" value={config.navbarHoverTextColor || '#111111'} onChange={(e) => updateConfig('navbarHoverTextColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
             <input type="text" value={config.navbarHoverTextColor || ''} onChange={(e) => updateConfig('navbarHoverTextColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
             <button onClick={() => updateConfig('navbarHoverTextColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
               <FiX size={16} />
             </button>
          </div>
        </div>
        

      </div>
    );
  }

  if (activeTab === 'layout') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
         <h2 className="font-bold text-gray-900 text-lg mb-6">Layout & Alignment</h2>
         
         <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Height (px)</label>
            <input type="number" value={config.height || 72} onChange={(e) => updateConfig('height', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
         </div>

         <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Content Alignment</label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {['space-between', 'left', 'center', 'right'].map(align => (
                <button key={align} onClick={() => updateConfig('navAlignment', align)} className={`flex-1 py-1.5 text-[10px] capitalize font-medium rounded-md ${config.navAlignment === align || (!config.navAlignment && align === 'space-between') ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>{align.replace('-', ' ')}</button>
              ))}
            </div>
         </div>

         <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Menus Alignment</label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {['left', 'center', 'right'].map(align => (
                <button key={align} onClick={() => updateConfig('contentAlignment', align)} className={`flex-1 py-1.5 text-xs capitalize font-medium rounded-md ${config.contentAlignment === align || (!config.contentAlignment && align === 'center') ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>{align}</button>
              ))}
            </div>
         </div>

         <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Menu Item Gap (px)</label>
            <input type="number" value={config.spaceBetweenItems ?? 16} onChange={(e) => updateConfig('spaceBetweenItems', Number(e.target.value))} className="w-full p-2 border rounded-lg text-sm" />
         </div>

         <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Padding (px)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Top</span>
                <input type="number" value={config.paddingTop || 0} onChange={(e) => updateConfig('paddingTop', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Bottom</span>
                <input type="number" value={config.paddingBottom || 0} onChange={(e) => updateConfig('paddingBottom', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Left</span>
                <input type="number" value={config.paddingLeft || 0} onChange={(e) => updateConfig('paddingLeft', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Right</span>
                <input type="number" value={config.paddingRight || 0} onChange={(e) => updateConfig('paddingRight', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              </div>
            </div>
         </div>
      </div>
    );
  }
  
  if (activeTab === 'colors') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
         <h2 className="font-bold text-gray-900 text-lg mb-6">Colors</h2>
         <div className="space-y-3">
             <label className="text-sm font-semibold text-gray-700">Text Color</label>
             <div className="flex gap-2 items-center">
               <input type="color" value={config.textColor || '#000000'} onChange={(e) => updateConfig('textColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
               <input type="text" value={config.textColor || ''} onChange={(e) => updateConfig('textColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
               <button onClick={() => updateConfig('textColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
                 <FiX size={16} />
               </button>
             </div>
         </div>
         <div className="space-y-3">
             <label className="text-sm font-semibold text-gray-700">Hover Text Color</label>
             <div className="flex gap-2 items-center">
                <input type="color" value={config.textHoverColor || '#000000'} onChange={(e) => updateConfig('textHoverColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                <input type="text" value={config.textHoverColor || ''} onChange={(e) => updateConfig('textHoverColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
                <button onClick={() => updateConfig('textHoverColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
                  <FiX size={16} />
                </button>
             </div>
         </div>
         
         <div className="pt-4 border-t border-gray-200 mt-6 mb-4">
           <h3 className="font-bold text-gray-900 text-md mb-4">Scrolled Colors</h3>
         </div>

         <div className="space-y-3">
             <label className="text-sm font-semibold text-gray-700">Scrolled Background Color</label>
             <div className="flex gap-2 items-center">
                <input type="color" value={config.scrolledBackgroundColor || '#ffffff'} onChange={(e) => updateConfig('scrolledBackgroundColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                <input type="text" value={config.scrolledBackgroundColor || ''} onChange={(e) => updateConfig('scrolledBackgroundColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
                <button onClick={() => updateConfig('scrolledBackgroundColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
                  <FiX size={16} />
                </button>
             </div>
         </div>
         <div className="space-y-3">
             <label className="text-sm font-semibold text-gray-700">Scrolled Text Color</label>
             <div className="flex gap-2 items-center">
                <input type="color" value={config.scrolledTextColor || '#000000'} onChange={(e) => updateConfig('scrolledTextColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                <input type="text" value={config.scrolledTextColor || ''} onChange={(e) => updateConfig('scrolledTextColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
                <button onClick={() => updateConfig('scrolledTextColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
                  <FiX size={16} />
                </button>
             </div>
         </div>
         <div className="space-y-3">
             <label className="text-sm font-semibold text-gray-700">Scrolled Accent Color</label>
             <div className="flex gap-2 items-center">
                <input type="color" value={config.scrolledAccentColor || '#000000'} onChange={(e) => updateConfig('scrolledAccentColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                <input type="text" value={config.scrolledAccentColor || ''} onChange={(e) => updateConfig('scrolledAccentColor', e.target.value)} placeholder="Default" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
                <button onClick={() => updateConfig('scrolledAccentColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
                  <FiX size={16} />
                </button>
             </div>
         </div>
      </div>
    );
  }

  if (activeTab === 'typography') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
         <h2 className="font-bold text-gray-900 text-lg mb-6">Typography</h2>
         <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Font Family</label>
            <select value={config.fontFamily || 'Inter'} onChange={(e) => updateConfig('fontFamily', e.target.value)} className="w-full p-2 border rounded-lg text-sm">
              <optgroup label="Sans-Serif (Clean & Modern)">
                <option value="Inter">Inter (Hatil Nav Default)</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Lato">Lato</option>
                <option value="Open Sans">Open Sans</option>
              </optgroup>
              <optgroup label="Serif (Elegant & Classic)">
                <option value="Playfair Display">Playfair Display (Hatil Logo)</option>
                <option value="Lora">Lora</option>
                <option value="Georgia">Georgia</option>
              </optgroup>
            </select>
         </div>
         <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Size (px)</label>
              <input type="number" value={config.fontSize || 15} onChange={(e) => updateConfig('fontSize', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Weight</label>
              <select value={config.fontWeight || '500'} onChange={(e) => updateConfig('fontWeight', e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">SemiBold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
           </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Letter Spacing (px)</label>
              <input type="number" step="0.1" value={config.letterSpacing || 0} onChange={(e) => updateConfig('letterSpacing', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
           </div>
         </div>
         <div className="space-y-3 mt-4">
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="text-sm font-medium">Uppercase Text</span>
               <input type="checkbox" checked={config.uppercase || false} onChange={(e) => updateConfig('uppercase', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
         </div>
      </div>
    );
  }

  if (activeTab === 'menu') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
         <h2 className="font-bold text-gray-900 text-lg mb-2">Menu Items</h2>
         
         <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Space Between (px)</label>
            <input type="number" value={config.spaceBetweenItems || 28} onChange={(e) => updateConfig('spaceBetweenItems', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
         </div>
         
         <div className="space-y-3 mt-4">
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="text-sm font-medium">Underline on Hover</span>
               <input type="checkbox" checked={config.underlineOnHover ?? false} onChange={(e) => updateConfig('underlineOnHover', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
         </div>
         
         <hr className="my-6 border-gray-200" />
         <h3 className="font-bold text-sm text-gray-900 mb-4">Edit Links</h3>

         <div className="space-y-3">
            {links.map((link) => (
              <div key={link.id} className={`flex flex-col p-3 bg-white border rounded-lg shadow-sm group ${activeLinkId === link.id ? 'border-[#635BFF] bg-[#635BFF]/5' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <FiMenu className="text-gray-400 cursor-grab" />
                  <input type="text" value={link.text} onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, text: e.target.value } : l))} className="flex-1 text-sm font-medium border-none p-0 focus:ring-0 bg-transparent" />
                  <button onClick={() => setLinks(links.filter(l => l.id !== link.id))} className="text-gray-400 hover:text-red-500"><FiTrash2 size={16} /></button>
                </div>
                <div className="mt-3 flex justify-between items-center pl-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={link.hasDropdown || false} onChange={(e) => {
                      const isChecked = e.target.checked;
                      setLinks(links.map(l => l.id === link.id ? { ...l, hasDropdown: isChecked, dropdownData: isChecked ? (l.dropdownData || { columns: [{ id: `col-${Date.now()}`, groups: [] }] }) : null } : l));
                    }} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
                    Mega Menu Features
                  </label>
                  {link.hasDropdown && (
                    <button onClick={() => setActiveLinkId(activeLinkId === link.id ? null : link.id)} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-colors ${activeLinkId === link.id ? 'bg-[#635BFF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {activeLinkId === link.id ? 'Close' : 'Edit Megamenu'}
                    </button>
                  )}
                </div>
              </div>
            ))}
         </div>
         <button onClick={() => setLinks([...links, { id: `link-${Date.now()}`, text: 'New Item' }])} className="w-full py-3 mt-4 border border-dashed border-gray-300 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
           <FiPlus /> Add Link
         </button>
      </div>
    );
  }

  if (activeTab === 'icons') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
         <h2 className="font-bold text-gray-900 text-lg mb-6">Icons & Logo</h2>
         <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">Logo Type</label>
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
               <button onClick={() => updateConfig('logoType', 'text')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${config.logoType === 'text' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Text</button>
               <button onClick={() => updateConfig('logoType', 'image')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${config.logoType === 'image' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Image</button>
            </div>
            {config.logoType === 'text' ? (
               <div className="space-y-2">
                 <label className="text-[10px] text-gray-500 uppercase tracking-wider block">Logo Text</label>
                 <input type="text" value={typeof config.logoText === 'string' ? config.logoText : ''} onChange={(e) => updateConfig('logoText', e.target.value)} className="w-full p-2 border rounded-lg text-sm font-medium" placeholder="PREMIUM" />
               </div>
            ) : (
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider block flex justify-between items-center">
                      <span>Default Logo</span>
                      {config.logoImage && <button onClick={() => updateConfig('logoImage', '')} className="text-red-500 hover:text-red-700 capitalize text-[9px]">Remove</button>}
                    </label>
                    {config.logoImage && (
                      <img src={config.logoImage} alt="Logo preview" className="h-10 object-contain border rounded-lg p-1 bg-gray-50" />
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm border p-2 rounded-lg bg-gray-50" />
                    <p className="text-[9px] text-gray-400">Saved in MongoDB. Used for solid or light backgrounds.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider block flex justify-between items-center">
                      <span>Inverse Logo (Optional)</span>
                      {config.logoImageInverse && <button onClick={() => updateConfig('logoImageInverse', '')} className="text-red-500 hover:text-red-700 capitalize text-[9px]">Remove</button>}
                    </label>
                    {config.logoImageInverse && (
                      <img src={config.logoImageInverse} alt="Inverse logo preview" className="h-10 object-contain border rounded-lg p-1 bg-gray-800" />
                    )}
                    <input type="file" accept="image/*" onChange={handleInverseImageUpload} className="w-full text-sm border p-2 rounded-lg bg-gray-50" />
                    <p className="text-[9px] text-gray-400">Saved in MongoDB. Used for transparent or dark backgrounds.</p>
                  </div>
               </div>
            )}
         </div>

         <hr className="my-6 border-gray-200" />
         
         <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-900 mb-4">Utility Icons</h3>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="text-sm font-medium">Search Icon</span>
               <input type="checkbox" checked={config.enableSearch ?? true} onChange={(e) => updateConfig('enableSearch', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="text-sm font-medium">User Account</span>
               <input type="checkbox" checked={config.enableUser ?? true} onChange={(e) => updateConfig('enableUser', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="text-sm font-medium">Shopping Cart</span>
               <input type="checkbox" checked={config.enableCart ?? true} onChange={(e) => updateConfig('enableCart', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
               <label className="text-sm font-semibold text-gray-700">Icon Color</label>
               <div className="flex gap-2 items-center">
                  <input type="color" value={config.iconColor || '#000000'} onChange={(e) => updateConfig('iconColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                  <input type="text" value={config.iconColor || ''} onChange={(e) => updateConfig('iconColor', e.target.value)} placeholder="Default (Matches Text)" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
                  <button onClick={() => updateConfig('iconColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Color">
                    <FiX size={16} />
                  </button>
               </div>
            </div>
            
            <div className="mt-2 space-y-3">
               <label className="text-sm font-semibold text-gray-700">Icon Hover Color</label>
               <div className="flex gap-2 items-center">
                  <input type="color" value={config.iconHoverColor || '#000000'} onChange={(e) => updateConfig('iconHoverColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                  <input type="text" value={config.iconHoverColor || ''} onChange={(e) => updateConfig('iconHoverColor', e.target.value)} placeholder="Hover Color" className="flex-1 p-2 border rounded-lg text-sm font-medium uppercase" />
                  <button onClick={() => updateConfig('iconHoverColor', '')} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Clear Hover Color">
                    <FiX size={16} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    );
  }
  
  if (activeTab === 'behavior') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
         <h2 className="font-bold text-gray-900 text-lg mb-6">Navbar Behavior</h2>
         
         <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <div className="flex flex-col">
                 <span className="text-sm font-medium">Sticky Navbar</span>
                 <span className="text-[10px] text-gray-500">Stays at top while scrolling</span>
               </div>
               <input type="checkbox" checked={config.stickyOnScroll ?? true} onChange={(e) => updateConfig('stickyOnScroll', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <div className="flex flex-col">
                 <span className="text-sm font-medium">Hide on Scroll Down</span>
                 <span className="text-[10px] text-gray-500">Only shows when scrolling up</span>
               </div>
               <input type="checkbox" checked={config.hideOnScrollDown ?? false} onChange={(e) => updateConfig('hideOnScrollDown', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <div className="flex flex-col">
                 <span className="text-sm font-medium">Transparent on Top</span>
                 <span className="text-[10px] text-gray-500">Merges with hero sections</span>
               </div>
               <input type="checkbox" checked={config.transparentOnTop ?? false} onChange={(e) => updateConfig('transparentOnTop', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
             <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <div className="flex flex-col">
                 <span className="text-sm font-medium">Blur Effect</span>
                 <span className="text-[10px] text-gray-500">Glassmorphism backdrop filter</span>
               </div>
               <input type="checkbox" checked={config.blurEffect ?? false} onChange={(e) => updateConfig('blurEffect', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
               <div className="flex flex-col">
                 <span className="text-sm font-medium">Hover Animations</span>
                 <span className="text-[10px] text-gray-500">Show underlines when hovering links</span>
               </div>
               <input type="checkbox" checked={config.enableHoverAnimation ?? true} onChange={(e) => updateConfig('enableHoverAnimation', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
            </label>
         </div>
      </div>
    );
  }
  
  if (activeTab === 'megamenu') {
     return (
         <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
           <h2 className="font-bold text-gray-900 text-lg mb-6">Mega Menu Setup</h2>
           <div className="bg-[#635BFF]/10 text-[#635BFF] p-4 rounded-lg text-sm border border-[#635BFF]/20 mb-4">
              To edit a specific link's Mega Menu, go to the <strong>Menu Items</strong> tab, enable "Mega Menu Features" for a link, and click <strong>Edit Megamenu</strong>.
           </div>
           
           <div className="space-y-4 mt-8">
              <label className="flex items-center justify-between cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50">
                 <span className="text-sm font-medium">Enable Mega Menu Features globally</span>
                 <input type="checkbox" checked={config.megaMenuEnabled ?? true} onChange={(e) => updateConfig('megaMenuEnabled', e.target.checked)} className="rounded text-[#635BFF] focus:ring-[#635BFF]" />
              </label>

              <div className="pt-4 border-t border-gray-100">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Mega Menu Items Alignment</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                   <button onClick={() => updateConfig('megaMenuAlignment', 'left')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${(!config.megaMenuAlignment || config.megaMenuAlignment === 'left') ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Left</button>
                   <button onClick={() => updateConfig('megaMenuAlignment', 'center')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${config.megaMenuAlignment === 'center' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Center</button>
                   <button onClick={() => updateConfig('megaMenuAlignment', 'right')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${config.megaMenuAlignment === 'right' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Right</button>
                </div>
              </div>
           </div>
        </div>
     )
  }

  return <div className="text-gray-500 text-sm">Select a tab on the left to edit settings.</div>;
}
