import React from 'react';
import { Star, MessageSquare, AlertTriangle, HelpCircle, Image as ImageIcon, Settings, BarChart2 } from 'lucide-react';

export const ReviewDashboard = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Review Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of UGC and moderation</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Total Reviews</div><div className="text-2xl font-serif text-neutral-900 mt-1">1,245</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Pending Reviews</div><div className="text-2xl font-serif text-neutral-900 mt-1">12</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Reported Reviews</div><div className="text-2xl font-serif text-neutral-900 mt-1">3</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Average Rating</div><div className="text-2xl font-serif text-neutral-900 mt-1">4.6</div></div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Activity Chart Placeholder</h3>
      <p className="text-sm mt-1">Visual representation of review activity over time.</p>
    </div>
  </div>
);

export const ReportedReviewCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Reported Reviews</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage user-reported content</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <AlertTriangle className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">No reported reviews</h3>
      <p className="text-sm mt-1">All clear. No active reports.</p>
    </div>
  </div>
);

export const QuestionCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Q&A Center</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage product questions and answers</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <HelpCircle className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">No active questions</h3>
      <p className="text-sm mt-1">Customer questions will appear here.</p>
    </div>
  </div>
);

export const ReviewMediaCenter = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Review Media</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage images and videos uploaded in reviews</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <ImageIcon className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Media Library</h3>
      <p className="text-sm mt-1">Customer uploaded images and video placeholders will appear here.</p>
    </div>
  </div>
);

export const ReviewAnalytics = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Review Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Metrics and trends for UGC</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 h-96 flex items-center justify-center text-center text-neutral-500">
      <div>
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
        <h3 className="font-medium text-neutral-900">Analytics Dashboard</h3>
        <p className="text-sm mt-1">Detailed rating and review charts.</p>
      </div>
    </div>
  </div>
);

export const ReviewSettings = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Review Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Configure publishing, moderation, and features</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Settings className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Settings Configuration</h3>
      <p className="text-sm mt-1">Moderation, Media, and Notification preferences.</p>
    </div>
  </div>
);

export const ReportedReviewDetail = () => (
  <div className="space-y-6 max-w-7xl mx-auto p-8">
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <AlertTriangle className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Reported Review Detail</h3>
      <p className="text-sm mt-1">Review specific report and moderation actions.</p>
    </div>
  </div>
);

export const QuestionDetail = () => (
  <div className="space-y-6 max-w-7xl mx-auto p-8">
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <HelpCircle className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Question Detail</h3>
      <p className="text-sm mt-1">Answer customer question.</p>
    </div>
  </div>
);
