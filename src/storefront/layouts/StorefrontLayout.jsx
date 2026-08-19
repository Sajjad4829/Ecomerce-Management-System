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

export default function StorefrontLayout() {
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">


      <Navbar 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className={`flex-1 flex flex-col w-full ${location.pathname !== '/' ? 'pt-[72px] md:pt-[84px]' : ''}`}>
        <Outlet />
      </main>

      {/* Floating Phone Callout */}
      <a href="tel:09678777777" className="fixed bottom-8 left-8 z-50 flex items-center justify-center space-x-3 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors rounded-full pl-2 pr-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)] group border border-white/10 text-white hover:-translate-y-1 transform duration-300">
        <div className="w-8 h-8 rounded-full bg-[#E31E24] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <span className="text-white text-sm font-bold tracking-wider drop-shadow-md">09 678 7777 77</span>
      </a>

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
