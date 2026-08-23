import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBox, FiFolder, FiGrid, FiTag, 
  FiLayers, FiArchive, FiSliders, FiDollarSign,
  FiSearch, FiFilter, FiActivity, FiImage
} from 'react-icons/fi';
import CMSCard from '../../components/cms/CMSCard';
import EmptyState from '../../components/cms/EmptyState';

const CATALOG_MODULES = [
  { id: 'products', title: 'Products', description: 'Manage the core catalog, SKUs, and bespoke furniture variants.', icon: FiBox, count: 245 },
  { id: 'categories', title: 'Categories', description: 'Taxonomy management for organizing items logically (e.g., Seating, Tables).', icon: FiFolder, count: 18 },

  { id: 'collections', title: 'Collections', description: 'Curated groups of items (e.g., The Sanctuary Collection).', icon: FiGrid, count: 6 },
  { id: 'brands', title: 'Brands', description: 'Manage manufacturers, designers, and partner brands.', icon: FiTag, count: 12 },
  { id: 'attributes', title: 'Attributes', description: 'Global specifications like Wood Finish, Fabric, or Dimensions.', icon: FiSliders, count: 42 },
  { id: 'inventory', title: 'Inventory', description: 'Stock levels, warehouse tracking, and availability states.', icon: FiArchive, count: 1840 },
  { id: 'warehouses', title: 'Warehouses', description: 'Manage physical locations, fulfillment centers, and stock hubs.', icon: FiBox, count: 4 },
  { id: 'pricing', title: 'Price Rules', description: 'Tiered pricing, trade discounts, and promotional MSRPs.', icon: FiDollarSign, count: 3 },
  { id: 'search', title: 'Search Engine', description: 'Configure global search, synonyms, facets, and query behavior.', icon: FiSearch, count: null },
  { id: 'merchandising', title: 'Merchandising', description: 'Control product discovery, recommendations, and search boosting rules.', icon: FiActivity, count: null }
];

export default function CatalogWorkspace() {
  const [searchQuery, setSearchQuery] = useState('');

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
            <span className="px-2 py-0.5 rounded bg-warning-soft text-amber-900 font-mono text-[10px] uppercase font-bold">
              Commerce Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Product Catalog</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Centralized hub for managing luxury furniture products, variants, collections, and catalog taxonomy.
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-surface p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm"
      >
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search catalog modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
          />
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-6 pl-2">
          Catalog Modules
        </div>

        {CATALOG_MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATALOG_MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map((module, index) => (
              <CMSCard 
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                count={module.count}
                delay={0.1 * (index % 8)}
                link={`/admin/catalog/${module.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <EmptyState 
              icon={FiSearch} 
              title="No Modules Found" 
              message={`We couldn't find any catalog modules matching "${searchQuery}".`}
              actionLabel="Clear Search"
              onAction={() => setSearchQuery('')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
