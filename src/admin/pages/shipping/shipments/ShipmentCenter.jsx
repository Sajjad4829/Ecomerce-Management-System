import React, { useState } from 'react';
import { useShipping } from '../../../context/shipping/ShippingContext';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ShipmentCenter = () => {
  const { shipments } = useShipping();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredShipments = shipments.filter(s => 
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Shipments</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage all outbound packages and carrier tracking</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, Order, Tracking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <button className="px-3 py-2 border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Shipment ID</th>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Carrier</th>
                <th className="px-6 py-4 font-medium">Tracking #</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredShipments.map((ship) => (
                <tr key={ship.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">{ship.id}</td>
                  <td className="px-6 py-4 text-indigo-600 hover:underline cursor-pointer">{ship.orderId}</td>
                  <td className="px-6 py-4 text-neutral-600">{ship.customer}</td>
                  <td className="px-6 py-4 text-neutral-600">{ship.carrier}</td>
                  <td className="px-6 py-4 text-neutral-600 font-mono text-xs">{ship.trackingNumber}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      ship.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      ship.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      ship.status === 'Delayed' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {ship.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/admin/shipping/shipments/${ship.id}`)}
                      className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
