import React from 'react';
import { CircleDot } from 'lucide-react';

export default function OrderTimeline({ order }) {
  const events = [
    { id: 1, title: 'Order Placed', date: order.date, description: 'Order was placed by customer.' },
    { id: 2, title: 'Payment Confirmed', date: new Date(new Date(order.date).getTime() + 10000).toISOString(), description: 'Payment of $' + order.total.toFixed(2) + ' was successful.' },
  ];

  if (['processing', 'shipped', 'delivered'].includes(order.status)) {
    events.push({ id: 3, title: 'Processing', date: new Date(new Date(order.date).getTime() + 86400000).toISOString(), description: 'Order is being processed in warehouse.' });
  }

  if (['shipped', 'delivered'].includes(order.status)) {
    events.push({ id: 4, title: 'Shipped', date: new Date(new Date(order.date).getTime() + 172800000).toISOString(), description: 'Order has been shipped via standard delivery.' });
  }

  if (order.status === 'delivered') {
    events.push({ id: 5, title: 'Delivered', date: new Date(new Date(order.date).getTime() + 345600000).toISOString(), description: 'Order was delivered to customer.' });
  }

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
      <h3 className="text-lg font-serif text-neutral-900 mb-6">Timeline</h3>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex gap-4">
            {index !== events.length - 1 && (
              <div className="absolute left-2.5 top-6 bottom-[-24px] w-px bg-neutral-200"></div>
            )}
            <div className="relative shrink-0 w-5 h-5 mt-1 rounded-full bg-neutral-50 flex items-center justify-center">
              <CircleDot className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-900">{event.title}</h4>
              <p className="text-xs text-neutral-500 mt-1">{new Date(event.date).toLocaleString()}</p>
              <p className="text-sm text-neutral-600 mt-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
