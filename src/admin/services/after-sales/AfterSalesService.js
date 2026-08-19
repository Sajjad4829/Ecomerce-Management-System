export const AfterSalesService = {
  getReturns: async () => [],
  getReturn: async (id) => ({ id }),
  createReturn: async (data) => ({ id: `RET-${Date.now()}`, ...data, status: 'Requested' }),
  approveReturn: async (id) => ({ id, status: 'Approved' }),
  rejectReturn: async (id) => ({ id, status: 'Rejected' }),
  
  getInspections: async () => [],
  createInspection: async (data) => ({ id: `INS-${Date.now()}`, ...data, status: 'Pending' }),
  
  getRMAs: async () => [],
  createRMA: async (data) => ({ id: `RMA-${Date.now()}`, ...data, status: 'Open' }),
  
  getWarranties: async () => [],
  getWarrantyPolicies: async () => [],
  createWarrantyPolicy: async (data) => ({ id: `WP-${Date.now()}`, ...data, status: 'Active' }),
  
  getWarrantyClaims: async () => [],
  createWarrantyClaim: async (data) => ({ id: `WC-${Date.now()}`, ...data, status: 'Submitted' }),
  approveWarrantyClaim: async (id) => ({ id, status: 'Approved' }),
  rejectWarrantyClaim: async (id) => ({ id, status: 'Rejected' }),
  
  getRepairs: async () => [],
  createRepair: async (data) => ({ id: `REP-${Date.now()}`, ...data, status: 'Requested' }),
  assignRepair: async (id, technicianId) => ({ id, technicianId, status: 'Assigned' }),
  
  getReplacements: async () => [],
  createReplacement: async (data) => ({ id: `RPL-${Date.now()}`, ...data, status: 'Requested' }),
  
  getCases: async () => [],
  createCase: async (data) => ({ id: `CAS-${Date.now()}`, ...data, status: 'Open' }),
  escalateCase: async (id) => ({ id, status: 'Escalated' }),
  
  getAfterSalesAnalytics: async () => ({})
};

export const ReturnAdapter = {
  createReturn: async () => ({ success: true }),
  approveReturn: async () => ({ success: true }),
  rejectReturn: async () => ({ success: true }),
  schedulePickupPlaceholder: async () => ({ success: true }),
  receiveReturnPlaceholder: async () => ({ success: true }),
  completeReturn: async () => ({ success: true })
};

export const WarrantyAdapter = {
  getWarranty: async () => ({}),
  validateWarrantyPlaceholder: async () => ({ valid: true }),
  createClaim: async () => ({ success: true }),
  approveClaim: async () => ({ success: true }),
  rejectClaim: async () => ({ success: true }),
  createRMA: async () => ({ success: true })
};

export const RepairAdapter = {
  createRepair: async () => ({ success: true }),
  assignRepair: async () => ({ success: true }),
  startRepairPlaceholder: async () => ({ success: true }),
  completeRepairPlaceholder: async () => ({ success: true })
};
