import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

const TABS = [
  { label: 'Overview', path: '/admin/analytics', exact: true },
  { label: 'Sales', path: '/admin/analytics/sales' },
  { label: 'Orders', path: '/admin/analytics/orders' },
  { label: 'Customers', path: '/admin/analytics/customers' },
  { label: 'Products', path: '/admin/analytics/products' },
  { label: 'Reports', path: '/admin/analytics/reports' },
];

export default function AnalyticsTabs() {
  return (
    <div className="flex space-x-1 border-b border-black/10 mb-8 overflow-x-auto custom-scrollbar">
      {TABS.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.path}
          end={tab.exact}
          className={({ isActive }) =>
            cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              isActive
                ? "border-black text-[#1A1A1A]"
                : "border-transparent text-gray-500 hover:text-[#1A1A1A] hover:border-black/30"
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
