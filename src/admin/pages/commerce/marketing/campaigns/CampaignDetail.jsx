import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTag, FiCalendar, FiClock } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, promotions } = usePromotion();

  const campaign = campaigns.find(c => c.id === id);
  if (!campaign) return <div className="p-8 text-center text-gray-500">Campaign not found</div>;

  const campaignPromotions = promotions.filter(p => p.campaignId === id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/campaigns')}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <div className="flex items-center gap-3 mt-1">
               <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                 campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                 campaign.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                 'bg-gray-100 text-gray-700'
               }`}>
                 {campaign.status}
               </span>
               <span className="text-sm text-gray-500">{campaign.type}</span>
            </div>
          </div>
        </div>
        <Link 
          to={`/admin/marketing/campaigns/${id}/edit`}
          className="px-4 py-2 bg-white border border-black/10 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <FiEdit2 /> Edit Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
               <h2 className="font-bold text-gray-900">Promotions</h2>
               <Link to={`/admin/marketing/promotions/new?campaignId=${id}`} className="text-sm text-blue-600 font-medium hover:text-blue-800">
                 + Add Promotion
               </Link>
             </div>
             <div className="p-0">
               {campaignPromotions.length > 0 ? (
                 <table className="w-full text-left text-sm">
                   <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                     <tr>
                       <th className="px-6 py-3 font-medium">Name</th>
                       <th className="px-6 py-3 font-medium">Type</th>
                       <th className="px-6 py-3 font-medium">Target</th>
                       <th className="px-6 py-3 font-medium text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {campaignPromotions.map(promo => (
                       <tr key={promo.id} className="hover:bg-gray-50">
                         <td className="px-6 py-4 font-medium text-gray-900">{promo.name}</td>
                         <td className="px-6 py-4 text-gray-600">{promo.type}</td>
                         <td className="px-6 py-4 text-gray-600">{promo.target}</td>
                         <td className="px-6 py-4 text-right">
                           <Link to={`/admin/marketing/promotions/${promo.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               ) : (
                 <div className="p-8 text-center text-gray-500">
                   No promotions in this campaign yet.
                 </div>
               )}
             </div>
           </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
             <h2 className="font-bold text-gray-900">Schedule Details</h2>
             <div className="space-y-3">
               <div className="flex items-center gap-3 text-sm">
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                   <FiCalendar />
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs">Start Date</p>
                   <p className="font-medium text-gray-900">{campaign.startDate || 'Not set'}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 text-sm">
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                   <FiClock />
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs">End Date</p>
                   <p className="font-medium text-gray-900">{campaign.endDate || 'Not set'}</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
             <h2 className="font-bold text-gray-900">Performance (Mock)</h2>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-gray-500">Orders Influenced</span>
                   <span className="font-medium">1,245</span>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-gray-500">Revenue Impact</span>
                   <span className="font-medium">৳12,45,000</span>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-gray-500">Total Discounts</span>
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
