import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiLayout, FiGrid, FiMenu, 
  FiNavigation, FiAlignLeft, FiImage, FiMessageSquare, 
  FiFile, FiHelpCircle, FiMaximize, FiSearch, 
  FiPlus, FiFilter, FiActivity 
} from 'react-icons/fi';
import CMSCard from '../../components/cms/CMSCard';
import CMSStats from '../../components/cms/CMSStats';
import RecentContentTable from '../../components/cms/RecentContentTable';
import ActivityTimeline from '../../components/cms/ActivityTimeline';
import EmptyState from '../../components/cms/EmptyState';

const CMS_MODULES = [
  { id: 'design-system', title: 'Design System', description: 'Centralized visual tokens and design foundations.', icon: FiLayout, count: 12 },
  { id: 'themes', title: 'Global Theme', description: 'Configure global visual identity and component styles.', icon: FiLayout, count: 4 },
  { id: 'layouts', title: 'Global Layouts', description: 'Manage headers, footers, and global structural templates.', icon: FiNavigation, count: 5 },
  { id: 'pages', title: 'Pages', description: 'Manage standalone pages like About, Contact, and custom landing pages.', icon: FiFileText, count: 24 },
  { id: 'sections', title: 'Sections', description: 'Reusable structural blocks to assemble complex page layouts dynamically.', icon: FiLayout, count: 48 },
  { id: 'templates', title: 'Templates', description: 'Pre-defined page structures for consistent design across the platform.', icon: FiGrid, count: 6 },
  { id: 'navigation', title: 'Navigation', description: 'Configure mega menus, headers, and navigation structures.', icon: FiNavigation, count: 5 },
  { id: 'media', title: 'Media Library', description: 'Centralized repository for images, videos, and documents.', icon: FiImage, count: 892 },
  { id: 'blog', title: 'Blog', description: 'Publish articles, news, and editorial content.', icon: FiFile, count: 15 },
  { id: 'testimonials', title: 'Testimonials', description: 'Curate and display customer reviews and endorsements.', icon: FiMessageSquare, count: 32 },
  { id: 'faqs', title: 'FAQs', description: 'Manage frequently asked questions and answers.', icon: FiHelpCircle, count: 18 },
  { id: 'popups', title: 'Popups', description: 'Create promotional overlays, newsletter signups, and alerts.', icon: FiMaximize, count: 4 },
  { id: 'seo', title: 'SEO Rules', description: 'Global SEO configurations, metadata templates, and redirects.', icon: FiSearch, count: 12 },
  { id: 'forms', title: 'Forms', description: 'Build and manage lead capture and contact forms.', icon: FiAlignLeft, count: 5 },
  { id: 'blocks', title: 'Reusable Blocks', description: 'Global content pieces that can be embedded anywhere.', icon: FiGrid, count: 21 },
];

export default function CMSWorkspace() {
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
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Content Management</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Welcome to the CMS Workspace. Manage all your pages, structural sections, media, and navigation from this central hub.
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 bg-white border border-black/10 text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FiImage /> Upload Media
          </button>
          <button className="px-4 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
            <FiPlus /> Create Page
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CMSStats title="Total Pages" value="24" label="Published" icon={FiFileText} delay={0.1} />
        <CMSStats title="Structural Sections" value="48" label="Active" icon={FiLayout} delay={0.2} />
        <CMSStats title="Media Assets" value="892" label="Files" icon={FiImage} delay={0.3} />
        <CMSStats title="Content Updates" value="156" label="This Week" icon={FiActivity} delay={0.4} />
      </div>

      {/* Search & Filter Bar */}
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
            placeholder="Search CMS modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <FiFilter /> Filter
          </button>
          <select className="flex-1 md:flex-none px-4 py-2.5 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:border-black/30">
            <option>Sort by: Default</option>
            <option>Sort by: Name (A-Z)</option>
            <option>Sort by: Most Items</option>
          </select>
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-6 pl-2">
          Core Modules
        </div>
        {CMS_MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CMS_MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map((module, index) => (
              <CMSCard 
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                count={module.count}
                delay={0.1 * (index % 8)} // Staggered animation
                link={module.id === 'pages' ? '/admin/cms/pages' : module.id === 'sections' ? '/admin/cms/sections' : module.id === 'blocks' ? '/admin/cms/blocks' : module.id === 'design-system' ? '/admin/cms/design-system' : module.id === 'themes' ? '/admin/cms/themes' : module.id === 'layouts' ? '/admin/cms/layouts' : module.id === 'templates' ? '/admin/cms/templates' : module.id === 'navigation' ? '/admin/cms/navigation' : module.id === 'media' ? '/admin/cms/media' : module.id === 'seo' ? '/admin/cms/seo' : module.id === 'forms' ? '/admin/cms/forms' : module.id === 'popups' ? '/admin/cms/popups' : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <EmptyState 
              icon={FiSearch} 
              title="No Modules Found" 
              message={`We couldn't find any CMS modules matching "${searchQuery}". Please try another search term.`}
              actionLabel="Clear Search"
              onAction={() => setSearchQuery('')}
            />
          </div>
        )}
      </div>

      {/* Recent & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pl-2">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">
              Recently Modified Content
            </h2>
            <button className="text-xs font-semibold text-[#A69076] hover:text-[#1A1A1A] transition-colors">
              View All
            </button>
          </div>
          <RecentContentTable />
        </div>
        <div className="space-y-6">
           <div className="flex items-center justify-between pl-2">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">
              Activity Log
            </h2>
          </div>
          <ActivityTimeline />
        </div>
      </div>
      
    </div>
  );
}
