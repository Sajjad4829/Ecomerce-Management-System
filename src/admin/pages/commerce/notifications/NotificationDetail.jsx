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
        <h2 className="text-xl font-bold text-gray-900">Notification not found</h2>
        <button onClick={() => navigate('/admin/notifications/logs')} className="text-blue-600 hover:underline mt-2">Return to logs</button>
      </div>
    );
  }

  const template = templates.find(t => t.id === notification.templateId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Queued': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChannelIcon = (channel) => {
    switch(channel) {
      case 'Email': return <FiMail className="text-gray-400" />;
      case 'SMS': return <FiSmartphone className="text-gray-400" />;
      default: return <FiClock className="text-gray-400" />;
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/notifications/logs" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Notification {notification.id}</h1>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getStatusColor(notification.status)}`}>
                {notification.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Event: <span className="font-mono text-gray-700">{notification.eventId}</span></p>
          </div>
        </div>
        
        {notification.status === 'Failed' && (
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FiRepeat /> Retry Notification
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content (Payload & Message) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              {getChannelIcon(notification.channel)}
              <h3 className="font-bold text-gray-900">{notification.channel} Preview</h3>
            </div>
            <div className="p-6 space-y-4 flex-1">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Subject</p>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 font-medium">
                  {notification.subject}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Message Body</p>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 whitespace-pre-wrap min-h-[200px]">
                  {notification.message}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2"><FiUser /> Recipient</h2>
            <div>
              <p className="font-bold text-gray-900">{notification.recipientName}</p>
              <p className="text-sm text-gray-600 mt-1">ID: {notification.recipientId}</p>
              <Link to="/admin/customers" className="text-xs text-blue-600 hover:underline mt-4 inline-block font-medium">View Customer Profile</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2"><FiCode /> Template Info</h2>
            <div>
              <p className="font-bold text-gray-900">{template ? template.name : 'Unknown Template'}</p>
              <p className="text-sm text-gray-600 mt-1">ID: {notification.templateId}</p>
              <Link to="/admin/notifications/templates" className="text-xs text-blue-600 hover:underline mt-4 inline-block font-medium">View Template</Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Timeline</h2>
            <div className="space-y-4">
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <FiClock size={14} />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-gray-900">Created</p>
                   <p className="text-xs text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                 </div>
               </div>
               {notification.sentAt && (
                 <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                      <FiCheckCircle size={14} />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">Sent</p>
                     <p className="text-xs text-gray-500 mt-1">{new Date(notification.sentAt).toLocaleString()}</p>
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
