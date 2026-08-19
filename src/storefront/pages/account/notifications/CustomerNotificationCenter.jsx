import React from 'react';
import { useNotification } from '../../../../admin/context/NotificationContext';
import { FiBell, FiPackage, FiMessageSquare, FiInfo, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CustomerNotificationCenter() {
  const { notifications, markAsRead, markAllAsRead } = useNotification();
  // Filter for 'cust_1' (mocked current user)
  const myNotifications = notifications.filter(n => n.recipientId === 'cust_1');
  const unreadCount = myNotifications.filter(n => !n.isRead).length;

  const getIcon = (eventId) => {
    if (eventId.startsWith('order_') || eventId.startsWith('shipment_')) return <FiPackage />;
    if (eventId.startsWith('support_')) return <FiMessageSquare />;
    return <FiInfo />;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated on your orders and account activity.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={() => markAllAsRead('cust_1')}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FiCheck /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {myNotifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FiBell className="mx-auto mb-3 opacity-50" size={32} />
            <p>You have no notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {myNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(notif => (
              <div 
                key={notif.id} 
                className={`p-6 flex gap-4 transition-colors ${notif.isRead ? 'bg-white' : 'bg-blue-50/50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.isRead ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-600'}`}>
                  {getIcon(notif.eventId)}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                     <h3 className={`font-medium ${notif.isRead ? 'text-gray-900' : 'text-blue-900 font-bold'}`}>
                       {notif.subject}
                     </h3>
                     <span className="text-xs text-gray-500 shrink-0 ml-4">
                       {new Date(notif.createdAt).toLocaleDateString()}
                     </span>
                   </div>
                   <p className={`text-sm mt-1 ${notif.isRead ? 'text-gray-600' : 'text-blue-800'}`}>
                     {notif.message}
                   </p>
                   
                   <div className="mt-3 flex items-center gap-4">
                     {notif.relatedEntity && (
                       <Link 
                         to={`/account/${notif.relatedEntity.type.toLowerCase()}s/${notif.relatedEntity.id}`}
                         className="text-xs font-medium text-blue-600 hover:underline"
                       >
                         View {notif.relatedEntity.type}
                       </Link>
                     )}
                     {!notif.isRead && (
                       <button 
                         onClick={() => markAsRead(notif.id)}
                         className="text-xs font-medium text-gray-500 hover:text-gray-900"
                       >
                         Mark as read
                       </button>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
