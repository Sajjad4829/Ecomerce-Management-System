import React from 'react';
import { FiBell, FiMail, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';

export default function NotificationDashboard() {
  const { notifications, events } = useNotification();

  const sentCount = notifications.filter(n => n.status === 'Sent').length;
  const failedCount = notifications.filter(n => n.status === 'Failed').length;
  const queuedCount = notifications.filter(n => n.status === 'Queued').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notification Center</h1>
          <p className="text-sm text-text-muted mt-1">Manage events, templates, and outbound communications.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/notifications/logs" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            View Logs
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
            <FiBell size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Total Sent</p>
            <p className="text-2xl font-bold text-text-primary">{sentCount}</p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiMail size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Queued</p>
            <p className="text-2xl font-bold text-text-primary">{queuedCount}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-danger-soft flex items-center justify-center text-danger">
            <FiAlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Failed</p>
            <p className="text-2xl font-bold text-text-primary">{failedCount}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success-soft flex items-center justify-center text-success">
            <FiMessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Active Events</p>
            <p className="text-2xl font-bold text-text-primary">{events.filter(e => e.status === 'Enabled').length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
             <h2 className="text-lg font-bold text-text-primary">Recent Logs</h2>
             <Link to="/admin/notifications/logs" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {notifications.slice(0, 5).map(notif => (
               <div key={notif.id} className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-background">
                 <div>
                   <Link to={`/admin/notifications/${notif.id}`} className="font-medium text-text-primary hover:text-primary block">
                     {notif.subject}
                   </Link>
                   <p className="text-sm text-text-muted mt-1">To: {notif.recipientName} • Channel: {notif.channel}</p>
                 </div>
                 <div className="sm:text-right shrink-0">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      notif.status === 'Sent' ? 'bg-success-soft text-green-800' :
                      notif.status === 'Failed' ? 'bg-danger-soft text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {notif.status}
                    </span>
                    <p className="text-xs text-text-muted mt-1">{new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Configuration Workspaces</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link to="/admin/notifications/events" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <h3 className="font-medium text-text-primary group-hover:text-blue-700">Events</h3>
                 <p className="text-sm text-text-muted mt-1">Manage event triggers and channels.</p>
               </Link>
               <Link to="/admin/notifications/templates" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <h3 className="font-medium text-text-primary group-hover:text-blue-700">Templates</h3>
                 <p className="text-sm text-text-muted mt-1">Design email, SMS, and in-app content.</p>
               </Link>
               <Link to="/admin/settings/notifications" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group sm:col-span-2">
                 <h3 className="font-medium text-text-primary group-hover:text-blue-700">Settings & Providers</h3>
                 <p className="text-sm text-text-muted mt-1">Configure global preferences.</p>
               </Link>
             </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Volume by Channel</h2>
             <div className="h-40 bg-background rounded-lg flex items-center justify-center border border-dashed border-border">
                <p className="text-sm text-text-muted">Chart Placeholder: Email vs SMS vs In-App</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
