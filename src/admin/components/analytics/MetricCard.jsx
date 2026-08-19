import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import { useAnalytics } from '../../context/AnalyticsContext';

export default function MetricCard({ title, value, previousValue, trend, format = 'number', prefix = '', suffix = '', info }) {
  const { service } = useAnalytics();
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  const displayValue = format === 'currency' 
    ? service.formatCurrency(value || 0)
    : format === 'percent'
    ? `${value || 0}%`
    : new Intl.NumberFormat('en-US').format(value || 0);

  return (
    <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-text-muted">{title}</h3>
        {info && (
          <div className="text-text-muted cursor-help" title={info}>
            <span className="sr-only">Information</span>
            i
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        {prefix && <span className="text-text-muted">{prefix}</span>}
        <span className="text-2xl font-semibold text-text-primary">{displayValue}</span>
        {suffix && <span className="text-text-muted">{suffix}</span>}
      </div>

      {(trend !== undefined || previousValue !== undefined) && (
        <div className="flex items-center gap-2 text-sm">
          {trend !== undefined && (
            <div className={`flex items-center gap-1 font-medium ${
              isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-text-muted'
            }`}>
              {isPositive ? <FiTrendingUp className="w-4 h-4" /> : isNegative ? <FiTrendingDown className="w-4 h-4" /> : <FiMinus className="w-4 h-4" />}
              <span>{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
          {previousValue !== undefined && (
            <span className="text-text-muted">
              vs previous period
            </span>
          )}
        </div>
      )}
    </div>
  );
}
