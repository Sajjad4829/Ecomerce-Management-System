export class AnalyticsService {
  constructor(adapter) {
    this.adapter = adapter;
  }

  // MOCK DATA GENERATORS
  
  getOverviewMetrics() {
    return {
      revenue: { current: 124500, previous: 98000, trend: 27 },
      netRevenue: { current: 110000, previous: 85000, trend: 29.4 },
      orders: { current: 1450, previous: 1200, trend: 20.8 },
      aov: { current: 85.86, previous: 81.66, trend: 5.1 },
      customers: { current: 320, previous: 280, trend: 14.3 },
      returningRate: { current: 45.2, previous: 42.1, trend: 7.3 },
      conversionRate: { current: 3.2, previous: 2.8, trend: 14.2 },
      returns: { current: 24, previous: 18, trend: -33.3 },
    };
  }

  getSalesMetrics() {
    return {
      trend: [
        { date: '2023-10-01', revenue: 4000, orders: 40 },
        { date: '2023-10-02', revenue: 3000, orders: 30 },
        { date: '2023-10-03', revenue: 5000, orders: 50 },
        { date: '2023-10-04', revenue: 4500, orders: 45 },
        { date: '2023-10-05', revenue: 6000, orders: 60 },
        { date: '2023-10-06', revenue: 5500, orders: 55 },
        { date: '2023-10-07', revenue: 7000, orders: 70 },
      ],
      grossSales: 130000,
      discounts: 5000,
      refunds: 500,
      netSales: 124500,
      unitsSold: 2100,
    };
  }

  getOrderMetrics() {
    return {
      statusDistribution: [
        { name: 'Delivered', value: 800 },
        { name: 'Processing', value: 400 },
        { name: 'Shipped', value: 200 },
        { name: 'Pending', value: 50 },
      ],
      totalOrders: 1450,
      cancelled: 12,
      returned: 24
    };
  }

  getCustomerMetrics() {
    return {
      totalCustomers: 8500,
      newCustomers: 320,
      returningCustomers: 8180,
      activeCustomers: 4500,
      atRiskCustomers: 300,
      vipCustomers: 150,
      growth: [
        { date: '2023-10-01', new: 10, returning: 100 },
        { date: '2023-10-02', new: 15, returning: 120 },
      ]
    };
  }

  getProductMetrics() {
    return {
      bestSellers: [
        { id: 1, name: 'Modern Sofa', units: 145, revenue: 145000 },
        { id: 2, name: 'Dining Table', units: 89, revenue: 89000 },
      ],
      lowPerforming: [
        { id: 3, name: 'Vase', units: 2, revenue: 100 },
      ],
      mostViewed: [],
      mostAddedToCart: []
    };
  }

  getCategoryMetrics() { return { revenue: [], sales: [] }; }
  getCollectionMetrics() { return { revenue: [], orders: [] }; }
  getInventoryMetrics() { return { total: 15000, lowStock: 24, outOfStock: 5, value: 450000 }; }
  getMarketingMetrics() { return { activeCampaigns: 5, audienceSize: 15000, engagement: 4.5, conversion: 2.1 }; }
  getPromotionMetrics() { return { active: 3, usage: 450, discountValue: 12500, revenueImpact: 45000 }; }
  getSearchMetrics() { return { total: 12000, unique: 4500, zeroResultRate: 2.4, conversion: 1.8 }; }
  getLoyaltyMetrics() { return { members: 4500, pointsIssued: 150000, pointsRedeemed: 45000 }; }
  getReviewMetrics() { return { total: 1250, averageRating: 4.6, pending: 15 }; }
  getReturnMetrics() { return { requests: 45, approved: 40, completed: 35, returnRate: 3.1 }; }
  getSupportMetrics() { return { openTickets: 12, resolvedTickets: 450, resolutionTime: 4.5, satisfaction: 4.8 }; }
  getCMSMetrics() { return { pageViews: 145000, bounceRate: 45.2 }; }

  getReportData(query) {
    return { data: [], status: 'mock' };
  }
}
export const analyticsService = new AnalyticsService();
