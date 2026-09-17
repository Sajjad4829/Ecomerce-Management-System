import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, ShoppingCart, User, Menu, ChevronDown, ArrowRight, X } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { useAuth } from '../../../auth/context/AuthContext';
import CartBadge from '../cart/CartBadge';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { useCMS } from '../../../admin/context/cms/CMSContext';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import { useCollections } from '../../../admin/context/commerce/CollectionContext';
import { useBrands } from '../../../admin/context/commerce/BrandContext';
import { AnimatePresence, motion } from 'framer-motion';
import GlobalSearch from '../search/GlobalSearch';
import MobileMenu from '../layout/MobileMenu';
import StorefrontMegaMenu from './StorefrontMegaMenu';

export default function Navbar({ data }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  
  const location = useLocation();
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();
  const { activeTheme } = useStorefrontTheme();
  const { menus, headerConfig, configLoading } = useCMS();
  
  const { categories } = useCategories();
  const { products } = useProducts();
  const { collections } = useCollections();
  const { brands } = useBrands();

  // navReady: becomes true after one animation frame so the ENTIRE navbar
  // fades in as one unit — no logo-first / icons-later flicker.
  const [navReady, setNavReady] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Wait for one rAF so all context values (cache + API) have settled
    // into a single consistent render before revealing the navbar.
    rafRef.current = requestAnimationFrame(() => {
      setNavReady(true);
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const headerTokens = activeTheme.tokens.header;
  
  const getDevice = () => {
    if (window.innerWidth < 768) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  };
  const [device, setDevice] = useState(getDevice());
  const isMobile = device === 'mobile';

  useEffect(() => {
    const handleResize = () => setDevice(getDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getProp = (key) => {
    const config = headerConfig || {};
    if (device === 'desktop') return config[key];
    if (device === 'tablet') return config[`${key}_tablet`] !== undefined ? config[`${key}_tablet`] : config[key];
    if (device === 'mobile') return config[`${key}_mobile`] !== undefined ? config[`${key}_mobile`] : (config[`${key}_tablet`] !== undefined ? config[`${key}_tablet`] : config[key]);
  };

  const primaryMenuId = getProp('primaryMenuId') || 'MNU-001';
  const headerMenu = menus.find(m => m.id === primaryMenuId)?.items?.filter(i => i.visibility) || [];

  // Read settings from the global header config (which the Navbar Builder saves to)
  const isConfigTransparent = getProp('navbarStyle') === 'transparent';
  const isHomePage = location.pathname === '/';
  const isTransparentStyle = !isMobile && (isConfigTransparent && isHomePage);
  
  // Navbar is solid if we are scrolled, NOT marked as transparent, or if hovering over it
  const isSolid = isScrolled || !isTransparentStyle || isHovered || hoveredCategoryId !== null;

  // Determine dynamic colors based on state and user config
  let currentBgColor;
  let currentTextColor;
  let currentIconColor;
  let currentAccentColor;

  if (!isHomePage) {
    // Force default styles for all non-home pages (solid white bg, black text/icons)
    currentBgColor = '#ffffff';
    currentTextColor = '#111111';
    currentIconColor = '#111111';
    currentAccentColor = '#111111';
  } else {
    currentBgColor = isSolid ? (getProp('backgroundColor') || '#ffffff') : 'transparent';
    if (isScrolled && getProp('scrolledBackgroundColor')) {
      currentBgColor = getProp('scrolledBackgroundColor');
    }
    if (isHovered && getProp('navbarHoverBgColor')) {
      currentBgColor = getProp('navbarHoverBgColor');
    }
    
    // Helper to determine text color based on background brightness
    const getContrastColor = (bg) => {
      if (!bg || bg === 'transparent') return '#111111';
      let hex = bg.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      if (hex.length !== 6) return '#111111';
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luma < 128 ? '#ffffff' : '#111111';
    };

    currentTextColor = getProp('textColor');
    if (isScrolled && getProp('scrolledTextColor')) {
      currentTextColor = getProp('scrolledTextColor');
    }
    
    if (isHovered && getProp('navbarHoverTextColor')) {
      currentTextColor = getProp('navbarHoverTextColor');
    } else if (!currentTextColor) {
      if (isTransparentStyle && !isSolid) {
        currentTextColor = '#ffffff';
      } else {
        currentTextColor = getContrastColor(currentBgColor);
      }
    }

    currentIconColor = getProp('iconColor') || currentTextColor;
    currentAccentColor = currentTextColor;

    if (isScrolled && getProp('scrolledAccentColor')) {
      currentIconColor = getProp('scrolledAccentColor');
      currentAccentColor = getProp('scrolledAccentColor');
    }

    if (isHovered && getProp('iconHoverColor')) {
      currentIconColor = getProp('iconHoverColor');
    } else if (!getProp('scrolledAccentColor') && ((isTransparentStyle && isSolid) || (isHovered && getProp('navbarHoverTextColor')))) {
      // When a transparent navbar becomes solid, or when the navbar is hovered,
      // force icons to match the text color so they don't disappear on the changing background.
      currentIconColor = currentTextColor;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const resolveMenuItem = (item) => {
    if (!item.referenceType || !item.referenceId) {
      return { title: item.title, link: item.link };
    }
    
    let resolvedTitle = item.title;
    let resolvedLink = item.link;

    if (item.referenceType === 'category') {
      const cat = categories.find(c => c.id === item.referenceId);
      if (cat) {
        resolvedTitle = cat.name;
        resolvedLink = `/categories/${cat.slug}`;
      }
    } else if (item.referenceType === 'product') {
      const prod = products.find(p => p.id === item.referenceId);
      if (prod) {
        resolvedTitle = prod.name;
        resolvedLink = `/products/${prod.slug}`;
      }
    } else if (item.referenceType === 'collection') {
      const coll = collections.find(c => c.id === item.referenceId);
      if (coll) {
        resolvedTitle = coll.name;
        resolvedLink = `/collections/${coll.slug}`;
      }
    } else if (item.referenceType === 'brand') {
      const brand = brands.find(b => b.id === item.referenceId);
      if (brand) {
        resolvedTitle = brand.name;
        resolvedLink = `/brands/${brand.slug}`;
      }
    }

    return { title: resolvedTitle || 'Unknown', link: resolvedLink || '#' };
  };

  const navAlignment = getProp('navAlignment') || 'space-between';
  
  let containerClasses = 'w-full mx-auto flex items-center h-full justify-between';
  let logoClasses = 'flex items-center h-full shrink-0 group';
  let menuClasses = 'hidden lg:flex items-center h-full relative flex-1 flex-wrap';
  let iconsClasses = `flex items-center space-x-4 md:space-x-5 shrink-0 ${
    isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent
  }`;

  let menuJustify = getProp('contentAlignment') || 'center';

  if (navAlignment === 'space-between') {
    containerClasses += ' xl:grid xl:grid-cols-3';
    logoClasses += ' xl:justify-self-start';
    iconsClasses += ' xl:justify-self-end';
  } else {
    containerClasses += ' xl:gap-8';
    if (navAlignment === 'left') menuJustify = 'flex-start';
    if (navAlignment === 'center') menuJustify = 'center';
    if (navAlignment === 'right') menuJustify = 'flex-end';
  }

  // ── Skeleton: on very first visit (no localStorage cache) show a solid
  // placeholder bar so the layout space is reserved and nothing pops in.
  const hasCache = !configLoading || getProp('logoText') || getProp('logoImage');
  if (!navReady && configLoading && !hasCache) {
    return (
      <header
        className="fixed top-0 left-0 w-full z-[100]"
        style={{
          height: `${getProp('height') || 72}px`,
          backgroundColor: getProp('backgroundColor') || '#ffffff',
        }}
      />
    );
  }

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-[colors,opacity] duration-300 ${
        isSolid ? 'shadow-sm' : ''
      } ${
        navReady ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        backgroundColor: currentBgColor,
        borderBottom: 'none',
        height: `${getProp('height') || 72}px`,
        paddingTop: `${getProp('paddingTop') || 16}px`,
        paddingBottom: `${getProp('paddingBottom') || 16}px`,
        paddingLeft: `${getProp('paddingLeft') || 24}px`,
        paddingRight: `${getProp('paddingRight') || 24}px`,
        fontFamily: getProp('fontFamily') || 'Inter',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inject dynamic hover styles */}
      {getProp('textHoverColor') && (
        <style>{`
          .nav-link-dynamic:hover {
            color: ${getProp('textHoverColor')} !important;
          }
        `}</style>
      )}
      <div className={containerClasses}>
        {/* Left Section: Brand Logo */}
        <div className={logoClasses}>
          <Link to="/" className="flex items-center gap-2 group">
            {getProp('logoType') === 'image' && (getProp('logoImage') || getProp('logoImageInverse')) ? (
              <img 
                src={(currentTextColor === '#ffffff' || currentTextColor === '#fff' || currentTextColor?.toLowerCase() === 'white') && getProp('logoImageInverse') ? getProp('logoImageInverse') : (getProp('logoImage') || getProp('logoImageInverse'))} 
                alt={typeof getProp('logoText') === 'string' ? getProp('logoText') : 'Logo'} 
                className="h-8 md:h-10 object-contain transition-opacity duration-300" 
              />
            ) : (
              <span 
                className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none"
                style={currentTextColor ? { color: currentTextColor } : {}}
              >
                {getProp('logoText') || ''}
              </span>
            )}
          </Link>
        </div>

        {/* Center Section: Categories (Desktop) */}
        <nav 
          className={menuClasses} 
          style={{ 
            gap: `${getProp('spaceBetweenItems') || 28}px`,
            justifyContent: menuJustify 
          }}
        >
          {headerMenu.map((item, idx) => {
            const { title, link } = resolveMenuItem(item);
            
            // Look up any top-level categories that were linked to this navigation menu item
            const rootCategories = categories.filter(c => c.navMenuId === item.id);
            let combinedMegaMenu = item.megaMenu ? JSON.parse(JSON.stringify(item.megaMenu)) : null;

            if (rootCategories.length > 0) {
              const numCols = Math.min(4, rootCategories.length);
              const dynamicColumns = Array.from({ length: numCols }, (_, i) => ({
                id: `dyn-col-${item.id}-${i}`,
                groups: []
              }));

              rootCategories.forEach((rootCat, i) => {
                const subCats = categories.filter(c => c.parentId === rootCat.id);
                const group = {
                  id: `dyn-group-${rootCat.id}`,
                  title: `${rootCat.name} →`,
                  link: `/categories/${rootCat.slug}`,
                  items: subCats.map(sub => ({
                    id: sub.id,
                    title: sub.name,
                    referenceType: 'category',
                    referenceId: sub.id,
                    link: `/categories/${sub.slug}`
                  }))
                };
                
                const colIdx = i % numCols;
                dynamicColumns[colIdx].groups.push(group);
              });
              
              if (combinedMegaMenu && combinedMegaMenu.columns) {
                combinedMegaMenu.columns.push(...dynamicColumns);
              } else {
                combinedMegaMenu = { columns: dynamicColumns };
              }
            }

            const hasDropdown = !!combinedMegaMenu;
            
            return (
              <div 
                key={item.id || idx}
                className="h-full group"
              >
                <Link 
                  to={link}
                  className={`nav-link-dynamic whitespace-nowrap h-full flex items-center px-3 xl:px-4 transition-colors duration-200 ${
                    isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent
                  }`}
                  style={{
                    color: currentTextColor,
                    fontSize: `${getProp('fontSize') || 15}px`,
                    fontWeight: getProp('fontWeight') || '500',
                    textTransform: getProp('uppercase') ? 'uppercase' : (getProp('textTransform') || 'none'),
                    letterSpacing: `${getProp('letterSpacing') || 0}px`
                  }}
                >
                  <span className="relative py-1">
                    {title}
                    {getProp('enableHoverAnimation') !== false && (
                      <span 
                        className="absolute bottom-0 left-1/2 w-4/5 -translate-x-1/2 h-[1.5px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" 
                        style={currentAccentColor ? { backgroundColor: currentAccentColor } : (currentTextColor ? { backgroundColor: currentTextColor } : {})}
                      />
                    )}
                  </span>
                </Link>
                {hasDropdown && (
                  <StorefrontMegaMenu data={combinedMegaMenu} onClose={() => {}} />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Section: Utilities */}
        <div 
          className={iconsClasses}
          style={currentIconColor ? { color: currentIconColor } : {}}
        >
          {getProp('enableSearch') !== false && (
            <div className="hidden md:flex order-1 mr-2 lg:mr-4 relative items-center justify-end z-50">
              <GlobalSearch isExpandable={true} />
            </div>
          )}
          
          {getProp('enableCart') !== false && (
            <button 
              onClick={openCartDrawer}
              className="p-1 transition-colors relative hover:opacity-70 nav-icon-dynamic flex order-1 md:order-3"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <CartBadge />
            </button>
          )}

          {getProp('enableUser') !== false && (
            <Link 
              to={isAuthenticated ? "/account" : "/account/login"} 
              className="p-1 transition-colors flex items-center hover:opacity-70 nav-icon-dynamic order-2 md:order-2"
              aria-label="Account"
            >
              <User size={20} />
              {isAuthenticated && <ChevronDown size={14} className="ml-0.5 mt-0.5" />}
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 transition-colors lg:hidden ml-2 hover:opacity-70 nav-icon-dynamic order-3 md:order-4"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </AnimatePresence>
    </header>
  );
}
