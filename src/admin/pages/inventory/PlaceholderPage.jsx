import React from 'react';
import { FiBox } from 'react-icons/fi';

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{title}</h1>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm p-12 text-center text-gray-500">
        <FiBox className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title} Workspace</h3>
        <p>Pending backend integration and detailed views.</p>
      </div>
    </div>
  );
}
