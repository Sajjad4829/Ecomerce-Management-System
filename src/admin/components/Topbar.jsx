import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../../admin/context/NotificationContext';
import { useGlobalSearch } from '../context/search/GlobalSearchContext';

export default function Topbar({ toggleSidebar }) {
  const { getUnreadCount } = useNotification();
  const { openOverlay } = useGlobalSearch();
  const unreadCount = getUnreadCount();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-20 bg-white/50 backdrop-blur-md border-b border-black/5 px-6 flex items-center justify-between shrink-0 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-black/5 transition-colors lg:hidden"
        >
          <FiMenu className="text-xl text-[#1A1A1A]" />
        </button>
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Global Search */}
        <div className="relative hidden md:block">
          <button 
            onClick={openOverlay}
            className="w-64 pl-10 pr-4 py-2 bg-white border border-black/10 rounded-full text-sm text-gray-400 text-left hover:border-black/30 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black/60 transition-colors" />
              <span>Search everything...</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 font-mono text-[10px] bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 text-stone-500">
              <span>⌘</span><span>K</span>
            </div>
          </button>
        </div>
        
        {/* Search Icon Mobile */}
        <button onClick={openOverlay} className="p-2 rounded-full hover:bg-black/5 transition-colors md:hidden">
          <FiSearch className="text-xl" />
        </button>

        {/* Notifications */}
        <Link to="/admin/notifications" className="p-2 rounded-full hover:bg-black/5 transition-colors relative">
          <FiBell className="text-xl" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full border border-white text-[10px] flex items-center justify-center font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-black/10 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-[#ECEAE6] border border-black/10 flex items-center justify-center overflow-hidden">
             <FiUser className="text-gray-500" />
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] group-hover:text-black/70 transition-colors">{user?.name || 'Admin'}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role || 'Superuser'}</div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-500 hover:text-black"
          title="Logout"
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </header>
  );
}
