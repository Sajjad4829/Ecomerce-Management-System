import React from 'react';
import { Printer, FileText, Ban, MoreHorizontal } from 'lucide-react';

export default function OrderHeader({ order, onCancel }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-serif text-neutral-900">{order.id}</h1>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusStyle(order.status)}`}>
            {order.status}
          </span>
        </div>
        <p className="text-sm text-neutral-500">
          Placed on {new Date(order.date).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors" title="Print Order">
          <Printer className="w-5 h-5" />
        </button>
        <button className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors" title="Generate Invoice">
          <FileText className="w-5 h-5" />
        </button>
        {order.status !== 'cancelled' && (
          <button 
            onClick={onCancel}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors" 
            title="Cancel Order"
          >
            <Ban className="w-5 h-5" />
          </button>
        )}
        <button className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
