import React from 'react';

export const SettingsSection = ({ title, description, children }) => (
  <div className="mb-10">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-text-primary mb-1">{title}</h2>
      {description && <p className="text-sm text-text-muted">{description}</p>}
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export const SettingsCard = ({ children }) => (
  <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
    {children}
  </div>
);

export const SettingsField = ({ label, description, children }) => (
  <div className="mb-6 last:mb-0">
    <label className="block text-sm font-bold text-text-primary mb-1">{label}</label>
    {description && <p className="text-xs text-text-muted mb-3">{description}</p>}
    {children}
  </div>
);

export const SettingsInput = ({ value, onChange, placeholder, type = 'text', ...props }) => (
  <input
    type={type}
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full max-w-md p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
    {...props}
  />
);

export const SettingsSelect = ({ value, onChange, options, ...props }) => (
  <select
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    className="w-full max-w-md p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
    {...props}
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export const SettingsToggle = ({ checked, onChange, label, description }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <div className="relative flex items-center h-5 mt-0.5">
      <input 
        type="checkbox" 
        className="peer sr-only" 
        checked={checked || false} 
        onChange={e => onChange(e.target.checked)} 
      />
      <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </div>
    <div>
      <div className="text-sm font-bold text-text-primary">{label}</div>
      {description && <div className="text-xs text-text-muted mt-0.5">{description}</div>}
    </div>
  </label>
);
