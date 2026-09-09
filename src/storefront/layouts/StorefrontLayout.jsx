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
import { useProducts } from '../../admin/context/commerce/ProductContext';
import { useCategories } from '../../admin/context/commerce/CategoryContext';
import PageLoader from '../components/layout/PageLoader';

export default function StorefrontLayout() {
  const { activeTheme } = useStorefrontTheme();
  const { openCartDrawer } = useCommerce();
  const { pages, headerConfig, pagesLoading, configLoading } = useCMS();
  const { loading: productsLoading } = useProducts();
  const { loading: categoriesLoading } = useCategories();
  
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // The PageLoader will now stay visible as long as any of these are true.
  const isAppLoading = pagesLoading || configLoading || productsLoading || categoriesLoading;
  
  const [showLoader, setShowLoader] = useState(true);

  // Fallback to manually clear if needed, but PageLoader handles it now based on isAppLoading
  const handleLoaderDone = () => {
    setShowLoader(false);
  };

  const isHomePage = location.pathname === '/';
  const isTransparentOnTop = (headerConfig?.navbarStyle === 'transparent' && isHomePage) || headerConfig?.transparentOnTop;
  const navHeight = headerConfig?.height || 72;

  return (
    <>
      {showLoader && <PageLoader isLoading={isAppLoading} onDone={handleLoaderDone} />}
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

