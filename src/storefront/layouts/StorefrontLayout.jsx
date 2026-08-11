import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiUser, FiX } from 'react-icons/fi';
import { useCommerce } from '../context/CommerceContext';
import CartDrawer from '../components/cart/CartDrawer';
import CartBadge from '../components/cart/CartBadge';
import WishlistBadge from '../components/wishlist/WishlistBadge';
import { useAuth } from '../../auth/context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import GlobalSearch from '../components/search/GlobalSearch';

export default function StorefrontLayout() {
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#1A1A1A]">
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button className="p-2 -ml-2 text-gray-500 hover:text-black">
              <FiMenu size={24} />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-black"
            >
              <FiSearch size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tight">
              AURA
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 text-sm font-medium">
            <Link to="/products" className="hover:text-gray-500 transition-colors">Products</Link>
            <Link to="/collections" className="hover:text-gray-500 transition-colors">Collections</Link>
            <Link to="/about" className="hover:text-gray-500 transition-colors">About</Link>
            <Link to="/journal" className="hover:text-gray-500 transition-colors">Journal</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:block p-2 text-gray-500 hover:text-black transition-colors"
            >
              <FiSearch size={20} />
            </button>
            
            <Link to={isAuthenticated ? "/account" : "/account/login"} className="p-2 text-gray-500 hover:text-black transition-colors hidden sm:block">
              {isAuthenticated ? (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              ) : (
                <FiUser size={20} />
              )}
            </Link>
            
            <Link to="/wishlist" className="p-2 text-gray-500 hover:text-black transition-colors relative">
              <FiHeart size={20} />
              <WishlistBadge />
            </Link>
            
            <button 
              onClick={openCartDrawer}
              className="p-2 text-gray-500 hover:text-black transition-colors relative"
            >
              <FiShoppingBag size={20} />
              <CartBadge />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <span className="text-2xl font-serif font-bold tracking-tight block mb-4">AURA</span>
            <p className="text-sm text-gray-400 max-w-xs">Premium furniture and homeware designed for the modern lifestyle.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/collections/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/bestsellers" className="hover:text-white transition-colors">Bestsellers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:bg-white/20 transition-colors" />
              <button className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-gray-200 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Commerce Modals */}
      <CartDrawer />
      <AnimatePresence>
        {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
