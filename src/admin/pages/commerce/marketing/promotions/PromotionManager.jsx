import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTag, FiClock, FiCheckCircle } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function PromotionManager() {
  const { promotions, campaigns } = usePromotion();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage individual discount rules and promotional offers.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/marketing/promotions/new" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus /> Create Promotion
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiTag />
            </div>
            <h3 className="font-medium text-gray-900">Total Promotions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{promotions.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <FiCheckCircle />
            </div>
            <h3 className="font-medium text-gray-900">Active</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{promotions.filter(p => p.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FiClock />
            </div>
            <h3 className="font-medium text-gray-900">Scheduled</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{promotions.filter(p => p.status === 'Scheduled').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-900">All Promotions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Promotion Name</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Discount</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {promotions.map((promo) => {
                const campaign = campaigns.find(c => c.id === promo.campaignId);
                return (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{promo.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      promo.status === 'Active' ? 'bg-green-100 text-green-700' :
                      promo.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {campaign ? <Link to={`/admin/marketing/campaigns/${campaign.id}`} className="text-blue-600 hover:underline">{campaign.name}</Link> : 'Standalone'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {promo.type === 'Percentage Discount' ? `${promo.discountValue}% Off` : 
                     promo.type === 'Free Shipping' ? 'Free Shipping' : 
                     `৳${promo.discountValue} Off`}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {promo.target} {promo.targetValue && `(${promo.targetValue})`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/marketing/promotions/${promo.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              )})}
              {promotions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No promotions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
