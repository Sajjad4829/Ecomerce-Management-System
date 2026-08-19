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
          <h1 className="text-2xl font-bold text-text-primary">Promotions</h1>
          <p className="text-sm text-text-muted mt-1">Manage individual discount rules and promotional offers.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/marketing/promotions/new" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus /> Create Promotion
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <FiTag />
            </div>
            <h3 className="font-medium text-text-primary">Total Promotions</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{promotions.length}</p>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center">
              <FiCheckCircle />
            </div>
            <h3 className="font-medium text-text-primary">Active</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{promotions.filter(p => p.status === 'Active').length}</p>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-warning-soft text-warning flex items-center justify-center">
              <FiClock />
            </div>
            <h3 className="font-medium text-text-primary">Scheduled</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{promotions.filter(p => p.status === 'Scheduled').length}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
          <h2 className="font-bold text-text-primary">All Promotions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background border-b border-border text-text-muted">
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
                <tr key={promo.id} className="hover:bg-background">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{promo.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      promo.status === 'Active' ? 'bg-success-soft text-success' :
                      promo.status === 'Scheduled' ? 'bg-warning-soft text-warning' :
                      'bg-gray-100 text-text-secondary'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {campaign ? <Link to={`/admin/marketing/campaigns/${campaign.id}`} className="text-primary hover:underline">{campaign.name}</Link> : 'Standalone'}
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {promo.type === 'Percentage Discount' ? `${promo.discountValue}% Off` : 
                     promo.type === 'Free Shipping' ? 'Free Shipping' : 
                     `৳${promo.discountValue} Off`}
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {promo.target} {promo.targetValue && `(${promo.targetValue})`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/marketing/promotions/${promo.id}/edit`} className="text-primary hover:text-blue-800 font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              )})}
              {promotions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-text-muted">
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
