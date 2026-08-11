import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import { useAuditStore } from '../../context/audit/AuditStore';

export default function AuditLogs() {
  const { events, updateFilters, filters } = useAuditStore();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    updateFilters({ search: e.target.value });
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Audit Logs</h1>
          <p className="text-sm text-text-muted mt-1">Comprehensive log of all system actions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border bg-surface rounded-lg hover:bg-background text-sm font-medium">
          <FiDownload /> Export Logs
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by actor, action, or resource..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background text-sm font-medium">
            <FiFilter /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-background border-b border-border text-text-secondary font-medium">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Actor</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Resource</th>
                <th className="px-6 py-3">Severity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {events.map(event => (
                <tr key={event.id} className="hover:bg-background">
                  <td className="px-6 py-4 text-text-muted text-xs">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{event.actor}</div>
                    <div className="text-xs text-text-muted">{event.actorRole}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-stone-100 px-2 py-1 rounded text-text-secondary">
                      {event.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text-primary">{event.resourceType}</div>
                    <div className="text-xs text-text-muted">{event.resourceName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.severity === 'Critical' ? 'bg-danger-soft text-red-700' :
                      event.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      event.severity === 'Medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-stone-100 text-text-secondary'
                    }`}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-danger-soft text-red-700'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/audit/logs/${event.id}`} className="text-text-secondary hover:text-text-primary text-sm font-medium">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-text-muted">
                    No audit logs found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
