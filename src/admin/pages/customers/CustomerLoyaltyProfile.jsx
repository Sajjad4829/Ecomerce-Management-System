import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiPlus, FiMinus, FiClock, FiStar, FiAward, FiGift } from 'react-icons/fi';
import { useLoyalty } from '../../context/LoyaltyContext';

export function CustomerLoyaltyProfile() {
  const { customer } = useOutletContext();
  const { getLoyaltyAccount, getCustomerLedger, adjustPoints } = useLoyalty();
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustType, setAdjustType] = useState('add');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  const account = getLoyaltyAccount(customer.id);
  const ledger = getCustomerLedger(customer.id);

  const handleAdjustPoints = (e) => {
    e.preventDefault();
    const amount = adjustType === 'add' ? parseInt(adjustAmount) : -parseInt(adjustAmount);
    adjustPoints(customer.id, amount, 'Manual Adjustment', adjustReason);
    setIsAdjustModalOpen(false);
    setAdjustAmount('');
    setAdjustReason('');
  };

  if (!account) {
    return (
      <div className="text-center p-12 border border-dashed border-border rounded-xl">
        <FiAward className="mx-auto text-4xl text-text-muted mb-4" />
        <h3 className="text-lg font-bold text-text-primary">No Loyalty Account</h3>
        <p className="text-sm text-text-muted mt-2">This customer has not joined the loyalty program yet.</p>
        <button className="mt-6 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
          Enroll Customer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-serif text-text-primary">Loyalty & Rewards</h3>
        <button 
          onClick={() => setIsAdjustModalOpen(true)}
          className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2"
        >
          <FiStar /> Adjust Points
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-soft p-6 rounded-xl border border-indigo-100 flex flex-col justify-between">
          <p className="text-sm text-indigo-800 font-medium uppercase tracking-wider mb-2">Available Points</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-serif text-indigo-900">{account.availablePoints}</p>
            <p className="text-sm text-indigo-600 font-medium">pts</p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
          <p className="text-sm text-text-muted font-medium uppercase tracking-wider mb-2">Current Tier</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <FiAward size={20} />
            </div>
            <p className="text-2xl font-bold text-text-primary capitalize">{account.tierId.replace('tier_', '')}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
          <p className="text-sm text-text-muted font-medium uppercase tracking-wider mb-2">Lifetime Earned</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-text-primary">{account.lifetimeEarned}</p>
            <p className="text-sm text-text-muted font-medium">pts</p>
          </div>
          <div className="mt-2 text-xs text-text-muted">
            {account.lifetimeRedeemed} pts redeemed
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-md font-bold text-text-primary mb-4">Transaction History</h4>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ledger.map((txn) => (
                <tr key={txn.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-text-primary">{txn.type}</p>
                    <p className="text-xs text-text-muted">{txn.metadata}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {txn.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-bold ${txn.amount > 0 ? 'text-success' : 'text-text-primary'}`}>
                      {txn.amount > 0 ? '+' : ''}{txn.amount}
                    </span>
                  </td>
                </tr>
              ))}
              {ledger.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-text-muted text-sm">
                    No transactions found for this customer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAdjustModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-text-primary">Adjust Points</h2>
              <p className="text-sm text-text-muted mt-1">Manually add or deduct points for {customer.firstName}.</p>
            </div>
            <form onSubmit={handleAdjustPoints} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Adjustment Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAdjustType('add')}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${adjustType === 'add' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-border-hover bg-surface text-text-secondary hover:bg-background'}`}
                  >
                    <FiPlus /> Add Points
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustType('deduct')}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${adjustType === 'deduct' ? 'border-red-600 bg-red-600 text-white' : 'border-border-hover bg-surface text-text-secondary hover:bg-background'}`}
                  >
                    <FiMinus /> Deduct Points
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Amount</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
                  placeholder="e.g. 500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Reason / Note</label>
                <input 
                  type="text" 
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
                  placeholder="e.g. Customer service appeasement"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="px-4 py-2 bg-background border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
