import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useCustomers } from '../../context/customers/CustomerContext';
import { User, ShoppingBag, Heart, Star, Activity, FileText, Tag, MessageSquare, Award } from 'lucide-react';

export function Customer360() {
  const { customerId } = useParams();
  const { getCustomer } = useCustomers();
  const customer = getCustomer(customerId);

  if (!customer) {
    return <div className="p-8 text-center text-neutral-500">Customer not found</div>;
  }

  const tabs = [
    { name: 'Profile', path: '', icon: User, end: true },
    { name: 'Orders', path: 'orders', icon: ShoppingBag },
    { name: 'Wishlist', path: 'wishlist', icon: Heart },
    { name: 'Reviews', path: 'reviews', icon: Star },
    { name: 'Notes', path: 'notes', icon: FileText },
    { name: 'Activity', path: 'activity', icon: Activity },
    { name: 'Segments', path: 'segments', icon: Tag },
    { name: 'Communication', path: 'communication', icon: MessageSquare },
    { name: 'Loyalty', path: 'loyalty', icon: Award }
  ];

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 bg-neutral-50 shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xl font-medium shrink-0">
              {customer.firstName[0]}{customer.lastName[0]}
            </div>
            <div>
              <h2 className="text-xl font-serif text-neutral-900">{customer.firstName} {customer.lastName}</h2>
              <div className="flex items-center space-x-4 mt-1 text-sm text-neutral-500">
                <span>{customer.email}</span>
                <span>•</span>
                <span>{customer.phone}</span>
                <span>•</span>
                <span className="text-neutral-400">ID: {customer.id}</span>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  customer.status === 'active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {customer.status}
                </span>
                {customer.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-200 text-neutral-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm border border-neutral-300 rounded hover:bg-neutral-100 transition-colors">Add Note</button>
            <button className="px-3 py-1.5 text-sm border border-neutral-300 rounded hover:bg-neutral-100 transition-colors">Edit</button>
            <button className="px-3 py-1.5 text-sm bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors">New Order</button>
          </div>
        </div>
      </div>

      {/* Main Content Area (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Vertical Tabs Sidebar */}
        <div className="w-64 border-r border-neutral-200 bg-surface overflow-y-auto shrink-0 p-4 space-y-1">
          {tabs.map(tab => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.end}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`
              }
            >
              <tab.icon className="w-4 h-4 mr-3 text-neutral-400" />
              {tab.name}
            </NavLink>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface">
          <Outlet context={{ customer }} />
        </div>
      </div>
    </div>
  );
}
