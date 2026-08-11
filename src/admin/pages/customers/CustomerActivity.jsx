import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCustomers } from '../../context/customers/CustomerContext';
import { Activity, ShoppingBag, Edit, Heart, MessageSquare } from 'lucide-react';

export function CustomerActivity() {
  const { customer } = useOutletContext();
  const { getCustomerActivity } = useCustomers();
  const activities = getCustomerActivity(customer.id);

  const getIcon = (type) => {
    switch (type) {
      case 'order_placed': return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'profile_updated': return <Edit className="w-4 h-4 text-primary" />;
      case 'wishlist_added': return <Heart className="w-4 h-4 text-rose-600" />;
      case 'review_submitted': return <MessageSquare className="w-4 h-4 text-warning" />;
      default: return <Activity className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif text-neutral-900">Activity Timeline</h3>

      {activities.length === 0 ? (
        <div className="text-center p-8 text-neutral-500 border border-dashed border-neutral-200 rounded-lg">
          No activity recorded yet.
        </div>
      ) : (
        <div className="relative border-l border-neutral-200 ml-4 space-y-8 pb-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative pl-6">
              <span className="absolute -left-3 top-1 w-6 h-6 bg-surface border border-neutral-200 rounded-full flex items-center justify-center shadow-sm">
                {getIcon(activity.type)}
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-900">{activity.description}</p>
                <p className="text-xs text-neutral-500 mt-1">{new Date(activity.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
          <div className="relative pl-6">
            <span className="absolute -left-3 top-1 w-6 h-6 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
            </span>
            <div>
              <p className="text-sm font-medium text-neutral-900">Account Created</p>
              <p className="text-xs text-neutral-500 mt-1">{new Date(customer.joinedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
