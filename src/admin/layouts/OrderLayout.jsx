import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShoppingBag, Package, Truck, RotateCcw, FileText, BarChart2, DollarSign } from 'lucide-react';

export default function OrderLayout() {
  const navItems = [
    { name: 'All Orders', path: '/admin/orders', icon: ShoppingBag, end: true },
    { name: 'Fulfillment', path: '/admin/orders/fulfillment', icon: Package },
    { name: 'Shipments', path: '/admin/orders/shipments', icon: Truck },
    { name: 'Returns', path: '/admin/orders/returns', icon: RotateCcw },
    { name: 'Refunds', path: '/admin/orders/refunds', icon: DollarSign },
    { name: 'Invoices', path: '/admin/orders/invoices', icon: FileText },
    { name: 'Analytics', path: '/admin/orders/analytics', icon: BarChart2 },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-neutral-200 bg-neutral-50 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
            Order Management
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-neutral-200 text-neutral-900'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-neutral-50/50 p-8">
        <Outlet />
      </div>
    </div>
  );
}
