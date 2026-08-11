import React, { useState } from 'react';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import { useReviews } from '../../context/ReviewContext';

export default function ReviewModeration({ review }) {
  const { replyToReview } = useReviews();
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if(replyText.trim()) {
      replyToReview(review.id, replyText);
      setReplyText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Moderation / Reports Info */}
      {review.reports && review.reports.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">Active Reports ({review.reports.length})</h3>
          <div className="space-y-4">
            {review.reports.map(rep => (
              <div key={rep.id} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900">{rep.reason}</p>
                  <span className="text-xs text-gray-500">{new Date(rep.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700">{rep.content}</p>
                <p className="text-xs text-gray-500 mt-2">Reported by: {rep.reporterName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Reply */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <FiMessageSquare className="text-gray-500" />
          <h2 className="text-lg font-bold text-gray-900">Store Reply</h2>
        </div>
        <div className="p-6">
          {review.adminReply ? (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-900">Admin Response</p>
                <p className="text-xs text-gray-500">{new Date(review.adminReply.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{review.adminReply.content}</p>
              <div className="mt-4 flex gap-2">
                <button className="text-sm text-blue-600 hover:underline">Edit Reply</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReplySubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publicly reply to this customer</label>
              <textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
                rows="4"
                placeholder="Write a response... (This will be visible on the storefront)"
              />
              <div className="mt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={!replyText.trim()}
                  className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <FiSend size={16} /> Post Reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
