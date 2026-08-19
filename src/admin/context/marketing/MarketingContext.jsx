import React, { createContext, useContext, useState, useMemo } from 'react';
import { useOrders } from '../orders/OrderContext';
import { useFinance } from '../finance/FinanceContext';

const MarketingContext = createContext(null);

export const MarketingProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([
    { 
      id: 'CMP-001', 
      name: 'Summer Sale 2024', 
      type: 'Seasonal Sale', 
      status: 'Active',
      objective: 'Increase Sales',
      startDate: '2024-05-01', 
      endDate: '2024-08-31', 
      owner: 'Marketing Team', 
      budget: 5000, 
      targetSegments: ['SEG-001'],
      targetLoyaltyTiers: [],
      promotionIds: ['pro-1', 'pro-2'],
      couponCodes: ['SUMMER20'],
      description: 'Massive summer clearance for all VIP customers and above.'
    },
    { 
      id: 'CMP-002', 
      name: 'VIP Early Access', 
      type: 'VIP Campaign', 
      status: 'Scheduled',
      objective: 'Customer Retention',
      startDate: '2024-11-15', 
      endDate: '2024-11-20', 
      owner: 'Marketing Team', 
      budget: 2000, 
      targetSegments: [],
      targetLoyaltyTiers: ['tier-platinum', 'tier-gold'],
      promotionIds: ['pro-3'],
      couponCodes: [],
      description: 'Exclusive 20% off storewide for Gold and Platinum members.'
    }
  ]);

  const [campaignTypes] = useState([
    'Seasonal Sale', 'Flash Sale', 'VIP Campaign', 'New Customer Campaign', 
    'Retention Campaign', 'Clearance Campaign', 'Product Launch', 
    'Category Campaign', 'Custom Campaign'
  ]);

  const createCampaign = (campaign) => {
    setCampaigns(prev => [{ ...campaign, id: `CMP-${Date.now()}` }, ...prev]);
  };

  const updateCampaign = (id, updates) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const getCampaign = (id) => campaigns.find(c => c.id === id);

  const contextValue = useMemo(() => ({
    campaigns,
    campaignTypes,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign
  }), [campaigns, campaignTypes]);

  return (
    <MarketingContext.Provider value={contextValue}>
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketing = () => useContext(MarketingContext);

// Custom hook to fetch analytics for a specific campaign
export const useCampaignAnalytics = (campaignId) => {
  const { campaigns } = useMarketing();
  const { orders } = useOrders();
  const { transactions } = useFinance();

  return useMemo(() => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return null;

    const campaignOrders = orders.filter(o => o.campaignId === campaignId);
    
    let totalOrders = campaignOrders.length;
    let customers = new Set(campaignOrders.map(o => o.customerId)).size;
    let grossRevenue = 0;
    let discountGiven = 0;
    let totalRefunds = 0;
    let couponUsage = 0;

    campaignOrders.forEach(order => {
      grossRevenue += (order.total + (order.discountAmount || 0));
      discountGiven += (order.discountAmount || 0);
      if (order.couponCode && campaign.couponCodes.includes(order.couponCode)) {
        couponUsage++;
      }

      // Calculate refunds using transactions
      const orderTxns = transactions.filter(t => t.orderId === order.id && t.status === 'Completed');
      orderTxns.forEach(txn => {
        if (txn.type === 'Refund') {
          totalRefunds += txn.amount;
        }
      });
    });

    const netRevenue = grossRevenue - discountGiven - totalRefunds;
    const aov = totalOrders > 0 ? (netRevenue / totalOrders) : 0;
    const roi = campaign.budget > 0 ? ((netRevenue - campaign.budget) / campaign.budget) * 100 : null;

    return {
      campaign,
      metrics: {
        totalOrders,
        customers,
        grossRevenue,
        discountGiven,
        totalRefunds,
        netRevenue,
        aov,
        roi,
        couponUsage
      },
      orders: campaignOrders
    };
  }, [campaignId, campaigns, orders, transactions]);
};

export const useGlobalMarketingAnalytics = () => {
  const { campaigns } = useMarketing();
  const { orders } = useOrders();
  const { transactions } = useFinance();

  return useMemo(() => {
    let totalRevenue = 0;
    let totalDiscount = 0;
    let totalOrders = 0;
    let totalCustomers = new Set();
    
    // Process all orders that belong to any campaign
    const campaignOrders = orders.filter(o => o.campaignId);
    
    campaignOrders.forEach(order => {
      totalOrders++;
      totalCustomers.add(order.customerId);
      
      let orderGross = order.total + (order.discountAmount || 0);
      let orderRefunds = 0;
      
      const orderTxns = transactions.filter(t => t.orderId === order.id && t.status === 'Completed');
      orderTxns.forEach(txn => {
        if (txn.type === 'Refund') orderRefunds += txn.amount;
      });

      totalRevenue += (orderGross - (order.discountAmount || 0) - orderRefunds);
      totalDiscount += (order.discountAmount || 0);
    });

    return {
      totalRevenue,
      totalDiscount,
      totalOrders,
      activeCampaigns: campaigns.filter(c => c.status === 'Active').length,
      scheduledCampaigns: campaigns.filter(c => c.status === 'Scheduled').length,
      completedCampaigns: campaigns.filter(c => c.status === 'Completed').length,
      totalCampaigns: campaigns.length,
      totalCustomers: totalCustomers.size
    };
  }, [campaigns, orders, transactions]);
};
