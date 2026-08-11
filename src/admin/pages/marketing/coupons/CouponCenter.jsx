import React, { useState } from 'react';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { Search, Plus, ExternalLink, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CouponCenter = () => {
  const { coupons } = useMarketing();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Coupons</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage discount codes and usage limits</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-white rounded-md hover:bg-neutral-50 flex items-center gap-2 text-sm font-medium">
            <Settings className="w-4 h-4" /> Bulk Generator
          </button>
          <button 
            onClick={() => navigate('/admin/marketing/coupons/new')}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Create Coupon
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coupon codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Promotion Linked</th>
              <th className="px-6 py-4 font-medium">Usage</th>
              <th className="px-6 py-4 font-medium">Limit</th>
              <th className="px-6 py-4 font-medium">Expiry</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium font-mono text-neutral-900">{coupon.code}</td>
                <td className="px-6 py-4 text-indigo-600 hover:underline cursor-pointer">{coupon.promotionId}</td>
                <td className="px-6 py-4 text-neutral-900">{coupon.usage}</td>
                <td className="px-6 py-4 text-neutral-600">{coupon.limit || 'Unlimited'}</td>
                <td className="px-6 py-4 text-neutral-600 text-xs">{coupon.expiry}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    coupon.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    {coupon.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
