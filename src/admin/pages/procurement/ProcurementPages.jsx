import React, { useState } from 'react';
import { useProcurement } from '../../context/procurement/ProcurementContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Users, Truck, ShoppingCart, Search, Filter, PieChart, FileText, ClipboardList, Wallet, DollarSign, ExternalLink, ArrowLeft } from 'lucide-react';

export const ProcurementDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Procurement Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Active Suppliers</div>
          <div className="text-2xl font-bold text-neutral-900">24</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Pending Requests</div>
          <div className="text-2xl font-bold text-neutral-900">12</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Pending POs</div>
          <div className="text-2xl font-bold text-neutral-900">5</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="text-sm text-neutral-500 font-medium mb-1">Goods Receipts</div>
          <div className="text-2xl font-bold text-neutral-900">8</div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 text-center">
        <PieChart className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Procurement Analytics Placeholder</h3>
        <p className="text-sm text-neutral-500 mt-1">Backend accounting calculation required for spend metrics.</p>
      </div>
    </div>
  );
};

export const SupplierCenter = () => {
  const { suppliers } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Suppliers</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Supplier</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {suppliers.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.name}</td>
                <td className="px-6 py-4 text-neutral-600">{s.code}</td>
                <td className="px-6 py-4 text-neutral-600">{s.category}</td>
                <td className="px-6 py-4 text-neutral-600">{s.contact}</td>
                <td className="px-6 py-4 text-neutral-600">{s.rating}/5</td>
                <td className="px-6 py-4 text-neutral-600">{s.status}</td>
                <td className="px-6 py-4"><Link to={`/admin/procurement/suppliers/${s.id}`} className="text-indigo-600 hover:text-indigo-900">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SupplierDetail = () => {
  const { supplierId } = useParams();
  const { getSupplier } = useProcurement();
  const supplier = getSupplier(supplierId) || useProcurement().suppliers[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/procurement/suppliers" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">{supplier.name}</h1>
          <p className="text-sm text-neutral-500 mt-1">Code: {supplier.code} | Category: {supplier.category}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          <h3 className="font-medium text-neutral-900 mb-4">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Contact Person</span><span className="font-medium">{supplier.contact}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Email</span><span className="font-medium">{supplier.email}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Phone</span><span className="font-medium">{supplier.phone}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          <h3 className="font-medium text-neutral-900 mb-4">Performance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Rating</span><span className="font-medium">{supplier.rating} / 5</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Status</span><span className="font-medium">{supplier.status}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Created Date</span><span className="font-medium">{supplier.createdDate}</span></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
        <h3 className="font-medium text-neutral-900 mb-4">Supplier Documents</h3>
        <p className="text-sm text-neutral-500 mb-4">Trade license, tax documents, and contracts will appear here.</p>
        <button className="px-4 py-2 border border-neutral-200 rounded text-sm hover:bg-neutral-50">Upload Document</button>
      </div>
    </div>
  );
};

export const SupplierCategories = () => {
  const { supplierCategories } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Supplier Categories</h1>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Category Name</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {supplierCategories.map(c => (
              <tr key={c.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{c.name}</td>
                <td className="px-6 py-4 text-neutral-600">{c.description}</td>
                <td className="px-6 py-4 text-neutral-600">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SupplierPerformance = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Supplier Performance</h1>
      <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Supplier Evaluation Dashboard</h3>
        <p className="text-sm text-neutral-500 mt-1">Delivery score, quality score, pricing score placeholders.</p>
      </div>
    </div>
  );
};

export const PurchaseRequestCenter = () => {
  const { purchaseRequests } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Purchase Requests</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">New Request</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Request ID</th>
              <th className="px-6 py-4 font-medium">Requested By</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Estimated Cost</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {purchaseRequests.map(r => (
              <tr key={r.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{r.id}</td>
                <td className="px-6 py-4 text-neutral-600">{r.requestedBy}</td>
                <td className="px-6 py-4 text-neutral-600">{r.department}</td>
                <td className="px-6 py-4 text-neutral-600">${r.estimatedCost}</td>
                <td className="px-6 py-4 text-neutral-600">{r.priority}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/procurement/requests/${r.id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">Review</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PurchaseRequestDetail = () => {
  const { requestId } = useParams();
  const { getPurchaseRequest } = useProcurement();
  const req = getPurchaseRequest(requestId) || useProcurement().purchaseRequests[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/procurement/requests" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Request {req.id}</h1>
            <p className="text-sm text-neutral-500 mt-1">Department: {req.department} | By: {req.requestedBy}</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 border border-neutral-200 text-red-600 rounded hover:bg-red-50">Reject</button>
            <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Approve & Create PO</button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
        <h3 className="font-medium text-neutral-900 mb-4">Request Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><div className="text-neutral-500">Items Count</div><div className="font-medium mt-1">{req.items}</div></div>
          <div><div className="text-neutral-500">Estimated Cost</div><div className="font-medium mt-1">${req.estimatedCost}</div></div>
          <div><div className="text-neutral-500">Required Date</div><div className="font-medium mt-1">{req.requiredDate}</div></div>
          <div><div className="text-neutral-500">Priority</div><div className="font-medium mt-1">{req.priority}</div></div>
          <div><div className="text-neutral-500">Status</div><div className="font-medium mt-1">{req.status}</div></div>
          <div><div className="text-neutral-500">Date</div><div className="font-medium mt-1">{req.date}</div></div>
        </div>
      </div>
    </div>
  );
};

export const PurchaseOrderCenter = () => {
  const { purchaseOrders } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Purchase Orders</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create PO</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">PO Number</th>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Expected Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {purchaseOrders.map(po => (
              <tr key={po.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{po.poNumber}</td>
                <td className="px-6 py-4 text-neutral-600">{po.supplierId}</td>
                <td className="px-6 py-4 text-neutral-600">${po.total}</td>
                <td className="px-6 py-4 text-neutral-600">{po.expectedDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${po.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'}`}>
                    {po.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/procurement/purchase-orders/${po.id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PurchaseOrderDetail = () => {
  const { poId } = useParams();
  const { getPurchaseOrder } = useProcurement();
  const po = getPurchaseOrder(poId) || useProcurement().purchaseOrders[0];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/procurement/purchase-orders" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">{po.poNumber}</h1>
          <p className="text-sm text-neutral-500 mt-1">Supplier: {po.supplierId} | Request: {po.requestId}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
        <h3 className="font-medium text-neutral-900 mb-4">Order Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><div className="text-neutral-500">Total Value</div><div className="font-medium mt-1">${po.total}</div></div>
          <div><div className="text-neutral-500">Expected Date</div><div className="font-medium mt-1">{po.expectedDate}</div></div>
          <div><div className="text-neutral-500">Status</div><div className="font-medium mt-1">{po.status}</div></div>
          <div><div className="text-neutral-500">Created Date</div><div className="font-medium mt-1">{po.date}</div></div>
        </div>
        
        <h3 className="font-medium text-neutral-900 mt-8 mb-4">Order Items</h3>
        <div className="border border-neutral-200 rounded-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-4 py-2 font-medium">Product</th>
                <th className="px-4 py-2 font-medium">Quantity</th>
                <th className="px-4 py-2 font-medium text-right">Unit Cost</th>
                <th className="px-4 py-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {po.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3">{item.productId}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3 text-right">${item.cost}</td>
                  <td className="px-4 py-3 text-right font-medium">${item.cost * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const GoodsReceiptCenter = () => {
  const { goodsReceipts } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Goods Receipts</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Record Receipt</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Receipt ID</th>
              <th className="px-6 py-4 font-medium">PO Number</th>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">Items Received</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {goodsReceipts.map(gr => (
              <tr key={gr.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{gr.id}</td>
                <td className="px-6 py-4 text-neutral-600">{gr.poNumber}</td>
                <td className="px-6 py-4 text-neutral-600">{gr.supplierId}</td>
                <td className="px-6 py-4 text-neutral-600">{gr.receivedItems}</td>
                <td className="px-6 py-4 text-neutral-600">{gr.status}</td>
                <td className="px-6 py-4 text-neutral-600">{gr.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SupplierInvoiceCenter = () => {
  const { supplierInvoices } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Supplier Invoices</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Invoice</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Invoice Number</th>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">PO Number</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {supplierInvoices.map(si => (
              <tr key={si.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{si.invoiceNumber}</td>
                <td className="px-6 py-4 text-neutral-600">{si.supplierId}</td>
                <td className="px-6 py-4 text-neutral-600">{si.poNumber}</td>
                <td className="px-6 py-4 text-neutral-600">${si.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{si.dueDate}</td>
                <td className="px-6 py-4 text-neutral-600">{si.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SupplierPaymentCenter = () => {
  const { supplierPayments } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Supplier Payments</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Record Payment</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Payment ID</th>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">Invoice</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Method</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {supplierPayments.map(sp => (
              <tr key={sp.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{sp.id}</td>
                <td className="px-6 py-4 text-neutral-600">{sp.supplierId}</td>
                <td className="px-6 py-4 text-neutral-600">{sp.invoiceId}</td>
                <td className="px-6 py-4 font-medium">${sp.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{sp.method}</td>
                <td className="px-6 py-4 text-neutral-600">{sp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ProcurementBudgets = () => {
  const { budgets } = useProcurement();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Procurement Budgets</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Budget</button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Budget Name</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Period</th>
              <th className="px-6 py-4 font-medium">Allocated</th>
              <th className="px-6 py-4 font-medium">Used</th>
              <th className="px-6 py-4 font-medium">Remaining</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {budgets.map(b => (
              <tr key={b.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{b.name}</td>
                <td className="px-6 py-4 text-neutral-600">{b.department}</td>
                <td className="px-6 py-4 text-neutral-600">{b.period}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">${b.allocated}</td>
                <td className="px-6 py-4 text-neutral-600">${b.used}</td>
                <td className="px-6 py-4 text-neutral-600">${b.remaining}</td>
                <td className="px-6 py-4 text-neutral-600">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ProcurementCategories = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Procurement Categories</h1>
      <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <Briefcase className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Procurement Item Categories</h3>
        <p className="text-sm text-neutral-500 mt-1">Manage categories for procurement tracking and budgeting.</p>
      </div>
    </div>
  );
};

export const ProcurementAnalytics = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Procurement Analytics</h1>
      <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Analytics Dashboard</h3>
        <p className="text-sm text-neutral-500 mt-1">Spend volume, supplier counts, average PO values.</p>
      </div>
    </div>
  );
};
