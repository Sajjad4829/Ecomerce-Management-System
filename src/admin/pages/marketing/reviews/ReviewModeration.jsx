import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiX, FiEyeOff, FiStar, FiFlag, FiMessageCircle, FiArchive } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/marketing/reviews/RatingStars';
import VerifiedBadge from '../../../components/marketing/reviews/VerifiedBadge';

export default function ReviewModeration() {
  const { id } = useParams();
  const [replyText, setReplyText] = useState('');

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#F7F5F2] pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/marketing/reviews" className="p-2 bg-white border border-black/10 rounded-lg text-gray-500 hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A]">
              Moderate Review
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{id || 'RV-105'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-black/10 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <FiEyeOff size={16} /> Hide
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center gap-2">
            <FiX size={16} /> Reject
          </button>
          <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiCheck size={16} /> Approve
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Review Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-black/5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <RatingStars rating={4} size={20} />
                  <span className="text-sm font-medium text-gray-500">4 days ago</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Beautiful finish, heavy</h2>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider rounded">Pending Moderation</span>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p>
                Gorgeous table, the walnut finish is exactly as pictured and feels very premium. 
                However, it was extremely heavy to assemble. Needs at least two strong people. 
                The packaging was also a bit excessive, but I suppose it kept the table safe.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg border border-black/5 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-medium text-center">Image<br/>Placeholder</span>
              </div>
              <div className="w-24 h-24 bg-gray-100 rounded-lg border border-black/5 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-medium text-center">Image<br/>Placeholder</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/5">
              <h3 className="text-sm font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <FiMessageCircle /> Merchant Reply
              </h3>
              <textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a public response to this review..."
                className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm mb-3"
                rows={4}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">This reply will be visible on the product page.</p>
                <button className="px-4 py-2 bg-white border border-black/10 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Context & Metadata */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-4">Customer Context</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">Michael S.</p>
                <p className="text-sm text-gray-500">michael.s@example.com</p>
              </div>
              <div>
                <VerifiedBadge status="verified" />
                <p className="text-xs text-gray-500 mt-1">Verified via Order #ORD-88392</p>
              </div>
              <div className="pt-4 border-t border-black/5">
                <p className="text-xs font-medium text-gray-600 mb-1">Previous Reviews: <span className="font-bold text-[#1A1A1A]">2</span></p>
                <p className="text-xs font-medium text-gray-600">Avg Given Rating: <span className="font-bold text-[#1A1A1A]">4.5</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-4">Product Context</h3>
            
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">Meridian Dining Table</p>
                <p className="text-xs text-gray-500 mt-0.5">Walnut / 8 Seater</p>
                <Link to="/admin/catalog/products/1" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                  View Product
                </Link>
              </div>
            </div>
          </div>

          {/* Report Context (Optional, shown if reported) */}
          <div className="bg-red-50 rounded-xl border border-red-100 shadow-sm p-6">
            <h3 className="text-[10px] font-mono font-bold text-red-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FiFlag /> Active Reports (1)
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-xs font-bold text-[#1A1A1A]">Reason: Inappropriate Content</p>
                <p className="text-xs text-gray-600 mt-1">"This review contains strong language in the second paragraph."</p>
                <p className="text-[10px] text-gray-400 mt-2">Reported by System • 2 hours ago</p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-50">
                  Dismiss Report
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
