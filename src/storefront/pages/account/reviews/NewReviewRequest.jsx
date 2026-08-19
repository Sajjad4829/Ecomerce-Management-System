import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiCheckCircle, FiStar } from 'react-icons/fi';
import { useReviews } from '../../../../admin/context/ReviewContext';

export default function NewReviewRequest() {
  const { submitReview } = useReviews();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Mock data for eligible products to review
  const eligibleProducts = [
    { id: 'prod_1', name: 'Modern Leather Sofa', orderId: 'ORD-8492', date: '2026-08-01', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=100' },
    { id: 'prod_3', name: 'Velvet Throw Pillow', orderId: 'ORD-7210', date: '2026-07-15', image: 'https://images.unsplash.com/photo-1584013110996-2244bb487b99?auto=format&fit=crop&q=80&w=100' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      orderId: selectedProduct.orderId,
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      isVerifiedPurchase: true,
      rating,
      title,
      content,
      media: []
    });
    setStep(3); // Success step
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <div>
        <Link to="/account/reviews" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] mb-4 transition-colors">
          <FiArrowLeft /> Back to Reviews
        </Link>
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Write a Review</h2>
        <p className="text-gray-500 mt-2">Share your experience to help other shoppers.</p>
      </div>

      {step === 1 && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 space-y-6">
          <h3 className="text-xl font-bold text-[#1A1A1A]">1. Select Product to Review</h3>
          <p className="text-sm text-gray-500">Products from recent orders eligible for review.</p>
          
          <div className="space-y-4 mt-4">
            {eligibleProducts.map(prod => (
              <label key={prod.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                selectedProduct?.id === prod.id ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input 
                  type="radio" 
                  name="product" 
                  checked={selectedProduct?.id === prod.id}
                  onChange={() => setSelectedProduct(prod)}
                  className="w-5 h-5 text-[#1A1A1A] focus:ring-[#1A1A1A] border-gray-300"
                />
                <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <span className="font-medium text-gray-900 block">{prod.name}</span>
                  <span className="text-xs text-gray-500">Purchased {new Date(prod.date).toLocaleDateString()}</span>
                </div>
              </label>
            ))}
          </div>
          
          <div className="pt-4 text-right border-t border-gray-100">
            <button 
              onClick={() => setStep(2)}
              disabled={!selectedProduct}
              className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 space-y-6">
          
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="text-sm text-gray-500">Reviewing</p>
              <h3 className="font-bold text-[#1A1A1A]">{selectedProduct.name}</h3>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating *</label>
            <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="p-1 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] rounded"
                >
                  <FiStar 
                    size={32} 
                    className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Review Title (Optional)</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-gray-900"
              placeholder="Summarize your experience..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Review *</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-gray-900"
              rows="6"
              placeholder="Tell others about the quality, design, and comfort..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Add Photos (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
              <FiCamera size={32} className="mb-2" />
              <p className="font-medium text-gray-700">Click to upload photos</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between border-t border-gray-100">
            <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button 
              type="submit"
              disabled={rating === 0 || !content.trim()}
              className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-black/5 text-center space-y-6">
          <FiCheckCircle className="mx-auto text-green-500" size={64} />
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Review Submitted</h3>
            <p className="text-gray-500 mt-2 text-lg">Thank you for sharing your feedback!</p>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto">
            Your review has been submitted and is pending moderation. It should appear on the product page shortly.
          </p>
          <div className="pt-6">
            <button onClick={() => navigate('/account/reviews')} className="px-8 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors">
              View My Reviews
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
