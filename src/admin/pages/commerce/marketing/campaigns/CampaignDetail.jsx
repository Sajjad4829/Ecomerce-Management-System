import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTag, FiCalendar, FiClock } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, promotions } = usePromotion();

  const campaign = campaigns.find(c => c.id === id);
  if (!campaign) return <div className="p-8 text-center text-text-muted">Campaign not found</div>;

  const campaignPromotions = promotions.filter(p => p.campaignId === id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/campaigns')}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{campaign.name}</h1>
            <div className="flex items-center gap-3 mt-1">
               <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                 campaign.status === 'Active' ? 'bg-success-soft text-success' :
                 campaign.status === 'Scheduled' ? 'bg-warning-soft text-warning' :
                 'bg-gray-100 text-text-secondary'
               }`}>
                 {campaign.status}
               </span>
               <span className="text-sm text-text-muted">{campaign.type}</span>
            </div>
          </div>
        </div>
        <Link 
          to={`/admin/marketing/campaigns/${id}/edit`}
          className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2 shadow-sm"
        >
          <FiEdit2 /> Edit Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
             <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
               <h2 className="font-bold text-text-primary">Promotions</h2>
               <Link to={`/admin/marketing/promotions/new?campaignId=${id}`} className="text-sm text-primary font-medium hover:text-blue-800">
                 + Add Promotion
               </Link>
             </div>
             <div className="p-0">
               {campaignPromotions.length > 0 ? (
                 <table className="w-full text-left text-sm">
                   <thead className="bg-background border-b border-border text-text-muted">
                     <tr>
                       <th className="px-6 py-3 font-medium">Name</th>
                       <th className="px-6 py-3 font-medium">Type</th>
                       <th className="px-6 py-3 font-medium">Target</th>
                       <th className="px-6 py-3 font-medium text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {campaignPromotions.map(promo => (
                       <tr key={promo.id} className="hover:bg-background">
                         <td className="px-6 py-4 font-medium text-text-primary">{promo.name}</td>
                         <td className="px-6 py-4 text-text-secondary">{promo.type}</td>
                         <td className="px-6 py-4 text-text-secondary">{promo.target}</td>
                         <td className="px-6 py-4 text-right">
                           <Link to={`/admin/marketing/promotions/${promo.id}/edit`} className="text-primary hover:text-blue-800 font-medium">Edit</Link>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               ) : (
                 <div className="p-8 text-center text-text-muted">
                   No promotions in this campaign yet.
                 </div>
               )}
             </div>
           </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
             <h2 className="font-bold text-text-primary">Schedule Details</h2>
             <div className="space-y-3">
               <div className="flex items-center gap-3 text-sm">
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary">
                   <FiCalendar />
                 </div>
                 <div>
                   <p className="text-text-muted text-xs">Start Date</p>
                   <p className="font-medium text-text-primary">{campaign.startDate || 'Not set'}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 text-sm">
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary">
                   <FiClock />
                 </div>
                 <div>
                   <p className="text-text-muted text-xs">End Date</p>
                   <p className="font-medium text-text-primary">{campaign.endDate || 'Not set'}</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
             <h2 className="font-bold text-text-primary">Performance (Mock)</h2>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-text-muted">Orders Influenced</span>
                   <span className="font-medium">1,245</span>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-text-muted">Revenue Impact</span>
                   <span className="font-medium">৳12,45,000</span>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-text-muted">Total Discounts</span>
                   <span className="font-medium">৳45,000</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
