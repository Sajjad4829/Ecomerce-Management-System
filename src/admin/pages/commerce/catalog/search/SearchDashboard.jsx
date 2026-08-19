import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiTrendingUp, FiArrowUpCircle, 
  FiMapPin, FiExternalLink, FiList, FiPieChart, FiSettings,
  FiEye, FiTrendingDown, FiCpu
} from 'react-icons/fi';
import CMSCard from '../../../../components/cms/CMSCard';

const MODULES = [
  { id: 'analytics', title: 'Search Analytics', description: 'View total searches, popular queries, and zero-result rates.', icon: FiPieChart },
  { id: 'popular', title: 'Popular Searches', description: 'Monitor trending search terms across the storefront.', icon: FiTrendingUp },
  { id: 'no-results', title: 'Zero Results', description: 'Analyze frequent queries that return no products.', icon: FiTrendingDown },
  { id: 'facets', title: 'Facet Manager', description: 'Configure filters like category, price, and attributes.', icon: FiFilter },
  { id: 'ranking', title: 'Search Ranking', description: 'Adjust weights for relevance, popularity, and sales signals.', icon: FiList },
  { id: 'boosting', title: 'Product Boosting', description: 'Promote specific products or collections for certain queries.', icon: FiArrowUpCircle },
  { id: 'pinning', title: 'Product Pinning', description: 'Force products to appear at specific positions in results.', icon: FiMapPin },
  { id: 'redirects', title: 'Search Redirects', description: 'Redirect queries to specific pages or collections.', icon: FiExternalLink },
  { id: 'synonyms', title: 'Synonyms', description: 'Manage equivalent search terms to improve discovery.', icon: FiCpu },
  { id: 'preview', title: 'Search Preview', description: 'Test queries and view simulated ranking logic.', icon: FiEye },
  { id: 'settings', title: 'Search Settings', description: 'Configure global search behaviors and defaults.', icon: FiSettings },
];

export default function SearchDashboard() {
  return (
    <div className="space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] uppercase font-bold">
              Discovery Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Search Configuration</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage global search behavior, facets, ranking algorithms, and analyze customer search intent.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MODULES.map((module, index) => (
          <CMSCard 
            key={module.id}
            title={module.title}
            description={module.description}
            icon={module.icon}
            delay={0.1 * (index % 8)}
            link={`/admin/catalog/search/${module.id}`}
          />
        ))}
      </div>
    </div>
  );
}
