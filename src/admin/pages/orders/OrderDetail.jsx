import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/orders/OrderContext';
import OrderHeader from '../../components/orders/OrderHeader';
import OrderSummary from '../../components/orders/OrderSummary';
import OrderItems from '../../components/orders/OrderItems';
import CustomerPanel from '../../components/orders/CustomerPanel';
import PaymentStatusPanel from '../../components/orders/PaymentStatusPanel';
import OrderTimeline from '../../components/orders/OrderTimeline';
import OrderNotes from '../../components/orders/OrderNotes';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, cancelOrder } = useOrders();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="p-8 text-center text-neutral-500">
        <p className="mb-4">Order not found.</p>
        <button 
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      cancelOrder(order.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <button 
        onClick={() => navigate('/admin/orders')}
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </button>

      <div className="mb-8">
        <OrderHeader order={order} onCancel={handleCancel} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <OrderItems items={order.items} />
          
          {/* Fulfillment Section Placeholder */}
          <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-neutral-900">Fulfillment</h3>
                <span className="text-sm text-neutral-500 capitalize">{order.fulfillmentStatus}</span>
             </div>
             {order.warehouseId ? (
                <div className="text-sm text-neutral-600">Assigned to Warehouse: <span className="font-medium text-neutral-900">{order.warehouseId}</span></div>
             ) : (
                <div className="text-sm text-warning">No warehouse assigned yet.</div>
             )}
             <div className="mt-4 flex gap-3">
               <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors">
                 Create Fulfillment
               </button>
             </div>
          </div>

          <PaymentStatusPanel order={order} />
          <OrderTimeline order={order} />
        </div>
        
        <div className="space-y-8">
          <OrderSummary order={order} />
          <CustomerPanel order={order} />
          <OrderNotes orderId={order.id} />
        </div>
      </div>
    </div>
  );
}
