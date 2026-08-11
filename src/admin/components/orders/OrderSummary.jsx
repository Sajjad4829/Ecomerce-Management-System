import React from 'react';

export default function OrderSummary({ order }) {
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = order.status === 'cancelled' ? 0 : 25.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <h3 className="text-lg font-serif text-neutral-900 mb-4">Summary</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({order.items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping Placeholder</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Tax Placeholder (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600 pt-3 border-t border-neutral-100">
          <span>Discount Placeholder</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200 mt-3">
          <span className="font-medium text-neutral-900">Total</span>
          <span className="text-lg font-medium text-neutral-900">${total.toFixed(2)} {order.currency}</span>
        </div>
      </div>
    </div>
  );
}
