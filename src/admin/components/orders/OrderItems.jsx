import React from 'react';
import { Package, MapPin, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { useInventory } from '../../context/inventory/InventoryContext';
import { useReturns } from '../../context/ReturnContext';

export default function OrderItems({ items, orderId }) {
  const { reservations, getWarehouse } = useInventory();
  const { returns } = useReturns();

  // Find if this order has any returns
  const orderReturns = returns.filter(r => r.orderId === orderId);
  
  const getReservationInfo = (productId) => {
    return reservations.find(r => r.orderId === orderId && r.productId === productId);
  };
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
              <p className="text-sm text-neutral-500 mt-1">SKU: {item.sku || `SKU-${item.id}`}</p>
              
              {orderId && (() => {
                const res = getReservationInfo(item.productId || item.id);
                if (!res) return <p className="text-xs text-neutral-400 mt-2">No reservation data</p>;
                const wh = getWarehouse(res.warehouseId);
                return (
                  <div className="mt-3 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5" /> {wh ? wh.name : res.warehouseId}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${
                      res.status === 'Fulfilled' ? 'text-success bg-success/10' :
                      res.status === 'Released' ? 'text-neutral-500 bg-neutral-100' :
                      'text-primary bg-primary/10'
                    }`}>
                      {res.status === 'Fulfilled' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {res.status === 'Active' ? 'Reserved' : res.status}
                    </span>
                  </div>
                );
              })()}
              
              {/* Return Information */}
              {(() => {
                let returnedQty = 0;
                let refundStatus = null;
                orderReturns.forEach(ret => {
                  const retItem = ret.items.find(i => i.productId === (item.productId || item.id));
                  if (retItem) {
                    returnedQty += retItem.quantity;
                    refundStatus = ret.refundStatus;
                  }
                });

                if (returnedQty > 0) {
                  return (
                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-orange-700 bg-orange-50 px-2.5 py-1.5 rounded-md inline-flex border border-orange-100">
                      <RotateCcw className="w-3.5 h-3.5" />
                      Returned: {returnedQty}
                      {refundStatus === 'Completed' && (
                        <span className="ml-2 text-green-700 bg-green-100 px-1.5 rounded border border-green-200">Refunded</span>
                      )}
                    </div>
                  );
                }
                return null;
              })()}
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
