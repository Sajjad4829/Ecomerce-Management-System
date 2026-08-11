import React from 'react';
import { useLoyalty } from '../../../../admin/context/LoyaltyContext';
import { FiGift } from 'react-icons/fi';

export default function CustomerRewards() {
  const { rewards, getLoyaltyAccount } = useLoyalty();
  const account = getLoyaltyAccount('cust_1');

  if (!account) return <div>Loyalty account not found.</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reward Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Redeem your points for exclusive discounts.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-2xl font-bold text-gray-900">{account.availablePoints.toLocaleString()} pts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.filter(r => r.status === 'Active').map(reward => {
          const canAfford = account.availablePoints >= reward.cost;
          return (
            <div key={reward.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
               <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                  <FiGift size={40} className="text-blue-200" />
               </div>
               <div className="p-6 flex-1 flex flex-col">
                 <h3 className="font-bold text-gray-900 text-lg mb-1">{reward.name}</h3>
                 <p className="text-sm font-bold text-blue-600 mb-4">{reward.cost.toLocaleString()} points</p>
                 
                 <div className="mt-auto pt-4">
                   <button 
                     disabled={!canAfford}
                     className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                       canAfford ? 'bg-[#1A1A1A] text-white hover:bg-black' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                     }`}
                   >
                     {canAfford ? 'Redeem Reward' : 'Not Enough Points'}
                   </button>
                 </div>
               </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
