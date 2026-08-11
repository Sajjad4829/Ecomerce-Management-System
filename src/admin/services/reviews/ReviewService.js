export const ReviewService = {
  getReviews: async () => [],
  getReview: async (id) => ({ id }),
  createReviewMock: async (data) => ({ id: `REV-${Date.now()}`, ...data }),
  approveReview: async (id) => ({ id, status: 'Published' }),
  rejectReview: async (id) => ({ id, status: 'Rejected' }),
  hideReview: async (id) => ({ id, status: 'Hidden' }),
  reportReview: async (id, reason) => ({ id, status: 'Reported', reason }),
  respondToReview: async (id, response) => ({ id, response, respondedAt: new Date().toISOString() }),
  
  getReportedReviews: async () => [],
  resolveReport: async (id) => ({ id, status: 'Resolved' }),
  
  getQuestions: async () => [],
  respondToQuestion: async (id, answer) => ({ id, answer, answeredAt: new Date().toISOString() }),
  
  getReviewAnalytics: async () => ({}),
  getProductRatingSummary: async (productId) => ({})
};

export const ReviewAdapter = {
  // Mock external integrations
};

export const ModerationAdapter = {
  moderateReviewPlaceholder: async () => ({ success: true }),
  approveReview: async () => ({ success: true }),
  rejectReview: async () => ({ success: true }),
  hideReview: async () => ({ success: true }),
  escalateReview: async () => ({ success: true })
};
