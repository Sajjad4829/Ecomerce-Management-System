import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { FiArrowLeft, FiArchive, FiCheckCircle } from 'react-icons/fi';

export default function NotificationDetail() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const { getNotification, markAsRead, archiveNotification } = useNotification();
  
  const notification = getNotification(notificationId);

  if (!notification) {
    return <div className="p-12 text-center text-stone-500">Notification not found.</div>;
  }

  const handleArchive = () => {
    archiveNotification(notification.id);
    navigate('/admin/notifications');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <Link to="/admin/notifications" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
          <FiArrowLeft /> Back to Notifications
        </Link>
        <div className="flex gap-2">
          {notification.status === 'Unread' && (
            <button onClick={() => markAsRead(notification.id)} className="flex items-center gap-2 px-3 py-1.5 border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 rounded-lg text-sm font-medium">
              <FiCheckCircle size={16} /> Mark as Read
            </button>
          )}
          <button onClick={handleArchive} className="flex items-center gap-2 px-3 py-1.5 border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 rounded-lg text-sm font-medium">
            <FiArchive size={16} /> Archive
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium border border-stone-200">
              {notification.type}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              notification.priority === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
              notification.priority === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' :
              notification.priority === 'Normal' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              'bg-stone-100 text-stone-700 border-stone-200'
            }`}>
              {notification.priority}
            </span>
            {notification.status === 'Unread' && (
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                New
              </span>
            )}
          </div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">{notification.title}</h1>
          <p className="text-sm text-stone-500">
            {new Date(notification.createdAt).toLocaleString()} • Source: {notification.source}
          </p>
        </div>
        <div className="p-6 prose prose-stone max-w-none">
          <p className="text-stone-700 whitespace-pre-wrap leading-relaxed">
            {notification.message}
          </p>
        </div>
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-sm text-stone-500">
          <div>Actor: <span className="font-medium text-stone-700">{notification.actor}</span></div>
          <div>ID: <span className="font-mono text-xs">{notification.id}</span></div>
        </div>
      </div>
    </div>
  );
}
