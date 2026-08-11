import React from 'react';
import { useOutletContext } from 'react-router-dom';

export function CustomerWishlist() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif text-neutral-900">Wishlist</h3>
      <div className="text-center p-8 text-neutral-500 border border-dashed border-neutral-200 rounded-lg">
        Wishlist integration mock. Shows products saved by the customer.
      </div>
    </div>
  );
}

export function CustomerReviews() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif text-neutral-900">Product Reviews</h3>
      <div className="text-center p-8 text-neutral-500 border border-dashed border-neutral-200 rounded-lg">
        Reviews integration mock. Displays reviews left by the customer.
      </div>
    </div>
  );
}

export function CustomerTagsSegments() {
  const { customer } = useOutletContext();
  
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-serif text-neutral-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {customer.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-sm text-neutral-700">
              {tag}
            </span>
          ))}
          <button className="px-3 py-1 border border-dashed border-neutral-300 rounded-full text-sm text-neutral-500 hover:text-neutral-700 hover:border-neutral-400">
            + Add Tag
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-serif text-neutral-900 mb-4">Segments</h3>
        <div className="space-y-3">
          {customer.segmentIds.map(id => (
            <div key={id} className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-neutral-900">Segment ID: {id}</p>
                <p className="text-xs text-neutral-500 mt-0.5">Matched based on conditions</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function CustomerCommunication() {
  const { customer } = useOutletContext();
  const comm = customer.communication;

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-lg font-serif text-neutral-900">Communication Preferences</h3>
      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        <div className="p-4 flex justify-between items-center hover:bg-neutral-50">
          <div>
            <p className="text-sm font-medium text-neutral-900">Email Marketing</p>
            <p className="text-xs text-neutral-500">Promotions and newsletters</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${comm.email ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
            {comm.email ? 'Subscribed' : 'Unsubscribed'}
          </span>
        </div>
        <div className="p-4 flex justify-between items-center hover:bg-neutral-50">
          <div>
            <p className="text-sm font-medium text-neutral-900">SMS Notifications</p>
            <p className="text-xs text-neutral-500">Order updates via text message</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${comm.sms ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
            {comm.sms ? 'Subscribed' : 'Unsubscribed'}
          </span>
        </div>
        <div className="p-4 flex justify-between items-center hover:bg-neutral-50">
          <div>
            <p className="text-sm font-medium text-neutral-900">Push Notifications</p>
            <p className="text-xs text-neutral-500">App notifications</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${comm.push ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
            {comm.push ? 'Subscribed' : 'Unsubscribed'}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CustomerLoyaltyProfile() {
  const { customer } = useOutletContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif text-neutral-900">Loyalty & Rewards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
          <p className="text-sm text-indigo-800 font-medium uppercase tracking-wider mb-2">Current Tier</p>
          <p className="text-3xl font-serif text-indigo-900">{customer.loyaltyTier}</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
          <p className="text-sm text-amber-800 font-medium uppercase tracking-wider mb-2">Reward Points</p>
          <p className="text-3xl font-serif text-amber-900">{customer.points}</p>
        </div>
      </div>
    </div>
  );
}
