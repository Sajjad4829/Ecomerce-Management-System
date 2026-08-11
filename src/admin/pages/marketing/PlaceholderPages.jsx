import React from 'react';
import { Image, Search, Plus, Filter, ShoppingCart, Mail, Bell, Calendar, BarChart2, Users } from 'lucide-react';

export const BannerCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Banner Management</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage hero images, promo bars, and featured content</p>
      </div>
      <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
        <Plus className="w-4 h-4" /> Upload Banner
      </button>
    </div>
    <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
      <div className="relative w-full md:w-96">
        <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input type="text" placeholder="Search banners..." className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Image className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">No banners found</h3>
      <p className="text-sm mt-1">Upload your first banner to get started.</p>
    </div>
  </div>
);

export const AbandonedCartCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Abandoned Carts</h1>
        <p className="text-sm text-neutral-500 mt-1">Recover lost sales with automated campaigns</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Recovery Rate</div><div className="text-2xl font-serif text-neutral-900 mt-1">12.4%</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Recovered Revenue</div><div className="text-2xl font-serif text-neutral-900 mt-1">$4,250</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Active Automations</div><div className="text-2xl font-serif text-neutral-900 mt-1">3</div></div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <ShoppingCart className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Cart Recovery</h3>
      <p className="text-sm mt-1">Automated sequences will appear here.</p>
    </div>
  </div>
);

export const EmailCampaignCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Email Campaigns</h1>
        <p className="text-sm text-neutral-500 mt-1">Design and schedule email newsletters</p>
      </div>
      <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
        <Plus className="w-4 h-4" /> Create Email
      </button>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Mail className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">No emails yet</h3>
      <p className="text-sm mt-1">Create your first email campaign.</p>
    </div>
  </div>
);

export const NotificationCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Notifications</h1>
        <p className="text-sm text-neutral-500 mt-1">Push notifications and SMS campaigns</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Bell className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Notification Center</h3>
      <p className="text-sm mt-1">Manage outgoing alerts and SMS.</p>
    </div>
  </div>
);

export const MarketingCalendar = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Calendar</h1>
        <p className="text-sm text-neutral-500 mt-1">Schedule and plan marketing activities</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 h-96 flex items-center justify-center text-center text-neutral-500">
      <div>
        <Calendar className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
        <h3 className="font-medium text-neutral-900">Marketing Calendar</h3>
        <p className="text-sm mt-1">Visual timeline of all campaigns.</p>
      </div>
    </div>
  </div>
);

export const MarketingAnalytics = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Marketing Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Track campaign performance and ROI</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 h-96 flex items-center justify-center text-center text-neutral-500">
      <div>
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
        <h3 className="font-medium text-neutral-900">Advanced Analytics</h3>
        <p className="text-sm mt-1">Detailed performance charts.</p>
      </div>
    </div>
  </div>
);

export const CustomerEngagement = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Customer Engagement</h1>
        <p className="text-sm text-neutral-500 mt-1">Monitor interactions, loyalty, and feedback</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Users className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Engagement Dashboard</h3>
      <p className="text-sm mt-1">View customer interaction metrics.</p>
    </div>
  </div>
);
