import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiUser, FiPackage, FiMapPin, FiHeart, FiStar, FiSettings, FiShield, FiLogOut, FiMessageSquare, FiBell } from 'react-icons/fi';
import { useAuth } from '../../auth/context/AuthContext';

const NAV_ITEMS = [
  { label: 'Overview', path: '/account', icon: FiUser, exact: true },
  { label: 'Orders', path: '/account/orders', icon: FiPackage },
  { label: 'Addresses', path: '/account/addresses', icon: FiMapPin },
  { label: 'Wishlist', path: '/account/wishlist', icon: FiHeart },
  { label: 'Loyalty & Rewards', path: '/account/loyalty', icon: FiStar },
  { label: 'Reviews', path: '/account/reviews', icon: FiStar },
  { label: 'Support', path: '/account/support', icon: FiMessageSquare },
  { label: 'Notifications', path: '/account/notifications', icon: FiBell },
  { label: 'Settings', path: '/account/settings', icon: FiSettings },
  { label: 'Security', path: '/account/security', icon: FiShield },
];

export default function AccountLayout() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col font-sans">
      <header className="px-8 py-6 bg-white border-b border-black/5 flex justify-between items-center sticky top-0 z-10">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A]">
          AURA
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500 hidden sm:inline-block">Welcome, {user?.name}</span>
          <button onClick={logout} className="font-medium text-[#1A1A1A] hover:underline underline-offset-4 flex items-center gap-2">
            Sign Out <FiLogOut size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-6 px-4">My Account</h2>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact ? pathname === item.path : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'text-gray-600 hover:bg-white hover:text-[#1A1A1A]'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
