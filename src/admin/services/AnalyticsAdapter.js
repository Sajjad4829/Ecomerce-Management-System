export class AnalyticsAdapter {
  // Future abstraction for external analytics provider
  // e.g., REST API, MongoDB aggregation, Data Warehouse

  async fetchOverviewMetrics(filters) {
    throw new Error('Not implemented');
  }

  async fetchSalesMetrics(filters) {
    throw new Error('Not implemented');
  }

  async fetchReportData(query) {
    throw new Error('Not implemented');
  }
}
