import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-1001',
      firstName: 'Eleanor',
      lastName: 'Rigby',
      email: 'eleanor.rigby@example.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      avatarAssetId: null,
      joinedAt: '2023-01-15T10:00:00Z',
      lastActivityAt: '2024-05-12T14:30:00Z',
      tags: ['VIP', 'Furniture Buyer'],
      segmentIds: ['seg-1', 'seg-3'],
      lifetimeValue: 12450.00,
      orderCount: 14,
      loyaltyTier: 'Platinum',
      points: 12500,
      communication: { email: true, sms: false, push: true, marketingConsent: true },
      addresses: [
        { id: 'addr-1', type: 'billing', name: 'Eleanor Rigby', address: '123 Abbey Road', city: 'London', region: 'Greater London', postalCode: 'NW8 9AY', country: 'UK', isDefault: true }
      ]
    },
    {
      id: 'CUST-1002',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 987-6543',
      status: 'inactive',
      avatarAssetId: null,
      joinedAt: '2023-11-20T08:15:00Z',
      lastActivityAt: '2024-01-05T09:45:00Z',
      tags: ['Sofa Buyer'],
      segmentIds: ['seg-2'],
      lifetimeValue: 3450.00,
      orderCount: 1,
      loyaltyTier: 'Member',
      points: 450,
      communication: { email: false, sms: false, push: false, marketingConsent: false },
      addresses: []
    }
  ]);

  const [segments, setSegments] = useState([
    { id: 'seg-1', name: 'VIP Customers', description: 'Customers with LTV > $10,000', customerCount: 142, status: 'active', createdAt: '2023-01-01T00:00:00Z', conditions: [] },
    { id: 'seg-2', name: 'New Customers', description: 'Joined in the last 30 days', customerCount: 89, status: 'active', createdAt: '2023-01-01T00:00:00Z', conditions: [] },
    { id: 'seg-3', name: 'Returning Customers', description: 'Placed more than 1 order', customerCount: 450, status: 'active', createdAt: '2023-01-01T00:00:00Z', conditions: [] }
  ]);

  const [notes, setNotes] = useState([
    { id: 'note-1', customerId: 'CUST-1001', content: 'Prefers modern mid-century designs. Reached out about the velvet sofa.', authorId: 'ADMIN-1', createdAt: '2024-05-10T11:00:00Z', updatedAt: '2024-05-10T11:00:00Z', status: 'active' }
  ]);
  
  const [activities, setActivities] = useState([
    { id: 'act-1', customerId: 'CUST-1001', type: 'order_placed', description: 'Placed Order #10042', createdAt: '2024-05-12T14:30:00Z', metadata: { orderId: '10042' } },
    { id: 'act-2', customerId: 'CUST-1001', type: 'profile_updated', description: 'Updated shipping address', createdAt: '2024-05-10T09:15:00Z', metadata: {} }
  ]);

  const getCustomer = (id) => customers.find(c => c.id === id);
  const getCustomerNotes = (id) => notes.filter(n => n.customerId === id);
  const getCustomerActivity = (id) => activities.filter(a => a.customerId === id);
  const getSegment = (id) => segments.find(s => s.id === id);
  
  const updateCustomer = (id, data) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const addSegment = (segmentData) => {
    const newSegment = {
      id: `seg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      customerCount: 0,
      ...segmentData
    };
    setSegments([...segments, newSegment]);
    return newSegment;
  };

  const updateSegment = (id, data) => {
    setSegments(segments.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const deleteSegment = (id) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  const evaluateSegments = (customerId) => {
    const customer = getCustomer(customerId);
    if (!customer) return;
    
    // In a real implementation, this would evaluate the 'conditions' array of each segment against the customer data
    // For now, we mock the evaluation
    const matchedSegmentIds = segments
      .filter(s => s.status === 'active' || s.status === 'Active')
      .filter(s => {
        // Mock condition evaluation:
        if (s.name.includes('VIP') && (customer.lifetimeValue > 10000 || customer.orderCount >= 10)) return true;
        if (s.name.includes('New') && customer.orderCount === 0) return true;
        if (s.name.includes('Returning') && customer.orderCount > 1) return true;
        return false;
      })
      .map(s => s.id);

    // Update customer segmentIds
    updateCustomer(customerId, { segmentIds: matchedSegmentIds });

    // Update segment customer counts (mocked)
    setSegments(prevSegments => prevSegments.map(seg => {
      const isMatched = matchedSegmentIds.includes(seg.id);
      const currentlyHas = customer.segmentIds?.includes(seg.id);
      
      let countChange = 0;
      if (isMatched && !currentlyHas) countChange = 1;
      if (!isMatched && currentlyHas) countChange = -1;
      
      return countChange !== 0 ? { ...seg, customerCount: Math.max(0, seg.customerCount + countChange) } : seg;
    }));
  };

  const addCustomer = (customerData) => {
    const existing = customers.find(c => c.email.toLowerCase() === customerData.email.toLowerCase());
    if (existing) {
      throw new Error('Customer with this email already exists.');
    }
    
    const newCustomer = {
      id: `CUST-${Date.now()}`,
      joinedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      status: 'active',
      tags: [],
      segmentIds: [],
      lifetimeValue: 0,
      orderCount: 0,
      loyaltyTier: 'Member',
      points: 0,
      communication: { email: false, sms: false, push: false, marketingConsent: false },
      addresses: [],
      ...customerData
    };
    
    setCustomers(prev => [newCustomer, ...prev]);
    return newCustomer;
  };

  const addAddress = (customerId, addressData) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        let newAddresses = [...(c.addresses || [])];
        const newAddress = { id: `addr-${Date.now()}`, ...addressData };
        
        if (newAddress.isDefault) {
          newAddresses = newAddresses.map(a => 
            a.type === newAddress.type ? { ...a, isDefault: false } : a
          );
        }
        
        if (!newAddresses.some(a => a.type === newAddress.type)) {
          newAddress.isDefault = true;
        }

        newAddresses.push(newAddress);
        return { ...c, addresses: newAddresses };
      }
      return c;
    }));
  };

  const updateAddress = (customerId, addressId, addressData) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        let newAddresses = [...(c.addresses || [])];
        
        if (addressData.isDefault) {
          const type = addressData.type || newAddresses.find(a => a.id === addressId)?.type;
          newAddresses = newAddresses.map(a => 
            a.type === type ? { ...a, isDefault: false } : a
          );
        }

        newAddresses = newAddresses.map(a => a.id === addressId ? { ...a, ...addressData } : a);
        return { ...c, addresses: newAddresses };
      }
      return c;
    }));
  };

  const deleteAddress = (customerId, addressId) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const newAddresses = (c.addresses || []).filter(a => a.id !== addressId);
        return { ...c, addresses: newAddresses };
      }
      return c;
    }));
  };
  
  const getCustomerType = (customer) => {
    if (!customer) return 'New';
    if (customer.lifetimeValue > 10000 || customer.orderCount > 10) return 'VIP';
    if (customer.orderCount > 1) return 'Returning';
    if (customer.orderCount === 1) return 'Regular';
    return 'New';
  };
  
  const addNote = (customerId, content) => {
    const newNote = {
      id: `note-${Date.now()}`,
      customerId,
      content,
      authorId: 'ADMIN-CURRENT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      segments,
      getCustomer,
      getCustomerNotes,
      getCustomerActivity,
      updateCustomer,
      addCustomer,
      addAddress,
      updateAddress,
      deleteAddress,
      getCustomerType,
      addNote,
      getSegment,
      addSegment,
      updateSegment,
      deleteSegment,
      evaluateSegments
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
