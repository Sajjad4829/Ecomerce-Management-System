import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { useAuth } from '../../../auth/context/AuthContext';
import CartBadge from '../cart/CartBadge';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { useCMS } from '../../../admin/context/cms/CMSContext';

export default function Navbar({ onOpenMobileMenu, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  
  const location = useLocation();
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();
  const { activeTheme } = useStorefrontTheme();
  const { menus } = useCMS();
  const headerTokens = activeTheme.tokens.header;
  const headerMenu = menus.find(m => m.type === 'Header')?.items?.filter(i => i.visibility) || [];

  const isHomePage = location.pathname === '/';
  
  // Navbar is solid white if we are scrolled, NOT on homepage, or if the user is hovering over the navbar/categories
  const isSolid = isScrolled || !isHomePage || isHovered || hoveredCategory !== null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Removed hardcoded categories array
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
          <Link to="/" className={`${activeTheme.tokens.primary} transition-all flex items-center justify-center px-3 py-0.5 md:px-4 md:py-1`}>
            <span className="text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none">
              DORY
            </span>
          </Link>
        </div>

        {/* Center Section: Categories (Desktop) */}
        <nav className="hidden lg:flex items-center h-full xl:justify-self-center relative">
          {headerMenu.map((category) => (
            <div 
              key={category.id}
              className="h-full"
              onMouseEnter={() => setHoveredCategory(category.title)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link 
                to={category.link}
                className={`whitespace-nowrap h-full flex items-center px-3 xl:px-4 text-sm xl:text-base font-semibold transition-colors duration-200 ${
                  hoveredCategory === category.title 
                    ? (isSolid ? headerTokens.linkActiveSolid : headerTokens.linkActiveTransparent)
                    : (isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent)
                }`}
              >
                {category.title}
              </Link>
              
              {/* Mega Menu Dropdown */}
              {hoveredCategory === category.title && category.isMegaMenu && category.columns?.length > 0 && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[900px] ${activeTheme.tokens.surface} ${activeTheme.tokens.text.primary} shadow-2xl p-8 z-50 flex gap-8`}>
                  <div className="flex-1 grid grid-cols-4 gap-8">
                    {category.columns.map((col, colIndex) => (
                      <div key={col.id || colIndex} className="flex flex-col space-y-6">
                        {col.groups.map((group, secIndex) => (
                          <div key={group.id || secIndex} className="flex flex-col">
                            <Link to={group.link} className={`font-bold text-sm ${activeTheme.tokens.text.primary} mb-3 hover:opacity-70 flex items-center group`}>
                              {group.title}
                              {group.items?.length > 0 && <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-200" />}
                            </Link>
                            {group.items?.length > 0 && (
                              <ul className="flex flex-col space-y-2">
                                {group.items.map((item, itemIndex) => (
                                  <li key={item.id || itemIndex}>
                                    <Link to={item.link} className={`text-xs ${activeTheme.tokens.text.secondary} hover:opacity-70 transition-colors`}>
                                      {item.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  {category.promoBanner?.imageUrl && (
                    <div className="w-[240px] shrink-0">
                      <Link to={category.promoBanner.link || '#'} className="block h-full w-full rounded-lg overflow-hidden group">
                        <img 
                          src={category.promoBanner.imageUrl} 
                          alt={category.promoBanner.altText || "Promotional Banner"} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button className={`whitespace-nowrap h-full flex items-center px-3 xl:px-4 text-sm xl:text-base font-semibold transition-colors duration-200 gap-1 ${
            isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent
          }`}>
            More <ChevronDown size={14} />
          </button>
        </nav>

        {/* Right Section: Utilities */}
        <div className={`flex items-center space-x-4 md:space-x-5 xl:justify-self-end ${
          isSolid ? headerTokens.linkSolid : headerTokens.linkTransparent
        }`}>
          <button 
            onClick={onOpenSearch}
            className="p-1 transition-colors hover:opacity-70"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to={isAuthenticated ? "/account" : "/account/login"} 
            className="p-1 transition-colors hidden sm:block hover:opacity-70"
            aria-label="Account"
          >
            {isAuthenticated ? (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isSolid ? 'bg-current text-white' : 'bg-current text-black'
              }`}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            ) : (
              <User size={20} />
            )}
          </Link>
          
          <button 
            onClick={openCartDrawer}
            className="p-1 transition-colors relative hover:opacity-70"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            <CartBadge />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={onOpenMobileMenu}
            className="p-1 transition-colors lg:hidden ml-2 hover:opacity-70"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
