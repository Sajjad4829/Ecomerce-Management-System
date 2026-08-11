import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiActivity, FiUsers, FiClock, FiPlay } from 'react-icons/fi';
import { useMarketing } from '../../../../context/MarketingContext';

export default function AutomationDetail() {
  const { id } = useParams();
  const { getAutomation, getAutomationLogs } = useMarketing();
  
  const automation = getAutomation(id) || getAutomation('auto_1');
  const logs = getAutomationLogs(automation?.id || 'auto_1');

  if (!automation) return <div>Automation not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/marketing/automations" className="text-text-muted hover:text-text-primary">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{automation.name}</h1>
              <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wide rounded ${
                automation.status === 'Active' ? 'bg-success-soft text-success' : 'bg-gray-100 text-text-secondary'
              }`}>
                {automation.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">Trigger: <span className="font-mono">{automation.trigger}</span></p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to={`/admin/marketing/automations/${automation.id}/edit`} className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2">
            <FiEdit2 /> Edit Flow
          </Link>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Pause Automation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
               <FiUsers size={20} />
             </div>
             <p className="text-sm font-medium text-text-muted">Customers Reached</p>
           </div>
           <p className="text-2xl font-bold text-text-primary">{automation.customersReached.toLocaleString()}</p>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-success-soft flex items-center justify-center text-success">
               <FiActivity size={20} />
             </div>
             <p className="text-sm font-medium text-text-muted">Total Executions</p>
           </div>
           <p className="text-2xl font-bold text-text-primary">1,250</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
               <FiClock size={20} />
             </div>
             <p className="text-sm font-medium text-text-muted">Last Run</p>
           </div>
           <p className="text-lg font-bold text-text-primary">{automation.lastRun ? new Date(automation.lastRun).toLocaleString() : 'Never'}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
           <h2 className="font-bold text-text-primary">Execution Logs</h2>
           <Link to={`/admin/marketing/automations/${automation.id}/logs`} className="text-sm text-primary font-medium hover:underline">View All Logs</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Started</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                    <Link to={`/admin/customers/${log.customerId}`} className="hover:text-primary">{log.customerName}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    {new Date(log.startedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.status === 'Completed' ? 'bg-success-soft text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    {log.result}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-text-muted">
                    No executions yet.
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
