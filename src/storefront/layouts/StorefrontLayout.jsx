import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiUser, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { useCommerce } from '../context/CommerceContext';
import CartDrawer from '../components/cart/CartDrawer';
import CartBadge from '../components/cart/CartBadge';
import WishlistBadge from '../components/wishlist/WishlistBadge';
import { useAuth } from '../../auth/context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import GlobalSearch from '../components/search/GlobalSearch';
import MobileMenu from '../components/layout/MobileMenu';
import Navbar from '../components/navigation/Navbar';
import { useStorefrontTheme } from '../context/StorefrontThemeContext';

export default function StorefrontLayout() {
  const { activeTheme } = useStorefrontTheme();
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col font-sans ${activeTheme.tokens.background} ${activeTheme.tokens.text.primary}`}>


      <Navbar 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className={`flex-1 flex flex-col w-full ${location.pathname !== '/' ? 'pt-[72px] md:pt-[84px]' : ''}`}>
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
                <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
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
