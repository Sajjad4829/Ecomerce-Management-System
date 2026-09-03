import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSettings, FiShoppingCart, FiTruck, FiUsers, FiLayout, FiVolume2, FiShield, FiBarChart2, FiGlobe, FiCommand, FiSave } from 'react-icons/fi';
import { useSettings } from '../context/settings/SettingsContext';

const navCategories = [
  {
    name: 'Appearance',
    items: [
      { label: 'Dashboard Theme', path: '/admin/settings/appearance', icon: FiLayout }
    ]
  },
  {
    name: 'General',
    items: [
      { label: 'Store Information', path: '/admin/settings/store', icon: FiSettings },
      { label: 'Branding', path: '/admin/settings/branding', icon: FiLayout },
      { label: 'Business Details', path: '/admin/settings/business', icon: FiCommand },
    ]
  },
  {
    name: 'Commerce',
    items: [
      { label: 'Catalog', path: '/admin/settings/catalog', icon: FiLayout },
      { label: 'Orders & Checkout', path: '/admin/settings/checkout', icon: FiShoppingCart },
      { label: 'Inventory', path: '/admin/settings/inventory', icon: FiSettings },
    ]
  },
  {
    name: 'Operations',
    items: [
      { label: 'Shipping & Delivery', path: '/admin/settings/shipping', icon: FiTruck },
      { label: 'Returns', path: '/admin/settings/returns', icon: FiSettings },
    ]
  },
  {
    name: 'Customers & CRM',
    items: [
      { label: 'Accounts', path: '/admin/settings/customers', icon: FiUsers },
      { label: 'Reviews', path: '/admin/settings/reviews', icon: FiSettings },
    ]
  },
  {
    name: 'Platform',
    items: [
      { label: 'CMS & Content', path: '/admin/settings/cms', icon: FiLayout },
      { label: 'Communications', path: '/admin/settings/communications', icon: FiVolume2 },
      { label: 'Localization', path: '/admin/settings/localization', icon: FiGlobe },
      { label: 'Feature Flags', path: '/admin/settings/features', icon: FiCommand },
      { label: 'Business Rules', path: '/admin/settings/business-rules', icon: FiSettings },
    ]
  },
  {
    name: 'System',
    items: [
      { label: 'Staff & RBAC', path: '/admin/settings/staff', icon: FiShield },
      { label: 'Audit Logs', path: '/admin/settings/audit', icon: FiBarChart2 },
    ]
  }
];

export default function SettingsLayout() {
  const navigate = useNavigate();
  const { dirty, saveSettings, loading } = useSettings();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto overflow-hidden">

      {/* Settings Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-background shrink-0 border-b border-border">
        <div>
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-2 text-sm">
            <FiArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-light text-text-primary tracking-wide">Settings</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search settings..."
              className="w-64 pl-4 pr-10 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          {dirty && (
            <button
              onClick={saveSettings}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-64 border-r border-border bg-background overflow-y-auto shrink-0 hidden md:block py-4">
          {navCategories.map((cat, idx) => (
            <div key={idx} className="mb-6 px-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 px-2">{cat.name}</h3>
              <ul className="space-y-1">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:bg-background'
                        }`
                      }
                    >
                      <item.icon className="text-text-muted" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-surface overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
