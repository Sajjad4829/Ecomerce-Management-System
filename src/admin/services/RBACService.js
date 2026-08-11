export class RBACService {
  constructor() {
    this.staff = [
      { id: 'STF-001', name: 'Admin User', email: 'admin@example.com', department: 'Administration', roles: ['super_admin'], status: 'Active', created: '2023-01-15T09:00:00Z', lastActive: '2023-10-25T14:30:00Z' },
      { id: 'STF-002', name: 'Catalog Manager', email: 'catalog@example.com', department: 'Catalog', roles: ['catalog_manager'], status: 'Active', created: '2023-03-10T10:15:00Z', lastActive: '2023-10-24T11:20:00Z' },
      { id: 'STF-003', name: 'Inventory Lead', email: 'inventory@example.com', department: 'Inventory', roles: ['inventory_manager'], status: 'Active', created: '2023-05-22T08:45:00Z', lastActive: '2023-10-25T09:10:00Z' },
      { id: 'STF-004', name: 'Sarah Connor', email: 'sarah.c@example.com', department: 'Customer Support', roles: ['customer_support'], status: 'Suspended', created: '2023-06-11T13:20:00Z', lastActive: '2023-09-15T16:40:00Z' }
    ];

    this.roles = [
      { id: 'role-1', name: 'Super Admin', description: 'Full system access', staffCount: 1, permissionCount: 250, status: 'Active', isSystem: true },
      { id: 'role-2', name: 'Catalog Manager', description: 'Manage products and categories', staffCount: 3, permissionCount: 45, status: 'Active', isSystem: true },
      { id: 'role-3', name: 'Inventory Manager', description: 'Manage stock and warehouses', staffCount: 2, permissionCount: 38, status: 'Active', isSystem: true },
      { id: 'role-4', name: 'Customer Support', description: 'Handle tickets and orders', staffCount: 12, permissionCount: 25, status: 'Active', isSystem: true },
      { id: 'role-5', name: 'Seasonal Content Editor', description: 'Edit CMS during holiday season', staffCount: 0, permissionCount: 15, status: 'Inactive', isSystem: false }
    ];

    this.permissions = [
      { id: 'perm-1', module: 'catalog', resource: 'products', action: 'view', description: 'View all products' },
      { id: 'perm-2', module: 'catalog', resource: 'products', action: 'create', description: 'Create new products' },
      { id: 'perm-3', module: 'catalog', resource: 'products', action: 'edit', description: 'Edit existing products' },
      { id: 'perm-4', module: 'catalog', resource: 'products', action: 'delete', description: 'Delete products' },
      { id: 'perm-5', module: 'inventory', resource: 'stock', action: 'view', description: 'View stock levels' },
      { id: 'perm-6', module: 'inventory', resource: 'stock', action: 'adjust', description: 'Adjust stock levels manually' },
      { id: 'perm-7', module: 'settings', resource: 'staff', action: 'manage', description: 'Manage staff accounts' }
    ];
  }

  getStaff() { return this.staff; }
  getRoles() { return this.roles; }
  getPermissions() { return this.permissions; }
  
  getCurrentUser() {
    return {
      id: 'STF-001',
      name: 'Admin User',
      roles: ['super_admin'],
      permissions: ['*'] // Super admin has all
    };
  }
}

export const rbacService = new RBACService();
