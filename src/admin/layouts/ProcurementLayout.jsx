import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShoppingCart, Users, Truck, FileText, ClipboardList, Wallet, BookOpen, BarChart2, Briefcase, List, DollarSign, PieChart } from 'lucide-react';

export default function ProcurementLayout() {
  const navItems = [
    { to: ".", label: "Dashboard", icon: PieChart, end: true },
    { to: "suppliers", label: "Suppliers", icon: Users },
    { to: "supplier-categories", label: "Supplier Categories", icon: List },
    { to: "supplier-performance", label: "Supplier Performance", icon: BarChart2 },
    { to: "requests", label: "Purchase Requests", icon: ClipboardList },
    { to: "purchase-orders", label: "Purchase Orders", icon: ShoppingCart },
    { to: "goods-receipts", label: "Goods Receipts", icon: Truck },
    { to: "invoices", label: "Supplier Invoices", icon: FileText },
    { to: "payments", label: "Supplier Payments", icon: DollarSign },
    { to: "budgets", label: "Procurement Budgets", icon: Wallet },
    { to: "categories", label: "Procurement Categories", icon: Briefcase },
    { to: "analytics", label: "Procurement Analytics", icon: BarChart2 },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Procurement Center</h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive 
                      ? 'bg-neutral-100 text-neutral-900 font-medium' 
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-neutral-50 p-8">
        <Outlet />
      </div>
    </div>
  );
}
