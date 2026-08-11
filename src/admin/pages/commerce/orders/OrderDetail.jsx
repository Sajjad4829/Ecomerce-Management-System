import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiPrinter, FiMoreHorizontal, FiMessageSquare } from 'react-icons/fi';
import { useOrders } from '../../../context/OrderContext';
import OrderTimeline from '../../../components/orders/OrderTimeline';
import OrderHoldModal from '../../../components/orders/OrderHoldModal';
import OrderCancelModal from '../../../components/orders/OrderCancelModal';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, updateOrderStatus, addInternalNote } = useOrders();
  const order = getOrder(id);

  const [isHoldModalOpen, setHoldModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Order not found</h2>
        <button onClick={() => navigate('/admin/orders/list')} className="text-blue-600 hover:underline mt-2">Return to orders</button>
      </div>
    );
  }

  const handleAction = (action) => {
    switch (action) {
      case 'confirm':
        updateOrderStatus(id, 'Confirmed');
        break;
      case 'process':
        updateOrderStatus(id, 'Processing');
        break;
      case 'resume':
        updateOrderStatus(id, 'Processing', 'Resumed from hold');
        break;
      default:
        break;
    }
  };

  const handleHold = (reason, note) => {
    updateOrderStatus(id, 'On Hold', `Reason: \${reason}. Note: \${note}`);
  };

  const handleCancel = (reason, note) => {
    updateOrderStatus(id, 'Cancelled', `Reason: \${reason}. Note: \${note}`);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addInternalNote(id, newNote);
    setNewNote('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/orders/list" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold \${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'On Hold' ? 'bg-red-100 text-red-800' :
                  order.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                  'bg-green-100 text-green-800'
                }`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {order.status === 'Pending' && (
            <button onClick={() => handleAction('confirm')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Confirm Order</button>
          )}
          {order.status === 'Confirmed' && (
            <button onClick={() => handleAction('process')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Start Processing</button>
          )}
          {order.status === 'On Hold' && (
            <button onClick={() => handleAction('resume')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Resume Processing</button>
          )}
          
          <div className="relative group">
            <button className="px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
              Actions <FiMoreHorizontal />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-1">
                {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                  <>
                    <button onClick={() => setHoldModalOpen(true)} className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50">Put on Hold</button>
                    <button onClick={() => setCancelModalOpen(true)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cancel Order</button>
                  </>
                )}
                {order.status === 'Completed' && (
                  <button onClick={() => alert('Mock RMA Generated: RMA-' + Math.floor(Math.random()*10000))} className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">Initiate Return/Refund</button>
                )}
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><FiPrinter size={14} /> Print Invoice Placeholder</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Duplicate Order Placeholder</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
              <span className="text-sm text-gray-500">{order.items.length} items</span>
            </div>
            <div className="p-6 space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">x {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.fulfillmentStatus}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500"><p>Subtotal</p><p>${order.totals.subtotal.toFixed(2)}</p></div>
                <div className="flex justify-between text-gray-500"><p>Shipping</p><p>${order.totals.shipping.toFixed(2)}</p></div>
                <div className="flex justify-between text-gray-500"><p>Tax</p><p>${order.totals.tax.toFixed(2)}</p></div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200"><p>Grand Total</p><p>${order.totals.grandTotal.toFixed(2)}</p></div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h2>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className={`font-medium \${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{order.paymentStatus}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="font-medium text-gray-900">{order.transactions.length} record(s)</p>
              </div>
            </div>
            <div className="space-y-2">
              {order.transactions.map(txn => (
                <div key={txn.id} className="flex justify-between text-sm items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{txn.method}</span>
                    <span className="text-gray-500 font-mono text-xs">{txn.id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">${txn.amount.toFixed(2)}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{txn.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Timeline</h2>
            <OrderTimeline events={order.timeline} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Customer</h2>
              <Link to={`/admin/customers/\${order.customer.id}`} className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                View <FiArrowLeft className="rotate-135" />
              </Link>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{order.customer.name}</p>
              <p className="text-sm text-gray-500">{order.customer.email}</p>
              <p className="text-sm text-gray-500">{order.customer.phone}</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Addresses</h2>
              <button className="text-gray-400 hover:text-gray-600"><FiEdit2 size={16}/></button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Shipping Address</p>
                <p className="text-sm text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p className="text-sm text-gray-900">{order.shippingAddress.address1}</p>
                <p className="text-sm text-gray-900">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Billing Address</p>
                <p className="text-sm text-gray-900">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                <p className="text-sm text-gray-900">{order.billingAddress.address1}</p>
                <p className="text-sm text-gray-900">{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Shipping</h2>
              <button className="text-gray-400 hover:text-gray-600"><FiEdit2 size={16}/></button>
            </div>
            <p className="text-sm text-gray-900">{order.shippingMethod}</p>
            <p className="text-xs text-gray-500 mt-1">Status: {order.fulfillmentStatus}</p>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiMessageSquare /> Notes
            </h2>
            
            {order.notes.customer && (
              <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Customer Note</p>
                <p className="text-sm text-gray-700">{order.notes.customer}</p>
              </div>
            )}

            <div className="space-y-3 mb-4">
               <p className="text-xs font-semibold text-gray-500 uppercase">Internal Notes</p>
              {order.notes.internal.map(n => (
                <div key={n.id} className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <p>{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</p>
                </div>
              ))}
              {order.notes.internal.length === 0 && <p className="text-sm text-gray-500">No internal notes.</p>}
            </div>

            <form onSubmit={handleAddNote}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm resize-none mb-2"
                rows={2}
              />
              <button type="submit" disabled={!newNote.trim()} className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                Add Note
              </button>
            </form>
          </div>

        </div>
      </div>

      <OrderHoldModal 
        isOpen={isHoldModalOpen} 
        onClose={() => setHoldModalOpen(false)} 
        onConfirm={handleHold} 
        orderId={order.id} 
      />
      <OrderCancelModal 
        isOpen={isCancelModalOpen} 
        onClose={() => setCancelModalOpen(false)} 
        onConfirm={handleCancel} 
        orderId={order.id} 
      />
    </div>
  );
}
