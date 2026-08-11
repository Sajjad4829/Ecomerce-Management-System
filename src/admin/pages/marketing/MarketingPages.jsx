import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMarketing } from '../../context/marketing/MarketingContext';
import { ArrowLeft, PieChart, TrendingUp, Users, Target, Activity } from 'lucide-react';

export const MarketingDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Active Campaigns</div>
          <div className="text-3xl font-bold text-neutral-900">8</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Audience Reach</div>
          <div className="text-3xl font-bold text-neutral-900">125K</div>
          <div className="text-xs text-neutral-400 mt-2">Placeholder</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Conversions</div>
          <div className="text-3xl font-bold text-neutral-900">1,240</div>
          <div className="text-xs text-neutral-400 mt-2">Placeholder</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Marketing Spend</div>
          <div className="text-3xl font-bold text-neutral-900">$15K</div>
          <div className="text-xs text-neutral-400 mt-2">Placeholder</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Campaign Performance</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <span className="text-neutral-400">Chart Visualization Placeholder</span>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-medium text-neutral-900 mb-4">Channel Distribution</h3>
          <div className="flex-1 border-2 border-dashed border-neutral-100 flex items-center justify-center bg-neutral-50">
            <span className="text-neutral-400">Chart Visualization Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CampaignCenter = () => {
  const { campaigns } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Campaigns</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Campaign</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Channel</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Schedule</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {campaigns.map(c => (
              <tr key={c.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{c.name}</td>
                <td className="px-6 py-4 text-neutral-600">{c.type}</td>
                <td className="px-6 py-4 text-neutral-600">{c.channel}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    c.status === 'Active' ? 'bg-success-soft text-green-800' : 
                    c.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{c.startDate} - {c.endDate}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/marketing/campaigns/${c.id}`} className="text-primary hover:text-indigo-900 font-medium">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CampaignDetail = () => {
  const { campaignId } = useParams();
  const { getCampaign } = useMarketing();
  const campaign = getCampaign(campaignId) || useMarketing().campaigns[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/marketing/campaigns" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">{campaign.name}</h1>
            <p className="text-sm text-neutral-500 mt-1">{campaign.type} | {campaign.channel}</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 border border-neutral-200 text-neutral-600 rounded hover:bg-neutral-50">Edit</button>
            <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Pause</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-neutral-500">Objective</div><div className="font-medium mt-1">{campaign.objective}</div></div>
              <div><div className="text-neutral-500">Audience</div><div className="font-medium mt-1">{campaign.audience}</div></div>
              <div><div className="text-neutral-500">Schedule</div><div className="font-medium mt-1">{campaign.startDate} to {campaign.endDate}</div></div>
              <div><div className="text-neutral-500">Budget</div><div className="font-medium mt-1">{campaign.budget} (Placeholder)</div></div>
            </div>
          </div>
          
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><div className="text-neutral-500">Reach</div><div className="font-medium mt-1">{campaign.reach}</div></div>
              <div><div className="text-neutral-500">Clicks</div><div className="font-medium mt-1">{campaign.clicks}</div></div>
              <div><div className="text-neutral-500">Leads</div><div className="font-medium mt-1">{campaign.leads}</div></div>
              <div><div className="text-neutral-500">Orders</div><div className="font-medium mt-1">{campaign.orders}</div></div>
            </div>
            <div className="mt-4 text-xs text-neutral-400">Values are placeholders.</div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Owner</h3>
            <div className="text-sm font-medium">{campaign.owner}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CampaignTypes = () => {
  const { campaignTypes } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Campaign Types</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Type</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Type Name</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {campaignTypes.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.name}</td>
                <td className="px-6 py-4 text-neutral-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Channels = () => {
  const { channels } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Channels</h1>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Channel Name</th>
              <th className="px-6 py-4 font-medium">Campaigns (Placeholder)</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {channels.map(c => (
              <tr key={c.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{c.name}</td>
                <td className="px-6 py-4 text-neutral-600">{c.campaignCount}</td>
                <td className="px-6 py-4 text-neutral-600">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Audiences = () => {
  const { audiences } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Audiences</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Audience</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Audience Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Members (Placeholder)</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {audiences.map(a => (
              <tr key={a.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{a.name}</td>
                <td className="px-6 py-4 text-neutral-600">{a.type}</td>
                <td className="px-6 py-4 text-neutral-600">{a.source}</td>
                <td className="px-6 py-4 text-neutral-600">{a.members.toLocaleString()}</td>
                <td className="px-6 py-4 text-neutral-600">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MarketingLists = () => {
  const { marketingLists } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Lists</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create List</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">List Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Members (Placeholder)</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {marketingLists.map(l => (
              <tr key={l.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{l.name}</td>
                <td className="px-6 py-4 text-neutral-600">{l.type}</td>
                <td className="px-6 py-4 text-neutral-600">{l.source}</td>
                <td className="px-6 py-4 text-neutral-600">{l.members.toLocaleString()}</td>
                <td className="px-6 py-4 text-neutral-600">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Promotions = () => {
  const { promotions } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Promotions</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Promotion</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Promotion</th>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Discount (Placeholder)</th>
              <th className="px-6 py-4 font-medium">Schedule</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {promotions.map(p => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{p.name}</td>
                <td className="px-6 py-4 text-neutral-600">{p.campaign}</td>
                <td className="px-6 py-4 text-neutral-600">{p.type}</td>
                <td className="px-6 py-4 text-neutral-600">{p.discount}</td>
                <td className="px-6 py-4 text-neutral-600">{p.startDate} - {p.endDate}</td>
                <td className="px-6 py-4 text-neutral-600">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Banners = () => {
  const { banners } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Banner Campaigns</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Banner</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Banner</th>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Placement</th>
              <th className="px-6 py-4 font-medium">Schedule</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {banners.map(b => (
              <tr key={b.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{b.name}</td>
                <td className="px-6 py-4 text-neutral-600">{b.campaign}</td>
                <td className="px-6 py-4 text-neutral-600">{b.placement}</td>
                <td className="px-6 py-4 text-neutral-600">{b.startDate} - {b.endDate}</td>
                <td className="px-6 py-4 text-neutral-600">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MarketingAssets = () => {
  const { assets } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Assets</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Upload Asset</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Asset Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Size (Placeholder)</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {assets.map(a => (
              <tr key={a.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{a.name}</td>
                <td className="px-6 py-4 text-neutral-600">{a.type}</td>
                <td className="px-6 py-4 text-neutral-600">{a.campaign}</td>
                <td className="px-6 py-4 text-neutral-600">{a.size}</td>
                <td className="px-6 py-4 text-neutral-600">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const EmailCampaigns = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Email Campaigns</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New Email</button>
      </div>
      <div className="bg-warning-soft border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
        <strong>Backend email integration required.</strong> This view currently displays placeholders.
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-8 text-center text-neutral-500">
          Email campaigns list will appear here once connected to an email provider.
        </div>
      </div>
    </div>
  );
};

export const SMSCampaigns = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">SMS Campaigns</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New SMS</button>
      </div>
      <div className="bg-warning-soft border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
        <strong>Backend SMS provider integration required.</strong> This view currently displays placeholders.
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-8 text-center text-neutral-500">
          SMS campaigns list will appear here once connected to an SMS provider.
        </div>
      </div>
    </div>
  );
};

export const SocialCampaigns = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Social Campaigns</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New Social Post</button>
      </div>
      <div className="bg-warning-soft border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
        <strong>Social media API integrations required.</strong> This view currently displays placeholders.
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-8 text-center text-neutral-500">
          Social campaigns list will appear here once connected to social platforms.
        </div>
      </div>
    </div>
  );
};

export const Automations = () => {
  const { automations } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Automations</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Automation</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Automation</th>
              <th className="px-6 py-4 font-medium">Trigger</th>
              <th className="px-6 py-4 font-medium">Audience</th>
              <th className="px-6 py-4 font-medium">Action</th>
              <th className="px-6 py-4 font-medium">Last Run (Placeholder)</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {automations.map(a => (
              <tr key={a.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{a.name}</td>
                <td className="px-6 py-4 text-neutral-600">{a.trigger}</td>
                <td className="px-6 py-4 text-neutral-600">{a.audience}</td>
                <td className="px-6 py-4 text-neutral-600">{a.action}</td>
                <td className="px-6 py-4 text-neutral-600">{a.lastRun}</td>
                <td className="px-6 py-4 text-neutral-600">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MarketingTasks = () => {
  const { tasks } = useMarketing();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Tasks</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Task</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Task</th>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {tasks.map(t => (
              <tr key={t.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{t.title}</td>
                <td className="px-6 py-4 text-neutral-600">{t.campaign}</td>
                <td className="px-6 py-4 text-neutral-600">{t.assignedTo}</td>
                <td className="px-6 py-4 text-neutral-600">{t.dueDate}</td>
                <td className="px-6 py-4 text-neutral-600">{t.priority}</td>
                <td className="px-6 py-4 text-neutral-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Calendar = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Campaign Calendar</h1>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 min-h-[500px] flex items-center justify-center">
        <span className="text-neutral-400">Calendar Integration Placeholder</span>
      </div>
    </div>
  );
};

export const Analytics = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Analytics</h1>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 min-h-[500px] flex items-center justify-center">
        <span className="text-neutral-400">Advanced Analytics Dashboards Placeholder</span>
      </div>
    </div>
  );
};

export const MarketingROI = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing ROI</h1>
      </div>
      <div className="bg-warning-soft border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
        <strong>Backend attribution required.</strong> ROI calculation requires integration with order data and marketing spend data.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Total Spend</div>
          <div className="text-3xl font-bold text-neutral-900">$15,000</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">Attributed Revenue</div>
          <div className="text-3xl font-bold text-neutral-900">$162,500</div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2">ROI</div>
          <div className="text-3xl font-bold text-success">983%</div>
        </div>
      </div>
    </div>
  );
};

export const Attribution = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Attribution</h1>
      </div>
      <div className="bg-warning-soft border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
        <strong>Backend attribution engine required.</strong> This view requires backend tracking of customer journeys.
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Medium</th>
              <th className="px-6 py-4 font-medium">Attributed Orders</th>
              <th className="px-6 py-4 font-medium">Attributed Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            <tr className="hover:bg-neutral-50">
              <td className="px-6 py-4 font-medium text-neutral-900">Summer Sale 2024</td>
              <td className="px-6 py-4 text-neutral-600">Email</td>
              <td className="px-6 py-4 text-neutral-600">Newsletter</td>
              <td className="px-6 py-4 text-neutral-600">450</td>
              <td className="px-6 py-4 text-neutral-600">$150,000</td>
            </tr>
            <tr className="hover:bg-neutral-50">
              <td className="px-6 py-4 font-medium text-neutral-900">Win-back Campaign</td>
              <td className="px-6 py-4 text-neutral-600">Email</td>
              <td className="px-6 py-4 text-neutral-600">Automated</td>
              <td className="px-6 py-4 text-neutral-600">120</td>
              <td className="px-6 py-4 text-neutral-600">$12,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
