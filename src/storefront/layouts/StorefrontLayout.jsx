import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiUser, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { useCommerce } from '../context/CommerceContext';
import CartDrawer from '../components/cart/CartDrawer';
import CartBadge from '../components/cart/CartBadge';
import WishlistBadge from '../components/wishlist/WishlistBadge';
import { useAuth } from '../../auth/context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import GlobalSearch from '../components/search/GlobalSearch';
import MobileMenu from '../components/layout/MobileMenu';

export default function StorefrontLayout() {
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-xs font-medium tracking-wide text-center py-2 px-4 relative z-50">
        Complimentary shipping on all orders over $5,000. <Link to="/shipping" className="underline ml-1 hover:text-gray-200">Learn more</Link>
      </div>

      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-black transition-colors"
            >
              <FiMenu size={24} />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-black transition-colors"
            >
              <FiSearch size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tight text-gray-900 hover:text-gray-600 transition-colors">
              AURA
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 text-sm font-medium tracking-wide text-gray-600">
            <Link to="/products" className="hover:text-black transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-black transition-colors">Categories</Link>
            <Link to="/collections" className="hover:text-black transition-colors">Collections</Link>
            <Link to="/collections/new" className="hover:text-black transition-colors">New Arrivals</Link>
            <Link to="/collections/bestsellers" className="hover:text-black transition-colors">Best Sellers</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5 text-gray-600">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:block p-2 hover:text-black transition-colors"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
            
            <Link to={isAuthenticated ? "/account" : "/account/login"} className="p-2 hover:text-black transition-colors hidden sm:block" aria-label="Account">
              {isAuthenticated ? (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              ) : (
                <FiUser size={20} />
              )}
            </Link>
            
            <Link to="/wishlist" className="p-2 hover:text-black transition-colors relative" aria-label="Wishlist">
              <FiHeart size={20} />
              <WishlistBadge />
            </Link>
            
            <button 
              onClick={openCartDrawer}
              className="p-2 hover:text-black transition-colors relative"
              aria-label="Cart"
            >
              <FiShoppingBag size={20} />
              <CartBadge />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            
            <div className="lg:col-span-2">
              <span className="text-3xl font-serif font-bold tracking-tight block mb-6">AURA</span>
              <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
                Premium furniture and homeware designed for the modern lifestyle. Experience unparalleled luxury and craftsmanship in every piece.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                  <FiInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                  <FiTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                  <FiFacebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                  <FiYoutube size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-gray-300">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link to="/collections/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/collections/bestsellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
                <li><Link to="/offers" className="hover:text-white transition-colors">Offers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-gray-300">Customer Service</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Information</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-gray-300">About & Useful</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
                <li><Link to="/account" className="hover:text-white transition-colors">My Account</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} AURA Premium Furniture. All rights reserved.
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input 
                type="email" 
                placeholder="Join our world (Newsletter)" 
                className="bg-transparent border border-gray-700 px-4 py-3 text-sm w-full focus:outline-none focus:border-white transition-colors text-white" 
              />
              <button className="bg-white text-black px-6 py-3 text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Commerce Modals & Drawers */}
      <CartDrawer />
      <AnimatePresence>
        {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </AnimatePresence>
    </div>
  );
}
