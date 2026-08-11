import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  PieChart, Megaphone, Target, Users, List, Tag, Image, Mail, MessageSquare, 
  Share2, Play, CheckSquare, Calendar, BarChart2, TrendingUp
} from 'lucide-react';

export default function MarketingLayout() {
  const navItems = [
    { to: ".", label: "Marketing Dashboard", icon: PieChart, end: true },
    { to: "campaigns", label: "Campaigns", icon: Megaphone, end: true },
    { to: "campaign-types", label: "Campaign Types", icon: Tag },
    { to: "channels", label: "Channels", icon: Share2 },
    { to: "audiences", label: "Audiences", icon: Target },
    { to: "lists", label: "Marketing Lists", icon: List },
    { to: "promotions", label: "Promotions", icon: Tag },
    { to: "banners", label: "Banners", icon: Image },
    { to: "assets", label: "Marketing Assets", icon: Image },
    { to: "email", label: "Email Campaigns", icon: Mail },
    { to: "sms", label: "SMS Campaigns", icon: MessageSquare },
    { to: "social", label: "Social Campaigns", icon: Share2 },
    { to: "automations", label: "Automations", icon: Play },
    { to: "tasks", label: "Marketing Tasks", icon: CheckSquare },
    { to: "calendar", label: "Calendar", icon: Calendar },
    { to: "analytics", label: "Analytics", icon: BarChart2 },
    { to: "roi", label: "Marketing ROI", icon: TrendingUp },
    { to: "attribution", label: "Attribution", icon: Target },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Marketing</h2>
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
