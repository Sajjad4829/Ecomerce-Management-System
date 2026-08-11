import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Users, Award, Gift, Star, Clock, Activity, Target, Settings, BarChart2 } from 'lucide-react';

export default function LoyaltyLayout() {
  const navItems = [
    { to: ".", label: "Dashboard", icon: BarChart2, end: true },
    { to: "memberships", label: "Memberships", icon: Users },
    { to: "tiers", label: "Tiers", icon: Award },
    { to: "points", label: "Points Center", icon: Star },
    { to: "rewards", label: "Reward Catalog", icon: Gift },
    { to: "redemptions", label: "Redemptions", icon: Activity },
    { to: "rules", label: "Loyalty Rules", icon: Target },
    { to: "referrals", label: "Referrals", icon: Users },
    { to: "vip", label: "VIP Management", icon: Star },
    { to: "campaigns", label: "Campaigns", icon: Target },
    { to: "expiry", label: "Point Expiry", icon: Clock },
    { to: "retention", label: "Retention", icon: Activity },
    { to: "analytics", label: "Analytics", icon: BarChart2 }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-neutral-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Loyalty & Rewards</h2>
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
