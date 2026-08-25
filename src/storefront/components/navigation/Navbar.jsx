import React, { useState, useEffect } from 'react';
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
  const { menus, headerConfig, pages } = useCMS();
  
  const { categories } = useCategories();
  const { products } = useProducts();
  const { collections } = useCollections();
  const { brands } = useBrands();

  const headerTokens = activeTheme.tokens.header;
  
  const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
  const headerMenu = menus.find(m => m.id === primaryMenuId)?.items?.filter(i => i.visibility) || [];

  // Read settings from the global header config (which the Navbar Builder saves to)
  const isTransparentOnTop = headerConfig?.transparentOnTop || false;
  const hoverTransparent = headerConfig?.hoverTransparent || false;
  
  // Navbar is solid white if we are scrolled, NOT marked as transparent on top, or if the user is hovering (only if the Hover toggle is ON)
  const isSolid = isScrolled || !isTransparentOnTop || (hoverTransparent && (isHovered || hoveredCategoryId !== null));

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 border-b h-[72px] md:h-[84px] ${
        isSolid ? headerTokens.solid : headerTokens.transparent
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full mx-auto flex items-center justify-between xl:grid xl:grid-cols-3 h-full px-5">
        {/* Left Section: Brand Logo */}
        <div className="flex items-center xl:justify-self-start h-full">
          <Link to="/" className={`transition-all flex items-center justify-center px-3 py-0.5 md:px-4 md:py-1 ${headerConfig?.logoType !== 'image' ? activeTheme.tokens.primary : ''}`}>
            {headerConfig?.logoType === 'image' && headerConfig?.logoImage ? (
              <img src={headerConfig.logoImage} alt={headerConfig?.logoText || 'Logo'} className="h-8 md:h-10 object-contain" />
            ) : (
              <span className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none">
                {headerConfig?.logoText || 'DORY'}
              </span>
            )}
          </Link>
        </div>

        {/* Center Section: Categories (Desktop) */}
        <nav className="hidden lg:flex items-center h-full xl:justify-self-center relative">
          {headerMenu.map((item, idx) => {
            const { title, link } = resolveMenuItem(item);
            const hasDropdown = item.megaMenu ? true : false;
            return (
              <div 
                key={item.id || idx}
                className="h-full group"
              >
                <Link 
                  to={link}
                  className={`whitespace-nowrap h-full flex items-center gap-1 px-3 xl:px-4 text-sm xl:text-base font-semibold transition-colors duration-200 ${
                    hoveredCategoryId === item.referenceId 
                      ? (isSolid ? headerTokens.linkActiveSolid : headerTokens.linkActiveTransparent)
                      : (isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent)
                  }`}
                >
                  {title} {hasDropdown && <ChevronDown size={14} />}
                </Link>
                {hasDropdown && (
                  <StorefrontMegaMenu data={item.megaMenu} onClose={() => {}} />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Section: Utilities */}
        <div className={`flex items-center space-x-4 md:space-x-5 xl:justify-self-end ${
          isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent
        }`}>
          {headerConfig?.enableSearch && (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 transition-colors hover:opacity-70"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}
          
          {headerConfig?.enableAccount && (
            <Link 
              to={isAuthenticated ? "/account" : "/account/login"} 
              className="p-1 transition-colors hidden sm:flex items-center hover:opacity-70"
              aria-label="Account"
            >
              <User size={20} />
              {isAuthenticated && <ChevronDown size={14} className="ml-0.5 mt-0.5" />}
            </Link>
          )}
          
          {headerConfig?.enableCart && (
            <button 
              onClick={openCartDrawer}
              className="p-1 transition-colors relative hover:opacity-70"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <CartBadge />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 transition-colors lg:hidden ml-2 hover:opacity-70"
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
