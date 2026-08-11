import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Layout, FileText, Layers, Navigation, PanelTop, PanelBottom,
  Image, Search, Repeat, Box, History
} from 'lucide-react';

export default function CMSLayout() {
  const navItems = [
    { to: ".", label: "CMS Dashboard", icon: Layout, end: true },
    { to: "pages", label: "Page Center", icon: FileText, end: false },
    { to: "sections", label: "Section Library", icon: Layers },
    { to: "blocks", label: "Reusable Blocks", icon: Box },
    { to: "navigation", label: "Navigation Center", icon: Navigation },
    { to: "header", label: "Header Config", icon: PanelTop },
    { to: "footer", label: "Footer Config", icon: PanelBottom },
    { to: "banners", label: "Banners", icon: Image },
    { to: "seo", label: "SEO Center", icon: Search },
    { to: "redirects", label: "Redirects", icon: Repeat },
    { to: "versions", label: "Versions", icon: History }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Content Management</h2>
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
