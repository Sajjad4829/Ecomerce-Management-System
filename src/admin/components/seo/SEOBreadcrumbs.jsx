import React from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export function SEOBreadcrumbs({ path = [] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-text-muted overflow-x-auto whitespace-nowrap pb-2">
      <div className="flex items-center gap-2 text-text-muted">
        <FiHome /> <span className="font-medium">Home</span>
      </div>
      {path.map((item, idx) => (
        <React.Fragment key={idx}>
          <FiChevronRight className="text-stone-300" />
          <span className={`font-medium ${idx === path.length - 1 ? 'text-text-primary' : 'text-text-muted'}`}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
