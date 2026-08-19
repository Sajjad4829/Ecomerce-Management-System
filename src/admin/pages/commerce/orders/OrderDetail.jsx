import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiPrinter, FiMoreHorizontal, FiMessageSquare } from 'react-icons/fi';
import { useOrders } from '../../../context/orders/OrderContext';
import { useFinance } from '../../../context/finance/FinanceContext';
import OrderTimeline from '../../../components/orders/OrderTimeline';
import OrderHoldModal from '../../../components/orders/OrderHoldModal';
import OrderCancelModal from '../../../components/orders/OrderCancelModal';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, updateOrderStatus, addInternalNote } = useOrders();
  const { calculateOrderFinancials } = useFinance();
  const order = getOrder(id);
  const orderFinancials = order ? calculateOrderFinancials(order.id, order.total || 0) : null;

  const [isHoldModalOpen, setHoldModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Order not found</h2>
        <button onClick={() => navigate('/admin/orders/list')} className="text-primary hover:underline mt-2">Return to orders</button>
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
          <Link to="/admin/orders/list" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
            <FiArrowLeft size={20} className="text-text-secondary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{order.id}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold \${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'On Hold' ? 'bg-danger-soft text-red-800' :
                  order.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                  'bg-success-soft text-green-800'
                }`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">{new Date(order.date).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {order.status === 'Pending' && (
            <button onClick={() => handleAction('confirm')} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700">Confirm Order</button>
          )}
          {order.status === 'Confirmed' && (
            <button onClick={() => handleAction('process')} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">Start Processing</button>
          )}
          {order.status === 'On Hold' && (
            <button onClick={() => handleAction('resume')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Resume Processing</button>
          )}
          
          <div className="relative group">
            <button className="px-4 py-2 border border-border bg-surface text-text-secondary rounded-lg text-sm font-medium hover:bg-background flex items-center gap-2">
              Actions <FiMoreHorizontal />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-1">
                {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                  <>
                    <button onClick={() => setHoldModalOpen(true)} className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50">Put on Hold</button>
                    <button onClick={() => setCancelModalOpen(true)} className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-soft">Cancel Order</button>
                  </>
                )}
                {order.status === 'Completed' && (
                  <button onClick={() => alert('Mock RMA Generated: RMA-' + Math.floor(Math.random()*10000))} className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-blue-50">Initiate Return/Refund</button>
                )}
                <button className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background flex items-center gap-2"><FiPrinter size={14} /> Print Invoice Placeholder</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background">Duplicate Order Placeholder</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-text-primary">Order Items</h2>
              <span className="text-sm text-text-muted">{order.items.length} items</span>
            </div>
            <div className="p-6 space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{item.name}</p>
                    <p className="text-sm text-text-muted">SKU: {item.sku}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-text-muted">x {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-background px-6 py-4 border-t border-border">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-muted"><p>Subtotal</p><p>${order.total ? order.total.toFixed(2) : '0.00'}</p></div>
                <div className="flex justify-between font-bold text-text-primary pt-2 border-t border-border"><p>Grand Total</p><p>${order.total ? order.total.toFixed(2) : '0.00'}</p></div>
              </div>
            </div>
          </div>

          {/* Payment Status (Dynamically Calculated) */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Financial Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-100 pb-4 mb-4">
              <div>
                <p className="text-sm text-text-muted">Payment Status</p>
                <p className={`font-medium ${orderFinancials.status === 'Paid' ? 'text-success' : orderFinancials.status === 'Refunded' ? 'text-gray-500' : 'text-yellow-600'}`}>{orderFinancials.status}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Gross Paid</p>
                <p className="font-medium text-text-primary">${orderFinancials.grossPaid.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Refunded</p>
                <p className="font-medium text-danger">${orderFinancials.refunded.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Balance Due</p>
                <p className="font-medium text-text-primary">${orderFinancials.balanceDue.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-text-primary">Transaction History</h3>
                <span className="text-xs text-text-muted">{orderFinancials.transactions.length} record(s)</span>
              </div>
              <div className="space-y-2">
                {orderFinancials.transactions.map(txn => (
                  <div key={txn.id} className="flex justify-between text-sm items-center p-2 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${txn.type === 'Refund' ? 'bg-danger' : 'bg-success'}`}></span>
                      <span className="font-medium">{txn.type} ({txn.paymentMethod})</span>
                      <span className="text-text-muted font-mono text-xs">{txn.id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-medium ${txn.type === 'Refund' ? 'text-danger' : 'text-success'}`}>
                        {txn.type === 'Refund' ? '-' : '+'}${txn.amount.toFixed(2)}
                      </span>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">{txn.status}</span>
                    </div>
                  </div>
                ))}
                {orderFinancials.transactions.length === 0 && (
                  <p className="text-sm text-text-muted py-2">No transactions recorded.</p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-6">Timeline</h2>
            <OrderTimeline events={order.timeline || []} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-text-primary">Customer</h2>
              <Link to={`/admin/customers/\${order.customer.id}`} className="text-primary hover:underline text-sm flex items-center gap-1">
                View <FiArrowLeft className="rotate-135" />
              </Link>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">{order.customer.name}</p>
              <p className="text-sm text-text-muted">{order.customer.email}</p>
              <p className="text-sm text-text-muted">{order.customer.phone}</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-text-primary">Addresses</h2>
              <button className="text-text-muted hover:text-text-secondary"><FiEdit2 size={16}/></button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Shipping Address</p>
                <p className="text-sm text-text-primary">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p className="text-sm text-text-primary">{order.shippingAddress.address1}</p>
                <p className="text-sm text-text-primary">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Billing Address</p>
                <p className="text-sm text-text-primary">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                <p className="text-sm text-text-primary">{order.billingAddress.address1}</p>
                <p className="text-sm text-text-primary">{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-text-primary">Shipping</h2>
              <button className="text-text-muted hover:text-text-secondary"><FiEdit2 size={16}/></button>
            </div>
            <p className="text-sm text-text-primary">{order.shippingMethod}</p>
            <p className="text-xs text-text-muted mt-1">Status: {order.fulfillmentStatus}</p>
          </div>

          {/* Notes */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <FiMessageSquare /> Notes
            </h2>
            
            {order.notes.customer && (
              <div className="mb-4 bg-background p-3 rounded-lg border border-gray-100">
                <p className="text-xs font-semibold text-text-muted uppercase mb-1">Customer Note</p>
                <p className="text-sm text-text-secondary">{order.notes.customer}</p>
              </div>
            )}

            <div className="space-y-3 mb-4">
               <p className="text-xs font-semibold text-text-muted uppercase">Internal Notes</p>
              {order.notes.internal.map(n => (
                <div key={n.id} className="text-sm text-text-secondary bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <p>{n.text}</p>
                  <p className="text-xs text-text-muted mt-1">{new Date(n.date).toLocaleString()}</p>
                </div>
              ))}
              {order.notes.internal.length === 0 && <p className="text-sm text-text-muted">No internal notes.</p>}
            </div>

            <form onSubmit={handleAddNote}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note..."
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm resize-none mb-2"
                rows={2}
              />
              <button type="submit" disabled={!newNote.trim()} className="w-full px-4 py-2 bg-gray-100 text-text-secondary rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
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
