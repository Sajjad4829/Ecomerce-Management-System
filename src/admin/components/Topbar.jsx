import React, { useState } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../../admin/context/NotificationContext';
import { useGlobalSearch } from '../context/search/GlobalSearchContext';

export default function Topbar({ toggleSidebar }) {
  const { notifications, getUnreadCount, markAllAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const { openOverlay } = useGlobalSearch();
  const unreadCount = getUnreadCount();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-20 bg-surface/50 backdrop-blur-md border-b border-border px-6 flex items-center justify-between shrink-0 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-background transition-colors lg:hidden"
        >
          <FiMenu className="text-xl text-text-primary" />
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
            className="w-64 pl-10 pr-4 py-2 bg-surface border border-border rounded-full text-sm text-text-muted text-left hover:border-border-hover transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-black/60 transition-colors" />
              <span>Search everything...</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 font-mono text-[10px] bg-background px-1.5 py-0.5 rounded border border-border text-text-muted">
              <span>⌘</span><span>K</span>
            </div>
          </button>
        </div>
        
        {/* Search Icon Mobile */}
        <button onClick={openOverlay} className="p-2 rounded-full hover:bg-background transition-colors md:hidden">
          <FiSearch className="text-xl" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="p-2 rounded-full hover:bg-background transition-colors relative"
          >
            <FiBell className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white rounded-full border border-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => { markAllAsRead(); setShowNotifications(false); }}
                    className="text-xs text-text-muted hover:text-emerald-600 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto divide-y divide-border">
                {notifications.slice(0, 5).map(n => (
                  <Link 
                    key={n.id} 
                    to={`/admin/notifications/${n.id}`} 
                    onClick={() => setShowNotifications(false)}
                    className={`block p-4 hover:bg-stone-50 transition-colors ${n.status === 'Unread' ? 'bg-background' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${n.priority === 'Critical' ? 'bg-danger-soft text-danger' : n.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-text-muted'}`}>
                        {n.priority}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${n.status === 'Unread' ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>{n.title}</p>
                    <p className="text-xs text-text-muted mt-1 line-clamp-1">{n.message}</p>
                  </Link>
                ))}
                {notifications.length === 0 && (
                  <div className="p-8 text-center text-sm text-text-muted">No recent notifications</div>
                )}
              </div>
              <div className="p-3 border-t border-border bg-stone-50 text-center">
                <Link 
                  to="/admin/notifications" 
                  onClick={() => setShowNotifications(false)}
                  className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center overflow-hidden">
             <span className="text-sm">{user?.name ? user.name.charAt(0) : 'A'}</span>
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-semibold uppercase tracking-widest text-text-primary group-hover:text-primary transition-colors">{user?.name || 'Admin'}</div>
            <div className="text-[10px] text-text-muted uppercase tracking-widest">{user?.role || 'Superuser'}</div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-background transition-colors text-text-muted hover:text-danger"
          title="Logout"
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </header>
  );
}
