export const MarketingService = {
  getCampaigns: async () => [],
  getCampaign: async (id) => ({ id }),
  createCampaign: async (data) => ({ id: `CMP-${Date.now()}`, ...data }),
  updateCampaign: async (id, data) => ({ id, ...data }),
  scheduleCampaign: async (id, date) => ({ id, status: 'Scheduled' }),
  pauseCampaign: async (id) => ({ id, status: 'Paused' }),

  getPromotions: async () => [],
  createPromotion: async (data) => ({ id: `PRM-${Date.now()}`, ...data }),
  updatePromotion: async (id, data) => ({ id, ...data }),

  getCoupons: async () => [],
  createCoupon: async (data) => ({ id: `CPN-${Date.now()}`, ...data }),
  generateCoupons: async (prefix, count) => Array.from({ length: count }, (_, i) => ({ id: `CPN-${Date.now()}-${i}`, code: `${prefix}-${1000+i}` })),

  getSegments: async () => [],
  createSegment: async (data) => ({ id: `SEG-${Date.now()}`, ...data }),

  getBanners: async () => [],
  createBanner: async (data) => ({ id: `BNR-${Date.now()}`, ...data }),

  getEmailCampaigns: async () => [],
  createEmailCampaign: async (data) => ({ id: `EML-${Date.now()}`, ...data }),

  getMarketingAnalytics: async () => ({})
};

export const MarketingAdapter = {
  // External integrations placeholder
};

export const CampaignAdapter = {
  createCampaign: async () => ({ success: true }),
  scheduleCampaign: async () => ({ success: true }),
  pauseCampaign: async () => ({ success: true }),
  activateCampaign: async () => ({ success: true }),
  completeCampaign: async () => ({ success: true })
};

export const CouponAdapter = {
  createCoupon: async () => ({ success: true }),
  validateCouponPlaceholder: async () => ({ success: true }),
  generateCoupons: async () => ({ success: true }),
  disableCoupon: async () => ({ success: true })
};

export const SegmentAdapter = {
  createSegment: async () => ({ success: true }),
  evaluateSegmentPlaceholder: async () => ({ success: true }),
  getSegmentCustomersPlaceholder: async () => ({ success: true })
};
