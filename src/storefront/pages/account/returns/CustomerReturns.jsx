import React from 'react';
import { Link } from 'react-router-dom';
import { useReturns } from '../../../../admin/context/ReturnContext';
import { FiRefreshCw, FiChevronRight } from 'react-icons/fi';

export default function CustomerReturns() {
  const { returns } = useReturns();
  // Assume logged in as Sarah Jenkins for preview purposes
  const myReturns = returns.filter(r => r.customer.name === 'Sarah Jenkins');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">My Returns</h2>
        <Link to="/account/returns/new" className="px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors flex items-center gap-2">
          <FiRefreshCw size={16} /> Start a Return
        </Link>
      </div>

      {myReturns.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-black/5 text-center shadow-sm">
          <FiRefreshCw className="mx-auto text-gray-300 mb-4" size={32} />
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No returns yet</h3>
          <p className="text-gray-500 mb-6">You haven't requested any returns.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
          <div className="divide-y divide-black/5">
            {myReturns.map((ret) => (
              <div key={ret.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <Link to={`/account/returns/${ret.id}`} className="font-bold text-[#1A1A1A] hover:underline">
                      {ret.id}
                    </Link>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      ret.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      ret.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ret.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Order: {ret.orderId} • Requested on {new Date(ret.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-700 mt-2">{ret.items[0].name} {ret.items.length > 1 && `+ ${ret.items.length - 1} more`}</p>
                </div>
                <div>
                  <Link to={`/account/returns/${ret.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                    View Details <FiChevronRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
