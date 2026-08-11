import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CustomerPanel({ order }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Customer</h3>
        <Link to={`/admin/customers/${order.customerId}`} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View Profile
        </Link>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-neutral-400" />
          </div>
          <div>
            <div className="font-medium text-neutral-900">{order.customerName}</div>
            <div className="text-sm text-neutral-500">ID: {order.customerId}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
            <a href={`mailto:${order.email}`} className="text-sm text-indigo-600 hover:underline break-all">
              {order.email}
            </a>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
            <span className="text-sm text-neutral-600">
              {/* placeholder phone */}
              +1 (555) 000-0000
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Shipping Address
            </h4>
            <div className="text-sm text-neutral-600 space-y-1">
              <p className="font-medium text-neutral-900">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Billing Address
            </h4>
            <div className="text-sm text-neutral-600 space-y-1">
              <p className="font-medium text-neutral-900">{order.billingAddress.name}</p>
              <p>{order.billingAddress.address}</p>
              <p>{order.billingAddress.city}, {order.billingAddress.postalCode}</p>
              <p>{order.billingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
