import React, { createContext, useContext, useState, useMemo } from 'react';

const CRMContext = createContext(null);

export const CRMProvider = ({ children }) => {
  const [leads, setLeads] = useState([
    { id: 'LD-001', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: 'Acme Corp', source: 'Website', status: 'New', priority: 'High', assignedTo: 'Alice Smith', interestedProduct: 'Office Chair', estimatedValue: '$1,200', createdAt: '2024-06-15' },
    { id: 'LD-002', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', company: 'Beta Inc', source: 'Referral', status: 'Contacted', priority: 'Medium', assignedTo: 'Bob Johnson', interestedProduct: 'Standing Desk', estimatedValue: '$800', createdAt: '2024-06-14' },
  ]);

  const [leadSources, setLeadSources] = useState([
    { id: 'SRC-001', name: 'Website', status: 'Active' },
    { id: 'SRC-002', name: 'Referral', status: 'Active' },
  ]);

  const [pipelineStages, setPipelineStages] = useState([
    { id: 'STG-001', name: 'New', order: 1, probability: '10%', status: 'Active' },
    { id: 'STG-002', name: 'Contacted', order: 2, probability: '25%', status: 'Active' },
    { id: 'STG-003', name: 'Qualified', order: 3, probability: '50%', status: 'Active' },
    { id: 'STG-004', name: 'Proposal', order: 4, probability: '75%', status: 'Active' },
    { id: 'STG-005', name: 'Negotiation', order: 5, probability: '90%', status: 'Active' },
    { id: 'STG-006', name: 'Won', order: 6, probability: '100%', status: 'Active' },
    { id: 'STG-007', name: 'Lost', order: 7, probability: '0%', status: 'Active' },
  ]);

  const [opportunities, setOpportunities] = useState([
    { id: 'OPP-001', name: 'Acme Office Refit', customer: 'Acme Corp', stage: 'Proposal', estimatedValue: '$15,000', expectedClose: '2024-07-31', assignedTo: 'Alice Smith', status: 'Open' },
  ]);

  const [activities, setActivities] = useState([
    { id: 'ACT-001', type: 'Call', relatedTo: 'Acme Corp', assignedTo: 'Alice Smith', dueDate: '2024-06-20', status: 'Pending', subject: 'Follow up on proposal' },
  ]);

  const [followUps, setFollowUps] = useState([
    { id: 'FU-001', relatedTo: 'Beta Inc', type: 'Email', assignedTo: 'Bob Johnson', dueDate: '2024-06-18', priority: 'High', status: 'Pending' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 'TSK-001', title: 'Prepare Quote', relatedTo: 'Acme Corp', assignedTo: 'Alice Smith', dueDate: '2024-06-21', priority: 'Medium', status: 'Pending' },
  ]);

  const [segments, setSegments] = useState([
    { id: 'SEG-001', name: 'High Value', criteria: 'Purchases > $10,000', status: 'Active', customerCount: 15 },
  ]);

  const [customerGroups, setCustomerGroups] = useState([
    { id: 'CG-001', name: 'Wholesale Partners', purpose: 'B2B Pricing', status: 'Active', members: 42 },
  ]);

  const [tags, setTags] = useState([
    { id: 'TAG-001', name: 'VIP', status: 'Active' },
    { id: 'TAG-002', name: 'Returning', status: 'Active' },
  ]);

  const [salesTeams, setSalesTeams] = useState([
    { id: 'TM-001', name: 'North America Enterprise', manager: 'Alice Smith', members: 4, status: 'Active', leadCount: 120, opportunityCount: 45 },
  ]);

  const getLead = (id) => leads.find(l => l.id === id);
  const getOpportunity = (id) => opportunities.find(o => o.id === id);

  const contextValue = useMemo(() => ({
    leads,
    leadSources,
    pipelineStages,
    opportunities,
    activities,
    followUps,
    tasks,
    segments,
    customerGroups,
    tags,
    salesTeams,
    getLead,
    getOpportunity
  }), [leads, leadSources, pipelineStages, opportunities, activities, followUps, tasks, segments, customerGroups, tags, salesTeams]);

  return (
    <CRMContext.Provider value={contextValue}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => useContext(CRMContext);
