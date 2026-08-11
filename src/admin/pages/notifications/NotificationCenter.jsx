import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FiCheck, FiArchive, FiAlertCircle, FiBox, FiShoppingCart, FiShield, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, archiveNotification, getUnreadCount } = useNotification();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Unread', 'System', 'Order', 'Inventory', 'Marketing', 'Security'];

  const filteredNotifications = notifications.filter(n => {
    if (n.status === 'Archived') return false;
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return n.status === 'Unread';
    return n.type === activeTab;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'System': return <FiAlertCircle />;
      case 'Order': return <FiShoppingCart />;
      case 'Inventory': return <FiBox />;
      case 'Security': return <FiShield />;
      default: return <FiMessageSquare />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Notification Center</h1>
          <p className="text-sm text-stone-500 mt-1">Manage system alerts and internal communications.</p>
        </div>
        <div className="flex gap-2">
          {getUnreadCount() > 0 && (
            <button onClick={markAllAsRead} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-medium transition-colors">
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-stone-200 px-2 pt-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
              }`}
            >
              {tab}
              {tab === 'Unread' && getUnreadCount() > 0 && (
                <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                  {getUnreadCount()}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="divide-y divide-stone-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-stone-500">
              No notifications found in this view.
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div key={notification.id} className={`p-4 flex gap-4 transition-colors ${notification.status === 'Unread' ? 'bg-stone-50' : 'bg-white hover:bg-stone-50'}`}>
                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.status === 'Unread' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/admin/notifications/${notification.id}`} className="block">
                      <h3 className={`text-sm font-medium ${notification.status === 'Unread' ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-stone-500 mt-1 line-clamp-2">{notification.message}</p>
                    </Link>
                    <span className="text-xs text-stone-400 whitespace-nowrap">
                      {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs font-medium text-stone-500">{notification.type}</span>
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                    <div className="flex-1"></div>
                    {notification.status === 'Unread' && (
                      <button onClick={() => markAsRead(notification.id)} className="p-1.5 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Mark as Read">
                        <FiCheck size={16} />
                      </button>
                    )}
                    <button onClick={() => archiveNotification(notification.id)} className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded" title="Archive">
                      <FiArchive size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
