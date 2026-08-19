import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiClock, FiXCircle } from 'react-icons/fi';

export default function DataStatusIndicator({ status = 'mock', message = 'Using demo data' }) {
  const config = {
    connected: { icon: FiCheckCircle, color: 'text-success', bg: 'bg-success-soft', border: 'border-green-200' },
    mock: { icon: FiAlertCircle, color: 'text-warning', bg: 'bg-warning-soft', border: 'border-amber-200' },
    partial: { icon: FiClock, color: 'text-primary', bg: 'bg-blue-50', border: 'border-blue-200' },
    unavailable: { icon: FiXCircle, color: 'text-danger', bg: 'bg-danger-soft', border: 'border-red-200' },
  };

  const current = config[status] || config.mock;
  const Icon = current.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${current.bg} ${current.border} ${current.color} text-xs font-medium`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{message}</span>
    </div>
  );
}
