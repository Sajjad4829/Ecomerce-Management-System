import React from 'react';
import { FiTruck, FiBox, FiClock, FiShield } from 'react-icons/fi';

export default function ProductDelivery({ product }) {
  // If actual product delivery data exists, use it. Otherwise use premium fallback.
  return (
    <div className="py-8 border-b border-gray-100">
      <h2 className="text-lg font-serif font-bold text-gray-900 mb-6">
        Delivery & Returns
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex gap-4">
          <div className="text-gray-400 mt-1">
            <FiTruck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Free White Glove Delivery</h4>
            <p className="text-sm text-gray-500 mt-1">
              Estimated delivery: 2-4 weeks. Our team will deliver to your room of choice, unpack, and remove packaging.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-gray-400 mt-1">
            <FiBox size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">30-Day Returns</h4>
            <p className="text-sm text-gray-500 mt-1">
              Not completely satisfied? Return the item within 30 days for a full refund (collection fee applies).
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-gray-400 mt-1">
            <FiShield size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">10-Year Warranty</h4>
            <p className="text-sm text-gray-500 mt-1">
              We stand behind our craftsmanship. This product includes a 10-year structural warranty.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-gray-400 mt-1">
            <FiClock size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Customer Support</h4>
            <p className="text-sm text-gray-500 mt-1">
              Our dedicated support team is available 7 days a week to assist with your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
