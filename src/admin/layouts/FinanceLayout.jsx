import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { DollarSign, FileText, RefreshCcw, CreditCard, PieChart, ShieldAlert, ArrowLeftRight, FileCheck2, Calculator, Percent, Users, Settings, TrendingUp, BarChart2, BookOpen } from 'lucide-react';

export default function FinanceLayout() {
  const navItems = [
    { to: ".", label: "Dashboard", icon: PieChart, end: true },
    { to: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { to: "payments", label: "Payments", icon: CreditCard },
    { to: "refunds", label: "Refunds", icon: RefreshCcw },
    { to: "invoices", label: "Invoices", icon: FileText },
    { to: "credit-notes", label: "Credit Notes", icon: FileText },
    { to: "debit-notes", label: "Debit Notes", icon: FileText },
    { to: "tax", label: "Tax", icon: Calculator },
    { to: "discounts", label: "Discounts", icon: Percent },
    { to: "customer-balances", label: "Customer Balances", icon: Users },
    { to: "adjustments", label: "Adjustments", icon: Settings },
    { to: "reconciliation", label: "Reconciliation", icon: FileCheck2 },
    { to: "expenses", label: "Expenses", icon: DollarSign },
    { to: "accounts", label: "Accounting Categories", icon: BookOpen },
    { to: "periods", label: "Financial Periods", icon: BookOpen },
    { to: "reports", label: "Financial Reports", icon: BarChart2 },
    { to: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Finance Center</h2>
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
