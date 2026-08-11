import { motion } from 'framer-motion';
import { FiEdit2, FiCopy, FiEye, FiCheckCircle, FiArchive, FiTrash2, FiXCircle } from 'react-icons/fi';
import PageStatusBadge from './PageStatusBadge';
import ActionDropdown from './ActionDropdown';

export default function PageTable({ data, selectedIds, toggleSelection, toggleAll }) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  
  const getActions = (page) => [
    { label: 'Edit Page', icon: FiEdit2, onClick: () => window.location.href = `/admin/cms/pages/editor/${page.id}` },
    { label: 'Duplicate', icon: FiCopy, onClick: () => console.log('Duplicate', page.id) },
    { label: 'Preview', icon: FiEye, onClick: () => console.log('Preview', page.id) },
    { label: 'Publish', icon: FiCheckCircle, onClick: () => console.log('Publish', page.id) },
    { label: 'Unpublish', icon: FiXCircle, onClick: () => console.log('Unpublish', page.id) },
    { label: 'Archive', icon: FiArchive, onClick: () => console.log('Archive', page.id) },
    { label: 'Delete', icon: FiTrash2, danger: true, onClick: () => console.log('Delete', page.id) },
  ];

  return (
    <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-background border-b border-black/5">
              <th className="px-6 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A] cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Title & Slug</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Status & Vis</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Template</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">SEO</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Author & Date</th>
              <th className="px-6 py-4 text-right text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {data.map((page, index) => {
              const isSelected = selectedIds.includes(page.id);
              return (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                  key={page.id} 
                  className={`hover:bg-background/50 transition-colors group ${isSelected ? 'bg-background/80' : ''}`}
                >
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleSelection(page.id)}
                      className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A] cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-serif font-bold text-text-primary">{page.title}</div>
                    <div className="text-xs text-text-muted mt-1">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <PageStatusBadge status={page.status} />
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-text-muted mt-2">
                      {page.visibility || 'Public'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-text-secondary bg-gray-100 px-2 py-1 rounded inline-block">
                      {page.template}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${page.seoScore > 80 ? 'bg-success-soft0' : page.seoScore > 50 ? 'bg-yellow-500' : 'bg-danger-soft0'}`}></div>
                        <span className="text-xs text-text-secondary font-medium">{page.seoScore}/100</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-[#ECEAE6] border border-black/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-text-secondary">{page.author.charAt(0)}</span>
                      </div>
                      <span className="text-xs text-text-secondary font-medium">{page.author}</span>
                    </div>
                    <div className="text-xs text-text-muted pl-7">{page.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionDropdown actions={getActions(page)} />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
