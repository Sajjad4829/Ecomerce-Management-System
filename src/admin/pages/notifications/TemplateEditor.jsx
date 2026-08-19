import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { FiArrowLeft, FiSave, FiAlertCircle } from 'react-icons/fi';

export default function TemplateEditor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { templates } = useNotification();
  
  const isNew = templateId === 'new';
  const existingTemplate = templates.find(t => t.id === templateId);

  const [formData, setFormData] = useState({
    name: '',
    event: '',
    channel: 'Email',
    audience: 'Customer',
    subject: '',
    message: '',
    status: 'Active'
  });

  useEffect(() => {
    if (existingTemplate) {
      setFormData({
        name: existingTemplate.name,
        event: existingTemplate.event,
        channel: existingTemplate.channel,
        audience: existingTemplate.audience,
        subject: existingTemplate.subject || '',
        message: existingTemplate.message || '',
        status: existingTemplate.status
      });
    }
  }, [existingTemplate]);

  const extractVariables = (text) => {
    const matches = text.match(/{{([^}]+)}}/g);
    return matches ? matches.map(m => m.replace(/[{}]/g, '')) : [];
  };

  const handleSave = () => {
    // Mock save
    navigate('/admin/notifications/templates');
  };

  const variables = Array.from(new Set([
    ...extractVariables(formData.subject),
    ...extractVariables(formData.message)
  ]));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <Link to="/admin/notifications/templates" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <FiArrowLeft /> Back to Templates
        </Link>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
          <FiSave /> Save Template
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">
          {isNew ? 'Create New Template' : 'Edit Template'}
        </h1>
        <p className="text-sm text-text-muted mt-1">Design the layout and dynamic variables for notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Template Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none" 
                placeholder="e.g. Order Confirmation"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Event / Trigger</label>
                <input 
                  type="text" 
                  value={formData.event}
                  onChange={e => setFormData({ ...formData, event: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none font-mono" 
                  placeholder="e.g. order_confirmed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Channel</label>
                <select 
                  value={formData.channel}
                  onChange={e => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
                >
                  <option>Email</option>
                  <option>SMS</option>
                  <option>In-App</option>
                  <option>Push</option>
                </select>
              </div>
            </div>

            {formData.channel === 'Email' && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Subject Line</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none" 
                  placeholder="Subject line with {{variables}}"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Message Content</label>
              <textarea 
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={10}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none resize-none font-mono" 
                placeholder="Message body using {{variables}}..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-background rounded-xl border border-border shadow-sm p-6">
            <h3 className="font-serif font-bold text-text-primary mb-4">Detected Variables</h3>
            {variables.length > 0 ? (
              <ul className="space-y-2">
                {variables.map((v, i) => (
                  <li key={i} className="text-sm font-mono text-text-secondary bg-surface px-3 py-1.5 rounded border border-border">
                    {`{{${v}}}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-text-muted">No variables detected. Use <code className="bg-stone-200 px-1 rounded">{{variable}}</code> syntax.</p>
            )}
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-start gap-2 text-text-muted text-xs">
                <FiAlertCircle className="shrink-0 mt-0.5" />
                <p>Ensure backend providers are configured to inject these exact variable names during generation.</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
             <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Audience</label>
                <select 
                  value={formData.audience}
                  onChange={e => setFormData({ ...formData, audience: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
                >
                  <option>Customer</option>
                  <option>Staff</option>
                  <option>System Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
                >
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
