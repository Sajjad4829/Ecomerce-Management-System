import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';

export default function NotificationLogs() {
  const { notifications } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLogs = notifications.filter(notif => {
    const matchesSearch = 
      notif.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notif.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || notif.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-success-soft text-green-800';
      case 'Failed': return 'bg-danger-soft text-red-800';
      case 'Queued': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notification Logs</h1>
          <p className="text-sm text-text-muted mt-1">Audit trail for all outbound communications.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search subject, recipient..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <FiFilter className="text-text-muted" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface"
              >
                <option value="All">All Statuses</option>
                <option value="Sent">Sent</option>
                <option value="Queued">Queued</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">ID / Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {filteredLogs.map((notif) => (
                <tr key={notif.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-text-primary">{notif.id}</p>
                    <p className="text-xs text-text-muted">{notif.eventId}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-text-primary">{notif.recipientName}</p>
                    <p className="text-xs text-text-muted">{notif.recipientId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-text-primary line-clamp-1">{notif.subject}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    {notif.channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(notif.status)}`}>
                      {notif.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-muted">
                    {new Date(notif.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/notifications/${notif.id}`} className="text-primary hover:text-blue-900">
                      <FiEye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
