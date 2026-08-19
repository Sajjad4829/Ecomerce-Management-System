import React, { createContext, useContext, useState } from 'react';

const SupportContext = createContext();

export function SupportProvider({ children }) {
  const [agents, setAgents] = useState([
    { id: 'agt_1', name: 'Alice Smith', team: 'Order Support', status: 'Available', openTickets: 12 },
    { id: 'agt_2', name: 'Bob Jones', team: 'Technical Support', status: 'Busy', openTickets: 8 },
    { id: 'agt_3', name: 'Charlie Davis', team: 'Returns Support', status: 'Offline', openTickets: 4 }
  ]);

  const [teams, setTeams] = useState([
    { id: 'tm_1', name: 'Order Support', memberCount: 5, openTickets: 45 },
    { id: 'tm_2', name: 'Technical Support', memberCount: 3, openTickets: 12 },
    { id: 'tm_3', name: 'Returns Support', memberCount: 4, openTickets: 28 }
  ]);

  const [cannedResponses, setCannedResponses] = useState([
    { id: 'cr_1', title: 'Order Delay', category: 'Shipping Issue', message: 'We apologize for the delay. Your order is currently in transit and should arrive within 2-3 business days.', status: 'Active' },
    { id: 'cr_2', title: 'Return Instructions', category: 'Return Request', message: 'To initiate a return, please package the item securely and use the attached prepaid label. Drop it off at any authorized carrier location.', status: 'Active' }
  ]);

  const [tickets, setTickets] = useState([
    {
      id: 'TKT-1001',
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      subject: 'Where is my order?',
      category: 'Shipping Issue',
      priority: 'High',
      status: 'Open',
      assignedAgent: 'agt_1',
      assignedTeam: 'tm_1',
      relatedOrder: 'ORD-8492',
      relatedProduct: null,
      tags: ['Delivery', 'VIP'],
      sla: { status: 'At Risk', responseDue: '2026-08-08T18:00:00Z', resolutionDue: '2026-08-09T18:00:00Z' },
      feedback: null,
      createdAt: '2026-08-08T09:00:00Z',
      updatedAt: '2026-08-08T10:00:00Z',
      messages: [
        { id: 'msg_1', sender: 'Customer', author: 'Sarah Jenkins', content: 'Hi, my order ORD-8492 was supposed to be delivered yesterday but I haven\'t received it yet.', timestamp: '2026-08-08T09:00:00Z', isInternal: false },
        { id: 'msg_2', sender: 'System', author: 'Auto-reply', content: 'Thank you for reaching out. We have received your message and an agent will be with you shortly.', timestamp: '2026-08-08T09:00:05Z', isInternal: false },
        { id: 'msg_3', sender: 'Agent', author: 'Alice Smith', content: 'Checked tracking. It shows a weather delay in transit hub.', timestamp: '2026-08-08T09:30:00Z', isInternal: true }
      ]
    },
    {
      id: 'TKT-1002',
      customerId: 'cust_2',
      customerName: 'Michael Chen',
      email: 'michael.c@example.com',
      subject: 'Damaged item received',
      category: 'Product Damage',
      priority: 'Urgent',
      status: 'Pending Customer',
      assignedAgent: 'agt_2',
      assignedTeam: 'tm_2',
      relatedOrder: 'ORD-7210',
      relatedProduct: 'prod_2',
      tags: ['Damaged', 'Refund'],
      sla: { status: 'Within SLA', responseDue: '2026-08-08T12:00:00Z', resolutionDue: '2026-08-10T12:00:00Z' },
      feedback: null,
      createdAt: '2026-08-07T14:00:00Z',
      updatedAt: '2026-08-07T15:30:00Z',
      messages: [
        { id: 'msg_4', sender: 'Customer', author: 'Michael Chen', content: 'The ceramic lamp I received is chipped at the base.', timestamp: '2026-08-07T14:00:00Z', isInternal: false },
        { id: 'msg_5', sender: 'Agent', author: 'Bob Jones', content: 'I am so sorry to hear that. Could you please provide a photo of the damage so we can process a replacement immediately?', timestamp: '2026-08-07T15:30:00Z', isInternal: false }
      ]
    },
    {
      id: 'TKT-1003',
      customerId: 'cust_1',
      customerName: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      subject: 'Leather care instructions',
      category: 'Product Question',
      priority: 'Low',
      status: 'Resolved',
      assignedAgent: 'agt_3',
      assignedTeam: 'tm_2',
      relatedOrder: 'ORD-8492',
      relatedProduct: 'prod_1',
      tags: [],
      sla: { status: 'Within SLA', responseDue: null, resolutionDue: null },
      feedback: { rating: 5, comment: 'Very helpful!' },
      createdAt: '2026-08-01T10:00:00Z',
      updatedAt: '2026-08-02T09:00:00Z',
      messages: [
        { id: 'msg_6', sender: 'Customer', author: 'Sarah Jenkins', content: 'What is the best way to clean the modern leather sofa?', timestamp: '2026-08-01T10:00:00Z', isInternal: false },
        { id: 'msg_7', sender: 'Agent', author: 'Charlie Davis', content: 'We recommend wiping it with a dry microfiber cloth weekly, and using a specialized leather conditioner every 6 months. Avoid direct sunlight.', timestamp: '2026-08-01T14:00:00Z', isInternal: false }
      ]
    }
  ]);

  const getTicket = (id) => tickets.find(t => t.id === id);

  const updateTicketStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t));
  };

  const updatePriority = (id, priority) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, priority, updatedAt: new Date().toISOString() } : t));
  };

  const assignTicket = (id, agentId) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, assignedAgent: agentId, updatedAt: new Date().toISOString() } : t));
  };

  const addMessage = (id, content, sender, author, isInternal = false) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const newMessage = {
          id: `msg_${Date.now()}`,
          sender,
          author,
          content,
          timestamp: new Date().toISOString(),
          isInternal
        };
        
        let newStatus = t.status;
        if (!isInternal) {
          if (sender === 'Customer') newStatus = 'Open';
          if (sender === 'Agent') newStatus = 'Pending Customer';
        }

        return {
          ...t,
          status: newStatus,
          messages: [...t.messages, newMessage],
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
  };

  const createTicket = (ticketData) => {
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      ...ticketData,
      status: 'New',
      assignedAgent: null,
      assignedTeam: null,
      tags: [],
      sla: { status: 'Within SLA', responseDue: new Date(Date.now() + 24*3600*1000).toISOString(), resolutionDue: null },
      feedback: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        { id: `msg_${Date.now()}`, sender: 'Customer', author: ticketData.customerName, content: ticketData.message, timestamp: new Date().toISOString(), isInternal: false }
      ]
    };
    setTickets([newTicket, ...tickets]);
    return newTicket.id;
  };

  return (
    <SupportContext.Provider value={{
      tickets,
      agents,
      teams,
      cannedResponses,
      getTicket,
      updateTicketStatus,
      updatePriority,
      assignTicket,
      addMessage,
      createTicket
    }}>
      {children}
    </SupportContext.Provider>
  );
}

export const useSupport = () => useContext(SupportContext);
