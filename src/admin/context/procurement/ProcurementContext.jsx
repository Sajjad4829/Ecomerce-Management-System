import React, { createContext, useContext, useState, useMemo } from 'react';

const ProcurementContext = createContext(null);

export const ProcurementProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-001', name: 'WoodCraft Industries', code: 'WC-001', category: 'Raw Materials', contact: 'John Wood', email: 'john@woodcraft.example', phone: '123-456-7890', status: 'Active', rating: 4.8, createdDate: '2023-01-15' },
    { id: 'SUP-002', name: 'MetalWorks Inc', code: 'MW-002', category: 'Hardware', contact: 'Jane Iron', email: 'jane@metalworks.example', phone: '098-765-4321', status: 'Active', rating: 4.5, createdDate: '2023-02-20' },
  ]);

  const [supplierCategories, setSupplierCategories] = useState([
    { id: 'SC-001', name: 'Raw Materials', description: 'Wood, fabric, etc.', status: 'Active' },
    { id: 'SC-002', name: 'Hardware', description: 'Screws, hinges, etc.', status: 'Active' },
  ]);

  const [supplierContacts, setSupplierContacts] = useState([
    { id: 'SCN-001', supplierId: 'SUP-001', name: 'John Wood', position: 'Sales Manager', email: 'john@woodcraft.example', phone: '123-456-7890', primary: true, status: 'Active' },
  ]);

  const [purchaseRequests, setPurchaseRequests] = useState([
    { id: 'PR-001', department: 'Manufacturing', requestedBy: 'Mike Builder', items: 2, estimatedCost: 5000, requiredDate: '2024-06-01', priority: 'High', status: 'Approved', date: '2024-05-15' },
    { id: 'PR-002', department: 'Office', requestedBy: 'Sarah Admin', items: 5, estimatedCost: 500, requiredDate: '2024-05-20', priority: 'Medium', status: 'Pending', date: '2024-05-18' },
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 'PO-001', poNumber: 'PO-2024-001', supplierId: 'SUP-001', requestId: 'PR-001', total: 4800, expectedDate: '2024-06-05', status: 'Approved', date: '2024-05-16', items: [{ productId: 'PROD-1', quantity: 100, cost: 48 }] },
  ]);

  const [goodsReceipts, setGoodsReceipts] = useState([
    { id: 'GR-001', poNumber: 'PO-2024-001', supplierId: 'SUP-001', receivedItems: 100, status: 'Pending', date: '2024-06-05' },
  ]);

  const [supplierInvoices, setSupplierInvoices] = useState([
    { id: 'SI-001', invoiceNumber: 'INV-WC-001', supplierId: 'SUP-001', poNumber: 'PO-2024-001', amount: 4800, tax: 480, status: 'Under Review', dueDate: '2024-07-05', date: '2024-06-06' },
  ]);

  const [supplierPayments, setSupplierPayments] = useState([
    { id: 'SP-001', supplierId: 'SUP-001', invoiceId: 'SI-001', amount: 5280, method: 'Bank Transfer', status: 'Pending', date: '2024-06-10' },
  ]);

  const [budgets, setBudgets] = useState([
    { id: 'BDG-001', name: 'Q2 Manufacturing', department: 'Manufacturing', period: 'Q2 2024', allocated: 50000, used: 15000, remaining: 35000, status: 'Active' },
  ]);

  const getSupplier = (id) => suppliers.find(s => s.id === id);
  const getPurchaseRequest = (id) => purchaseRequests.find(pr => pr.id === id);
  const getPurchaseOrder = (id) => purchaseOrders.find(po => po.id === id);
  const getGoodsReceipt = (id) => goodsReceipts.find(gr => gr.id === id);
  const getSupplierInvoice = (id) => supplierInvoices.find(si => si.id === id);

  const contextValue = useMemo(() => ({
    suppliers,
    supplierCategories,
    supplierContacts,
    purchaseRequests,
    purchaseOrders,
    goodsReceipts,
    supplierInvoices,
    supplierPayments,
    budgets,
    getSupplier,
    getPurchaseRequest,
    getPurchaseOrder,
    getGoodsReceipt,
    getSupplierInvoice
  }), [suppliers, supplierCategories, supplierContacts, purchaseRequests, purchaseOrders, goodsReceipts, supplierInvoices, supplierPayments, budgets]);

  return (
    <ProcurementContext.Provider value={contextValue}>
      {children}
    </ProcurementContext.Provider>
  );
};

export const useProcurement = () => useContext(ProcurementContext);
