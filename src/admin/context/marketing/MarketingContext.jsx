import React, { createContext, useContext, useState, useMemo } from 'react';

const MarketingContext = createContext(null);

export const MarketingProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([
    { id: 'CMP-001', name: 'Summer Sale 2024', type: 'Promotional', channel: 'Email', audience: 'All Customers', startDate: '2024-06-01', endDate: '2024-06-30', owner: 'Jane Doe', budget: '$5,000', objective: 'Increase Sales', status: 'Active', reach: '50,000', clicks: '2,500', leads: '100', orders: '450', revenue: '$150,000' },
    { id: 'CMP-002', name: 'New Ergonomic Chair Launch', type: 'Product Launch', channel: 'Social Media', audience: 'B2B Customers', startDate: '2024-07-15', endDate: '2024-08-15', owner: 'John Smith', budget: '$10,000', objective: 'Awareness', status: 'Scheduled', reach: '-', clicks: '-', leads: '-', orders: '-', revenue: '-' },
    { id: 'CMP-003', name: 'Win-back Campaign', type: 'Retention', channel: 'Email', audience: 'Inactive > 6 months', startDate: '2024-05-01', endDate: '2024-05-31', owner: 'Alice Johnson', budget: '$2,000', objective: 'Customer Retention', status: 'Completed', reach: '10,000', clicks: '800', leads: '0', orders: '120', revenue: '$12,500' }
  ]);

  const [campaignTypes, setCampaignTypes] = useState([
    { id: 'CT-001', name: 'Promotional', status: 'Active' },
    { id: 'CT-002', name: 'Product Launch', status: 'Active' },
    { id: 'CT-003', name: 'Retention', status: 'Active' },
    { id: 'CT-004', name: 'Seasonal', status: 'Active' },
    { id: 'CT-005', name: 'Brand Awareness', status: 'Active' }
  ]);

  const [channels, setChannels] = useState([
    { id: 'CH-001', name: 'Website', status: 'Active', campaignCount: 5 },
    { id: 'CH-002', name: 'Email', status: 'Active', campaignCount: 12 },
    { id: 'CH-003', name: 'SMS', status: 'Active', campaignCount: 3 },
    { id: 'CH-004', name: 'Social Media', status: 'Active', campaignCount: 8 }
  ]);

  const [audiences, setAudiences] = useState([
    { id: 'AUD-001', name: 'All Customers', type: 'Customer Segment', members: 15420, source: 'CRM', status: 'Active', updatedAt: '2024-06-15' },
    { id: 'AUD-002', name: 'B2B Customers', type: 'Customer Segment', members: 3250, source: 'CRM', status: 'Active', updatedAt: '2024-06-10' },
    { id: 'AUD-003', name: 'Inactive > 6 months', type: 'Behavior', members: 4100, source: 'Orders API', status: 'Active', updatedAt: '2024-06-01' }
  ]);

  const [marketingLists, setMarketingLists] = useState([
    { id: 'LST-001', name: 'Newsletter Subscribers', type: 'Newsletter', members: 25000, source: 'Website', status: 'Active' },
    { id: 'LST-002', name: 'VIP Clients', type: 'VIP', members: 500, source: 'CRM', status: 'Active' }
  ]);

  const [promotions, setPromotions] = useState([
    { id: 'PRM-001', name: 'Summer 20%', campaign: 'Summer Sale 2024', type: 'Percentage', discount: '20%', startDate: '2024-06-01', endDate: '2024-06-30', status: 'Active' }
  ]);

  const [banners, setBanners] = useState([
    { id: 'BAN-001', name: 'Summer Hero Banner', campaign: 'Summer Sale 2024', placement: 'Homepage', startDate: '2024-06-01', endDate: '2024-06-30', status: 'Active' }
  ]);

  const [assets, setAssets] = useState([
    { id: 'AST-001', name: 'summer_sale_hero.jpg', type: 'Image', campaign: 'Summer Sale 2024', size: '2.4 MB', status: 'Approved', createdAt: '2024-05-15' },
    { id: 'AST-002', name: 'Q3_Brand_Video.mp4', type: 'Video', campaign: 'Brand Awareness', size: '45 MB', status: 'Draft', createdAt: '2024-06-10' }
  ]);

  const [automations, setAutomations] = useState([
    { id: 'AUT-001', name: 'Welcome Series', trigger: 'Customer Created', audience: 'All Customers', action: 'Send Email', status: 'Active', lastRun: '2 mins ago' },
    { id: 'AUT-002', name: 'Abandoned Cart Recovery', trigger: 'Cart Abandoned', audience: 'All Customers', action: 'Send Email', status: 'Active', lastRun: '1 hour ago' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 'TSK-001', title: 'Design Summer Banner', campaign: 'Summer Sale 2024', assignedTo: 'Sarah Designer', dueDate: '2024-05-20', priority: 'High', status: 'Completed' },
    { id: 'TSK-002', title: 'Write Email Copy', campaign: 'New Ergonomic Chair Launch', assignedTo: 'Mike Writer', dueDate: '2024-07-01', priority: 'Medium', status: 'Pending' }
  ]);

  const getCampaign = (id) => campaigns.find(c => c.id === id);

  const contextValue = useMemo(() => ({
    campaigns, setCampaigns, getCampaign,
    campaignTypes, setCampaignTypes,
    channels, setChannels,
    audiences, setAudiences,
    marketingLists, setMarketingLists,
    promotions, setPromotions,
    banners, setBanners,
    assets, setAssets,
    automations, setAutomations,
    tasks, setTasks
  }), [
    campaigns, campaignTypes, channels, audiences, marketingLists, 
    promotions, banners, assets, automations, tasks
  ]);

  return (
    <MarketingContext.Provider value={contextValue}>
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketing = () => useContext(MarketingContext);
