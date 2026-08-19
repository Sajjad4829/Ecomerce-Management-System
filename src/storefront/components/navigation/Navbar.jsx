import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { useAuth } from '../../../auth/context/AuthContext';
import CartBadge from '../cart/CartBadge';

export default function Navbar({ onOpenMobileMenu, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();

  // If not on the home page, the navbar should have a solid background immediately
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navbarClasses = `absolute top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
    isScrolled || !isHomePage ? 'bg-neutral-900/90 backdrop-blur-md shadow-lg py-0' : 'bg-transparent py-0'
  }`;

  const categories = [
    { name: 'Living Room', path: '/categories/living-room' },
    { name: 'Bedroom', path: '/categories/bedroom' },
    { name: 'Dining', path: '/categories/dining' },
    { name: 'Kitchen', path: '/categories/kitchen' },
    { name: "Kid's Room", path: '/categories/kids-room' },
    { name: 'SmartFit', path: '/categories/smartfit' },
    { name: 'Institutional', path: '/categories/institutional' },
    { name: 'Door', path: '/categories/door' },
    { name: 'Interior', path: '/categories/interior' },
    { name: 'Office', path: '/categories/office' },
  ];

  return (
    <header className={navbarClasses}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Left Section: Brand Logo */}
        <div className="flex items-center">
          <Link to="/" className="bg-[#E31E24] hover:brightness-110 transition-all flex items-center justify-center px-4 py-4 md:py-5 min-w-[120px] md:min-w-[180px]">
            <span className="text-white text-lg md:text-xl font-bold tracking-widest uppercase text-center leading-tight">
              DORY<br/>FURNITURE
            </span>
          </Link>
        </div>

        {/* Center Section: Categories (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 px-4">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.path}
              className="text-white text-xs xl:text-sm font-medium tracking-wide uppercase hover:text-red-400 transition-colors duration-200"
            >
              {category.name}
            </Link>
          ))}
          <button className="text-white text-xs xl:text-sm font-medium tracking-wide uppercase hover:text-red-400 transition-colors duration-200 flex items-center gap-1">
            More <ChevronDown size={14} />
          </button>
        </nav>

        {/* Right Section: Utilities */}
        <div className="flex items-center space-x-4 md:space-x-5 text-white px-4 md:px-6">
          <button 
            onClick={onOpenSearch}
            className="p-1 hover:text-red-400 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to={isAuthenticated ? "/account" : "/account/login"} 
            className="p-1 hover:text-red-400 transition-colors hidden sm:block" 
            aria-label="Account"
          >
            {isAuthenticated ? (
              <div className="w-6 h-6 rounded-full bg-white text-[#E31E24] flex items-center justify-center text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            ) : (
              <User size={20} />
            )}
          </Link>
          
          <button 
            onClick={openCartDrawer}
            className="p-1 hover:text-red-400 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            <CartBadge />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={onOpenMobileMenu}
            className="p-1 hover:text-red-400 transition-colors lg:hidden ml-2"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
