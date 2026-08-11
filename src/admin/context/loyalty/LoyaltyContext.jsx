import React, { createContext, useContext, useState, useMemo } from 'react';

const LoyaltyContext = createContext(null);

export const LoyaltyProvider = ({ children }) => {
  const [memberships, setMemberships] = useState([
    { id: 'MEM-001', customerId: 'CUST-001', customerName: 'Alice Smith', tier: 'Gold', points: 1250, status: 'Active', joinedAt: '2025-01-15' },
    { id: 'MEM-002', customerId: 'CUST-002', customerName: 'Bob Jones', tier: 'Silver', points: 450, status: 'Active', joinedAt: '2025-06-20' },
    { id: 'MEM-003', customerId: 'CUST-003', customerName: 'Charlie Brown', tier: 'Bronze', points: 120, status: 'Active', joinedAt: '2026-01-10' }
  ]);

  const [tiers, setTiers] = useState([
    { id: 'TIER-1', name: 'Bronze', qualification: '0 points', benefits: 'Standard shipping', status: 'Active' },
    { id: 'TIER-2', name: 'Silver', qualification: '500 points', benefits: 'Free standard shipping', status: 'Active' },
    { id: 'TIER-3', name: 'Gold', qualification: '2000 points', benefits: 'Free express shipping, 5% off', status: 'Active' }
  ]);

  const [points, setPoints] = useState([
    { id: 'PT-001', customerId: 'CUST-001', customerName: 'Alice Smith', type: 'Earned', points: 250, reference: 'ORD-2023', status: 'Completed', date: '2026-08-01' },
    { id: 'PT-002', customerId: 'CUST-002', customerName: 'Bob Jones', type: 'Redeemed', points: -100, reference: 'RED-105', status: 'Completed', date: '2026-08-05' }
  ]);

  const [rewards, setRewards] = useState([
    { id: 'REW-001', name: '$10 Off Coupon', type: 'Coupon', cost: 1000, tier: 'All', status: 'Active' },
    { id: 'REW-002', name: 'Free Accessory', type: 'Product', cost: 2500, tier: 'Silver+', status: 'Active' }
  ]);

  const [redemptions, setRedemptions] = useState([
    { id: 'RED-105', customerId: 'CUST-002', customerName: 'Bob Jones', rewardName: '$10 Off Coupon', points: 1000, status: 'Completed', date: '2026-08-05' }
  ]);
  
  const [rules, setRules] = useState([
    { id: 'RUL-001', name: 'Purchase Points', trigger: 'Purchase', points: '1 per $1', status: 'Active' },
    { id: 'RUL-002', name: 'Review Product', trigger: 'Review', points: '50 per review', status: 'Active' }
  ]);
  
  const [referrals, setReferrals] = useState([
    { id: 'REF-001', referrerName: 'Alice Smith', referredName: 'Eve Miller', status: 'Pending', reward: '500 points', date: '2026-08-07' }
  ]);
  
  const [campaigns, setCampaigns] = useState([
    { id: 'CMP-001', name: 'Summer Double Points', audience: 'All Members', bonus: '2x Points', status: 'Active' }
  ]);

  const approveRedemption = (id) => setRedemptions(redemptions.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  const cancelRedemption = (id) => setRedemptions(redemptions.map(r => r.id === id ? { ...r, status: 'Cancelled' } : r));

  const adjustPoints = (data) => {
    const newTx = {
      id: `PT-${Date.now()}`,
      customerId: data.customerId,
      customerName: 'Selected Customer',
      type: data.type,
      points: data.type === 'Deduct' ? -data.points : parseInt(data.points),
      reference: 'Manual',
      reason: data.reason,
      status: 'Completed',
      date: new Date().toISOString()
    };
    setPoints([newTx, ...points]);
  };

  const contextValue = useMemo(() => ({
    memberships,
    tiers,
    points,
    rewards,
    redemptions,
    rules,
    referrals,
    campaigns,
    approveRedemption,
    cancelRedemption,
    adjustPoints
  }), [memberships, tiers, points, rewards, redemptions, rules, referrals, campaigns]);

  return (
    <LoyaltyContext.Provider value={contextValue}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => useContext(LoyaltyContext);
