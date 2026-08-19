import React from 'react';
import { FiMessageSquare, FiAlertTriangle, FiClock, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSupport } from '../../../context/SupportContext';

export default function SupportDashboard() {
  const { tickets } = useSupport();

  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'New').length;
  const pendingCustomer = tickets.filter(t => t.status === 'Pending Customer').length;
  const highPriority = tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;
  const resolvedToday = tickets.filter(t => t.status === 'Resolved').length; // Mock logic for "today"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Support Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Manage customer inquiries and support operations.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/support/tickets" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Manage Tickets
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
            <FiMessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Open Tickets</p>
            <p className="text-2xl font-bold text-text-primary">{openTickets}</p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiClock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Pending Customer</p>
            <p className="text-2xl font-bold text-text-primary">{pendingCustomer}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-danger-soft flex items-center justify-center text-danger">
            <FiAlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">High Priority</p>
            <p className="text-2xl font-bold text-text-primary">{highPriority}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success-soft flex items-center justify-center text-success">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Resolved</p>
            <p className="text-2xl font-bold text-text-primary">{resolvedToday}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
             <h2 className="text-lg font-bold text-text-primary">Recent Tickets</h2>
             <Link to="/admin/support/tickets" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {tickets.slice(0, 5).map(ticket => (
               <div key={ticket.id} className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-background">
                 <div>
                   <Link to={`/admin/support/tickets/${ticket.id}`} className="font-medium text-text-primary hover:text-primary block">
                     {ticket.subject}
                   </Link>
                   <p className="text-sm text-text-muted mt-1">{ticket.customerName} • {ticket.category}</p>
                 </div>
                 <div className="sm:text-right shrink-0">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-success-soft text-green-800' :
                      ticket.status === 'Pending Customer' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status}
                    </span>
                    <p className="text-xs text-text-muted mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Support Workspaces</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link to="/admin/support/agents" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <h3 className="font-medium text-text-primary group-hover:text-blue-700">Agents & Teams</h3>
                 <p className="text-sm text-text-muted mt-1">Manage staff workload and assignments.</p>
               </Link>
               <Link to="/admin/support/canned-responses" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <h3 className="font-medium text-text-primary group-hover:text-blue-700">Canned Responses</h3>
                 <p className="text-sm text-text-muted mt-1">Manage quick replies and templates.</p>
               </Link>
               <Link to="/admin/settings/support" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group sm:col-span-2">
                 <h3 className="font-medium text-text-primary group-hover:text-blue-700">Support Settings</h3>
                 <p className="text-sm text-text-muted mt-1">Configure SLA rules, tags, and categories.</p>
               </Link>
             </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Ticket Volume Placeholder</h2>
             <div className="h-40 bg-background rounded-lg flex items-center justify-center border border-dashed border-border">
                <p className="text-sm text-text-muted">Chart: Volume by Category</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
