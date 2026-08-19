import React from 'react';
import { useSupport } from '../../../context/SupportContext';

export default function AgentManager() {
  const { agents } = useSupport();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-success-soft text-green-800';
      case 'Busy': return 'bg-danger-soft text-red-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Support Agents</h1>
          <p className="text-sm text-text-muted mt-1">Manage staff, assignments, and workload.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">Open Tickets</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-xs uppercase">
                      {agent.name.substring(0, 2)}
                    </div>
                    {agent.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{agent.team}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-text-primary">
                  {agent.openTickets}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
