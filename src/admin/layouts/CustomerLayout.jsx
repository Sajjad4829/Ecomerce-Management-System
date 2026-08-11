import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Users, Tag, Target, Search, BarChart2, Download, Upload } from 'lucide-react';

export default function CustomerLayout() {
  const navItems = [
    { name: 'Customers', path: '/admin/customers', icon: Users, end: true },
    { name: 'Segments', path: '/admin/customers/segments', icon: Target },
    { name: 'Loyalty', path: '/admin/customers/loyalty', icon: Tag },
    { name: 'Import', path: '/admin/customers/import', icon: Upload },
    { name: 'Analytics', path: '/admin/customers/analytics', icon: BarChart2 }
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-8 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Customer Experience Center</h1>
            <p className="text-sm text-neutral-500 mt-1">Manage profiles, segments, and loyalty</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-md transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-md transition-colors">
              Add Customer
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center pb-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`
              }
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
