import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPrinter, FiTruck, FiBox, FiMapPin, FiCalendar, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { useShipping } from '../../../context/ShippingContext';
import TrackingTimeline from '../../../components/shipping/TrackingTimeline';
import DeliveryScheduler from '../../../components/shipping/DeliveryScheduler';

export default function ShipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getShipment, updateShipmentStatus } = useShipping();
  const shipment = getShipment(id);

  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  if (!shipment) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Shipment not found</h2>
        <button onClick={() => navigate('/admin/shipments')} className="text-primary hover:underline mt-2">Return to shipments</button>
      </div>
    );
  }

  // Centralized transition logic
  const getAvailableActions = (currentStatus) => {
    switch (currentStatus) {
      case 'Draft': return ['Ready to Ship', 'Cancelled'];
      case 'Ready to Ship': return ['Label Created', 'Cancelled'];
      case 'Label Created': return ['Shipped', 'Cancelled'];
      case 'Shipped': return ['In Transit'];
      case 'In Transit': return ['Out for Delivery', 'Delayed'];
      case 'Delayed': return ['In Transit', 'Out for Delivery'];
      case 'Out for Delivery': return ['Delivered', 'Failed Delivery'];
      case 'Failed Delivery': return ['Out for Delivery', 'Returned'];
      default: return [];
    }
  };

  const availableActions = getAvailableActions(shipment.status);

  const handleStatusChange = (newStatus) => {
    updateShipmentStatus(id, newStatus, `Manual status update to ${newStatus}`, 'Admin Console');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/shipments" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
            <FiArrowLeft size={20} className="text-text-secondary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{shipment.id}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  shipment.status === 'Delivered' ? 'bg-success-soft text-green-800' :
                  shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                  shipment.status === 'Failed Delivery' ? 'bg-danger-soft text-red-800' :
                  shipment.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                {shipment.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">Order: <Link to={`/admin/orders/${shipment.orderId}`} className="text-primary hover:underline">{shipment.orderId}</Link></p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center flex-wrap">
          {availableActions.map(action => (
             <button 
                key={action}
                onClick={() => handleStatusChange(action)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  action === 'Delivered' ? 'bg-green-600 text-white hover:bg-green-700' :
                  action === 'Failed Delivery' ? 'bg-red-600 text-white hover:bg-red-700' :
                  'bg-surface border border-border-hover text-text-secondary hover:bg-background'
                }`}
             >
                Mark {action}
             </button>
          ))}
          <button className="px-4 py-2 border border-border bg-surface text-text-secondary rounded-lg text-sm font-medium hover:bg-background flex items-center gap-2">
             <FiPrinter /> Print Label Placeholder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tracking & Carrier */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiTruck /> Carrier Information</h2>
                <p className="text-sm text-text-muted mt-1">Managed by {shipment.carrier}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted uppercase tracking-wider font-semibold">Tracking Number</p>
                <p className="text-lg font-mono font-bold text-text-primary mt-1">{shipment.trackingNumber}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-text-muted uppercase">Shipping Method</p>
                <p className="text-sm font-medium text-text-primary">{shipment.shippingMethod}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase">Created On</p>
                <p className="text-sm font-medium text-text-primary">{new Date(shipment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Delivery & Scheduling */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiCalendar /> Delivery Scheduling</h2>
               <button onClick={() => setIsSchedulerOpen(true)} className="text-sm text-primary hover:underline">
                 {shipment.scheduledDelivery ? 'Reschedule' : 'Schedule Delivery'}
               </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-background rounded-lg p-4 border border-gray-100">
                <p className="text-xs text-text-muted uppercase font-semibold mb-2">Estimated Delivery</p>
                <p className="text-lg font-medium text-text-primary">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                <p className="text-sm text-text-muted mt-1">End of day</p>
              </div>
              
              <div className={`rounded-lg p-4 border ${shipment.scheduledDelivery ? 'bg-blue-50 border-blue-100' : 'bg-background border-gray-100'}`}>
                <p className="text-xs text-text-muted uppercase font-semibold mb-2 flex items-center gap-2">
                  <FiClock /> Scheduled Slot
                </p>
                {shipment.scheduledDelivery ? (
                  <>
                    <p className="text-lg font-medium text-blue-900">{new Date(shipment.scheduledDelivery.date).toLocaleDateString()}</p>
                    <p className="text-sm text-blue-700 mt-1">{shipment.scheduledDelivery.slot}</p>
                  </>
                ) : (
                  <p className="text-sm text-text-muted italic mt-2">No specific slot scheduled.</p>
                )}
              </div>
            </div>

            {shipment.deliveryInstructions && (
              <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                <p className="text-xs text-yellow-800 uppercase font-semibold mb-1 flex items-center gap-2">
                  <FiAlertTriangle /> Delivery Instructions
                </p>
                <p className="text-sm text-yellow-900">{shipment.deliveryInstructions}</p>
              </div>
            )}
          </div>

          {/* Packages */}
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiBox /> Packages ({shipment.packages.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {shipment.packages.map(pkg => (
                <div key={pkg.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-text-primary">Package {pkg.number}</h3>
                    <div className="flex gap-2">
                      {pkg.fragile && <span className="px-2 py-0.5 bg-danger-soft text-red-800 text-xs rounded-full font-medium">Fragile</span>}
                      {pkg.oversized && <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Oversized</span>}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">{pkg.contents}</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <div>
                      <p className="text-xs text-text-muted uppercase">Weight</p>
                      <p className="text-sm font-medium text-text-primary">{pkg.weight} lbs</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase">Dimensions (L x W x H)</p>
                      <p className="text-sm font-medium text-text-primary">{pkg.length}" x {pkg.width}" x {pkg.height}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Destination */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2"><FiMapPin /> Destination</h2>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">{shipment.destination.recipient}</p>
              <p className="text-sm text-text-secondary">{shipment.destination.address}</p>
              <p className="text-sm text-text-secondary">{shipment.destination.city}, {shipment.destination.state} {shipment.destination.zip}</p>
              <p className="text-sm text-text-secondary">{shipment.destination.country}</p>
              <p className="text-sm text-text-muted mt-3 pt-3 border-t border-gray-100">Phone: <span className="text-text-primary">{shipment.destination.phone}</span></p>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-6">Tracking Timeline</h2>
             <TrackingTimeline events={shipment.timeline} />
          </div>
        </div>
      </div>

      <DeliveryScheduler 
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        shipment={shipment}
      />
    </div>
  );
}
