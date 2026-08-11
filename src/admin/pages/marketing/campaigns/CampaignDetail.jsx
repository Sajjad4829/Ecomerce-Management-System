import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { ArrowLeft, Play, Pause, Edit, Users, Image, Tag, Calendar } from 'lucide-react';

export const CampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { getCampaign } = useMarketing();
  const camp = getCampaign(campaignId);

  if (!camp) return <div className="p-8">Campaign not found.</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/campaigns')}
            className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-3">
              {camp.name}
              <span className={`text-sm font-sans font-medium px-2.5 py-0.5 rounded-full ${
                camp.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                camp.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-neutral-100 text-neutral-800'
              }`}>
                {camp.status}
              </span>
            </h1>
            <p className="text-sm text-neutral-500 mt-1">{camp.id} • {camp.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-white rounded-md hover:bg-neutral-50 flex items-center gap-2">
            <Edit className="w-4 h-4" /> Edit
          </button>
          {camp.status === 'Active' ? (
            <button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 font-medium flex items-center gap-2">
              <Pause className="w-4 h-4" /> Pause Campaign
            </button>
          ) : (
            <button className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-md hover:bg-emerald-200 font-medium flex items-center gap-2">
              <Play className="w-4 h-4" /> Activate
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-neutral-400"/> Schedule & Channels</h3>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Duration</div>
                <div className="font-medium text-neutral-900">{camp.startDate}</div>
                <div className="text-neutral-500 my-1">to</div>
                <div className="font-medium text-neutral-900">{camp.endDate}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Channels</div>
                <div className="flex flex-wrap gap-2">
                  {camp.channels.map(ch => (
                    <span key={ch} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">{ch}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-neutral-400"/> Linked Promotions & Content</h3>
            <div className="space-y-4">
              <div className="p-4 border border-neutral-100 rounded bg-neutral-50 flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900 text-sm">15% Off Summer Collection</div>
                  <div className="text-xs text-neutral-500 mt-1">Promotion • Active</div>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:underline">View</button>
              </div>
              <div className="p-4 border border-neutral-100 rounded bg-neutral-50 flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900 text-sm flex items-center gap-2"><Image className="w-4 h-4"/> Summer Sale Hero Banner</div>
                  <div className="text-xs text-neutral-500 mt-1">Banner • Homepage Hero</div>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:underline">View</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-neutral-400"/> Audience</h3>
            <div className="text-sm">
              <div className="font-medium text-neutral-900">{camp.audience}</div>
              <div className="text-neutral-500 mt-2">Est. Reach: 4,500 customers</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4">Analytics (Placeholder)</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-neutral-500 mb-1">Conversion Rate</div>
                <div className="text-xl font-medium text-neutral-900">4.2%</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500 mb-1">Revenue Generated</div>
                <div className="text-xl font-medium text-neutral-900">$12,450</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500 mb-1">Coupon Usage</div>
                <div className="text-xl font-medium text-neutral-900">342 uses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
