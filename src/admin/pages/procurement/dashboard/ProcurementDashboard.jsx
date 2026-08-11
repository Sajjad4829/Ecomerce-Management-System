import React from 'react';
import { useProcurement } from '../../../context/procurement/ProcurementContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Building2, AlertCircle, TrendingUp, Download, ArrowRight, Truck, FileEdit } from 'lucide-react';

export const ProcurementDashboard = () => {
  const { suppliers, purchaseOrders, purchaseRequests } = useProcurement();
  const navigate = useNavigate();

  const activeSuppliersCount = suppliers.filter(s => s.status === 'Active').length;
  const pendingRequestsCount = purchaseRequests.filter(pr => pr.status === 'Under Review' || pr.status === 'Submitted').length;
  const draftPOCount = purchaseOrders.filter(po => po.status === 'Draft').length;
  const pendingPOCount = purchaseOrders.filter(po => po.status === 'Pending Approval').length;
  const sentPOCount = purchaseOrders.filter(po => po.status === 'Sent' || po.status === 'Acknowledged').length;
  const partiallyReceivedCount = purchaseOrders.filter(po => po.status === 'Partially Received').length;
  
  const totalOpenValue = purchaseOrders
    .filter(po => ['Pending Approval', 'Approved', 'Sent', 'Acknowledged', 'Partially Received'].includes(po.status))
    .reduce((sum, po) => sum + (po.totalAmount || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Procurement Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Overview of purchasing, suppliers, and receiving</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-neutral-600 bg-surface border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button 
            onClick={() => navigate('/admin/procurement/purchase-orders')}
            className="px-4 py-2 text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> New Purchase Order
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-soft text-primary rounded">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Open PO Value</p>
          </div>
          <p className="text-2xl font-serif text-neutral-900 mt-2">${totalOpenValue.toLocaleString()}</p>
          <p className="text-xs text-neutral-400 mt-auto pt-2">*Backend Dependent</p>
        </div>
        
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-warning-soft text-warning rounded">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Pending Actions</p>
          </div>
          <p className="text-2xl font-serif text-neutral-900 mt-2">{pendingPOCount + pendingRequestsCount}</p>
          <div className="text-sm text-neutral-500 mt-2 flex justify-between">
            <span>{pendingPOCount} POs</span>
            <span>{pendingRequestsCount} Requests</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-primary rounded">
              <Truck className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Receiving Pipeline</p>
          </div>
          <p className="text-2xl font-serif text-neutral-900 mt-2">{sentPOCount + partiallyReceivedCount}</p>
          <div className="text-sm text-neutral-500 mt-2 flex justify-between">
            <span>{sentPOCount} Incoming</span>
            <span>{partiallyReceivedCount} Partial</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success-soft text-success rounded">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-neutral-500">Active Suppliers</p>
          </div>
          <p className="text-2xl font-serif text-neutral-900 mt-2">{activeSuppliersCount}</p>
          <button 
            onClick={() => navigate('/admin/procurement/suppliers')}
            className="text-xs text-primary font-medium hover:text-indigo-800 mt-auto pt-2 text-left"
          >
            Manage Suppliers &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Purchase Orders */}
        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Purchase Orders</h2>
            <button 
              onClick={() => navigate('/admin/procurement/purchase-orders')}
              className="text-sm text-primary hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-neutral-200 flex-1">
            {purchaseOrders.slice(0, 5).map(po => (
              <div key={po.id} className="p-4 hover:bg-neutral-50 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900">{po.poNumber}</div>
                  <div className="text-sm text-neutral-500 mt-0.5">{po.supplierId} • ${po.totalAmount?.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    po.status === 'Sent' || po.status === 'Acknowledged' ? 'bg-blue-100 text-blue-800' :
                    po.status === 'Pending Approval' ? 'bg-warning-soft text-amber-800' :
                    po.status === 'Partially Received' ? 'bg-indigo-100 text-indigo-800' :
                    po.status === 'Received' || po.status === 'Closed' ? 'bg-success-soft text-green-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    {po.status}
                  </span>
                  <div className="text-xs text-neutral-500 mt-1">Exp: {po.expectedDate}</div>
                </div>
              </div>
            ))}
            {purchaseOrders.length === 0 && (
              <div className="p-8 text-center text-neutral-500 text-sm">
                No recent purchase orders.
              </div>
            )}
          </div>
        </div>

        {/* Action Center */}
        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-neutral-200">
            <h2 className="font-medium text-neutral-900">Procurement Actions required</h2>
          </div>
          <div className="p-5 space-y-4 flex-1">
            
            {pendingPOCount > 0 && (
              <div className="flex items-start gap-4 p-4 border border-amber-200 bg-warning-soft rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-amber-900">{pendingPOCount} POs pending approval</h4>
                  <p className="text-xs text-warning mt-1">Purchase orders are waiting for financial authorization.</p>
                </div>
                <button 
                  onClick={() => navigate('/admin/procurement/purchase-orders')}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-amber-600 rounded hover:bg-amber-700 transition-colors whitespace-nowrap"
                >
                  Review
                </button>
              </div>
            )}

            {pendingRequestsCount > 0 && (
              <div className="flex items-start gap-4 p-4 border border-indigo-200 bg-primary-soft rounded-lg">
                <FileEdit className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-indigo-900">{pendingRequestsCount} Purchase Requests</h4>
                  <p className="text-xs text-indigo-700 mt-1">New inventory requests from warehouse staff require review.</p>
                </div>
                <button 
                  onClick={() => navigate('/admin/procurement/requests')}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded hover:bg-primary-hover transition-colors whitespace-nowrap"
                >
                  View
                </button>
              </div>
            )}

            {partiallyReceivedCount > 0 && (
              <div className="flex items-start gap-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <Truck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-blue-900">{partiallyReceivedCount} Partial Receipts</h4>
                  <p className="text-xs text-blue-700 mt-1">Some shipments have arrived incomplete and require follow-up.</p>
                </div>
                <button 
                  onClick={() => navigate('/admin/procurement/receiving')}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Track
                </button>
              </div>
            )}

            {pendingPOCount === 0 && pendingRequestsCount === 0 && partiallyReceivedCount === 0 && (
              <div className="text-center text-neutral-500 p-8 border border-dashed border-neutral-200 rounded-lg">
                <TrendingUp className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs mt-1">No pending actions required at this time.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
