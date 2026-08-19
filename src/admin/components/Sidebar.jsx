import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome, FiBox, FiShoppingBag, FiUsers,
  FiFileText, FiTag, FiImage, FiBarChart2,
  FiSettings, FiChevronLeft, FiSearch, FiShield, FiDollarSign, FiTruck, FiRepeat, FiStar, FiMessageSquare, FiBell, FiLayout, FiChevronDown
} from 'react-icons/fi';
import { cn } from '../../utils/cn';
import { PermissionGate } from '../../auth/components/PermissionGate';

const MENU_ITEMS = [
  { label: 'Dashboard', icon: FiHome, path: '/admin' },
  { label: 'Catalog', icon: FiBox, path: '/admin/catalog', requiredPermission: 'products.view' },
  { label: 'Inventory', icon: FiBox, path: '/admin/inventory', requiredPermission: 'inventory.view' },
  { label: 'Orders', icon: FiShoppingBag, path: '/admin/orders', requiredPermission: 'orders.view' },
  { label: 'Fulfillment', icon: FiTruck, path: '/admin/fulfillment' },
  { label: 'Shipping', icon: FiTruck, path: '/admin/shipping' },
  { label: 'Returns', icon: FiRepeat, path: '/admin/returns' },
  { label: 'Reviews', icon: FiStar, path: '/admin/reviews' },
  { label: 'Support', icon: FiMessageSquare, path: '/admin/support' },
  { label: 'Notifications', icon: FiBell, path: '/admin/notifications' },
  { label: 'Communications', icon: FiMessageSquare, path: '/admin/communications/logs' },

  { label: 'Loyalty', icon: FiStar, path: '/admin/loyalty' },
  { 
    label: 'Finance', 
    icon: FiDollarSign, 
    path: '/admin/finance',
    subItems: [
      { label: 'Overview', path: '/admin/finance' },
      { label: 'Transactions', path: '/admin/finance/transactions' },
      { label: 'Reconciliation', path: '/admin/finance/reconciliation' }
    ]
  },
  { label: 'Procurement', icon: FiBox, path: '/admin/procurement' },
  { label: 'HR', icon: FiUsers, path: '/admin/hr' },
  { label: 'CRM', icon: FiUsers, path: '/admin/crm' },
  { 
    label: 'Customers', 
    icon: FiUsers, 
    path: '/admin/customers', 
    requiredPermission: 'customers.view',
    subItems: [
      { label: 'Directory', path: '/admin/customers' },
      { label: 'Segments', path: '/admin/customers/segments' },
      { label: 'Loyalty', path: '/admin/loyalty' }
    ]
  },
  { 
    label: 'CMS', 
    icon: FiFileText, 
    path: '/admin/cms', 
    requiredPermission: 'cms.pages.view',
    subItems: [
      { label: 'Dashboard', path: '/admin/cms' },
      { label: 'Pages', path: '/admin/cms/pages' },
      { label: 'Page Types', path: '/admin/cms/page-types' }
    ]
  },
  { 
    label: 'Experience', 
    icon: FiLayout, 
    path: '/admin/experience',
    requiredPermission: 'experience.view',
    subItems: [
      { label: 'Overview', path: '/admin/experience' },
      { label: 'Homepage', path: '/admin/experience/homepage' },
      { label: 'Featured Products', path: '/admin/experience/merchandising/featured-products' },
      { label: 'Featured Categories', path: '/admin/experience/merchandising/featured-categories' },
      { label: 'Product Recommendations', path: '/admin/experience/recommendations/products' },
      { label: 'Related Products', path: '/admin/experience/related-products' },
      { label: 'Cross-sell', path: '/admin/experience/cross-sell' },
      { label: 'Up-sell', path: '/admin/experience/recommendations/up-sell' },
      { label: 'Product Bundles', path: '/admin/experience/recommendations/bundles' },
      { label: 'Collections', path: '/admin/experience/merchandising/collections' },
      { label: 'Product Placement', path: '/admin/experience/recommendations/rules' },
      { label: 'Personalization', path: '/admin/experience/personalization/segments' },
      { label: 'Recommendation Rules', path: '/admin/experience/personalization/rules' },
      { label: 'Variants', path: '/admin/experience/optimization/variants' },
      { label: 'Experiments', path: '/admin/experience/optimization/experiments' },
      { label: 'Analytics', path: '/admin/experience/optimization/analytics' }
    ]
  },
  { label: 'Marketing', icon: FiTag, path: '/admin/marketing', requiredPermission: 'reviews.view' },
  { label: 'SEO', icon: FiSearch, path: '/admin/seo', requiredPermission: 'seo.view' },
  { label: 'Analytics', icon: FiBarChart2, path: '/admin/analytics' },
  { label: 'Audit Logs', icon: FiShield, path: '/admin/audit' },
  { label: 'Compliance', icon: FiFileText, path: '/admin/compliance' },

  { label: 'Security', icon: FiShield, path: '/admin/users', requiredPermission: 'users.manage' },
  { label: 'Settings', icon: FiSettings, path: '/admin/settings' },
];

const SubMenuItem = ({ item, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  const hasSubItems = item.subItems && item.subItems.length > 0;
  
  const [isExpanded, setIsExpanded] = useState(isActive);

  if (!isOpen) return null;

  return (
    <div className="w-full">
      {hasSubItems ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center justify-between w-full py-2 px-3 rounded-lg transition-colors group",
            isActive && !isExpanded ? "text-primary font-medium" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <span className="text-sm">{item.label}</span>
          <FiChevronDown className={cn("transition-transform", isExpanded ? "rotate-180" : "")} />
        </button>
      ) : (
        <NavLink
          to={item.path}
          end={item.path === '/admin/experience'}
          className={({ isActive }) => cn(
            "flex items-center w-full py-2 px-3 rounded-lg transition-colors group text-sm",
            isActive ? "text-primary font-medium bg-primary-soft" : "text-text-secondary hover:text-text-primary hover:bg-background"
          )}
        >
          {item.label}
        </NavLink>
      )}
      
      {hasSubItems && isExpanded && (
        <div className="mt-1 space-y-1 border-l border-border ml-4 pl-2">
          {item.subItems.map((subItem, index) => (
            <SubMenuItem key={index} item={subItem} isOpen={isOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-surface border-r border-border text-text-secondary transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
        isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20"
      )}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-border shrink-0">
        <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "lg:hidden")}>
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shrink-0">
            <span className="text-surface font-serif font-bold text-lg leading-none">A</span>
          </div>
          <span className="font-serif tracking-[0.2em] uppercase text-sm text-text-primary font-bold whitespace-nowrap">
            Aurelian
          </span>
        </div>

        {/* Only show logo in collapsed state on desktop */}
        {!isOpen && (
          <div className="hidden lg:flex w-full items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shrink-0">
              <span className="text-surface font-serif font-bold text-lg leading-none">A</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <div className="px-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isExact = item.path === '/admin';
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            
            const linkContent = (
              <div className="w-full">
                {hasSubItems && isOpen ? (
                  <div className="w-full">
                    <NavLink
                      to={item.path}
                      end={true}
                      className={({ isActive }) => cn(
                        "flex items-center gap-4 px-3 py-3 rounded-lg transition-colors group mb-1",
                        isActive
                          ? "bg-primary-soft text-primary"
                          : "hover:bg-background hover:text-text-primary"
                      )}
                    >
                      <Icon className="shrink-0 text-lg" />
                      <span className="text-sm font-medium tracking-wide whitespace-nowrap">{item.label}</span>
                    </NavLink>
                    {isActive && (
                      <div className="ml-7 border-l border-border space-y-1 pl-2">
                        {item.subItems.map((subItem, index) => (
                          <SubMenuItem key={index} item={subItem} isOpen={isOpen} />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={isExact}
                    className={({ isActive }) => cn(
                      "flex items-center gap-4 px-3 py-3 rounded-lg transition-colors group",
                      isActive
                        ? "bg-primary-soft text-primary"
                        : "hover:bg-background hover:text-text-primary"
                    )}
                    title={!isOpen ? item.label : undefined}
                  >
                    <Icon className={cn("shrink-0 text-lg", !isOpen && "lg:mx-auto")} />
                    <span className={cn("text-sm font-medium tracking-wide whitespace-nowrap transition-opacity", !isOpen && "lg:hidden")}>
                      {item.label}
                    </span>
                  </NavLink>
                )}
              </div>
            );

            if (item.requiredPermission) {
              return (
                <PermissionGate key={item.label} permission={item.requiredPermission} fallback={null}>
                  {linkContent}
                </PermissionGate>
              );
            }

            return <div key={item.label}>{linkContent}</div>;
          })}
        </div>
      </div>

      {/* Collapse Button (Desktop Only) */}
      <div className="hidden lg:flex p-4 border-t border-border shrink-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-background transition-colors"
        >
          <FiChevronLeft className={cn("text-xl transition-transform duration-300", !isOpen && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
