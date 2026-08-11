import React from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export function SEOBreadcrumbs({ path = [] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-stone-500 overflow-x-auto whitespace-nowrap pb-2">
      <div className="flex items-center gap-2 text-stone-400">
        <FiHome /> <span className="font-medium">Home</span>
      </div>
      {path.map((item, idx) => (
        <React.Fragment key={idx}>
          <FiChevronRight className="text-stone-300" />
          <span className={`font-medium ${idx === path.length - 1 ? 'text-stone-900' : 'text-stone-500'}`}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
