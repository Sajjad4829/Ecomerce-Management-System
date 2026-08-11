import React from 'react';
import { useCustomers } from '../../context/customers/CustomerContext';
import { Users, UserPlus, UserCheck, Star, Heart, TrendingUp, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CustomerDashboard() {
  const { customers } = useCustomers();

  const metrics = [
    { label: 'Total Customers', value: customers.length, icon: Users },
    { label: 'New Customers', value: '89', icon: UserPlus, trend: '+12%' },
    { label: 'Active Customers', value: '450', icon: UserCheck },
    { label: 'High Value Customers', value: '142', icon: TrendingUp, placeholder: true },
    { label: 'Reviewers', value: '312', icon: Star },
    { label: 'Wishlist Users', value: '520', icon: Heart }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-neutral-500">
                <metric.icon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              {metric.trend && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {metric.trend}
                </span>
              )}
              {metric.placeholder && (
                <span className="text-xs text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded">Mock</span>
              )}
            </div>
            <p className="text-2xl font-semibold text-neutral-900 mt-4">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search customers by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md text-sm focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-md transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-sm text-neutral-500">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">LTV</th>
              <th className="p-4 font-medium">Segment</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {customers.map(customer => (
              <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="p-4">
                  <div className="font-medium text-neutral-900">{customer.firstName} {customer.lastName}</div>
                  <div className="text-neutral-500">{customer.email}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="p-4">{customer.orderCount}</td>
                <td className="p-4">${customer.lifetimeValue.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex gap-1 flex-wrap">
                    {customer.tags.map(tag => (
                      <span key={tag} className="text-xs bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Link 
                    to={`/admin/customers/${customer.id}`}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    View 360
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
