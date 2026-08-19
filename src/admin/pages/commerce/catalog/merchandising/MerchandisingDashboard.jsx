import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiActivity, FiSearch, FiArrowUpCircle, FiMapPin, FiExternalLink } from 'react-icons/fi';
import { useSearch } from '../../../../../admin/context/SearchContext';
import CMSCard from '../../../../components/cms/CMSCard';
import DataTable from '../../../../../components/cms/DataTable';

export default function MerchandisingDashboard() {
  const { merchandisingRules, boosts, pins, redirects } = useSearch();

  const MODULES = [
    { id: 'rules', title: 'Merchandising Rules', description: 'Conditional logic to boost, bury, or pin products based on query or customer segment.', icon: FiActivity, count: merchandisingRules.length },
    { id: 'boosting', title: 'Active Boosts', description: 'Products or collections currently elevated in search results.', icon: FiArrowUpCircle, count: boosts.length, link: '/admin/catalog/search/boosting' },
    { id: 'pinning', title: 'Pinned Products', description: 'Products locked to specific positions for targeted queries.', icon: FiMapPin, count: pins.length, link: '/admin/catalog/search/pinning' },
    { id: 'redirects', title: 'Search Redirects', description: 'Queries that route directly to landing pages or collections.', icon: FiExternalLink, count: redirects.length, link: '/admin/catalog/search/redirects' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-[10px] uppercase font-bold">
              Discovery Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Merchandising Dashboard</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Control product visibility, orchestrate discovery campaigns, and dictate search result behaviors.
          </p>
        </div>
      </motion.div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MODULES.map((module, index) => (
          <CMSCard 
            key={module.id}
            title={module.title}
            description={module.description}
            icon={module.icon}
            count={module.count}
            delay={0.1 * (index % 4)}
            link={module.link || `/admin/catalog/merchandising/${module.id}`}
          />
        ))}
      </div>

      {/* Recent Rules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted">Active Merchandising Rules</h2>
          <a href="/admin/catalog/merchandising/rules/new" className="text-sm font-medium text-primary hover:underline">
            Create Rule
          </a>
        </div>
        <div className="bg-surface rounded-xl border border-black/5 overflow-hidden shadow-sm">
          <DataTable 
            data={merchandisingRules}
            searchPlaceholder="Search rules..."
            columns={[
              { key: 'name', label: 'Rule Name', render: (val) => <span className="font-medium">{val}</span> },
              { key: 'condition', label: 'When', render: (val) => <span className="text-text-secondary text-sm bg-background px-2 py-1 rounded">{val}</span> },
              { key: 'action', label: 'Action', render: (val) => <span className="font-medium text-sm text-blue-700">{val}</span> },
              { key: 'target', label: 'Target', render: (val) => <span className="text-text-secondary text-sm">{val}</span> },
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
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
