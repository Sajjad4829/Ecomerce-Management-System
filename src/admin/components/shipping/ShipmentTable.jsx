import React from 'react';
import { Link } from 'react-router-dom';

export default function ShipmentTable({ shipments }) {
  if (shipments.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted">
        No shipments found matching the criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-background">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Shipment ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Carrier & Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-gray-200">
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="hover:bg-background">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/admin/shipments/${shipment.id}`} className="font-medium text-text-primary hover:text-primary transition-colors">
                  {shipment.id}
                </Link>
                <div className="text-xs text-text-muted mt-1">{shipment.trackingNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/admin/orders/${shipment.orderId}`} className="text-sm text-primary hover:underline">
                  {shipment.orderId}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {new Date(shipment.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                {shipment.destination.recipient}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-text-primary">{shipment.carrier}</p>
                <p className="text-xs text-text-muted">{shipment.shippingMethod}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  shipment.status === 'Delivered' ? 'bg-success-soft text-green-800' :
                  shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                  shipment.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                  shipment.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                  shipment.status === 'Failed Delivery' ? 'bg-danger-soft text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {shipment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/admin/shipments/${shipment.id}`} className="text-primary hover:text-indigo-900">
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
