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
import { useCMS } from '../../admin/context/cms/CMSContext';

export default function StorefrontLayout() {
  const { activeTheme } = useStorefrontTheme();
  const { openCartDrawer } = useCommerce();
  const { pages, headerConfig } = useCMS();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col font-sans ${activeTheme.tokens.background} ${activeTheme.tokens.text.primary}`}>
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <CartDrawer />
    </div>
  );
}
