export const LoyaltyService = {
  getMemberships: async () => [],
  getMembership: async (id) => ({ id }),
  getTiers: async () => [],
  createTier: async (data) => ({ id: `TIER-${Date.now()}`, ...data }),
  updateTier: async (id, data) => ({ id, ...data }),
  
  getPoints: async () => [],
  getPointTransaction: async (id) => ({ id }),
  adjustPoints: async (data) => ({ id: `PT-${Date.now()}`, ...data, status: 'Completed', createdAt: new Date().toISOString() }),
  
  getRewards: async () => [],
  createReward: async (data) => ({ id: `REW-${Date.now()}`, ...data, status: 'Active' }),
  
  getRedemptions: async () => [],
  approveRedemption: async (id) => ({ id, status: 'Approved' }),
  cancelRedemption: async (id) => ({ id, status: 'Cancelled' }),
  
  getRules: async () => [],
  createRule: async (data) => ({ id: `RUL-${Date.now()}`, ...data }),
  
  getReferrals: async () => [],
  
  getVIPCustomers: async () => [],
  
  getLoyaltyCampaigns: async () => [],
  
  getExpiry: async () => [],
  
  getRetentionAnalytics: async () => ({}),
  getLoyaltyAnalytics: async () => ({})
};

export const LoyaltyAdapter = {
  // Mock external integrations
};

export const RewardAdapter = {
  getRewards: async () => [],
  createReward: async () => ({}),
  updateReward: async () => ({}),
  redeemRewardPlaceholder: async () => ({ success: true }),
  cancelRedemptionPlaceholder: async () => ({ success: true })
};

export const PointAdapter = {
  getBalancePlaceholder: async () => 0,
  earnPointsPlaceholder: async () => ({ success: true }),
  redeemPointsPlaceholder: async () => ({ success: true }),
  adjustPoints: async () => ({ success: true }),
  reversePointsPlaceholder: async () => ({ success: true })
};

export const ReferralAdapter = {
  createReferralPlaceholder: async () => ({ success: true }),
  qualifyReferralPlaceholder: async () => ({ success: true }),
  rewardReferralPlaceholder: async () => ({ success: true }),
  getReferrals: async () => []
};