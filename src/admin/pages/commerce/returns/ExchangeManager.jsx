import React from 'react';
import { useReturns } from '../../../context/ReturnContext';
import { Link } from 'react-router-dom';

export default function ExchangeManager() {
  const { exchanges } = useReturns();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Exchanges</h1>
          <p className="text-sm text-text-muted mt-1">Manage product replacements and exchanges.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        {exchanges.length === 0 ? (
           <div className="p-8 text-center text-text-muted">
             No active exchanges found.
           </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Exchange ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Return Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {exchanges.map(exc => (
                <tr key={exc.id}>
                  {/* Row placeholder for future */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
