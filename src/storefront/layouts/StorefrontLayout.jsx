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
import PageLoader from '../components/layout/PageLoader';

export default function StorefrontLayout() {
  const { activeTheme } = useStorefrontTheme();
  const { openCartDrawer } = useCommerce();
  const { pages, headerConfig } = useCMS();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show loader on every hard reload (always starts true).
  // The PageLoader calls onDone() after its animation completes,
  // which sets this to false and reveals the page.
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderDone = () => {
    setShowLoader(false);
  };

  const isHomePage = location.pathname === '/';
  const isTransparentOnTop = (headerConfig?.navbarStyle === 'transparent' && isHomePage) || headerConfig?.transparentOnTop;
  const navHeight = headerConfig?.height || 72;

  return (
    <>
      {showLoader && <PageLoader onDone={handleLoaderDone} />}
      <div className={`min-h-screen flex flex-col font-sans ${activeTheme.tokens.background} ${activeTheme.tokens.text.primary}`}>
        <Navbar />
        <main
          className="flex-1 flex flex-col w-full"
          style={{ paddingTop: isTransparentOnTop ? 0 : `${navHeight}px` }}
        >
          <Outlet />
        </main>
        <CartDrawer />
      </div>
    </>
  );
}

