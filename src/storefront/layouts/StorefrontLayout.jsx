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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // The PageLoader will now stay visible as long as any of these are true.
  const isAppLoading = pagesLoading || configLoading || productsLoading || categoriesLoading;
  
  const [showLoader, setShowLoader] = useState(true);

  // Fallback to manually clear if needed, but PageLoader handles it now based on isAppLoading
  const handleLoaderDone = () => {
    setShowLoader(false);
  };

  const getDevice = () => {
    if (window.innerWidth < 768) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  };
  const [device, setDevice] = useState(getDevice());
  const isMobile = device === 'mobile';

  useEffect(() => {
    const handleResize = () => setDevice(getDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getProp = (key) => {
    const config = headerConfig || {};
    if (device === 'desktop') return config[key];
    if (device === 'tablet') return config[`${key}_tablet`] !== undefined ? config[`${key}_tablet`] : config[key];
    if (device === 'mobile') return config[`${key}_mobile`] !== undefined ? config[`${key}_mobile`] : (config[`${key}_tablet`] !== undefined ? config[`${key}_tablet`] : config[key]);
  };

  const isHomePage = location.pathname === '/';
  const isTransparentOnTop = !isMobile && ((getProp('navbarStyle') === 'transparent' && isHomePage) || getProp('transparentOnTop'));
  const navHeight = getProp('height') || 72;

  return (
    <>
      {showLoader && <PageLoader isLoading={isAppLoading} onDone={handleLoaderDone} />}
      <div className={`min-h-screen flex flex-col font-sans ${activeTheme.tokens.background} ${activeTheme.tokens.text.primary}`}>
        <Navbar />
        <main
          className="flex-1 flex flex-col w-full relative"
          style={{ paddingTop: isTransparentOnTop ? 0 : `${navHeight}px` }}
        >
          {getProp('enableSearch') !== false && (
            <div 
              className={`md:hidden w-full px-3 pb-3 shrink-0 z-20 ${isTransparentOnTop ? 'absolute bg-transparent inset-x-0' : 'relative bg-white'}`}
              style={{ paddingTop: isTransparentOnTop ? `${navHeight + 8}px` : '8px' }}
            >
              <GlobalSearch />
            </div>
          )}
          <div className={isTransparentOnTop ? 'w-full flex-1 relative z-0' : 'w-full flex-1'}>
            <Outlet />
          </div>
        </main>
        <CartDrawer />
      </div>
    </>
  );
}

