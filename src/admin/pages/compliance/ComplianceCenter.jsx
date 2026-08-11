import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiFileText, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ComplianceCenter() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Compliance Center</h1>
        <p className="text-sm text-text-muted mt-1">Review system compliance, generate reports, and manage policies</p>
      </div>

      <div className="bg-warning-soft p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Important:</strong> This interface manages compliance workflows. It does <em>not</em> certify GDPR, SOC 2, or PCI compliance on its own.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-2">
            <FiCheckCircle size={24} />
          </div>
          <h3 className="font-medium text-text-primary">Access Review</h3>
          <p className="text-xs text-text-muted">Up to date</p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-2">
            <FiShield size={24} />
          </div>
          <h3 className="font-medium text-text-primary">Audit Coverage</h3>
          <p className="text-xs text-text-muted">All modules logging</p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 bg-stone-100 text-text-secondary rounded-full flex items-center justify-center mb-2">
            <FiFileText size={24} />
          </div>
          <h3 className="font-medium text-text-primary">Data Export</h3>
          <p className="text-xs text-text-muted">No recent anomalies</p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 bg-warning-soft text-warning rounded-full flex items-center justify-center mb-2">
            <FiAlertCircle size={24} />
          </div>
          <h3 className="font-medium text-text-primary">Security Events</h3>
          <p className="text-xs text-text-muted">3 events require review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="font-serif font-bold text-lg text-text-primary mb-4">Compliance Reports</h3>
          <p className="text-sm text-text-secondary mb-6">Generate standardized reports for internal audits, access reviews, and data modifications.</p>
          <div className="space-y-3">
            <Link to="/admin/compliance/reports" className="block px-4 py-3 bg-background hover:bg-stone-100 rounded-lg text-sm font-medium transition-colors">
              View Generated Reports
            </Link>
            <Link to="/admin/compliance/reports/new" className="block px-4 py-3 bg-background hover:bg-stone-100 rounded-lg text-sm font-medium transition-colors">
              Create New Report
            </Link>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="font-serif font-bold text-lg text-text-primary mb-4">Policies & Controls</h3>
          <p className="text-sm text-text-secondary mb-6">Configure data retention limits and define system-wide security alert rules.</p>
          <div className="space-y-3">
            <Link to="/admin/audit/retention" className="block px-4 py-3 bg-background hover:bg-stone-100 rounded-lg text-sm font-medium transition-colors">
              Configure Data Retention
            </Link>
            <Link to="/admin/audit/alerts" className="block px-4 py-3 bg-background hover:bg-stone-100 rounded-lg text-sm font-medium transition-colors">
              Manage Security Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
