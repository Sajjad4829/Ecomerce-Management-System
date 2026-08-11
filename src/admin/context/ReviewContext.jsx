import React, { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([
    {
      id: 'REV-2026-001',
      productId: 'prod_1',
      variantId: null,
      productName: 'Modern Leather Sofa',
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      orderId: 'ORD-8492',
      rating: 5,
      title: 'Beautiful finish and excellent build quality',
      content: 'This sofa completely transformed my living room. The leather is supple and the cushioning is perfectly firm yet comfortable. Assembly was a breeze.',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' }
      ],
      isVerifiedPurchase: true,
      status: 'Published',
      helpfulCount: 12,
      reports: [],
      adminReply: null,
      createdAt: '2026-08-01T10:00:00Z',
      timeline: [
        { id: 'ev_1', status: 'Pending Moderation', actor: 'Sarah Jenkins', timestamp: '2026-08-01T10:00:00Z' },
        { id: 'ev_2', status: 'Published', actor: 'Auto-Moderator', timestamp: '2026-08-01T10:05:00Z' }
      ]
    },
    {
      id: 'REV-2026-002',
      productId: 'prod_2',
      variantId: null,
      productName: 'Ceramic Table Lamp',
      customerId: 'cust_2',
      customerName: 'Michael Chen',
      orderId: 'ORD-7210',
      rating: 2,
      title: 'Not as pictured',
      content: 'The color is much darker in person than on the website. I was expecting a light cream but this is more of a taupe. Disappointed in the representation.',
      media: [],
      isVerifiedPurchase: true,
      status: 'Pending Moderation',
      helpfulCount: 0,
      reports: [],
      adminReply: null,
      createdAt: '2026-08-07T14:30:00Z',
      timeline: [
        { id: 'ev_3', status: 'Pending Moderation', actor: 'Michael Chen', timestamp: '2026-08-07T14:30:00Z' }
      ]
    },
    {
      id: 'REV-2026-003',
      productId: 'prod_1',
      variantId: null,
      productName: 'Modern Leather Sofa',
      customerId: 'cust_3',
      customerName: 'Emily Davis',
      orderId: null, // Unverified
      rating: 4,
      title: 'Great sofa, delayed delivery',
      content: 'I love the sofa itself, it is very comfortable. However, the delivery took 2 weeks longer than originally estimated. The product is 5 stars, but taking off a star for logistics.',
      media: [],
      isVerifiedPurchase: false,
      status: 'Published',
      helpfulCount: 2,
      reports: [],
      adminReply: { content: 'Hi Emily, we apologize for the delay in your delivery. We are working with our logistics partners to improve transit times. We are glad you love the sofa!', createdAt: '2026-08-05T09:00:00Z' },
      createdAt: '2026-08-04T16:20:00Z',
      timeline: [
        { id: 'ev_4', status: 'Pending Moderation', actor: 'Emily Davis', timestamp: '2026-08-04T16:20:00Z' },
        { id: 'ev_5', status: 'Published', actor: 'Admin', timestamp: '2026-08-05T08:50:00Z' }
      ]
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: 'REP-2026-001',
      reviewId: 'REV-2026-003',
      reporterId: 'cust_4',
      reporterName: 'Anonymous User',
      reason: 'Irrelevant',
      content: 'Review focuses on shipping rather than product quality.',
      status: 'Open',
      createdAt: '2026-08-06T11:15:00Z'
    }
  ]);

  const [moderationReasons, setModerationReasons] = useState([
    { id: 'mr_1', name: 'Spam', description: 'Promotional content, links, or bot-generated.', status: 'Active', sortOrder: 1, customerVisible: true },
    { id: 'mr_2', name: 'Offensive Content', description: 'Profanity, hate speech, or harassment.', status: 'Active', sortOrder: 2, customerVisible: true },
    { id: 'mr_3', name: 'Irrelevant', description: 'Does not review the product itself (e.g. shipping complaints).', status: 'Active', sortOrder: 3, customerVisible: true },
    { id: 'mr_4', name: 'Personal Information', description: 'Contains emails, phone numbers, or addresses.', status: 'Active', sortOrder: 4, customerVisible: true },
  ]);

  const getReview = (id) => reviews.find(r => r.id === id);

  const getProductRating = (productId) => {
    const productReviews = reviews.filter(r => r.productId === productId && r.status === 'Published');
    if (productReviews.length === 0) return { average: 0, count: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    
    let sum = 0;
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(r => {
      sum += r.rating;
      dist[r.rating] = (dist[r.rating] || 0) + 1;
    });

    return {
      average: (sum / productReviews.length).toFixed(1),
      count: productReviews.length,
      distribution: dist
    };
  };

  const updateReviewStatus = (id, newStatus, actor = 'Admin') => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        const newEvent = {
          id: `ev_${Date.now()}`,
          status: newStatus,
          actor,
          timestamp: new Date().toISOString()
        };
        return { ...r, status: newStatus, timeline: [...r.timeline, newEvent] };
      }
      return r;
    }));
  };

  const replyToReview = (id, replyContent) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        return { 
          ...r, 
          adminReply: { content: replyContent, createdAt: new Date().toISOString() } 
        };
      }
      return r;
    }));
  };

  const submitReview = (reviewData) => {
    const newReview = {
      id: `REV-${Date.now()}`,
      ...reviewData,
      status: 'Pending Moderation',
      helpfulCount: 0,
      reports: [],
      adminReply: null,
      createdAt: new Date().toISOString(),
      timeline: [
        { id: `ev_${Date.now()}`, status: 'Pending Moderation', actor: reviewData.customerName, timestamp: new Date().toISOString() }
      ]
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      reports,
      moderationReasons,
      getReview,
      getProductRating,
      updateReviewStatus,
      replyToReview,
      submitReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewContext);
