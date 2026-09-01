import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { useAuth } from '../../../auth/context/AuthContext';
import CartBadge from '../cart/CartBadge';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { useCMS } from '../../../admin/context/cms/CMSContext';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import { useCollections } from '../../../admin/context/commerce/CollectionContext';
import { useBrands } from '../../../admin/context/commerce/BrandContext';
import { AnimatePresence } from 'framer-motion';
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
  
  const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
  const headerMenu = menus.find(m => m.id === primaryMenuId)?.items?.filter(i => i.visibility) || [];

  // Read settings from the global header config (which the Navbar Builder saves to)
  const isTransparentStyle = headerConfig?.navbarStyle === 'transparent';
  
  // Navbar is solid if we are scrolled, NOT marked as transparent, or if hovering over it
  const isSolid = isScrolled || !isTransparentStyle || isHovered || hoveredCategoryId !== null;

  // Determine dynamic colors based on state and user config
  let currentBgColor = isSolid ? (headerConfig?.backgroundColor || '#ffffff') : 'transparent';
  if (isHovered && headerConfig?.navbarHoverBgColor) {
    currentBgColor = headerConfig.navbarHoverBgColor;
  }
  
  let currentTextColor = headerConfig?.textColor;
  
  if (isHovered && headerConfig?.navbarHoverTextColor) {
    currentTextColor = headerConfig.navbarHoverTextColor;
  } else if (!currentTextColor) {
    if (isHovered && headerConfig?.navbarHoverBgColor) {
      currentTextColor = '#111111'; // Default dark if custom hover bg is provided
    } else if (isTransparentStyle && !isSolid) {
      currentTextColor = '#ffffff';
    } else if (isTransparentStyle && isSolid) {
      currentTextColor = '#111111'; // Default dark text when transparent navbar becomes solid (scrolled)
    } else {
      currentTextColor = headerConfig?.navbarStyle === 'dark' ? '#ffffff' : '#111111';
    }
  }

  let currentIconColor = headerConfig?.iconColor || currentTextColor;
  if (isHovered && headerConfig?.iconHoverColor) {
    currentIconColor = headerConfig.iconHoverColor;
  } else if ((isTransparentStyle && isSolid) || (isHovered && headerConfig?.navbarHoverTextColor)) {
    // When a transparent navbar becomes solid, or when the navbar is hovered,
    // force icons to match the text color so they don't disappear on the changing background.
    currentIconColor = currentTextColor;
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

  const navAlignment = headerConfig?.navAlignment || 'space-between';
  
  let containerClasses = 'w-full mx-auto flex items-center h-full justify-between';
  let logoClasses = 'flex items-center h-full shrink-0 group';
  let menuClasses = 'hidden lg:flex items-center h-full relative flex-1 flex-wrap';
  let iconsClasses = `flex items-center space-x-4 md:space-x-5 shrink-0 ${
    isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent
  }`;

  let menuJustify = headerConfig?.contentAlignment || 'center';

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
  const hasCache = !configLoading || headerConfig?.logoText || headerConfig?.logoImage;
  if (!navReady && configLoading && !hasCache) {
    return (
      <header
        className="fixed top-0 left-0 w-full z-[100]"
        style={{
          height: `${headerConfig?.height || 72}px`,
          backgroundColor: headerConfig?.backgroundColor || '#ffffff',
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
        height: `${headerConfig?.height || 72}px`,
        paddingTop: `${headerConfig?.paddingTop || 16}px`,
        paddingBottom: `${headerConfig?.paddingBottom || 16}px`,
        paddingLeft: `${headerConfig?.paddingLeft || 24}px`,
        paddingRight: `${headerConfig?.paddingRight || 24}px`,
        fontFamily: headerConfig?.fontFamily || 'Inter',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inject dynamic hover styles */}
      {headerConfig?.textHoverColor && (
        <style>{`
          .nav-link-dynamic:hover {
            color: ${headerConfig.textHoverColor} !important;
          }
        `}</style>
      )}
      <div className={containerClasses}>
        {/* Left Section: Brand Logo */}
        <div className={logoClasses}>
          <Link to="/" className="flex items-center gap-2 group">
            {headerConfig?.logoType === 'image' && (headerConfig?.logoImage || headerConfig?.logoImageInverse) ? (
              <img 
                src={(currentTextColor === '#ffffff' || currentTextColor === '#fff' || currentTextColor?.toLowerCase() === 'white') && headerConfig?.logoImageInverse ? headerConfig.logoImageInverse : (headerConfig?.logoImage || headerConfig?.logoImageInverse)} 
                alt={typeof headerConfig?.logoText === 'string' ? headerConfig.logoText : 'Logo'} 
                className="h-8 md:h-10 object-contain transition-opacity duration-300" 
              />
            ) : (
              <span 
                className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none"
                style={currentTextColor ? { color: currentTextColor } : {}}
              >
                {headerConfig?.logoText || ''}
              </span>
            )}
          </Link>
        </div>

        {/* Center Section: Categories (Desktop) */}
        <nav 
          className={menuClasses} 
          style={{ 
            gap: `${headerConfig?.spaceBetweenItems || 28}px`,
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
                    fontSize: `${headerConfig?.fontSize || 15}px`,
                    fontWeight: headerConfig?.fontWeight || '500',
                    textTransform: headerConfig?.uppercase ? 'uppercase' : (headerConfig?.textTransform || 'none'),
                    letterSpacing: `${headerConfig?.letterSpacing || 0}px`
                  }}
                >
                  <span className="relative py-1">
                    {title}
                    {headerConfig?.enableHoverAnimation !== false && (
                      <span 
                        className="absolute bottom-0 left-1/2 w-4/5 -translate-x-1/2 h-[1.5px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" 
                        style={currentTextColor ? { backgroundColor: currentTextColor } : {}}
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
          {headerConfig?.enableSearch !== false && (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 transition-colors hover:opacity-70 nav-icon-dynamic"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}
          
          {headerConfig?.enableUser !== false && (
            <Link 
              to={isAuthenticated ? "/account" : "/account/login"} 
              className="p-1 transition-colors hidden sm:flex items-center hover:opacity-70 nav-icon-dynamic"
              aria-label="Account"
            >
              <User size={20} />
              {isAuthenticated && <ChevronDown size={14} className="ml-0.5 mt-0.5" />}
            </Link>
          )}
          
          {headerConfig?.enableCart !== false && (
            <button 
              onClick={openCartDrawer}
              className="p-1 transition-colors relative hover:opacity-70 nav-icon-dynamic"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <CartBadge />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 transition-colors lg:hidden ml-2 hover:opacity-70 nav-icon-dynamic"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </AnimatePresence>
    </header>
  );
}
