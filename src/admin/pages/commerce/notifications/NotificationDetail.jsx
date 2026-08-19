import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiUser, FiCode, FiMail, FiSmartphone, FiRepeat } from 'react-icons/fi';
import { useNotification } from '../../../context/NotificationContext';

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNotification, templates } = useNotification();
  const notification = getNotification(id);

  if (!notification) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Notification not found</h2>
        <button onClick={() => navigate('/admin/notifications/logs')} className="text-primary hover:underline mt-2">Return to logs</button>
      </div>
    );
  }

  const template = templates.find(t => t.id === notification.templateId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-success-soft text-green-800 border-green-200';
      case 'Failed': return 'bg-danger-soft text-red-800 border-red-200';
      case 'Queued': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-border';
    }
  };

  const getChannelIcon = (channel) => {
    switch(channel) {
      case 'Email': return <FiMail className="text-text-muted" />;
      case 'SMS': return <FiSmartphone className="text-text-muted" />;
      default: return <FiClock className="text-text-muted" />;
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/notifications/logs" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
            <FiArrowLeft size={20} className="text-text-secondary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">Notification {notification.id}</h1>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getStatusColor(notification.status)}`}>
                {notification.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">Event: <span className="font-mono text-text-secondary">{notification.eventId}</span></p>
          </div>
        </div>
        
        {notification.status === 'Failed' && (
          <button className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2">
            <FiRepeat /> Retry Notification
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content (Payload & Message) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-border bg-background flex items-center gap-2">
              {getChannelIcon(notification.channel)}
              <h3 className="font-bold text-text-primary">{notification.channel} Preview</h3>
            </div>
            <div className="p-6 space-y-4 flex-1">
              <div>
                <p className="text-sm font-medium text-text-muted mb-1">Subject</p>
                <div className="p-3 bg-background rounded-lg border border-border text-text-primary font-medium">
                  {notification.subject}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted mb-1">Message Body</p>
                <div className="p-4 bg-background rounded-lg border border-border text-text-primary whitespace-pre-wrap min-h-[200px]">
                  {notification.message}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4 flex items-center gap-2"><FiUser /> Recipient</h2>
            <div>
              <p className="font-bold text-text-primary">{notification.recipientName}</p>
              <p className="text-sm text-text-secondary mt-1">ID: {notification.recipientId}</p>
              <Link to="/admin/customers" className="text-xs text-primary hover:underline mt-4 inline-block font-medium">View Customer Profile</Link>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4 flex items-center gap-2"><FiCode /> Template Info</h2>
            <div>
              <p className="font-bold text-text-primary">{template ? template.name : 'Unknown Template'}</p>
              <p className="text-sm text-text-secondary mt-1">ID: {notification.templateId}</p>
              <Link to="/admin/notifications/templates" className="text-xs text-primary hover:underline mt-4 inline-block font-medium">View Template</Link>
            </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4">Timeline</h2>
            <div className="space-y-4">
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                    <FiClock size={14} />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-text-primary">Created</p>
                   <p className="text-xs text-text-muted mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                 </div>
               </div>
               {notification.sentAt && (
                 <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-success-soft flex items-center justify-center text-success shrink-0">
                      <FiCheckCircle size={14} />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-text-primary">Sent</p>
                     <p className="text-xs text-text-muted mt-1">{new Date(notification.sentAt).toLocaleString()}</p>
                   </div>
                 </div>
               )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Inline dummy component
const FiCheckCircle = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
