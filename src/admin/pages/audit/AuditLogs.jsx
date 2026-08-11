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
          <h1 className="text-2xl font-serif font-bold text-stone-900">Audit Logs</h1>
          <p className="text-sm text-stone-500 mt-1">Comprehensive log of all system actions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-sm font-medium">
          <FiDownload /> Export Logs
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm">
        <div className="p-4 border-b border-stone-200 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by actor, action, or resource..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 text-sm font-medium">
            <FiFilter /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
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
                <tr key={event.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4 text-stone-500 text-xs">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-900">{event.actor}</div>
                    <div className="text-xs text-stone-500">{event.actorRole}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-stone-100 px-2 py-1 rounded text-stone-700">
                      {event.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-stone-900">{event.resourceType}</div>
                    <div className="text-xs text-stone-500">{event.resourceName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      event.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      event.severity === 'Medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-stone-100 text-stone-700'
                    }`}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/audit/logs/${event.id}`} className="text-stone-600 hover:text-stone-900 text-sm font-medium">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-stone-500">
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
