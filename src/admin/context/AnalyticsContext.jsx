import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyticsService } from '../services/AnalyticsService';

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [comparisonRange, setComparisonRange] = useState('Previous Period');
  const [filters, setFilters] = useState({});
  const [reports, setReports] = useState([]);
  const [widgets, setWidgets] = useState([]);

  // Mock initial fetch
  useEffect(() => {
    // Load saved reports/widgets here in future
  }, []);

  const value = {
    dateRange,
    setDateRange,
    comparisonRange,
    setComparisonRange,
    filters,
    setFilters,
    clearFilters: () => setFilters({}),
    reports,
    saveReport: (r) => setReports([...reports, { ...r, id: Date.now() }]),
    widgets,
    updateWidgetLayout: setWidgets,
    service: analyticsService
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);
