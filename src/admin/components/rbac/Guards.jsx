import React from 'react';
import { useAuth } from '../../../auth/context/AuthContext';

export function PermissionGuard({ permission, children, fallback = null }) {
  const { hasPermission } = useAuth();
  
  if (hasPermission(permission)) {
    return <>{children}</>;
  }
  return fallback;
}

export function RoleGuard({ roles, children, fallback = null }) {
  const { hasRole } = useAuth();
  
  const hasAccess = Array.isArray(roles) 
    ? roles.some(r => hasRole(r))
    : hasRole(roles);
    
  if (hasAccess) {
    return <>{children}</>;
  }
  return fallback;
}

export function ModuleGuard({ module, children, fallback = null }) {
  const { hasModuleAccess } = useAuth();
  
  if (hasModuleAccess(module)) {
    return <>{children}</>;
  }
  return fallback;
}
