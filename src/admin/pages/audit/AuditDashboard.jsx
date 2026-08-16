import React from 'react';
import { FiActivity, FiAlertCircle, FiShield, FiLock } from 'react-icons/fi';
import { useAuditStore } from '../../context/audit/AuditStore';
import AuditTimeline from '../../components/audit/AuditTimeline';
import { Link } from 'react-router-dom';

export default function AuditDashboard() {
  const { events, loading } = useAuditStore();
  
  const highRiskEvents = events.filter(e => e.severity === 'High' || e.severity === 'Critical');
  const failedEvents = events.filter(e => e.status === 'Failed');
  
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Audit & Compliance Center</h1>
        <p className="text-sm text-text-muted mt-1">Monitor system activity, access controls, and security events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 text-text-secondary mb-2">
            <FiActivity />
            <h3 className="font-medium text-sm">Total Events</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{events.length}</p>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 text-danger mb-2">
            <FiAlertCircle />
            <h3 className="font-medium text-sm">High Risk</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{highRiskEvents.length}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 text-orange-600 mb-2">
            <FiLock />
            <h3 className="font-medium text-sm">Failed Actions</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{failedEvents.length}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <FiShield />
            <h3 className="font-medium text-sm">Active Admins</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{new Set(events.map(e => e.actor)).size}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-lg">Recent Activity</h3>
            <Link to="/admin/settings/audit/logs" className="text-sm text-text-secondary hover:text-text-primary">View All</Link>
          </div>
          {loading ? (
            <div className="animate-pulse h-40 bg-stone-100 rounded-lg"></div>
          ) : (
            <AuditTimeline events={events.slice(0, 5)} />
          )}
        </div>

        <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-lg">High Risk Activity</h3>
            <Link to="/admin/settings/audit/logs?severity=High" className="text-sm text-text-secondary hover:text-text-primary">View All</Link>
          </div>
          {loading ? (
            <div className="animate-pulse h-40 bg-stone-100 rounded-lg"></div>
          ) : (
            <AuditTimeline events={highRiskEvents.slice(0, 5)} />
          )}
        </div>
      </div>
    </div>
  );
}
