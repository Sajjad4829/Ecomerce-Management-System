import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBox, FiCheckCircle, FiTruck, FiPrinter } from 'react-icons/fi';
import { useOrders } from '../../../context/orders/OrderContext';
import { useInventory } from '../../../context/inventory/InventoryContext';

export default function FulfillmentWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, fulfillOrder, updateOrderStatus } = useOrders();
  const { fulfillReservation, reservations } = useInventory();
  const order = getOrder(id);

  const [selectedWarehouse, setSelectedWarehouse] = useState('Primary Warehouse');

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Order not found</h2>
        <button onClick={() => navigate('/admin/fulfillment')} className="text-primary hover:underline mt-2">Return to fulfillment</button>
      </div>
    );
  }

  const handleStartFulfillment = () => {
    updateOrderStatus(id, 'Processing');
  };

  const handleMarkPacked = () => {
    updateOrderStatus(id, 'Packed');
  };

  const handleCreateShipment = () => {
    // 1. Mark order as shipped in OrderContext
    fulfillOrder(id);
    // 2. Permanently deduct stock in InventoryContext
    fulfillReservation(id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
       <div className="flex items-center gap-4">
        <Link to="/admin/fulfillment" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
          <FiArrowLeft size={20} className="text-text-secondary" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fulfill {order.id}</h1>
          <p className="text-sm text-text-muted mt-1">Status: <span className="font-semibold text-text-secondary">{order.fulfillmentStatus}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items & Packing Workflow */}
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-background/50">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiBox /> Items to Fulfill</h2>
              {order.fulfillmentStatus === 'Unfulfilled' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">Assign to:</span>
                  <select 
                    value={selectedWarehouse}
                    onChange={(e) => setSelectedWarehouse(e.target.value)}
                    className="px-2 py-1 text-sm border border-border-hover rounded focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                  >
                    <option value="Primary Warehouse">Primary Warehouse</option>
                    <option value="West Coast Distribution">West Coast Distribution</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="p-6">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-text-muted uppercase">Product</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-text-muted uppercase">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-text-muted uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-text-primary text-sm">{item.product}</p>
                          <p className="text-xs text-text-muted">SKU: {item.sku}</p>
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-text-primary">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === 'Shipped' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status === 'Shipped' ? 'Shipped' : 'Awaiting Fulfillment'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>

               <div className="mt-6 flex justify-end gap-3">
                  {order.status === 'Pending' && (
                    <>
                      <button onClick={handleStartFulfillment} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
                        Start Fulfillment
                      </button>
                    </>
                  )}
                  {order.status === 'Processing' && (
                    <button onClick={handleMarkPacked} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
                      Mark as Packed
                    </button>
                  )}
                  {order.status === 'Packed' && (
                    <button onClick={handleCreateShipment} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2">
                      <FiPrinter /> Print Label & Ship
                    </button>
                  )}
               </div>
            </div>
          </div>

          {/* Shipment Preparation */}
          {['Packed'].includes(order.status) && (
             <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
               <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><FiTruck /> Shipment Preparation</h2>
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div>
                   <label className="block text-xs font-medium text-text-secondary mb-1">Package Weight (lbs)</label>
                   <input type="number" defaultValue={5.5} className="w-full px-3 py-2 border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Carrier (Placeholder)</label>
                    <select className="w-full px-3 py-2 border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]">
                      <option>FedEx</option>
                      <option>UPS</option>
                      <option>USPS</option>
                    </select>
                 </div>
               </div>
               <div className="flex gap-3 justify-end">
                  <button className="px-4 py-2 border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background flex items-center gap-2">
                    <FiPrinter size={16}/> Print Label
                  </button>
                  <button onClick={handleCreateShipment} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Create Shipment
                  </button>
               </div>
            </div>
          )}

           {order.fulfillmentStatus === 'Shipped' && (
             <div className="bg-success-soft border border-green-200 rounded-xl p-6 text-center">
               <div className="w-12 h-12 bg-success-soft rounded-full flex items-center justify-center mx-auto mb-3">
                 <FiCheckCircle size={24} className="text-success" />
               </div>
               <h2 className="text-lg font-bold text-green-900 mb-1">Order Shipped</h2>
               <p className="text-sm text-success">Tracking information has been sent to the customer.</p>
             </div>
           )}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Shipping Destination</h2>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className="text-sm text-text-secondary">{order.shippingAddress.address1}</p>
              <p className="text-sm text-text-secondary">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p className="text-sm text-text-muted mt-2">Method: <span className="font-medium text-text-primary">{order.shippingMethod}</span></p>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Customer Info</h2>
            <div className="space-y-1">
              <p className="text-sm text-text-primary">{order.customer.name}</p>
              <p className="text-sm text-text-secondary">{order.customer.email}</p>
              <p className="text-sm text-text-secondary">{order.customer.phone}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
