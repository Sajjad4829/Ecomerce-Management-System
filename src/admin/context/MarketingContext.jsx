import React, { createContext, useContext, useState } from 'react';

const MarketingContext = createContext();

export function MarketingProvider({ children }) {
  // Mock Data
  const [segments, setSegments] = useState([
    {
      id: 'seg_1',
      name: 'VIP Customers',
      description: 'Customers in Gold or Platinum tiers',
      type: 'Dynamic',
      status: 'Active',
      customerCount: 120,
      createdAt: '2026-07-01T10:00:00Z',
      updatedAt: '2026-08-01T14:30:00Z',
      rules: [
        {
          id: 'rule_1',
          attribute: 'loyalty_tier',
          operator: 'in_list',
          value: ['tier_gold', 'tier_platinum']
        }
      ]
    },
    {
      id: 'seg_2',
      name: 'At Risk',
      description: 'No purchases in the last 90 days',
      type: 'Dynamic',
      status: 'Active',
      customerCount: 450,
      createdAt: '2026-07-15T09:00:00Z',
      updatedAt: '2026-08-05T11:00:00Z',
      rules: [
        {
          id: 'rule_2',
          attribute: 'days_since_last_order',
          operator: 'greater_than',
          value: 90
        }
      ]
    },
    {
      id: 'seg_3',
      name: 'Summer Sale Participants',
      description: 'Manually curated list',
      type: 'Static',
      status: 'Active',
      customerCount: 85,
      createdAt: '2026-06-01T10:00:00Z',
      updatedAt: '2026-06-05T11:00:00Z',
      rules: []
    }
  ]);

  const [audiences, setAudiences] = useState([
    {
      id: 'aud_1',
      name: 'Holiday Campaign VIPs',
      includedSegments: ['seg_1'],
      excludedSegments: ['seg_2'],
      status: 'Active',
      estimatedSize: 110,
      createdAt: '2026-08-01T10:00:00Z'
    }
  ]);

  const [automations, setAutomations] = useState([
    {
      id: 'auto_1',
      name: 'Welcome Series',
      trigger: 'customer_created',
      audience: 'All Customers',
      status: 'Active',
      lastRun: '2026-08-08T09:00:00Z',
      customersReached: 1250,
      createdAt: '2026-01-10T10:00:00Z',
      updatedAt: '2026-05-15T11:00:00Z',
      flow: {
        trigger: { type: 'event', event: 'customer_created' },
        actions: [
          { type: 'wait', value: '1 day' },
          { type: 'notification', channel: 'Email', templateId: 'welcome_email' }
        ]
      }
    },
    {
      id: 'auto_2',
      name: 'VIP Tier Upgrade',
      trigger: 'loyalty_tier_upgraded',
      audience: 'seg_1',
      status: 'Draft',
      lastRun: null,
      customersReached: 0,
      createdAt: '2026-08-05T10:00:00Z',
      updatedAt: '2026-08-05T10:00:00Z',
      flow: {
        trigger: { type: 'event', event: 'loyalty_tier_upgraded' },
        actions: [
          { type: 'notification', channel: 'Email', templateId: 'vip_welcome' },
          { type: 'add_points', value: 500 }
        ]
      }
    }
  ]);

  const [automationLogs, setAutomationLogs] = useState([
    {
      id: 'log_1',
      automationId: 'auto_1',
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      trigger: 'customer_created',
      status: 'Completed',
      startedAt: '2026-08-08T08:00:00Z',
      completedAt: '2026-08-09T08:00:00Z',
      result: 'Success'
    },
    {
      id: 'log_2',
      automationId: 'auto_1',
      customerId: 'cust_2',
      customerName: 'Michael Chang',
      trigger: 'customer_created',
      status: 'Running',
      startedAt: '2026-08-08T14:00:00Z',
      completedAt: null,
      result: 'Pending (Wait Node)'
    }
  ]);

  // Phase 5.57 Abandoned Carts Mock
  const [abandonedCarts, setAbandonedCarts] = useState([
    {
      id: 'cart_1',
      customerId: 'cust_1',
      items: [{ id: 'prod_1', quantity: 2, price: 50 }],
      total: 100,
      status: 'Recovered',
      createdAt: '2026-08-10T10:00:00Z',
      recoveredAt: '2026-08-11T12:00:00Z'
    },
    {
      id: 'cart_2',
      customerId: 'cust_3',
      items: [{ id: 'prod_2', quantity: 1, price: 1200 }],
      total: 1200,
      status: 'Abandoned',
      createdAt: '2026-08-12T14:00:00Z',
      recoveredAt: null
    },
    {
      id: 'cart_3',
      customerId: 'guest_1',
      items: [{ id: 'prod_3', quantity: 1, price: 300 }],
      total: 300,
      status: 'Recovered',
      createdAt: '2026-08-14T09:00:00Z',
      recoveredAt: '2026-08-14T11:00:00Z'
    }
  ]);

  const getSegment = (id) => segments.find(s => s.id === id);
  const getAutomation = (id) => automations.find(a => a.id === id);
  const getAutomationLogs = (id) => automationLogs.filter(l => l.automationId === id);

  return (
    <MarketingContext.Provider value={{
      segments,
      audiences,
      automations,
      automationLogs,
      abandonedCarts,
      getSegment,
      getAutomation,
      getAutomationLogs,
      setSegments,
      setAutomations,
      setAbandonedCarts
    }}>
      {children}
    </MarketingContext.Provider>
  );
}

export const useMarketing = () => useContext(MarketingContext);
