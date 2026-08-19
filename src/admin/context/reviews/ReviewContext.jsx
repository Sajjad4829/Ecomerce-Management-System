import React, { createContext, useContext, useState, useMemo } from 'react';

const ReviewContext = createContext(null);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([
    { id: 'REV-001', productId: 'PROD-101', productName: 'Modern Leather Sofa', customerId: 'CUST-001', customerName: 'Alice Smith', rating: 5, title: 'Amazing quality', content: 'This sofa exceeded my expectations. Very comfortable and looks great in my living room.', verifiedPurchase: true, status: 'Published', createdAt: '2026-08-01', mediaIds: ['med-1'] },
    { id: 'REV-002', productId: 'PROD-102', productName: 'Oak Dining Table', customerId: 'CUST-002', customerName: 'Bob Jones', rating: 3, title: 'Good, but came scratched', content: 'The table is sturdy but had a small scratch on the surface upon delivery.', verifiedPurchase: true, status: 'Pending', createdAt: '2026-08-05', mediaIds: [] },
    { id: 'REV-003', productId: 'PROD-103', productName: 'Ergonomic Office Chair', customerId: 'CUST-003', customerName: 'Charlie Brown', rating: 1, title: 'Terrible customer service', content: 'The chair broke after a week and I cannot get a hold of support.', verifiedPurchase: false, status: 'Reported', createdAt: '2026-08-06', mediaIds: [] }
  ]);

  const [reportedReviews, setReportedReviews] = useState([
    { id: 'REP-001', reviewId: 'REV-003', productName: 'Ergonomic Office Chair', reason: 'Spam', status: 'Open', reporter: 'System', createdAt: '2026-08-07' }
  ]);

  const [questions, setQuestions] = useState([
    { id: 'Q-001', productId: 'PROD-101', productName: 'Modern Leather Sofa', customerName: 'David Lee', question: 'What are the dimensions of this sofa?', answers: [], status: 'Pending', createdAt: '2026-08-08' }
  ]);

  const approveReview = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Published' } : r));
  const rejectReview = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  const hideReview = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Hidden' } : r));
  const respondToReview = (id, response) => setReviews(reviews.map(r => r.id === id ? { ...r, storeResponse: response } : r));

  const resolveReport = (id) => setReportedReviews(reportedReviews.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));

  const respondToQuestion = (id, answer) => setQuestions(questions.map(q => q.id === id ? { ...q, answers: [...q.answers, answer], status: 'Published' } : q));

  const contextValue = useMemo(() => ({
    reviews,
    reportedReviews,
    questions,
    approveReview,
    rejectReview,
    hideReview,
    respondToReview,
    resolveReport,
    respondToQuestion
  }), [reviews, reportedReviews, questions]);

  return (
    <ReviewContext.Provider value={contextValue}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);
