import React, { useState } from 'react';
import { FiZap, FiPlus, FiMoreVertical, FiActivity, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useMarketing } from '../../../../context/MarketingContext';

export default function AutomationDashboard() {
  const { automations } = useMarketing();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAutomations = automations.filter(auto => 
    auto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Marketing Automations</h1>
          <p className="text-sm text-text-muted mt-1">Automate customer journeys based on events and conditions.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/marketing/automations/analytics" className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors">
            Analytics
          </Link>
          <Link to="/admin/marketing/automations/new" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiPlus /> Create Automation
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
              <FiZap size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Active Automations</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">{automations.filter(a => a.status === 'Active').length}</p>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-success-soft flex items-center justify-center text-success">
              <FiUsers size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Customers Reached</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">{automations.reduce((acc, curr) => acc + curr.customersReached, 0).toLocaleString()}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <FiActivity size={20} />
            </div>
            <p className="text-sm font-medium text-text-muted">Total Executions</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">1,250</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50">
           <input 
              type="text" 
              placeholder="Search automations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-96 px-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Automation Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Trigger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Audience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {filteredAutomations.map((auto) => (
                <tr key={auto.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/marketing/automations/${auto.id}`} className="font-bold text-text-primary hover:text-primary block">{auto.name}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded font-mono border border-border">
                      {auto.trigger}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    {auto.audience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      auto.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {auto.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    {auto.lastRun ? new Date(auto.lastRun).toLocaleString() : 'Never'}
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
