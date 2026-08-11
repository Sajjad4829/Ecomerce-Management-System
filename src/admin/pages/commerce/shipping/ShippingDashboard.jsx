import React from 'react';
import { FiPackage, FiTruck, FiClock, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useShipping } from '../../../context/ShippingContext';

export default function ShippingDashboard() {
  const { shipments } = useShipping();

  const totalShipments = shipments.length;
  const inTransit = shipments.filter(s => s.status === 'In Transit').length;
  const readyToShip = shipments.filter(s => s.status === 'Ready to Ship').length;
  const delivered = shipments.filter(s => s.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage shipments, carriers, and delivery logistics.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/shipments" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            View All Shipments
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FiPackage size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Shipments</p>
            <p className="text-2xl font-bold text-gray-900">{totalShipments}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiClock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ready to Ship</p>
            <p className="text-2xl font-bold text-gray-900">{readyToShip}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <FiTruck size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">In Transit</p>
            <p className="text-2xl font-bold text-gray-900">{inTransit}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <FiAlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-gray-900">{delivered}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
             <h2 className="text-lg font-bold text-gray-900">Recent Shipments</h2>
             <Link to="/admin/shipments" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {shipments.slice(0, 5).map(shipment => (
               <div key={shipment.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                 <div>
                   <Link to={`/admin/shipments/${shipment.id}`} className="font-medium text-gray-900 hover:text-blue-600 block">{shipment.id}</Link>
                   <p className="text-sm text-gray-500">{shipment.destination.recipient} - {shipment.carrier}</p>
                 </div>
                 <div className="text-right">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      shipment.status === 'Ready to Ship' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shipment.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        {/* Analytics Placeholders */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Performance</h2>
             <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">Delivery Performance Chart Placeholder</p>
             </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Carrier Distribution</h2>
             <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">Carrier Usage Chart Placeholder</p>
             </div>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Settings & Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/shipping/carriers" className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all group">
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Carriers</h3>
            <p className="text-sm text-gray-500 mt-1">Manage delivery partners.</p>
          </Link>
          <Link to="/admin/shipping/methods" className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all group">
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Methods</h3>
            <p className="text-sm text-gray-500 mt-1">Configure shipping speeds.</p>
          </Link>
          <Link to="/admin/shipping/zones" className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all group">
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Zones</h3>
            <p className="text-sm text-gray-500 mt-1">Define geographical regions.</p>
          </Link>
          <Link to="/admin/shipping/settings" className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all group">
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Global Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Rules, units, and preferences.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
