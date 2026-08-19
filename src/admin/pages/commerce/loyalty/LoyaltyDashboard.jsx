import React from 'react';
import { FiUsers, FiAward, FiGift, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLoyalty } from '../../../context/LoyaltyContext';

export default function LoyaltyDashboard() {
  const { loyaltyAccounts, pointsLedger, tiers } = useLoyalty();

  const totalPointsEarned = pointsLedger.filter(l => l.amount > 0).reduce((acc, l) => acc + l.amount, 0);
  const totalPointsRedeemed = Math.abs(pointsLedger.filter(l => l.amount < 0 && l.type === 'Redeemed').reduce((acc, l) => acc + l.amount, 0));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Loyalty & Rewards</h1>
          <p className="text-sm text-text-muted mt-1 tracking-wide">Manage points, tiers, rewards, and customer retention programs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-primary">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Active Members</p>
            <p className="text-3xl font-light text-text-primary mt-1">{loyaltyAccounts.length}</p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiStar size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Points Issued</p>
            <p className="text-3xl font-light text-text-primary mt-1">{totalPointsEarned.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-success">
            <FiGift size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Points Redeemed</p>
            <p className="text-3xl font-light text-text-primary mt-1">{totalPointsRedeemed.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <FiAward size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Tier Levels</p>
            <p className="text-3xl font-light text-text-primary mt-1">{tiers.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-serif text-text-primary border-b border-border-hover pb-3">Program Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/customers/loyalty/ledger" className="p-5 border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Points Ledger</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">View all point transactions across the system.</p>
            </Link>
            <Link to="/admin/customers/loyalty/tiers" className="p-5 border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Loyalty Tiers</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">Configure VIP levels and benefits.</p>
            </Link>
            <Link to="/admin/customers/loyalty/rewards" className="p-5 border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Reward Catalog</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">Manage items customers can redeem with points.</p>
            </Link>
            <Link to="/admin/customers/loyalty/earning-rules" className="p-5 border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Earning Rules</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">Setup point multipliers, bonuses, and events.</p>
            </Link>
            <Link to="/admin/customers/loyalty/referrals" className="p-5 border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Referral Program</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">Monitor refer-a-friend activities.</p>
            </Link>
            <Link to="/admin/settings/loyalty" className="p-5 border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Program Settings</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">Configure expiration rules and global settings.</p>
            </Link>
          </div>
        </div>
        
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
             <h2 className="text-lg font-serif text-text-primary">Recent Transactions</h2>
             <Link to="/admin/customers/loyalty/ledger" className="text-sm font-medium text-primary hover:text-blue-700 transition-colors flex items-center gap-1">View Ledger &rarr;</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {pointsLedger.slice(0, 5).map(txn => (
               <div key={txn.id} className="p-4 flex justify-between items-center hover:bg-background">
                 <div>
                   <p className="text-sm font-medium text-text-primary">{txn.metadata || txn.source}</p>
                   <p className="text-xs text-text-muted mt-1">Customer ID: {txn.customerId} • {new Date(txn.createdAt).toLocaleDateString()}</p>
                 </div>
                 <div className={`text-sm font-bold ${txn.amount > 0 ? 'text-success' : 'text-text-primary'}`}>
                    {txn.amount > 0 ? '+' : ''}{txn.amount} pts
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
