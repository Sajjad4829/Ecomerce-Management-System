import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Users, Briefcase, Calendar, Clock, ClipboardList, Umbrella, Star, BarChart2, CheckSquare } from 'lucide-react';

export default function HRLayout() {
  const navItems = [
    { to: ".", label: "Dashboard", icon: BarChart2, end: true },
    { to: "employees", label: "Employee Directory", icon: Users },
    { to: "departments", label: "Departments", icon: Briefcase },
    { to: "teams", label: "Teams", icon: Users },
    { to: "positions", label: "Positions", icon: Briefcase },
    { to: "attendance", label: "Attendance", icon: CheckSquare, end: true },
    { to: "attendance/calendar", label: "Attendance Calendar", icon: Calendar },
    { to: "shifts", label: "Shifts", icon: Clock },
    { to: "schedules", label: "Work Schedules", icon: Calendar },
    { to: "leaves", label: "Leave Requests", icon: Umbrella, end: true },
    { to: "leave-types", label: "Leave Types", icon: ClipboardList },
    { to: "holidays", label: "Holiday Calendar", icon: Calendar },
    { to: "performance", label: "Performance", icon: Star },
    { to: "analytics", label: "Workforce Analytics", icon: BarChart2 },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Workforce Center</h2>
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
