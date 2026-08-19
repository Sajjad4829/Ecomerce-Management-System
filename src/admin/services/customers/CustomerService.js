// Mock service for customer operations
export const CustomerService = {
  getCustomers: async () => {
    return [];
  },
  getCustomer: async (id) => {
    return null;
  },
  updateCustomer: async (id, data) => {
    return { id, ...data };
  },
  getCustomerOrders: async (id) => {
    return [];
  },
  getCustomerWishlist: async (id) => {
    return [];
  },
  getCustomerReviews: async (id) => {
    return [];
  },
  getCustomerActivity: async (id) => {
    return [];
  },
  getCustomerNotes: async (id) => {
    return [];
  },
  addCustomerNote: async (id, note) => {
    return { id: `note-${Date.now()}`, customerId: id, content: note };
  },
  getSegments: async () => {
    return [];
  },
  createSegment: async (data) => {
    return { id: `seg-${Date.now()}`, ...data };
  },
  updateSegment: async (id, data) => {
    return { id, ...data };
  }
};
