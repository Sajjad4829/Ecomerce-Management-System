import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

export default function CommunicationCampaigns() {
  const { campaigns } = useNotification();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Communication Campaigns</h1>
          <p className="text-sm text-text-muted mt-1">Manage bulk messaging for marketing and announcements.</p>
        </div>
        <Link to="/admin/communications/campaigns/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
          <FiPlus /> New Campaign
        </Link>
      </div>

      <div className="bg-warning-soft p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Architecture Note:</strong> Communication Campaigns reference Audience Segments from the Marketing module but handle the actual message assembly and delivery pipeline.
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Campaign Name</th>
              <th className="px-6 py-3">Audience</th>
              <th className="px-6 py-3">Channel / Template</th>
              <th className="px-6 py-3">Schedule</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {campaigns.map(camp => (
              <tr key={camp.id} className="hover:bg-background">
                <td className="px-6 py-4 font-medium text-text-primary">{camp.name}</td>
                <td className="px-6 py-4 text-text-secondary">{camp.audience}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-stone-100 text-text-secondary rounded text-xs font-medium border border-border">
                      {camp.channel}
                    </span>
                    <span className="text-text-muted">{camp.template}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-muted font-mono text-xs">{new Date(camp.schedule).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    camp.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    camp.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-text-muted'
                  }`}>
                    {camp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/communications/campaigns/${camp.id}`} className="text-text-secondary hover:text-text-primary font-medium text-sm">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-text-muted">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
