import React, { useState } from 'react';
import { FiSearch, FiFilter, FiArrowUpRight, FiArrowDownRight, FiPlus } from 'react-icons/fi';
import { useLoyalty } from '../../../context/LoyaltyContext';
import PointAdjustmentModal from './PointAdjustmentModal';

export default function PointsLedger() {
  const { pointsLedger } = useLoyalty();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLedger = pointsLedger.filter(txn => 
    txn.customerId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Points Ledger</h1>
          <p className="text-sm text-text-muted mt-1 tracking-wide">Immutable record of all point transactions across the platform.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <FiPlus /> Adjust Points
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by customer ID or transaction ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background flex items-center gap-2">
            <FiFilter /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Type & Source</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {filteredLedger.map((txn) => (
                <tr key={txn.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-secondary">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:underline cursor-pointer">{txn.customerId}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-text-primary">{txn.type}</p>
                    <p className="text-xs text-text-muted">{txn.source} • {txn.referenceId}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`inline-flex items-center gap-1 text-sm font-bold ${txn.amount > 0 ? 'text-success' : 'text-text-primary'}`}>
                      {txn.amount > 0 ? <FiArrowUpRight /> : <FiArrowDownRight />}
                      {Math.abs(txn.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      txn.status === 'Available' || txn.status === 'Completed' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-muted">
                    {new Date(txn.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PointAdjustmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
