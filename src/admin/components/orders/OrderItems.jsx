import React from 'react';
import { Package } from 'lucide-react';

export default function OrderItems({ items }) {
  return (
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Order Items</h3>
        <span className="text-sm font-medium text-neutral-500 bg-surface px-2.5 py-1 rounded-full border border-neutral-200">
          {items.reduce((sum, item) => sum + item.quantity, 0)} Items
        </span>
      </div>
      
      <div className="divide-y divide-neutral-100">
        {items.map((item) => (
          <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 bg-neutral-100 rounded-md border border-neutral-200 flex items-center justify-center shrink-0">
              <Package className="w-8 h-8 text-neutral-300" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-neutral-900 hover:text-primary cursor-pointer">{item.name}</h4>
              <p className="text-sm text-neutral-500 mt-1">SKU: {item.sku}</p>
            </div>
            
            <div className="text-right sm:text-left flex flex-row sm:flex-col justify-between sm:justify-center gap-2 sm:gap-1">
              <div className="text-sm text-neutral-500">
                ${item.price.toFixed(2)} × {item.quantity}
              </div>
              <div className="font-medium text-neutral-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
