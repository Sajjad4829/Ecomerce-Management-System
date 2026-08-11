import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTag, FiGift, FiAward, FiSearch, FiMail, FiPercent, FiStar, FiUsers, FiFilter, FiZap } from 'react-icons/fi';
import CMSCard from '../../components/cms/CMSCard';
import EmptyState from '../../components/cms/EmptyState';

const MARKETING_MODULES = [
  { id: 'campaigns', title: 'Campaigns', description: 'Manage marketing campaigns, seasonal events, and coordinated promotions.', icon: FiMail, count: 5 },
  { id: 'promotions', title: 'Promotions', description: 'Manage promotional campaigns and discount rules.', icon: FiTag, count: 3 },
  { id: 'coupons', title: 'Coupons', description: 'Create and manage discount codes for customers.', icon: FiPercent, count: 12 },
  { id: 'flash-sales', title: 'Flash Sales', description: 'Manage limited-time flash sales events.', icon: FiZap, count: 1 },
  { id: 'automations', title: 'Automations', description: 'Triggered flows for welcome series, win-backs, and cart abandonment.', icon: FiZap, count: 2 },
  { id: 'audiences', title: 'Audiences', description: 'Combined segments for targeted campaign delivery.', icon: FiFilter, count: 1 },
  { id: 'reviews', title: 'Product Reviews', description: 'Moderate customer reviews, Q&A, and manage product ratings.', icon: FiStar, count: 1245 },
  { id: 'gift-cards', title: 'Gift Cards', description: 'Issue and manage digital gift cards.', icon: FiGift, count: 42 },
];

export default function MarketingWorkspace() {
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
            <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-900 font-mono text-[10px] uppercase font-bold">
              Growth Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Marketing Workspace</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Centralized hub for managing promotions, campaigns, discounts, and customer retention.
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm"
      >
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search marketing modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
          />
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-6 pl-2">
          Marketing Modules
        </div>
        {MARKETING_MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MARKETING_MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map((module, index) => (
              <CMSCard 
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                count={module.count}
                delay={0.1 * (index % 8)}
                link={`/admin/marketing/${module.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <EmptyState 
              icon={FiSearch} 
              title="No Modules Found" 
              message={`We couldn't find any marketing modules matching "${searchQuery}".`}
              actionLabel="Clear Search"
              onAction={() => setSearchQuery('')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
