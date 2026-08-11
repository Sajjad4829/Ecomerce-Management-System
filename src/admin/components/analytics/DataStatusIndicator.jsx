import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiClock, FiXCircle } from 'react-icons/fi';

export default function DataStatusIndicator({ status = 'mock', message = 'Using demo data' }) {
  const config = {
    connected: { icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    mock: { icon: FiAlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    partial: { icon: FiClock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    unavailable: { icon: FiXCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
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
