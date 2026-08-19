import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function ProductHighlights({ highlights }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="py-8 border-b border-gray-100">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <FiCheckCircle className="text-gray-900 mt-0.5 shrink-0" size={18} />
            <span className="text-sm font-medium text-gray-700">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
