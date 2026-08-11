import React, { createContext, useContext, useState } from 'react';

const LoyaltyContext = createContext();

export function LoyaltyProvider({ children }) {
  // Mock Data
  const [loyaltyAccounts, setLoyaltyAccounts] = useState([
    {
      id: 'loyal_1',
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      tierId: 'tier_gold',
      availablePoints: 2450,
      pendingPoints: 150,
      lifetimeEarned: 10450,
      lifetimeRedeemed: 8000,
      createdAt: '2025-01-10T10:00:00Z',
      updatedAt: '2026-08-01T14:30:00Z'
    },
    {
      id: 'loyal_2',
      customerId: 'cust_2',
      customerName: 'Michael Chang',
      tierId: 'tier_silver',
      availablePoints: 800,
      pendingPoints: 0,
      lifetimeEarned: 3800,
      lifetimeRedeemed: 3000,
      createdAt: '2025-11-20T09:15:00Z',
      updatedAt: '2026-07-15T11:00:00Z'
    }
  ]);

  const [pointsLedger, setPointsLedger] = useState([
    {
      id: 'txn_1',
      loyaltyAccountId: 'loyal_1',
      customerId: 'cust_1',
      type: 'Earned',
      amount: 450,
      source: 'Purchase',
      referenceId: 'ORD-8492',
      status: 'Available',
      createdAt: '2026-08-01T14:30:00Z',
      metadata: 'Order #ORD-8492 Completion'
    },
    {
      id: 'txn_2',
      loyaltyAccountId: 'loyal_1',
      customerId: 'cust_1',
      type: 'Redeemed',
      amount: -1000,
      source: 'Reward',
      referenceId: 'redemp_1',
      status: 'Completed',
      createdAt: '2026-07-28T09:15:00Z',
      metadata: 'Redeemed $10 Store Credit'
    }
  ]);

  const [tiers, setTiers] = useState([
    { id: 'tier_member', name: 'Member', requirements: 'Sign up', minSpend: 0, benefits: 'Earn points on every purchase.', priority: 1, status: 'Active' },
    { id: 'tier_silver', name: 'Silver', requirements: '$1,000 lifetime spend', minSpend: 1000, benefits: '1.2x points, Free standard shipping.', priority: 2, status: 'Active' },
    { id: 'tier_gold', name: 'Gold', requirements: '$5,000 lifetime spend', minSpend: 5000, benefits: '1.5x points, Free expedited shipping, VIP support.', priority: 3, status: 'Active' },
    { id: 'tier_platinum', name: 'Platinum', requirements: '$15,000 lifetime spend', minSpend: 15000, benefits: '2x points, Concierge service, Early access.', priority: 4, status: 'Active' }
  ]);

  const [rewards, setRewards] = useState([
    { id: 'rew_1', name: '$10 Store Credit', type: 'Credit', cost: 1000, value: 10, status: 'Active' },
    { id: 'rew_2', name: '$25 Store Credit', type: 'Credit', cost: 2400, value: 25, status: 'Active' },
    { id: 'rew_3', name: '$50 Store Credit', type: 'Credit', cost: 4500, value: 50, status: 'Active' },
    { id: 'rew_4', name: 'Free Standard Shipping', type: 'Shipping', cost: 1500, value: 0, status: 'Active' }
  ]);

  const [earningRules, setEarningRules] = useState([
    { id: 'rule_1', name: 'Order Purchase', event: 'Purchase', points: '1 point per $1', conditions: 'Order Completed', status: 'Active' },
    { id: 'rule_2', name: 'Account Creation', event: 'Signup', points: '500 points', conditions: 'One-time', status: 'Active' },
    { id: 'rule_3', name: 'Product Review', event: 'Review', points: '100 points', conditions: 'Verified Purchase', status: 'Active' },
    { id: 'rule_4', name: 'Photo Review Bonus', event: 'Review Photo', points: '200 points', conditions: 'Approved', status: 'Active' }
  ]);

  const [referrals, setReferrals] = useState([
    { id: 'ref_1', referrerId: 'cust_1', referrerName: 'Sarah Jenkins', referredEmail: 'alex.smith@example.com', status: 'Qualified', reward: '500 pts', date: '2026-08-05T10:00:00Z' }
  ]);

  const getLoyaltyAccount = (customerId) => loyaltyAccounts.find(a => a.customerId === customerId);
  const getCustomerLedger = (customerId) => pointsLedger.filter(l => l.customerId === customerId);

  const adjustPoints = (customerId, amount, source, reason) => {
    const accountIndex = loyaltyAccounts.findIndex(a => a.customerId === customerId);
    if (accountIndex === -1) return;

    const newTxn = {
      id: `txn_${Date.now()}`,
      loyaltyAccountId: loyaltyAccounts[accountIndex].id,
      customerId,
      type: amount >= 0 ? 'Adjusted (Add)' : 'Adjusted (Deduct)',
      amount,
      source,
      referenceId: `manual_${Date.now()}`,
      status: 'Available',
      createdAt: new Date().toISOString(),
      metadata: reason
    };

    setPointsLedger(prev => [newTxn, ...prev]);

    const newAccounts = [...loyaltyAccounts];
    const acc = newAccounts[accountIndex];
    acc.availablePoints += amount;
    if (amount > 0) acc.lifetimeEarned += amount;
    setLoyaltyAccounts(newAccounts);
  };

  return (
    <LoyaltyContext.Provider value={{
      loyaltyAccounts,
      pointsLedger,
      tiers,
      rewards,
      earningRules,
      referrals,
      getLoyaltyAccount,
      getCustomerLedger,
      adjustPoints
    }}>
      {children}
    </LoyaltyContext.Provider>
  );
}

export const useLoyalty = () => useContext(LoyaltyContext);
