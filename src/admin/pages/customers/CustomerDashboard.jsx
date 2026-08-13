import React, { useState, useMemo } from 'react';
import { useCustomers } from '../../context/customers/CustomerContext';
import { useFinance } from '../../context/finance/FinanceContext';
import { Users, UserPlus, UserCheck, Star, Heart, TrendingUp, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CustomerDashboard() {
  const { customers, getCustomerType } = useCustomers();
  const { calculateOrderFinancials } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const customerStats = useMemo(() => {
    let active = 0;
    let newCust = 0;
    let returning = 0;
    let vip = 0;

    customers.forEach(c => {
      if (c.status === 'active') active++;
      const type = getCustomerType(c);
      if (type === 'New') newCust++;
      if (type === 'Returning') returning++;
      if (type === 'VIP') vip++;
    });

    return { active, newCust, returning, vip, total: customers.length };
  }, [customers, getCustomerType]);

  const metrics = [
    { label: 'Total Customers', value: customerStats.total, icon: Users },
    { label: 'New Customers', value: customerStats.newCust, icon: UserPlus },
    { label: 'Active Customers', value: customerStats.active, icon: UserCheck },
    { label: 'VIP Customers', value: customerStats.vip, icon: TrendingUp },
    { label: 'Returning', value: customerStats.returning, icon: Users },
    { label: 'Wishlist Users', value: '0', icon: Heart } // Placeholder
  ];

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = 
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.phone && c.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-surface p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-neutral-500">
                <metric.icon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-neutral-900 mt-4">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200">
        <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md text-sm focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-neutral-300 rounded-md text-sm py-2 px-3 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-200 text-sm text-neutral-500">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Orders</th>
                <th className="p-4 font-medium">LTV</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">No customers found.</td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-4">
                      <div className="font-medium text-neutral-900">{customer.firstName} {customer.lastName}</div>
                      <div className="text-neutral-500">{customer.email}</div>
                      {customer.phone && <div className="text-neutral-400 text-xs mt-0.5">{customer.phone}</div>}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === 'active' ? 'bg-success-soft text-green-800' : 
                        customer.status === 'blocked' ? 'bg-error-soft text-error' :
                        'bg-neutral-100 text-neutral-800'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded text-neutral-600">
                        {getCustomerType(customer)}
                      </span>
                    </td>
                    <td className="p-4">{customer.orderCount}</td>
                    <td className="p-4">৳{customer.lifetimeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-4 text-right">
                      <Link 
                        to={`/admin/customers/${customer.id}`}
                        className="text-primary hover:text-indigo-900 font-medium"
                      >
                        View 360
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
