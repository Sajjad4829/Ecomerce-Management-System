import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

export const AuthContext = createContext(null);

// MOCK DATA FOR DEMONSTRATION
const MOCK_ADMIN_USER = {
  id: 'a1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Administrator',
  permissions: [
    'products.view', 'products.create', 'products.edit', 'products.delete',
    'orders.view', 'orders.create', 'orders.edit', 'orders.cancel',
    'customers.view', 'customers.edit', 'customers.delete',
    'inventory.view', 'inventory.adjust', 'inventory.transfer',
    'cms.pages.view', 'cms.pages.create', 'cms.pages.edit', 'cms.pages.delete',
    'pricing.view', 'pricing.edit',
    'reviews.view', 'reviews.moderate',
    'seo.view', 'seo.edit',
    'roles.view', 'roles.manage',
    'users.view', 'users.manage',
    'experience.view', 'experience.manage'
  ]
};

const MOCK_CUSTOMER_USER = {
  id: 'c1',
  name: 'Eleanor Vance',
  email: 'eleanor@example.com',
  role: 'Customer',
  permissions: [] // Customers usually don't have admin-style granular permissions
};

export function AuthProvider({ children }) {
  const [sessionStatus, setSessionStatus] = useState('loading'); // loading, authenticated, unauthenticated
  const [user, setUser] = useState(null);

  // Mock initial session check
  useEffect(() => {
    const initAuth = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedAuth = localStorage.getItem('mock_auth_type');
      if (storedAuth === 'admin') {
        setUser(MOCK_ADMIN_USER);
        setSessionStatus('authenticated');
      } else if (storedAuth === 'customer') {
        setUser(MOCK_CUSTOMER_USER);
        setSessionStatus('authenticated');
      } else {
        setSessionStatus('unauthenticated');
      }
    };
    initAuth();
  }, []);

  const login = async (email, password, type = 'customer') => {
    setSessionStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API

    if (type === 'admin') {
      if (email === 'admin@example.com' && password === 'pass123') {
        setUser(MOCK_ADMIN_USER);
        localStorage.setItem('mock_auth_type', 'admin');
        setSessionStatus('authenticated');
        return { success: true };
      }
    } else {
      if (email === 'eleanor@example.com' && password === 'password') {
        setUser(MOCK_CUSTOMER_USER);
        localStorage.setItem('mock_auth_type', 'customer');
        setSessionStatus('authenticated');
        return { success: true };
      }
    }
    
    setSessionStatus('unauthenticated');
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_auth_type');
    setSessionStatus('unauthenticated');
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (roleName) => {
    if (!user || !user.role) return false;
    return user.role === roleName;
  };

  const hasAnyPermission = (perms) => {
    if (!user || !user.permissions) return false;
    return perms.some(p => user.permissions.includes(p));
  };

  const hasAllPermissions = (perms) => {
    if (!user || !user.permissions) return false;
    return perms.every(p => user.permissions.includes(p));
  };

  const hasModuleAccess = (module) => {
    if (!user || !user.permissions) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.some(p => p.startsWith(module + '.'));
  };

  const value = React.useMemo(() => ({
    user,
    sessionStatus,
    isAuthenticated: sessionStatus === 'authenticated',
    login,
    logout,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    hasModuleAccess,
    staffProfile: user,
    roles: user ? [user.role] : [],
    permissions: user ? user.permissions : []
  }), [user, sessionStatus]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
