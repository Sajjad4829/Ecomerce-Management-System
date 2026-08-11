import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShipping } from '../../../context/shipping/ShippingContext';
import { ArrowLeft, Printer, Box, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';

export const ShipmentDetail = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const { getShipment } = useShipping();
  const ship = getShipment(shipmentId);

  if (!ship) return <div className="p-8">Shipment not found.</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/shipping/shipments')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-3">
            {ship.id}
            <span className={`text-sm font-sans font-medium px-2.5 py-0.5 rounded-full ${
              ship.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
              ship.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
              ship.status === 'Delayed' ? 'bg-danger-soft text-red-800' :
              'bg-warning-soft text-amber-800'
            }`}>
              {ship.status}
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Created on {ship.date} • Expected: {ship.expectedDelivery}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-surface rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print Label
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors flex items-center gap-2">
            Track Package
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-neutral-400"/> Routing Details</h3>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Origin</div>
                <div className="font-medium text-neutral-900">{ship.warehouse}</div>
                <div className="text-neutral-500 mt-1">
                  100 Warehouse Blvd<br/>
                  Industrial Zone<br/>
                  City, ST 12345
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Destination</div>
                <div className="font-medium text-neutral-900">{ship.customer}</div>
                <div className="text-neutral-500 mt-1">
                  456 Customer Ave<br/>
                  Apt 4B<br/>
                  Los Angeles, CA 90001
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><Box className="w-4 h-4 text-neutral-400"/> Package Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-3 border-b border-neutral-100">
                <span className="text-neutral-500">Order ID</span>
                <span className="font-medium text-primary cursor-pointer hover:underline">{ship.orderId}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-neutral-100">
                <span className="text-neutral-500">Items</span>
                <span className="font-medium text-neutral-900">2 (Furniture Box, Large)</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-neutral-100">
                <span className="text-neutral-500">Weight</span>
                <span className="font-medium text-neutral-900">45 lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Dimensions</span>
                <span className="font-medium text-neutral-900">48" x 24" x 24"</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-neutral-400"/> Carrier Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Carrier</span>
                <span className="font-medium text-neutral-900">{ship.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Method</span>
                <span className="font-medium text-neutral-900">Standard Freight</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-100">
                <span className="text-neutral-500">Tracking</span>
                <span className="font-mono font-medium text-primary cursor-pointer hover:underline">{ship.trackingNumber}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
            <h3 className="font-medium text-neutral-900 mb-4">Tracking Timeline</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
              
              <div className="relative flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-primary shadow shrink-0">
                  <Box className="w-5 h-5"/>
                </div>
                <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                  <div className="font-medium text-neutral-900 text-sm">Shipment Created</div>
                  <div className="text-xs text-neutral-500">{ship.date}</div>
                </div>
              </div>

              {(ship.status === 'In Transit' || ship.status === 'Delivered') && (
                <div className="relative flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-primary shadow shrink-0">
                    <Truck className="w-5 h-5"/>
                  </div>
                  <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                    <div className="font-medium text-neutral-900 text-sm">Picked Up</div>
                    <div className="text-xs text-neutral-500">Carrier received package</div>
                  </div>
                </div>
              )}
              
              {ship.status === 'Delivered' && (
                <div className="relative flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0">
                    <CheckCircle className="w-5 h-5"/>
                  </div>
                  <div className="flex-1 p-3 rounded border border-neutral-100 bg-neutral-50">
                    <div className="font-medium text-neutral-900 text-sm">Delivered</div>
                    <div className="text-xs text-neutral-500">Package dropped off</div>
                  </div>
                </div>
              )}

            </div>
          </div>
          
          {ship.status === 'Delivered' && <ProofOfDelivery />}
          {(ship.status === 'Delayed' || ship.status === 'Return to Sender') && <ReturnToSender />}
        </div>
      </div>
    </div>
  );
};

export const ProofOfDelivery = () => (
  <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6 mt-6">
    <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neutral-400"/> Proof of Delivery</h3>
    <div className="text-sm text-neutral-500">
      <p>Recipient: John Doe (Signed)</p>
      <p className="mt-2">Photo Proof: [Photo Placeholder]</p>
      <button className="mt-4 px-3 py-2 border border-neutral-200 text-neutral-600 rounded hover:bg-neutral-50">View Full Proof</button>
    </div>
  </div>
);

export const ReturnToSender = () => (
  <div className="bg-surface rounded-lg border border-red-200 bg-danger-soft p-6 mt-6">
    <h3 className="font-medium text-red-900 mb-2">Return to Sender Action</h3>
    <p className="text-sm text-red-700 mb-4">Delivery has failed multiple times or was refused. Initiate return workflow.</p>
    <button className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">Initiate RTS</button>
  </div>
);
