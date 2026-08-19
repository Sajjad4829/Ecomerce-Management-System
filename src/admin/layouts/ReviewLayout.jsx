import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Star, MessageSquare, AlertTriangle, HelpCircle, Image as ImageIcon, Settings, BarChart2 } from 'lucide-react';

export default function ReviewLayout() {
  const navItems = [
    { to: ".", label: "Dashboard", icon: BarChart2, end: true },
    { to: "all", label: "Review Center", icon: Star },
    { to: "moderation", label: "Moderation Queue", icon: MessageSquare },
    { to: "reported", label: "Reported Reviews", icon: AlertTriangle },
    { to: "questions", label: "Q&A", icon: HelpCircle },
    { to: "media", label: "Review Media", icon: ImageIcon },
    { to: "analytics", label: "Analytics", icon: BarChart2 },
    { to: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Reviews & UGC</h2>
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
