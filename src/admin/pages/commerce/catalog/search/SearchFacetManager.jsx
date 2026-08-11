import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFilter, FiSettings, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useSearch } from '../../../../../admin/context/SearchContext';
import DataTable from '../../../../../components/cms/DataTable';
import CMSPageHeader from '../../../../../components/cms/CMSPageHeader';

export default function SearchFacetManager() {
  const { facets } = useSearch();

  const columns = [
    { key: 'name', label: 'Facet Name', render: (val) => <span className="font-medium text-text-primary">{val}</span> },
    { key: 'field', label: 'Field Mapping', render: (val) => <span className="text-text-muted font-mono text-xs">{val}</span> },
    { key: 'type', label: 'UI Type' },
    { key: 'displayOrder', label: 'Order' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          val === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {val}
        </span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, item) => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 text-text-muted hover:text-primary transition-colors">
            <FiEdit2 size={16} />
          </button>
          <button className="p-2 text-text-muted hover:text-danger transition-colors">
            <FiTrash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <CMSPageHeader 
        title="Facet Manager"
        description="Configure search filters displayed on result and category pages."
        breadcrumbs={[
          { label: 'Catalog', path: '/admin/catalog' },
          { label: 'Search', path: '/admin/catalog/search' },
          { label: 'Facets' }
        ]}
        actions={
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            <FiPlus />
            <span>Add Facet</span>
          </button>
        }
      />
      
      <div className="bg-surface rounded-xl border border-black/5 overflow-hidden shadow-sm">
        <DataTable 
          data={facets}
          columns={columns}
          searchPlaceholder="Search facets..."
        />
      </div>
    </div>
  );
}
