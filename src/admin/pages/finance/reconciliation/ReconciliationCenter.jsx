import React from 'react';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';

export const ReconciliationCenter = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Reconciliation Workspace</h1>
          <p className="text-sm text-neutral-500 mt-1">Match internal transactions with gateway settlements</p>
        </div>
        <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-white rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
          <UploadCloud className="w-4 h-4" /> Import Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
          <CheckCircle className="w-8 h-8 text-emerald-500 mb-3" />
          <h3 className="text-2xl font-serif text-neutral-900">142</h3>
          <p className="text-sm text-neutral-500">Matched Transactions</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm flex flex-col items-center justify-center text-center bg-amber-50">
          <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-2xl font-serif text-amber-900">3</h3>
          <p className="text-sm text-amber-700">Needs Review</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-serif text-neutral-900">$0.00</h3>
          <p className="text-sm text-neutral-500">Discrepancy</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-8 text-center text-neutral-500">
        <p className="max-w-md mx-auto">
          Reconciliation involves matching internal application records with actual bank and payment gateway statements.
          This feature is a frontend placeholder. Actual reconciliation requires integration with the accounting backend.
        </p>
      </div>
    </div>
  );
};
