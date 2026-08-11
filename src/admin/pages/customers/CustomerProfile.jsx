import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, Calendar, Clock, MapPin, Building, Flag } from 'lucide-react';

export function CustomerProfile() {
  const { customer } = useOutletContext();

  return (
    <div className="space-y-8 max-w-4xl">
      <section>
        <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Email Address</p>
              <p className="text-sm font-medium text-neutral-900">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Phone Number</p>
              <p className="text-sm font-medium text-neutral-900">{customer.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Joined Date</p>
              <p className="text-sm font-medium text-neutral-900">{new Date(customer.joinedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Last Activity</p>
              <p className="text-sm font-medium text-neutral-900">{new Date(customer.lastActivityAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-2">
          <h3 className="text-lg font-serif text-neutral-900">Addresses</h3>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Add Address</button>
        </div>
        
        {customer.addresses && customer.addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.addresses.map(addr => (
              <div key={addr.id} className="border border-neutral-200 rounded-md p-4 bg-neutral-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{addr.type} Address</span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-medium bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
                  )}
                </div>
                <p className="text-sm font-medium text-neutral-900">{addr.name}</p>
                <div className="text-sm text-neutral-600 mt-1 space-y-0.5">
                  <div className="flex items-start mt-2">
                    <MapPin className="w-4 h-4 text-neutral-400 mr-2 mt-0.5 shrink-0" />
                    <span>{addr.address}<br/>{addr.city}, {addr.region} {addr.postalCode}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Flag className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                    <span>{addr.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 border border-dashed border-neutral-300 rounded-md bg-neutral-50 text-neutral-500 text-sm">
            No addresses on file.
          </div>
        )}
      </section>
    </div>
  );
}
