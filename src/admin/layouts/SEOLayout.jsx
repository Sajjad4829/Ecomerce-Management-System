import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiActivity, FiGlobe, FiFileText, FiLink, FiMap, FiShield, FiTrendingUp, FiSearch, FiCode, FiLayers } from 'react-icons/fi';

const navCategories = [
  { 
    name: 'Overview', 
    items: [
      { label: 'SEO Dashboard', path: '/admin/seo', icon: FiActivity, end: true },
      { label: 'Global Settings', path: '/admin/seo/global', icon: FiGlobe },
    ]
  },
  {
    name: 'Content & Resources',
    items: [
      { label: 'Resource Manager', path: '/admin/seo/resources', icon: FiLayers },
      { label: 'URL & Slugs', path: '/admin/seo/urls', icon: FiLink },
      { label: 'Redirects', path: '/admin/seo/redirects', icon: FiSearch },
    ]
  },
  {
    name: 'Architecture',
    items: [
      { label: 'Sitemap', path: '/admin/seo/sitemap', icon: FiMap },
      { label: 'Robots.txt', path: '/admin/seo/robots', icon: FiFileText },
      { label: 'Internal Links', path: '/admin/seo/internal-links', icon: FiLink },
    ]
  },
  {
    name: 'Optimization',
    items: [
      { label: 'Templates', path: '/admin/seo/templates', icon: FiCode },
      { label: 'Bulk Editor', path: '/admin/seo/bulk', icon: FiLayers },
      { label: 'SEO Audit', path: '/admin/seo/audit', icon: FiShield },
    ]
  },
  {
    name: 'Performance',
    items: [
      { label: 'Analytics', path: '/admin/seo/analytics', icon: FiTrendingUp },
      { label: 'Search Console', path: '/admin/seo/integrations/search-console', icon: FiSearch },
    ]
  }
];

export default function SEOLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between px-8 py-6 bg-background shrink-0 border-b border-border">
        <div>
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-2 text-sm">
            <FiArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-light text-text-primary tracking-wide">SEO Center</h1>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-border bg-background overflow-y-auto shrink-0 hidden md:block py-4">
          {navCategories.map((cat, idx) => (
            <div key={idx} className="mb-6 px-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 px-2">{cat.name}</h3>
              <ul className="space-y-1">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:bg-background'
                        }`
                      }
                    >
                      <item.icon className="text-text-muted" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-surface overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
