import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function CMSLayout() {
  const location = useLocation();
  const isBuilderRoute = location.pathname.includes('/builder') || location.pathname.endsWith('/header') || location.pathname.endsWith('/cms') || location.pathname.endsWith('/cms/');

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto bg-neutral-50 ${isBuilderRoute ? '' : 'p-8'}`}>
        <Outlet />
      </div>
    </div>
  );
}
