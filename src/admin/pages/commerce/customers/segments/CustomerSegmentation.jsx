import React, { useState } from 'react';
import { FiUsers, FiFilter, FiActivity, FiSearch, FiPlus, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCustomers } from '../../../../context/customers/CustomerContext';

export default function CustomerSegmentation() {
  const { segments } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');

  const activeSegments = segments.filter(s => s.status === 'Active').length;
  const dynamicSegments = segments.filter(s => s.type === 'Dynamic').length;
  const staticSegments = segments.filter(s => s.type === 'Static').length;
  const totalCustomers = segments.reduce((acc, s) => acc + s.customerCount, 0);

  const filteredSegments = segments.filter(seg => 
    seg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Customer Segments</h1>
          <p className="text-sm text-text-muted mt-1">Group and organize your customers for targeted marketing.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/customers/segments/analytics" className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors">
            Analytics
          </Link>
          <Link to="/admin/customers/segments/new" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiPlus /> Create Segment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
              <FiUsers size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Total Segments</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">{segments.length}</p>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-success-soft flex items-center justify-center text-success">
              <FiActivity size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Active Segments</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">{activeSegments}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <FiFilter size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Dynamic vs Static</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">{dynamicSegments} / {staticSegments}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
              <FiUsers size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Total Audiences</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">{totalCustomers.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search segments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Segment Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {filteredSegments.map((seg) => (
                <tr key={seg.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/customers/segments/${seg.id}`} className="font-bold text-text-primary hover:text-primary block">{seg.name}</Link>
                    <p className="text-xs text-text-muted">{seg.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      seg.type === 'Dynamic' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {seg.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                    {seg.customerCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      seg.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {seg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-muted">
                    {new Date(seg.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-text-muted hover:text-text-primary"><FiMoreVertical size={16} /></button>
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
