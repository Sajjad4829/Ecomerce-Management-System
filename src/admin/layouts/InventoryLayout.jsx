import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { PackageSearch, Home, Activity, Sliders, ArrowRightLeft, ShieldAlert, BarChart3, Settings } from 'lucide-react';

export default function InventoryLayout() {
  const navItems = [
    { to: ".", label: "Overview", icon: PackageSearch, end: true },
    { to: "warehouses", label: "Warehouses", icon: Home },
    { to: "movements", label: "Movements", icon: Activity },
    { to: "adjustments", label: "Adjustments", icon: Sliders },
    { to: "transfers", label: "Transfers", icon: ArrowRightLeft },
    { to: "low-stock", label: "Low Stock", icon: ShieldAlert },
    { to: "analytics", label: "Analytics", icon: BarChart3 },
    { to: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Inventory Center</h2>
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
