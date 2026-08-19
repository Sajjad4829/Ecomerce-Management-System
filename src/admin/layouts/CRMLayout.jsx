import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Users, Activity, Inbox, Calendar, UserPlus, 
  BarChart2, Target, CheckSquare, Hash, BookOpen, Clock
} from 'lucide-react';

export default function CRMLayout() {
  const navItems = [
    { to: ".", label: "CRM Dashboard", icon: BarChart2, end: true },
    { to: "leads", label: "Leads", icon: UserPlus, end: true },
    { to: "lead-sources", label: "Lead Sources", icon: Hash },
    { to: "pipeline", label: "Sales Pipeline", icon: Target, end: true },
    { to: "pipeline/stages", label: "Pipeline Stages", icon: Target },
    { to: "opportunities", label: "Opportunities", icon: Inbox, end: true },
    { to: "activities", label: "Sales Activities", icon: Activity },
    { to: "follow-ups", label: "Follow-ups", icon: Clock },
    { to: "tasks", label: "Tasks", icon: CheckSquare },
    { to: "segments", label: "Customer Segments", icon: Users },
    { to: "customer-groups", label: "Customer Groups", icon: Users },
    { to: "tags", label: "Customer Tags", icon: Hash },
    { to: "sales-teams", label: "Sales Teams", icon: Users },
    { to: "forecast", label: "Sales Forecast", icon: BarChart2 },
    { to: "analytics", label: "CRM Analytics", icon: BarChart2 },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">CRM & Sales</h2>
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
