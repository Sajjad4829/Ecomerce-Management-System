import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFileText, FiLayout, FiEye, FiArchive, FiCheckCircle, FiEyeOff } from 'react-icons/fi';
import PageToolbar from '../../components/cms/pages/PageToolbar';
import PageTable from '../../components/cms/pages/PageTable';
import PageCard from '../../components/cms/pages/PageCard';
import CMSStats from '../../components/cms/CMSStats';
import EmptyState from '../../components/cms/EmptyState';

import { useCMS } from '../../context/cms/CMSContext';
export default function PagesManagement() {
  const { pages, pagesLoading } = useCMS();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Handlers
  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === pages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pages.map(p => p.id));
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
          <h1 className="text-3xl font-serif font-bold text-text-primary">Pages</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
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
        {pagesLoading ? (
          <div className="py-12 flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
        ) : pages.length > 0 ? (
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
                  data={pages} 
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
                {pages.map((page, index) => (
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
