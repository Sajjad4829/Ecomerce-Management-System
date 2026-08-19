import React, { createContext, useContext, useState, useEffect } from 'react';
import { rbacService } from '../services/RBACService';

const RBACContext = createContext();

export function RBACProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Mock user load
    setCurrentUser(rbacService.getCurrentUser());
  }, []);

  const hasRole = (role) => {
    if (!currentUser) return false;
    if (currentUser.roles.includes('super_admin')) return true;
    return currentUser.roles.includes(role);
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('*')) return true;
    return currentUser.permissions.includes(permission);
  };

  const hasModuleAccess = (module) => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('*')) return true;
    return currentUser.permissions.some(p => p.startsWith(module + '.'));
  };

  const value = {
    user: currentUser,
    hasRole,
    hasPermission,
    hasModuleAccess
  };

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
}

export const useRBAC = () => useContext(RBACContext);
