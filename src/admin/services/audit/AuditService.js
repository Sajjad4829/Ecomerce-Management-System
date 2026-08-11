import { maskObject } from './DataMasking';

const MOCK_EVENTS = [
  {
    id: 'evt-001',
    timestamp: '2026-08-08T10:30:00Z',
    actor: 'admin@aurora.com',
    actorRole: 'Super Admin',
    action: 'UPDATE',
    module: 'Products',
    resourceType: 'Product',
    resourceId: 'prod-1',
    resourceName: 'The Sovereign Curved Sofa',
    status: 'Success',
    severity: 'Medium',
    source: 'Admin UI',
    metadata: {
      oldValue: { price: 12000 },
      newValue: { price: 12850 }
    }
  },
  {
    id: 'evt-002',
    timestamp: '2026-08-08T11:15:00Z',
    actor: 'manager@aurora.com',
    actorRole: 'Inventory Manager',
    action: 'STOCK_ADJUSTED',
    module: 'Inventory',
    resourceType: 'SKU',
    resourceId: 'sku-001',
    resourceName: 'AUR-SOF-001',
    status: 'Success',
    severity: 'Low',
    source: 'Admin UI',
    metadata: {
      adjustment: -2,
      reason: 'Damaged in transit'
    }
  },
  {
    id: 'evt-003',
    timestamp: '2026-08-09T09:00:00Z',
    actor: 'unknown',
    actorRole: 'None',
    action: 'LOGIN_FAILED',
    module: 'RBAC',
    resourceType: 'Authentication',
    resourceId: '-',
    resourceName: '-',
    status: 'Failed',
    severity: 'High',
    source: 'System',
    metadata: {
      ipPlaceholder: '192.168.1.100',
      reason: 'Invalid credentials'
    }
  },
  {
    id: 'evt-004',
    timestamp: '2026-08-09T09:10:00Z',
    actor: 'admin@aurora.com',
    actorRole: 'Super Admin',
    action: 'ROLE_ASSIGNED',
    module: 'RBAC',
    resourceType: 'Staff',
    resourceId: 'staff-2',
    resourceName: 'manager@aurora.com',
    status: 'Success',
    severity: 'High',
    source: 'Admin UI',
    metadata: {
      roleAssigned: 'Catalog Manager'
    }
  }
];

export class AuditService {
  async getEvents(filters = {}) {
    let results = [...MOCK_EVENTS];
    
    if (filters.module) {
      results = results.filter(e => e.module === filters.module);
    }
    if (filters.severity) {
      results = results.filter(e => e.severity === filters.severity);
    }
    if (filters.actor) {
      results = results.filter(e => e.actor.toLowerCase().includes(filters.actor.toLowerCase()));
    }
    if (filters.action) {
      results = results.filter(e => e.action === filters.action);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(e => 
        e.resourceName.toLowerCase().includes(q) || 
        e.id.toLowerCase().includes(q) ||
        e.actor.toLowerCase().includes(q)
      );
    }
    
    return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getEvent(id) {
    const event = MOCK_EVENTS.find(e => e.id === id);
    if (!event) return null;
    return { ...event, metadata: maskObject(event.metadata) };
  }

  async getActorActivity(actorId) {
    // Mock mapping actorId (could be email or staffId)
    return MOCK_EVENTS.filter(e => e.actor === actorId || e.resourceId === actorId);
  }

  async getModuleActivity(module) {
    return MOCK_EVENTS.filter(e => e.module === module);
  }

  async getResourceHistory(resourceType, resourceId) {
    return MOCK_EVENTS.filter(e => e.resourceType === resourceType && e.resourceId === resourceId);
  }

  async getSecurityEvents() {
    return MOCK_EVENTS.filter(e => ['High', 'Critical'].includes(e.severity) || e.module === 'RBAC' || e.action.includes('LOGIN'));
  }

  async getExportActivity() {
    return MOCK_EVENTS.filter(e => e.action === 'EXPORTED');
  }

  async getImportActivity() {
    return MOCK_EVENTS.filter(e => e.action === 'IMPORTED');
  }

  async getComplianceReports() {
    return [
      { id: 'rep-1', name: 'Q3 Access Review', owner: 'admin@aurora.com', created: '2026-10-01', status: 'Generated' },
      { id: 'rep-2', name: 'Weekly Inventory Adjustments', owner: 'manager@aurora.com', created: '2026-10-05', status: 'Scheduled' }
    ];
  }

  async getAlerts() {
    return [
      { id: 'alt-1', event: 'LOGIN_FAILED', condition: 'Count > 5 in 10 mins', severity: 'Critical', status: 'Active' },
      { id: 'alt-2', event: 'ROLE_ASSIGNED', condition: 'Role = Super Admin', severity: 'High', status: 'Active' }
    ];
  }
}

export const auditService = new AuditService();
