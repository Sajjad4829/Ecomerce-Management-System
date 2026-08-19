import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBox, FiCheckCircle, FiXCircle, FiTruck, FiSearch, FiDollarSign } from 'react-icons/fi';
import { useReturns } from '../../../context/ReturnContext';
import { useInventory } from '../../../context/inventory/InventoryContext';
import ReturnTimeline from '../../../components/returns/ReturnTimeline';
import PickupManager from '../../../components/returns/PickupManager';
import InspectionWorkspace from '../../../components/returns/InspectionWorkspace';

export default function ReturnDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReturn, updateReturnStatus } = useReturns();
  const { processReturn } = useInventory();
  const returnReq = getReturn(id);

  if (!returnReq) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Return request not found</h2>
        <button onClick={() => navigate('/admin/returns')} className="text-primary hover:underline mt-2">Return to list</button>
      </div>
    );
  }

  // Centralized transition logic
  const getAvailableActions = (currentStatus) => {
    switch (currentStatus) {
      case 'Requested': return ['Under Review', 'Approved', 'Rejected'];
      case 'Under Review': return ['Approved', 'Rejected'];
      case 'Approved': return ['In Transit', 'Received'];
      case 'In Transit': return ['Received'];
      case 'Received': return ['Inspecting'];
      case 'Inspection Completed': return ['Approved for Refund'];
      case 'Approved for Refund': return ['Refund Processing', 'Completed'];
      case 'Refund Processing': return ['Completed'];
      default: return [];
    }
  };

  const availableActions = getAvailableActions(returnReq.status);

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'Received') {
      const warehouseId = window.prompt("Enter Warehouse ID to receive items (e.g. WH-1):", "WH-1");
      if (warehouseId) {
        // We'll simulate markReturnReceived here but we can also just use updateReturnStatus if we didn't export it
        updateReturnStatus(id, newStatus, `Return received at ${warehouseId}`);
      }
    } else {
      updateReturnStatus(id, newStatus, `Manual status update to ${newStatus}`);
    }
  };

  const handleProcessRefund = () => {
    // 1. Process restock or damage in InventoryContext based on inspected items
    const itemsForInventory = returnReq.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      warehouseId: item.warehouseId || 'WH-1', // Fallback to primary
      condition: item.condition === 'restockable' ? 'restockable' : 'damaged'
    }));

    processReturn(returnReq.orderId, itemsForInventory);
    
    // 2. Mark as completed in ReturnContext
    handleStatusChange('Completed');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/returns" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
            <FiArrowLeft size={20} className="text-text-secondary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{returnReq.id}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800`}>
                {returnReq.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">Order: <Link to={`/admin/orders/${returnReq.orderId}`} className="text-primary hover:underline">{returnReq.orderId}</Link></p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center flex-wrap">
          {availableActions.map(action => (
             <button 
                key={action}
                onClick={() => handleStatusChange(action)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  action === 'Approved' ? 'bg-green-600 text-white hover:bg-green-700' :
                  action === 'Rejected' ? 'bg-red-600 text-white hover:bg-red-700' :
                  'bg-surface border border-border-hover text-text-secondary hover:bg-background'
                }`}
             >
                {action}
             </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer & Product Info */}
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiBox /> Return Items</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {returnReq.items.map(item => (
                <div key={item.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-text-primary">{item.name}</h3>
                      <p className="text-sm text-text-muted">SKU: {item.productId} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-gray-100 space-y-2">
                    <div>
                      <p className="text-xs text-text-muted uppercase font-semibold">Return Reason</p>
                      <p className="text-sm font-medium text-text-primary">{item.reason}</p>
                    </div>
                    <div>
                       <p className="text-xs text-text-muted uppercase font-semibold">Reported Condition</p>
                       <p className="text-sm font-medium text-text-primary">{item.condition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reverse Logistics / Pickup */}
          {(returnReq.status === 'Approved' || returnReq.status === 'Pickup Scheduled' || returnReq.pickup) && (
            <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2"><FiTruck /> Reverse Logistics</h2>
              <PickupManager returnReq={returnReq} />
            </div>
          )}

          {/* Inspection Workspace */}
          {(returnReq.status === 'Inspecting' || returnReq.status === 'Inspection Completed') && (
             <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
               <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2"><FiSearch /> Product Inspection</h2>
               <InspectionWorkspace returnReq={returnReq} />
             </div>
          )}

           {/* Resolution Prep */}
           {returnReq.status === 'Approved for Refund' && (
             <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
               <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2"><FiDollarSign /> Resolution Actions</h2>
               <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                 <p className="text-sm text-blue-800 font-medium">Suggested Refund</p>
                 <p className="text-2xl font-bold text-blue-900 mt-1">৳{returnReq.refundAmount?.toLocaleString()}</p>
                 <p className="text-xs text-blue-700 mt-1">Based on returned item prices.</p>
               </div>
               <div className="flex gap-4">
                 <button onClick={handleProcessRefund} className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                   Process Refund & Sync Inventory
                 </button>
               </div>
             </div>
           )}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Customer Details</h2>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">{returnReq.customer.name}</p>
              <p className="text-sm text-text-secondary">{returnReq.customer.email}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-6">Return Timeline</h2>
             <ReturnTimeline events={returnReq.timeline} />
          </div>

        </div>

      </div>
    </div>
  );
}
