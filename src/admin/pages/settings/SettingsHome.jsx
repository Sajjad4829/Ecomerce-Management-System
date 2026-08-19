import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiShoppingCart, FiTruck, FiUsers, FiLayout, FiCommand } from 'react-icons/fi';

const quickLinks = [
  { label: 'Store Details', desc: 'Update name, email, and status', path: '/admin/settings/store', icon: FiSettings },
  { label: 'Shipping', desc: 'Manage rates and zones', path: '/admin/settings/shipping', icon: FiTruck },
  { label: 'Checkout', desc: 'Configure order processing', path: '/admin/settings/checkout', icon: FiShoppingCart },
  { label: 'Business Rules', desc: 'Automate store actions', path: '/admin/settings/business-rules', icon: FiCommand },
  { label: 'Staff & Roles', desc: 'Manage admin access', path: '/admin/settings/staff', icon: FiUsers },
  { label: 'Branding', desc: 'Logos and visual identity', path: '/admin/settings/branding', icon: FiLayout },
];

export function SettingsHome() {
  const navigate = useNavigate();
  
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Settings Overview</h2>
        <p className="text-text-muted">Configure your store, manage operations, and set up automations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link, idx) => (
          <button 
            key={idx} 
            onClick={() => navigate(link.path)}
            className="flex items-start gap-4 p-5 bg-surface border border-border rounded-xl hover:border-stone-400 hover:shadow-sm transition-all text-left"
          >
            <div className="p-3 bg-background rounded-lg text-text-muted">
              <link.icon size={20} />
            </div>
            <div>
              <div className="font-bold text-text-primary mb-1">{link.label}</div>
              <div className="text-sm text-text-muted">{link.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
