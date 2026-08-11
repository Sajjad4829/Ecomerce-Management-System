import React, { useState } from 'react';
import { useShipping } from '../../../context/shipping/ShippingContext';
import { Search, Filter, Calendar } from 'lucide-react';

export const DeliveryCenter = () => {
  const { deliveries } = useShipping();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeliveries = deliveries.filter(d => 
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Deliveries</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage local delivery schedules and agents</p>
        </div>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4" /> Schedule Delivery
        </button>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deliveries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Delivery ID</th>
              <th className="px-6 py-4 font-medium">Shipment</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Agent</th>
              <th className="px-6 py-4 font-medium">Scheduled</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredDeliveries.map((del) => (
              <tr key={del.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">{del.id}</td>
                <td className="px-6 py-4 text-primary hover:underline cursor-pointer">{del.shipmentId}</td>
                <td className="px-6 py-4 text-neutral-600">{del.customer}</td>
                <td className="px-6 py-4 text-neutral-600">{del.agent}</td>
                <td className="px-6 py-4 text-neutral-600">{del.scheduledDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    del.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    del.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                    'bg-warning-soft text-amber-800'
                  }`}>
                    {del.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
