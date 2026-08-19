import React from 'react';
import { useLoyalty } from '../../../../admin/context/LoyaltyContext';
import { FiAward, FiGift, FiStar, FiArrowRight, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CustomerLoyaltyPortal() {
  const { getLoyaltyAccount, getCustomerLedger, tiers } = useLoyalty();
  
  // Mock 'cust_1' for the portal
  const account = getLoyaltyAccount('cust_1');
  const ledger = getCustomerLedger('cust_1');
  
  if (!account) return <div>Loyalty account not found.</div>;

  const currentTier = tiers.find(t => t.id === account.tierId);
  const nextTier = tiers.find(t => t.priority === currentTier.priority + 1);
  
  const progressPercent = nextTier ? Math.min(100, Math.round((account.lifetimeEarned / nextTier.minSpend) * 100)) : 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Loyalty & Rewards</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your points, rewards, and tier benefits.</p>
      </div>

      {/* Tier Card */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 relative overflow-hidden shadow-lg">
         <div className="relative z-10">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">Current Status</p>
               <h2 className="text-4xl font-bold mt-1 text-yellow-400">{currentTier?.name} Member</h2>
             </div>
             <FiAward size={48} className="text-yellow-400 opacity-80" />
           </div>
           
           <div className="mt-8">
             <p className="text-3xl font-bold">{account.availablePoints.toLocaleString()} <span className="text-lg font-normal text-gray-400">pts available</span></p>
           </div>
           
           {nextTier && (
             <div className="mt-8 space-y-2">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-300">Progress to {nextTier.name}</span>
                 <span className="font-bold">{progressPercent}%</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-2">
                 <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
               </div>
               <p className="text-xs text-gray-400">Earn {(nextTier.minSpend - account.lifetimeEarned).toLocaleString()} more points to upgrade.</p>
             </div>
           )}
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
               <FiStar />
             </div>
             <h3 className="font-bold text-gray-900 text-lg">My Benefits</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">{currentTier?.benefits}</p>
          <Link to="/account/loyalty/rewards" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
            Browse Rewards <FiArrowRight />
          </Link>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
               <FiGift />
             </div>
             <h3 className="font-bold text-gray-900 text-lg">Refer a Friend</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Give $20, Get $20. Invite your friends to shop and earn bonus points.</p>
          <Link to="/account/loyalty/referrals" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
            Get Invite Link <FiArrowRight />
          </Link>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Recent Points Activity</h3>
            <Link to="/account/loyalty/history" className="text-blue-600 font-medium text-sm hover:underline">View All</Link>
         </div>
         <div className="divide-y divide-gray-100">
           {ledger.slice(0, 3).map(txn => (
             <div key={txn.id} className="p-4 flex justify-between items-center">
               <div>
                 <p className="font-medium text-gray-900">{txn.metadata || txn.source}</p>
                 <p className="text-xs text-gray-500 mt-1">{new Date(txn.createdAt).toLocaleDateString()}</p>
               </div>
               <div className={`font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                 {txn.amount > 0 ? '+' : ''}{txn.amount} pts
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
