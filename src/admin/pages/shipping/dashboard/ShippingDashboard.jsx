import React from 'react';
import { useShipping } from '../../../context/shipping/ShippingContext';
import { Package, Truck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ShippingDashboard = () => {
  const { shipments, exceptions } = useShipping();
  const navigate = useNavigate();

  const totalShipments = shipments.length;
  const inTransit = shipments.filter(s => s.status === 'In Transit').length;
  const readyForPickup = shipments.filter(s => s.status === 'Ready for Pickup').length;
  const delivered = shipments.filter(s => s.status === 'Delivered').length;
  const delayed = shipments.filter(s => s.status === 'Delayed').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Shipping Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Overview of outbound logistics and delivery operations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-neutral-500">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Total Shipments</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{totalShipments}</div>
        </div>

        <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-blue-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Ready for Pickup</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{readyForPickup}</div>
        </div>

        <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-indigo-500">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">In Transit</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{inTransit}</div>
        </div>

        <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-emerald-500">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Delivered</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{delivered}</div>
        </div>

        <div className="bg-surface p-5 rounded-lg border border-red-200 bg-danger-soft shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-danger">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Exceptions/Delayed</span>
          </div>
          <div className="text-2xl font-serif text-red-900">{delayed + exceptions.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Active Shipments</h2>
            <button onClick={() => navigate('/admin/shipping/shipments')} className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {shipments.slice(0, 5).map(ship => (
              <div key={ship.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900">{ship.id} <span className="text-neutral-400 font-normal ml-1">({ship.carrier})</span></div>
                  <div className="text-xs text-neutral-500 mt-1">Order {ship.orderId} • {ship.customer}</div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    ship.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    ship.status === 'Delayed' ? 'bg-danger-soft text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {ship.status}
                  </span>
                  <div className="text-xs text-neutral-400 mt-1">Expected: {ship.expectedDelivery}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Exceptions</h2>
            <button onClick={() => navigate('/admin/shipping/exceptions')} className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {exceptions.map(exc => (
              <div key={exc.id} className="p-4 flex justify-between items-start hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500"/> {exc.type}
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">{exc.description}</div>
                  <div className="text-xs text-neutral-400 mt-1">{exc.shipmentId} • {exc.date}</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-warning-soft text-amber-800">
                    {exc.status}
                  </span>
                </div>
              </div>
            ))}
            {exceptions.length === 0 && (
              <div className="p-6 text-center text-sm text-neutral-500">No active exceptions.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
