import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare, FiShield, FiAlertTriangle, FiCheckCircle, FiSettings, FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import VerifiedBadge from '../../../components/marketing/reviews/VerifiedBadge';
import RatingStars from '../../../components/marketing/reviews/RatingStars';

const MOCK_REVIEWS = [
  { id: 'RV-104', reviewer: 'Eleanor P.', product: 'Oasis Lounge Chair', rating: 5, status: 'published', verified: 'verified', date: '2h ago', title: 'Exceptional quality', content: 'The leather is incredibly soft and the frame is very sturdy. Perfect addition to my reading nook.' },
  { id: 'RV-105', reviewer: 'Michael S.', product: 'Meridian Dining Table', rating: 4, status: 'pending', verified: 'verified', date: '4h ago', title: 'Beautiful finish, heavy', content: 'Gorgeous table, but it was extremely heavy to assemble. Needs at least two strong people.' },
  { id: 'RV-106', reviewer: 'Sarah J.', product: 'Horizon Bookshelf', rating: 1, status: 'reported', verified: 'unverified', date: '1d ago', title: 'Damaged on arrival', content: 'Three shelves were scratched deeply. I want a refund.' },
  { id: 'RV-107', reviewer: 'David T.', product: 'Apex Standing Desk', rating: 5, status: 'featured', verified: 'verified', date: '2d ago', title: 'Best desk I have owned', content: 'Smooth motors, perfectly stable even at the highest setting.' }
];

const KPI_CARDS = [
  { label: 'Total Reviews', value: '1,245', icon: FiMessageSquare, bg: 'bg-blue-50', color: 'text-primary' },
  { label: 'Average Rating', value: '4.8', icon: FiStar, bg: 'bg-warning-soft', color: 'text-amber-500' },
  { label: 'Pending Moderation', value: '12', icon: FiShield, bg: 'bg-purple-50', color: 'text-purple-600' },
  { label: 'Reported', value: '3', icon: FiAlertTriangle, bg: 'bg-danger-soft', color: 'text-danger' }
];

export default function ReviewDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status) => {
    switch(status) {
      case 'published': return <span className="px-2 py-1 bg-success-soft text-green-800 text-[10px] font-bold uppercase tracking-wider rounded">Published</span>;
      case 'pending': return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider rounded">Pending</span>;
      case 'reported': return <span className="px-2 py-1 bg-danger-soft text-red-800 text-[10px] font-bold uppercase tracking-wider rounded">Reported</span>;
      case 'featured': return <span className="px-2 py-1 bg-warning-soft text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded">Featured</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-wider rounded">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-900 font-mono text-[10px] uppercase font-bold">
              Marketing Workspace
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Reviews & Ratings</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage customer feedback, moderate reviews, and analyze product sentiment.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link 
            to="/admin/marketing/reviews/settings"
            className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2 shadow-sm"
          >
            <FiSettings size={16} /> Settings
          </Link>
          <Link 
            to="/admin/marketing/reviews/new"
            className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
          >
            Submit Review Preview
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((stat, idx) => (
          <div key={idx} className="bg-surface p-5 rounded-xl border border-black/5 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
              <stat.icon className={`${stat.color}`} size={20} />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['all', 'pending', 'published', 'reported', 'featured'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize whitespace-nowrap ${
                  activeTab === tab ? 'bg-background text-text-primary' : 'text-text-muted hover:bg-background'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search reviews..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full md:w-64"
              />
            </div>
            <button className="px-4 py-2 bg-background text-text-primary rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
              <FiFilter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider w-12">
                  <input type="checkbox" className="rounded border-border-hover" />
                </th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Reviewer</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Rating</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider max-w-md">Review</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Product</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_REVIEWS.map(review => (
                <tr key={review.id} className="hover:bg-background transition-colors group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-border-hover" />
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-text-primary">{review.reviewer}</p>
                    <div className="mt-1">
                      <VerifiedBadge status={review.verified} />
                    </div>
                  </td>
                  <td className="p-4">
                    <RatingStars rating={review.rating} />
                    <span className="text-xs text-text-muted mt-1 block">{review.date}</span>
                  </td>
                  <td className="p-4 max-w-md">
                    <p className="text-sm font-bold text-text-primary truncate">{review.title}</p>
                    <p className="text-sm text-text-secondary line-clamp-2 mt-1">{review.content}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-text-primary">{review.product}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(review.status)}
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      to={`/admin/marketing/reviews/moderation/${review.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Moderate <FiArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-black/5 bg-background flex items-center justify-between">
          <span className="text-xs font-medium text-text-muted">Showing 4 of 1,245 reviews</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface border border-black/10 rounded text-sm text-text-secondary hover:bg-background">Prev</button>
            <button className="px-3 py-1 bg-surface border border-black/10 rounded text-sm text-text-secondary hover:bg-background">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
