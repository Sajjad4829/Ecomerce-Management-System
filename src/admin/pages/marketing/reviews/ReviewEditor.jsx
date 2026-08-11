import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiStar, FiImage, FiInfo, FiUploadCloud } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import RatingStars from '../../../components/marketing/reviews/RatingStars';

export default function ReviewEditor() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [formData, setFormData] = useState({
    product: '',
    title: '',
    content: '',
    pros: '',
    cons: '',
    isVerified: true
  });

  const handleSave = () => {
    navigate('/admin/marketing/reviews');
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
              Submit Review (Preview)
            </h1>
            <p className="text-xs text-text-muted mt-0.5">Frontend Submission Preview</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="px-4 py-2 text-text-secondary hover:text-black text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> Submit Review
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full mt-8 space-y-8">
        
        {/* Rating */}
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8 text-center">
          <h2 className="text-xl font-serif font-bold text-text-primary mb-2">Overall Rating</h2>
          <p className="text-sm text-text-muted mb-6">How would you rate this product?</p>
          
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <FiStar 
                  size={48} 
                  className={star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-gray-300'} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiInfo className="text-text-muted" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-text-primary">Review Details</h2>
              <p className="text-sm text-text-muted">Share your experience with this product.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Product</label>
              <select 
                value={formData.product}
                onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
              >
                <option value="">Select a product...</option>
                <option value="1">Oasis Lounge Chair - Black / Leather</option>
                <option value="2">Meridian Dining Table - Walnut</option>
                <option value="3">Apex Standing Desk - White</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Review Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Summarize your experience..."
                className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Review Content</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="What did you like or dislike? How did you use the product?"
                className="w-full px-4 py-3 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Pros (Optional)</label>
                <input 
                  type="text" 
                  value={formData.pros}
                  onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
                  placeholder="e.g. Comfortable, stylish"
                  className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Cons (Optional)</label>
                <input 
                  type="text" 
                  value={formData.cons}
                  onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
                  placeholder="e.g. Difficult to assemble"
                  className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiImage className="text-text-muted" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-text-primary">Add Photos</h2>
              <p className="text-sm text-text-muted">Show the product in your space.</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-background transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-text-muted mb-4">
              <FiUploadCloud size={24} />
            </div>
            <p className="text-sm font-bold text-text-primary">Click to upload photos</p>
            <p className="text-xs text-text-muted mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Verification Simulation */}
        <div className="bg-success-soft rounded-xl border border-green-100 shadow-sm p-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-green-900">Purchase Verification</h3>
            <p className="text-xs text-success mt-0.5">Simulate submitting as a verified buyer.</p>
          </div>
          <input 
            type="checkbox" 
            checked={formData.isVerified}
            onChange={(e) => setFormData(prev => ({ ...prev, isVerified: e.target.checked }))}
            className="w-5 h-5 rounded border-green-300 text-success focus:ring-green-600" 
          />
        </div>

      </div>
    </div>
  );
}
