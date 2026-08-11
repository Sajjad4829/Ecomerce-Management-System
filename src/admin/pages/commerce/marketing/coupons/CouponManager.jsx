import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTag, FiClock, FiCheckCircle } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function CouponManager() {
  const { coupons } = usePromotion();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          <p className="text-sm text-gray-500 mt-1">Manage discount codes and track their usage.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/marketing/coupons/new" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus /> Create Coupon
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-900">All Coupons</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Coupon Code</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Discount</th>
                <th className="px-6 py-4 font-medium">Usage</th>
                <th className="px-6 py-4 font-medium">Validity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 font-mono tracking-wider">{coupon.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.status === 'Active' ? 'bg-green-100 text-green-700' :
                      coupon.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {coupon.type === 'Percentage Discount' ? `${coupon.discountValue}% Off` : `৳${coupon.discountValue} Off`}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {coupon.usedCount} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : ''}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs">
                    {coupon.startDate} <br/>to {coupon.endDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/marketing/coupons/${coupon.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No coupons found.
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
