import { motion } from 'framer-motion';
import { FiEdit2, FiCopy, FiEye, FiCheckCircle, FiArchive, FiTrash2, FiXCircle } from 'react-icons/fi';
import PageStatusBadge from './PageStatusBadge';
import ActionDropdown from './ActionDropdown';

export default function PageCard({ page, isSelected, toggleSelection, index }) {
  const getActions = () => [
    { label: 'Edit Page', icon: FiEdit2, onClick: () => window.location.href = `/admin/cms/pages/editor/${page.id}` },
    { label: 'Duplicate', icon: FiCopy, onClick: () => console.log('Duplicate', page.id) },
    { label: 'Preview', icon: FiEye, onClick: () => console.log('Preview', page.id) },
    { label: 'Publish', icon: FiCheckCircle, onClick: () => console.log('Publish', page.id) },
    { label: 'Unpublish', icon: FiXCircle, onClick: () => console.log('Unpublish', page.id) },
    { label: 'Archive', icon: FiArchive, onClick: () => console.log('Archive', page.id) },
    { label: 'Delete', icon: FiTrash2, danger: true, onClick: () => console.log('Delete', page.id) },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className={`bg-surface border rounded-xl p-5 shadow-sm transition-all group ${isSelected ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-black/5 hover:border-black/10 hover:shadow-md'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => toggleSelection(page.id)}
          className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A] cursor-pointer mt-1"
        />
        <ActionDropdown actions={getActions()} />
      </div>

      <div className="mb-4">
        <h3 className="font-serif font-bold text-text-primary text-lg mb-1 truncate" title={page.title}>{page.title}</h3>
        <p className="text-xs text-text-muted truncate" title={page.slug}>{page.slug}</p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <PageStatusBadge status={page.status} />
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-semibold truncate bg-background px-2 py-1 rounded">
          {page.visibility || 'Public'}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-semibold truncate bg-background px-2 py-1 rounded">
          {page.template}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#ECEAE6] border border-black/10 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-text-secondary">{page.author.charAt(0)}</span>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-text-primary">{page.author}</div>
            <div className="text-[9px] text-text-muted">{page.lastUpdated}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded border border-black/5" title="SEO Score">
          <div className={`w-1.5 h-1.5 rounded-full ${page.seoScore > 80 ? 'bg-success-soft0' : page.seoScore > 50 ? 'bg-yellow-500' : 'bg-danger-soft0'}`}></div>
          <span className="text-[10px] font-bold text-text-secondary">{page.seoScore}</span>
        </div>
      </div>
    </motion.div>
  );
}
