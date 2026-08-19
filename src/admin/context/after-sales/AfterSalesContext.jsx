import React, { createContext, useContext, useState, useMemo } from 'react';

const AfterSalesContext = createContext(null);

export const AfterSalesProvider = ({ children }) => {
  const [returns, setReturns] = useState([
    { id: 'RET-001', customerName: 'Alice Smith', orderId: 'ORD-1234', productName: 'Ergo Chair', reason: 'Defective', status: 'Requested', requestedDate: '2026-08-01' },
    { id: 'RET-002', customerName: 'Bob Jones', orderId: 'ORD-1235', productName: 'Standing Desk', reason: 'Damaged', status: 'Approved', requestedDate: '2026-08-02' }
  ]);

  const [inspections, setInspections] = useState([
    { id: 'INS-001', returnId: 'RET-002', productName: 'Standing Desk', condition: 'Damaged', inspector: 'Tech 1', status: 'Pending', date: '2026-08-05' }
  ]);

  const [rmas, setRmas] = useState([
    { id: 'RMA-001', customerName: 'Alice Smith', productName: 'Ergo Chair', type: 'Return', status: 'Open', date: '2026-08-03' }
  ]);

  const [warranties, setWarranties] = useState([
    { id: 'WAR-001', customerName: 'Charlie Brown', productName: 'Leather Sofa', type: 'Extended', status: 'Active' }
  ]);

  const [warrantyPolicies, setWarrantyPolicies] = useState([
    { id: 'WP-001', name: 'Standard 1 Year', category: 'All Products', status: 'Active' }
  ]);

  const [warrantyClaims, setWarrantyClaims] = useState([
    { id: 'WC-001', customerName: 'Charlie Brown', productName: 'Leather Sofa', issue: 'Seam tearing', status: 'Under Review', date: '2026-08-08' }
  ]);

  const [repairs, setRepairs] = useState([
    { id: 'REP-001', customerName: 'Alice Smith', productName: 'Ergo Chair', issue: 'Broken wheel', status: 'Assigned', technician: 'Tech 2', date: '2026-08-04' }
  ]);

  const [replacements, setReplacements] = useState([
    { id: 'RPL-001', customerName: 'Bob Jones', originalProduct: 'Standing Desk', replacementProduct: 'Standing Desk V2', status: 'Approved', date: '2026-08-06' }
  ]);

  const [cases, setCases] = useState([
    { id: 'CAS-001', customerName: 'Eve Miller', type: 'Support Ticket', priority: 'High', status: 'Open', date: '2026-08-09' }
  ]);

  const contextValue = useMemo(() => ({
    returns,
    inspections,
    rmas,
    warranties,
    warrantyPolicies,
    warrantyClaims,
    repairs,
    replacements,
    cases
  }), [returns, inspections, rmas, warranties, warrantyPolicies, warrantyClaims, repairs, replacements, cases]);

  return (
    <AfterSalesContext.Provider value={contextValue}>
      {children}
    </AfterSalesContext.Provider>
  );
};

export const useAfterSales = () => useContext(AfterSalesContext);
