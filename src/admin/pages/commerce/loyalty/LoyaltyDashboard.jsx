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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loyalty & Rewards</h1>
          <p className="text-sm text-gray-500 mt-1">Manage points, tiers, rewards, and customer retention programs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Members</p>
            <p className="text-2xl font-bold text-gray-900">{loyaltyAccounts.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiStar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Points Issued</p>
            <p className="text-2xl font-bold text-gray-900">{totalPointsEarned.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <FiGift size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Points Redeemed</p>
            <p className="text-2xl font-bold text-gray-900">{totalPointsRedeemed.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <FiAward size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tier Levels</p>
            <p className="text-2xl font-bold text-gray-900">{tiers.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Program Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/loyalty/ledger" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900">Points Ledger</h3>
              <p className="text-xs text-gray-500 mt-1">View all point transactions across the system.</p>
            </Link>
            <Link to="/admin/loyalty/tiers" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900">Loyalty Tiers</h3>
              <p className="text-xs text-gray-500 mt-1">Configure VIP levels and benefits.</p>
            </Link>
            <Link to="/admin/loyalty/rewards" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900">Reward Catalog</h3>
              <p className="text-xs text-gray-500 mt-1">Manage items customers can redeem with points.</p>
            </Link>
            <Link to="/admin/loyalty/earning-rules" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900">Earning Rules</h3>
              <p className="text-xs text-gray-500 mt-1">Setup point multipliers, bonuses, and events.</p>
            </Link>
            <Link to="/admin/loyalty/referrals" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900">Referral Program</h3>
              <p className="text-xs text-gray-500 mt-1">Monitor refer-a-friend activities.</p>
            </Link>
            <Link to="/admin/settings/loyalty" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900">Program Settings</h3>
              <p className="text-xs text-gray-500 mt-1">Configure expiration rules and global settings.</p>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
             <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
             <Link to="/admin/loyalty/ledger" className="text-sm text-blue-600 hover:underline">View Ledger</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {pointsLedger.slice(0, 5).map(txn => (
               <div key={txn.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                 <div>
                   <p className="text-sm font-medium text-gray-900">{txn.metadata || txn.source}</p>
                   <p className="text-xs text-gray-500 mt-1">Customer ID: {txn.customerId} • {new Date(txn.createdAt).toLocaleDateString()}</p>
                 </div>
                 <div className={`text-sm font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
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
