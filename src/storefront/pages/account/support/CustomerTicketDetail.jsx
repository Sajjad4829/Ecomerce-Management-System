import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiPackage } from 'react-icons/fi';
import { useSupport } from '../../../../admin/context/SupportContext';

export default function CustomerTicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTicket, addMessage, updateTicketStatus } = useSupport();
  const ticket = getTicket(id);
  const [reply, setReply] = useState('');

  if (!ticket || ticket.customerId !== 'cust_1') {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Request not found</h2>
        <button onClick={() => navigate('/account/support')} className="text-blue-600 hover:underline mt-2">Return to support center</button>
      </div>
    );
  }

  // Filter out internal notes for the customer view
  const visibleMessages = ticket.messages.filter(m => !m.isInternal);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      addMessage(ticket.id, reply, 'Customer', ticket.customerName, false);
      setReply('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/account/support" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <FiArrowLeft /> Back to Support
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-green-100 text-green-800' :
                  ticket.status === 'Pending Customer' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
              }`}>
                {ticket.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Ticket #{ticket.id} • {ticket.category}</p>
          </div>
          {(ticket.status === 'Resolved' || ticket.status === 'Closed') && (
            <button onClick={() => updateTicketStatus(ticket.id, 'Open')} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Reopen Ticket
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-[600px]">
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/30">
              {visibleMessages.map(msg => {
                const isCustomer = msg.sender === 'Customer';
                return (
                  <div key={msg.id} className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-700">{isCustomer ? 'You' : 'Support Team'}</span>
                      <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-sm ${
                      isCustomer ? 'bg-[#1A1A1A] text-white rounded-tr-sm' : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSubmit}>
                  <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1A1A1A] focus-within:border-transparent transition-shadow">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full p-4 focus:outline-none text-sm min-h-[120px] resize-none"
                    />
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={!reply.trim()}
                        className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-black transition-colors flex items-center gap-2"
                      >
                        <FiSend /> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {(ticket.status === 'Resolved' || ticket.status === 'Closed') && !ticket.feedback && (
             <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
               <h3 className="font-bold text-blue-900 mb-2">How was your support experience?</h3>
               <p className="text-sm text-blue-800 mb-4">Please let us know how we did on this request.</p>
               <div className="flex justify-center gap-2">
                 {[1,2,3,4,5].map(star => (
                   <button key={star} className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors">★</button>
                 ))}
               </div>
             </div>
          )}
        </div>

        <div className="space-y-6">
          {ticket.relatedOrder && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
                <FiPackage /> Related Order
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-bold text-gray-900">{ticket.relatedOrder}</p>
                <Link to={`/account/orders`} className="text-sm text-blue-600 hover:underline mt-2 inline-block">View Order Details</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
