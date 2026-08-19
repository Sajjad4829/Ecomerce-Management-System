import React from 'react';
import { useLoyalty } from '../../../../admin/context/LoyaltyContext';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

export default function CustomerLoyaltyHistory() {
  const { getCustomerLedger } = useLoyalty();
  const ledger = getCustomerLedger('cust_1'); // Mock current user

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Points History</h1>
        <p className="text-sm text-gray-500 mt-1">Track how you've earned and spent your points.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {ledger.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No points history available.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
             {ledger.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(txn => (
               <div key={txn.id} className="p-6 flex justify-between items-center hover:bg-gray-50">
                 <div>
                   <p className="font-bold text-gray-900 text-sm md:text-base">{txn.metadata || txn.source}</p>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="text-xs text-gray-500">{new Date(txn.createdAt).toLocaleDateString()}</span>
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                       txn.status === 'Available' || txn.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                     }`}>
                       {txn.status}
                     </span>
                   </div>
                 </div>
                 <div className={`flex items-center gap-1 font-bold text-lg ${txn.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                   {txn.amount > 0 ? <FiArrowUpRight /> : <FiArrowDownRight />}
                   {Math.abs(txn.amount)}
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
