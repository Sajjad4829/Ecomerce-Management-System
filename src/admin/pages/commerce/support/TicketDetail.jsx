import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCheckCircle, FiUser, FiPackage, FiShoppingBag, FiTag } from 'react-icons/fi';
import { useSupport } from '../../../context/SupportContext';
import Conversation from '../../../components/support/Conversation';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTicket, updateTicketStatus, agents } = useSupport();
  const ticket = getTicket(id);

  if (!ticket) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Ticket not found</h2>
        <button onClick={() => navigate('/admin/support/tickets')} className="text-primary hover:underline mt-2">Return to list</button>
      </div>
    );
  }

  const assignedAgentName = ticket.assignedAgent ? agents.find(a => a.id === ticket.assignedAgent)?.name : 'Unassigned';

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-danger-soft text-red-800 border border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Normal': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border border-border';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/support/tickets" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
            <FiArrowLeft size={20} className="text-text-secondary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{ticket.subject}</h1>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-success-soft text-green-800' :
                  ticket.status === 'Pending Customer' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
              }`}>
                {ticket.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">{ticket.id} • Opened {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center flex-wrap">
          {ticket.status !== 'Resolved' && ticket.status !== 'Closed' && (
             <button onClick={() => updateTicketStatus(ticket.id, 'Resolved')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
               <FiCheckCircle/> Resolve Ticket
             </button>
          )}
          {(ticket.status === 'Resolved' || ticket.status === 'Closed') && (
             <button onClick={() => updateTicketStatus(ticket.id, 'Open')} className="px-4 py-2 bg-surface text-text-secondary border border-border-hover rounded-lg text-sm font-medium hover:bg-background transition-colors">
               Reopen Ticket
             </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content (Conversation) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${getPriorityColor(ticket.priority)}`}>
              Priority: {ticket.priority}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-800 border border-border">
              Category: {ticket.category}
            </span>
            {ticket.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                <FiTag size={10} /> {tag}
              </span>
            ))}
          </div>

          <Conversation ticket={ticket} />
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          
          {/* Assignment & SLA */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4">Assignment & SLA</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted font-semibold mb-1">Assigned To</p>
                <select className="w-full text-sm border-border-hover rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value={ticket.assignedAgent}>{assignedAgentName}</option>
                  <option value="unassigned">Unassigned</option>
                  {agents.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.team})</option>
                  ))}
                </select>
              </div>
              
              {ticket.sla && ticket.sla.responseDue && (
                <div className={`p-3 rounded-lg border ${ticket.sla.status === 'At Risk' ? 'bg-danger-soft border-red-200 text-red-800' : 'bg-background border-border text-text-secondary'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <FiClock size={14} />
                    <span className="text-sm font-bold">SLA: {ticket.sla.status}</span>
                  </div>
                  <p className="text-xs">Response Due: {new Date(ticket.sla.responseDue).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Context */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4 flex items-center gap-2"><FiUser /> Customer</h2>
            <div>
              <p className="font-bold text-text-primary">{ticket.customerName}</p>
              <p className="text-sm text-text-secondary mt-1">{ticket.email}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                 <div>
                   <p className="text-text-muted">Total Orders</p>
                   <p className="font-semibold text-text-primary">4</p>
                 </div>
                 <div>
                   <p className="text-text-muted">Lifetime Value</p>
                   <p className="font-semibold text-text-primary">$8,450</p>
                 </div>
              </div>
              <Link to="/admin/customers" className="text-xs text-primary hover:underline mt-4 inline-block font-medium">View Full Profile</Link>
            </div>
          </div>

          {/* Order Context */}
          {ticket.relatedOrder && (
            <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4 flex items-center gap-2"><FiPackage /> Related Order</h2>
              <div>
                <p className="font-bold text-primary hover:underline cursor-pointer">{ticket.relatedOrder}</p>
                <div className="mt-2 space-y-1 text-sm text-text-secondary">
                  <p>Status: <span className="font-semibold text-text-primary">Processing</span></p>
                  <p>Payment: <span className="font-semibold text-text-primary">Paid</span></p>
                  <p>Total: <span className="font-semibold text-text-primary">$2,499.00</span></p>
                </div>
                <button className="w-full mt-4 px-3 py-2 bg-background hover:bg-gray-100 border border-border rounded-md text-sm font-medium transition-colors text-text-secondary">
                  View Order Details
                </button>
              </div>
            </div>
          )}

          {/* Product Context */}
          {ticket.relatedProduct && (
            <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4 flex items-center gap-2"><FiShoppingBag /> Related Product</h2>
              <div>
                <p className="font-bold text-text-primary">{ticket.relatedProduct === 'prod_1' ? 'Modern Leather Sofa' : 'Ceramic Table Lamp'}</p>
                <p className="text-xs text-text-muted mt-1">SKU: {ticket.relatedProduct}</p>
                <Link to="/admin/products" className="text-xs text-primary hover:underline mt-3 inline-block font-medium">View Product in Catalog</Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
