import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useReviews } from '../../../context/ReviewContext';
import ReviewTable from '../../../components/reviews/ReviewTable';

export default function ReviewManager() {
  const { reviews } = useReviews();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = 
      rev.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rev.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rev.title && rev.title.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === 'All' || rev.status === statusFilter;
    const matchesRating = ratingFilter === 'All' || rev.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Manage Reviews</h1>
          <p className="text-sm text-text-muted mt-1">Moderate and respond to customer reviews.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by product, customer, or keyword..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <FiFilter className="text-text-muted" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Pending Moderation">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
            
            <select 
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface"
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
          </div>
        </div>

        <ReviewTable reviews={filteredReviews} />
      </div>
    </div>
  );
}
