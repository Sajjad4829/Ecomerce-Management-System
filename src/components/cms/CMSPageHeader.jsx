import React from 'react';
import { Link } from 'react-router-dom';

export default function CMSPageHeader({ title, description, breadcrumbs, actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
      <div>
        {breadcrumbs && (
          <nav className="flex text-sm text-gray-500 mb-2">
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                {bc.path ? (
                  <Link to={bc.path} className="hover:text-black hover:underline">{bc.label}</Link>
                ) : (
                  <span className="text-gray-900">{bc.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
