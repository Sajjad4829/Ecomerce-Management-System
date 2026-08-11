import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiPlay, FiPause } from 'react-icons/fi';
import { useSearch } from '../../../../../admin/context/SearchContext';
import DataTable from '../../../../../components/cms/DataTable';
import CMSPageHeader from '../../../../../components/cms/CMSPageHeader';
import { useNavigate } from 'react-router-dom';

export default function MerchandisingRuleManager() {
  const navigate = useNavigate();
  const { merchandisingRules } = useSearch();

  const columns = [
    { key: 'name', label: 'Rule Name', render: (val) => <span className="font-medium">{val}</span> },
    { key: 'condition', label: 'When', render: (val) => <span className="text-gray-600 text-sm bg-gray-50 px-2 py-1 rounded">{val}</span> },
    { key: 'action', label: 'Action', render: (val) => <span className="font-medium text-sm text-blue-700">{val}</span> },
    { key: 'target', label: 'Target', render: (val) => <span className="text-gray-600 text-sm">{val}</span> },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          val === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
          {item.status === 'Active' ? (
             <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" title="Pause Rule">
               <FiPause size={16} />
             </button>
          ) : (
             <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Activate Rule">
               <FiPlay size={16} />
             </button>
          )}
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
            <FiEdit2 size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
            <FiTrash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <CMSPageHeader 
        title="Merchandising Rules"
        description="Manage active rules that dictate how products are discovered via search."
        breadcrumbs={[
          { label: 'Catalog', path: '/admin/catalog' },
          { label: 'Merchandising', path: '/admin/catalog/merchandising' },
          { label: 'Rules' }
        ]}
        actions={
          <button 
            onClick={() => navigate('/admin/catalog/merchandising/rules/new')}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <FiPlus />
            <span>Create Rule</span>
          </button>
        }
      />
      
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm">
        <DataTable 
          data={merchandisingRules}
          columns={columns}
          searchPlaceholder="Search rules..."
        />
      </div>
    </div>
  );
}
