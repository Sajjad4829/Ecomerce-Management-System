export function validateAuditFilter(filters) {
  if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
    if (new Date(filters.dateRange.start) > new Date(filters.dateRange.end)) {
      throw new Error('Invalid date range: start date must be before end date.');
    }
  }
  return true;
}

export function validateReport(report) {
  if (!report.name) throw new Error('Report name is required.');
  if (!report.eventSource) throw new Error('Event source is required.');
  return true;
}

export function validateAlertRule(rule) {
  if (!rule.event) throw new Error('Event type is required.');
  if (!rule.condition) throw new Error('Alert condition is required.');
  if (!rule.severity) throw new Error('Severity is required.');
  return true;
}
