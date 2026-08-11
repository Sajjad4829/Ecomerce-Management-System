// Mock Search Service
export class SearchService {
  static async searchAll(query, filters = {}) {
    // In production, this would call SearchAdapter
    return [];
  }
  static async searchProducts(query) { return []; }
  static async searchOrders(query) { return []; }
  static async searchCustomers(query) { return []; }
  static async searchCMS(query) { return []; }
  static async searchInventory(query) { return []; }
  static async searchStaff(query) { return []; }
  static async searchMarketing(query) { return []; }
}
