import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiSettings, FiShield, FiImage, FiMessageCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ReviewSettings() {
  const [settings, setSettings] = useState({
    enableReviews: true,
    requireModeration: true,
    allowAnonymous: false,
    allowVerifiedOnly: false,
    allowMedia: true,
    allowVideo: false,
    allowReplies: true,
    requireText: true,
    minLength: 10,
    maxLength: 1000
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/marketing/reviews" className="p-2 bg-surface border border-black/10 rounded-lg text-text-muted hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-text-primary">
              Review Settings
            </h1>
            <p className="text-xs text-text-muted mt-0.5">Configuration and Moderation Rules</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-text-secondary hover:text-black text-sm font-medium transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiCheck size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-8 space-y-8">
        
        {/* General Settings */}
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiSettings className="text-text-muted" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-text-primary">General</h2>
              <p className="text-sm text-text-muted">Core review functionality.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Enable Product Reviews</span>
                <span className="text-xs text-text-muted">Allow customers to leave reviews on product pages.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.enableReviews}
                onChange={() => handleToggle('enableReviews')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Require Review Text</span>
                <span className="text-xs text-text-muted">Do not allow star-only ratings. Customers must write a review.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.requireText}
                onChange={() => handleToggle('requireText')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>
          </div>
        </div>

        {/* Moderation & Trust */}
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="text-text-muted" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-text-primary">Moderation & Trust</h2>
              <p className="text-sm text-text-muted">Control who can review and how reviews are published.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Require Moderation</span>
                <span className="text-xs text-text-muted">Reviews must be manually approved before appearing on the storefront.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.requireModeration}
                onChange={() => handleToggle('requireModeration')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Verified Purchases Only</span>
                <span className="text-xs text-text-muted">Only customers who have purchased the product can leave a review.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.allowVerifiedOnly}
                onChange={() => handleToggle('allowVerifiedOnly')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>
            
            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Allow Anonymous Reviews</span>
                <span className="text-xs text-text-muted">Customers can submit reviews without an account.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.allowAnonymous}
                onChange={() => handleToggle('allowAnonymous')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>
          </div>
        </div>

        {/* Media & Engagement */}
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiImage className="text-text-muted" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-text-primary">Media & Engagement</h2>
              <p className="text-sm text-text-muted">Photos, videos, and replies.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Allow Photo Uploads</span>
                <span className="text-xs text-text-muted">Customers can attach photos to their reviews.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.allowMedia}
                onChange={() => handleToggle('allowMedia')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>
            
            <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-text-primary block">Allow Merchant Replies</span>
                <span className="text-xs text-text-muted">Enable public merchant responses on reviews.</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.allowReplies}
                onChange={() => handleToggle('allowReplies')}
                className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
