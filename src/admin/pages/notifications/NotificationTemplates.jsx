import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FiPlus, FiEdit2, FiCopy, FiArchive } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NotificationTemplates() {
  const { templates } = useNotification();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Notification Templates</h1>
          <p className="text-sm text-text-muted mt-1">Manage templates for automated and manual communications.</p>
        </div>
        <Link to="/admin/notifications/templates/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
          <FiPlus /> New Template
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Template Name</th>
              <th className="px-6 py-3">Event / Trigger</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Audience</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {templates.map(template => (
              <tr key={template.id} className="hover:bg-background">
                <td className="px-6 py-4">
                  <div className="font-medium text-text-primary">{template.name}</div>
                  <div className="text-xs text-text-muted font-mono mt-0.5">{template.id}</div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-text-secondary">{template.event}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-stone-100 text-text-secondary rounded text-xs font-medium border border-border">
                    {template.channel}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary">{template.audience}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-text-muted'
                  }`}>
                    {template.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-text-muted hover:text-text-primary" title="Duplicate">
                      <FiCopy />
                    </button>
                    <button className="p-1.5 text-text-muted hover:text-danger" title="Archive">
                      <FiArchive />
                    </button>
                    <Link to={`/admin/notifications/templates/${template.id}`} className="p-1.5 text-text-muted hover:text-text-primary" title="Edit">
                      <FiEdit2 />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {templates.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-text-muted">
                  No templates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
