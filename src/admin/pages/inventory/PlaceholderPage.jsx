import React from 'react';
import { FiBox } from 'react-icons/fi';

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-text-primary">{title}</h1>
        <p className="text-text-muted text-sm mt-1">{description}</p>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-12 text-center text-text-muted">
        <FiBox className="w-12 h-12 mx-auto mb-4 text-text-muted" />
        <h3 className="text-lg font-medium text-text-primary mb-2">{title} Workspace</h3>
        <p>Pending backend integration and detailed views.</p>
      </div>
    </div>
  );
}
