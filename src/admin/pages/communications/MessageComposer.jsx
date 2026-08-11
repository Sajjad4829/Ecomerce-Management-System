import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiClock } from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export default function MessageComposer() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { templates } = useNotification();
  
  const [formData, setFormData] = useState({
    channel: 'Email',
    templateId: '',
    subject: '',
    message: ''
  });

  const handleTemplateChange = (e) => {
    const tpl = templates.find(t => t.id === e.target.value);
    if (tpl) {
      setFormData({
        ...formData,
        templateId: tpl.id,
        subject: tpl.subject || '',
        message: tpl.message || '',
        channel: tpl.channel
      });
    } else {
      setFormData({ ...formData, templateId: '' });
    }
  };

  const handleSend = () => {
    // Mock send
    navigate('/admin/communications/logs');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <Link to="/admin/communications/customers" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <FiArrowLeft /> Back to Customers
        </Link>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-surface text-text-secondary rounded-lg hover:bg-background font-medium">
            <FiClock /> Schedule
          </button>
          <button onClick={handleSend} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
            <FiSend /> Send Message
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Compose Message</h1>
        <p className="text-sm text-text-muted mt-1">Send a direct message to Customer <span className="font-mono">{customerId}</span>.</p>
      </div>

      <div className="bg-warning-soft p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Note:</strong> Messages composed here are mocked. Real delivery requires backend provider integration.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Use Template</label>
                <select 
                  value={formData.templateId}
                  onChange={handleTemplateChange}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none"
                >
                  <option value="">Start from scratch</option>
                  {templates.filter(t => t.audience === 'Customer').map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
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
                </select>
              </div>
            </div>

            {formData.channel === 'Email' && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none" 
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
              <textarea 
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none resize-none font-mono" 
              />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border border-border shadow-sm p-6 flex flex-col">
          <h3 className="font-serif font-bold text-text-primary mb-4">Preview</h3>
          <div className="flex-1 border border-border bg-surface rounded-lg p-4 text-sm font-serif overflow-y-auto whitespace-pre-wrap">
            {formData.channel === 'Email' && (
              <div className="border-b border-stone-100 pb-2 mb-2 font-medium">
                {formData.subject || 'No Subject'}
              </div>
            )}
            {formData.message || <span className="text-text-muted">Message content will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
