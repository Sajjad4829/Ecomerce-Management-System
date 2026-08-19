import React, { useEffect, useState } from 'react';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';
import { auditService } from '../../services/audit/AuditService';

export default function AuditAlerts() {
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    async function load() {
      const data = await auditService.getAlerts();
      setAlerts(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Audit Alerts</h1>
          <p className="text-sm text-text-muted mt-1">Automated notifications for specific audit events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
          <FiPlus /> New Alert Rule
        </button>
      </div>

      <div className="bg-warning-soft p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Note:</strong> Alert execution requires a backend monitoring engine. This interface defines the rules conceptually.
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Event Trigger</th>
              <th className="px-6 py-3">Condition</th>
              <th className="px-6 py-3">Severity</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {alerts.map(alert => (
              <tr key={alert.id} className="hover:bg-background">
                <td className="px-6 py-4 font-mono text-text-primary text-xs">
                  {alert.event}
                </td>
                <td className="px-6 py-4 text-text-secondary">{alert.condition}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'Critical' ? 'bg-danger-soft text-red-700' :
                    alert.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-stone-100 text-text-secondary'
                  }`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-text-muted'
                  }`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-secondary hover:text-text-primary font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
