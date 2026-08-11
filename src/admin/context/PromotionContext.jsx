import React, { createContext, useContext, useState } from 'react';

const PromotionContext = createContext();

export function PromotionProvider({ children }) {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'cmp-1',
      name: 'Summer Clearance 2025',
      type: 'Seasonal',
      status: 'Active',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      priority: 1,
      promotions: ['pro-1', 'pro-2']
    },
    {
      id: 'cmp-2',
      name: 'VIP Early Access',
      type: 'VIP',
      status: 'Scheduled',
      startDate: '2025-11-15',
      endDate: '2025-11-20',
      priority: 2,
      promotions: ['pro-3']
    }
  ]);

  const [promotions, setPromotions] = useState([
    {
      id: 'pro-1',
      campaignId: 'cmp-1',
      name: '15% Off All Outdoor Seating',
      type: 'Percentage Discount',
      discountValue: 15,
      target: 'Category',
      targetValue: 'Outdoor Seating',
      status: 'Active',
      priority: 1
    },
    {
      id: 'pro-2',
      campaignId: 'cmp-1',
      name: 'Free Shipping over ৳50,000',
      type: 'Free Shipping',
      discountValue: 0,
      target: 'Cart',
      status: 'Active',
      priority: 2
    },
    {
      id: 'pro-3',
      campaignId: 'cmp-2',
      name: 'VIP 20% Storewide',
      type: 'Percentage Discount',
      discountValue: 20,
      target: 'All Products',
      status: 'Scheduled',
      priority: 1
    }
  ]);

  const [coupons, setCoupons] = useState([
    {
      id: 'cpn-1',
      code: 'WELCOME10',
      promotionId: null, // Standalone coupon
      type: 'Percentage Discount',
      discountValue: 10,
      usageLimit: 1000,
      usedCount: 150,
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    {
      id: 'cpn-2',
      code: 'FLASH50',
      promotionId: 'pro-1',
      type: 'Fixed Amount Discount',
      discountValue: 5000,
      usageLimit: 100,
      usedCount: 100,
      status: 'Expired',
      startDate: '2025-01-01',
      endDate: '2025-01-31'
    }
  ]);

  const [flashSales, setFlashSales] = useState([
    {
      id: 'fs-1',
      name: 'Midnight Madness',
      status: 'Draft',
      startDate: '2025-10-31T20:00:00',
      endDate: '2025-11-01T02:00:00',
      productsCount: 5,
      discountType: 'Percentage Discount',
      discountValue: 40
    }
  ]);

  const createCampaign = (campaign) => {
    setCampaigns([...campaigns, { ...campaign, id: `cmp-${Date.now()}` }]);
  };

  const updateCampaign = (id, updates) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const createPromotion = (promotion) => {
    setPromotions([...promotions, { ...promotion, id: `pro-${Date.now()}` }]);
  };

  const updatePromotion = (id, updates) => {
    setPromotions(promotions.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const createCoupon = (coupon) => {
    setCoupons([...coupons, { ...coupon, id: `cpn-${Date.now()}` }]);
  };

  const validateCoupon = (code) => {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) return { valid: false, message: 'Invalid coupon code' };
    if (coupon.status !== 'Active') return { valid: false, message: 'Coupon is not active' };
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return { valid: false, message: 'Coupon usage limit reached' };
    return { valid: true, coupon };
  };

  return (
    <PromotionContext.Provider value={{
      campaigns,
      promotions,
      coupons,
      flashSales,
      createCampaign,
      updateCampaign,
      createPromotion,
      updatePromotion,
      createCoupon,
      validateCoupon
    }}>
      {children}
    </PromotionContext.Provider>
  );
}

export const usePromotion = () => useContext(PromotionContext);
