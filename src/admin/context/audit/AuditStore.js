import { useState, useEffect, useCallback } from 'react';
import { auditService } from '../../services/audit/AuditService';

export function useAuditStore() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const loadEvents = useCallback(async (currentFilters = filters) => {
    setLoading(true);
    try {
      const data = await auditService.getEvents(currentFilters);
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    events,
    filters,
    loading,
    updateFilters,
    clearFilters,
    loadEvents
  };
}
