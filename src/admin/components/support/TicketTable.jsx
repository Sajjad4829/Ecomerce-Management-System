import React from 'react';
import { Link } from 'react-router-dom';

export default function TicketTable({ tickets }) {
  if (tickets.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted">
        No tickets found matching the criteria.
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-danger-soft text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': case 'Closed': return 'bg-success-soft text-green-800';
      case 'Pending Customer': case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Agent': case 'Open': return 'bg-blue-100 text-blue-800';
      case 'New': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-background">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Ticket</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Agent</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Updated</th>
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-background">
              <td className="px-6 py-4">
                <Link to={`/admin/support/tickets/${ticket.id}`} className="font-medium text-text-primary hover:text-primary block mb-1">
                  {ticket.subject}
                </Link>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span>{ticket.id}</span>
                  <span>•</span>
                  <span>{ticket.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-text-primary">{ticket.customerName}</p>
                {ticket.relatedOrder && (
                  <p className="text-xs text-text-muted mt-0.5">Order: {ticket.relatedOrder}</p>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {ticket.assignedAgent ? (
                  <span className="text-text-primary">Assigned</span>
                ) : (
                  <span className="text-text-muted italic">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-muted">
                {new Date(ticket.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
