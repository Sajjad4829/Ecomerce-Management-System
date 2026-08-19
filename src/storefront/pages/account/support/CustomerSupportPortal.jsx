import React from 'react';
import { Link } from 'react-router-dom';
import { useSupport } from '../../../../admin/context/SupportContext';
import { FiMessageSquare, FiPlus, FiChevronRight } from 'react-icons/fi';

export default function CustomerSupportPortal() {
  const { tickets } = useSupport();
  // Mock customer ID for storefront
  const myTickets = tickets.filter(t => t.customerId === 'cust_1');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-sm text-gray-500 mt-1">View your recent inquiries or start a new request.</p>
        </div>
        <Link 
          to="/account/support/new" 
          className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-black transition-colors flex items-center gap-2"
        >
          <FiPlus /> New Request
        </Link>
      </div>

      {myTickets.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-100">
            {myTickets.map(ticket => (
              <Link 
                key={ticket.id} 
                to={`/account/support/${ticket.id}`}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <FiMessageSquare />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500 mt-1">Ticket #{ticket.id} • {ticket.category}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-6 sm:ml-4">
                  <div className="text-left sm:text-right">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'Pending Customer' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">{new Date(ticket.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <FiChevronRight className="text-gray-400 group-hover:text-blue-600 hidden sm:block" size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-12 text-center">
          <FiMessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-lg font-bold text-gray-900">No active tickets</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">You don't have any recent support requests. If you need help with an order or product, feel free to reach out.</p>
          <Link to="/account/support/new" className="inline-block mt-6 px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Contact Support
          </Link>
        </div>
      )}
    </div>
  );
}
