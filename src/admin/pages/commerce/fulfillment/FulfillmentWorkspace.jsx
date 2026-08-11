import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBox, FiCheckCircle, FiTruck, FiPrinter } from 'react-icons/fi';
import { useOrders } from '../../../context/OrderContext';

export default function FulfillmentWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, updateFulfillmentStatus } = useOrders();
  const order = getOrder(id);

  const [selectedWarehouse, setSelectedWarehouse] = useState('Primary Warehouse');

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Order not found</h2>
        <button onClick={() => navigate('/admin/fulfillment')} className="text-blue-600 hover:underline mt-2">Return to fulfillment</button>
      </div>
    );
  }

  const handleStartFulfillment = () => {
    updateFulfillmentStatus(id, 'Processing', `Assigned to \${selectedWarehouse}`);
  };

  const handleMarkPacked = () => {
    updateFulfillmentStatus(id, 'Packed', 'All items packed and ready for shipment.');
  };

  const handleCreateShipment = () => {
    updateFulfillmentStatus(id, 'Shipped', 'Shipment created and tracking generated (placeholder).');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
       <div className="flex items-center gap-4">
        <Link to="/admin/fulfillment" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <FiArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fulfill {order.id}</h1>
          <p className="text-sm text-gray-500 mt-1">Status: <span className="font-semibold text-gray-700">{order.fulfillmentStatus}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items & Packing Workflow */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FiBox /> Items to Fulfill</h2>
              {order.fulfillmentStatus === 'Unfulfilled' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Assign to:</span>
                  <select 
                    value={selectedWarehouse}
                    onChange={(e) => setSelectedWarehouse(e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                  >
                    <option value="Primary Warehouse">Primary Warehouse</option>
                    <option value="West Coast Distribution">West Coast Distribution</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="p-6">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 text-sm">{item.product}</p>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-xs text-gray-500">{order.fulfillmentStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>

               <div className="mt-6 flex justify-end gap-3">
                  {order.fulfillmentStatus === 'Unfulfilled' && (
                    <>
                      <button onClick={() => updateFulfillmentStatus(id, 'Partially Fulfilled', 'Some items assigned to ' + selectedWarehouse)} className="px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Partially Fulfill
                      </button>
                      <button onClick={handleStartFulfillment} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
                        Fulfill All Items
                      </button>
                    </>
                  )}
                  {['Partially Fulfilled', 'Processing'].includes(order.fulfillmentStatus) && (
                    <button onClick={handleMarkPacked} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <FiCheckCircle size={16}/> Mark as Packed
                    </button>
                  )}
               </div>
            </div>
          </div>

          {/* Shipment Preparation */}
          {['Packed', 'Ready to Ship'].includes(order.fulfillmentStatus) && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4"><FiTruck /> Shipment Preparation</h2>
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Package Weight (lbs)</label>
                   <input type="number" defaultValue={5.5} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Carrier (Placeholder)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]">
                      <option>FedEx</option>
                      <option>UPS</option>
                      <option>USPS</option>
                    </select>
                 </div>
               </div>
               <div className="flex gap-3 justify-end">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                    <FiPrinter size={16}/> Print Label
                  </button>
                  <button onClick={handleCreateShipment} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Create Shipment
                  </button>
               </div>
            </div>
          )}

           {order.fulfillmentStatus === 'Shipped' && (
             <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                 <FiCheckCircle size={24} className="text-green-600" />
               </div>
               <h2 className="text-lg font-bold text-green-900 mb-1">Order Shipped</h2>
               <p className="text-sm text-green-700">Tracking information has been sent to the customer.</p>
             </div>
           )}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Shipping Destination</h2>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.address1}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p className="text-sm text-gray-500 mt-2">Method: <span className="font-medium text-gray-900">{order.shippingMethod}</span></p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Customer Info</h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-900">{order.customer.name}</p>
              <p className="text-sm text-gray-600">{order.customer.email}</p>
              <p className="text-sm text-gray-600">{order.customer.phone}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
