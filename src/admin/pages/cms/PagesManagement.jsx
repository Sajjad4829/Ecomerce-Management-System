import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFileText, FiLayout, FiEye, FiArchive, FiCheckCircle, FiEyeOff } from 'react-icons/fi';
import PageToolbar from '../../components/cms/pages/PageToolbar';
import PageTable from '../../components/cms/pages/PageTable';
import PageCard from '../../components/cms/pages/PageCard';
import CMSStats from '../../components/cms/CMSStats';
import EmptyState from '../../components/cms/EmptyState';

const MOCK_PAGES = [
  { id: '1', title: 'Home Page V2', slug: '/', status: 'Published', visibility: 'Public', template: 'Hero + Blocks', author: 'Admin User', lastUpdated: '2 hours ago', seoScore: 92 },
  { id: '2', title: 'About the Craft', slug: '/about', status: 'Published', visibility: 'Public', template: 'Story Article', author: 'Content Editor', lastUpdated: '1 day ago', seoScore: 85 },
  { id: '3', title: 'Summer Sale Landing', slug: '/summer-sale', status: 'Draft', visibility: 'Public', template: 'Landing Page', author: 'Marketing Lead', lastUpdated: '3 hours ago', seoScore: 45 },
  { id: '4', title: 'Contact Us', slug: '/contact', status: 'Published', visibility: 'Public', template: 'Standard Page', author: 'Admin User', lastUpdated: '2 weeks ago', seoScore: 100 },
  { id: '5', title: 'Terms of Service', slug: '/terms', status: 'Published', visibility: 'Public', template: 'Legal Policy', author: 'Legal Team', lastUpdated: '1 month ago', seoScore: 60 },
  { id: '6', title: 'Holiday Lookbook', slug: '/lookbook/holiday', status: 'Scheduled', visibility: 'Public', template: 'Gallery Lookbook', author: 'Design Team', lastUpdated: '10 mins ago', seoScore: 78 },
  { id: '7', title: 'Internal Guidelines', slug: '/internal/guides', status: 'Private', visibility: 'Private', template: 'Standard Page', author: 'Admin User', lastUpdated: '3 days ago', seoScore: 20 },
  { id: '8', title: 'Old Home Page', slug: '/home-old', status: 'Archived', visibility: 'Public', template: 'Hero + Blocks', author: 'Admin User', lastUpdated: '1 year ago', seoScore: 50 },
];

export default function PagesManagement() {
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Handlers
  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === MOCK_PAGES.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(MOCK_PAGES.map(p => p.id));
    }
  };

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Pages</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Manage all standalone pages across your platform. Create, edit, and organize page content, URLs, and SEO settings.
          </p>
        </div>
        
        <button className="px-5 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2 shrink-0">
          <FiPlus className="text-lg" /> Create New Page
        </button>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <CMSStats title="Total Pages" value="124" label="All Time" icon={FiFileText} delay={0.1} />
        <CMSStats title="Published" value="89" label="Live" icon={FiEye} delay={0.2} />
        <CMSStats title="Draft" value="23" label="In Progress" icon={FiLayout} delay={0.3} />
        <CMSStats title="Scheduled" value="4" label="Upcoming" icon={FiCheckCircle} delay={0.4} />
        <CMSStats title="Private" value="3" label="Hidden" icon={FiEyeOff} delay={0.5} />
        <CMSStats title="Archived" value="5" label="Inactive" icon={FiArchive} delay={0.6} />
      </div>

      {/* Toolbar */}
      <PageToolbar 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        selectedCount={selectedIds.length} 
      />

      {/* Content Area */}
      <div className="pt-2">
        {MOCK_PAGES.length > 0 ? (
          <AnimatePresence mode="wait">
            {viewMode === 'table' ? (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <PageTable 
                  data={MOCK_PAGES} 
                  selectedIds={selectedIds} 
                  toggleSelection={toggleSelection} 
                  toggleAll={toggleAll}
                />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {MOCK_PAGES.map((page, index) => (
                  <PageCard 
                    key={page.id} 
                    page={page} 
                    isSelected={selectedIds.includes(page.id)}
                    toggleSelection={toggleSelection}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <EmptyState 
              icon={FiFileText} 
              title="No Pages Found" 
              message="You haven't created any pages yet. Get started by creating your first landing page."
              actionLabel="Create New Page"
              onAction={() => console.log('Create Page')}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
