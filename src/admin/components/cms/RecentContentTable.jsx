import { FiEdit2, FiMoreVertical } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MOCK_DATA = [
  { id: 1, name: 'Homepage V2', type: 'Page', status: 'Published', date: '2 hours ago', author: 'Admin' },
  { id: 2, name: 'Summer Sale Hero', type: 'Section', status: 'Draft', date: '5 hours ago', author: 'Editor' },
  { id: 3, name: 'Main Navigation', type: 'Menu', status: 'Published', date: '1 day ago', author: 'Admin' },
  { id: 4, name: 'Oak Dining Table', type: 'Media', status: 'Published', date: '2 days ago', author: 'System' },
  { id: 5, name: 'About Us Structure', type: 'Template', status: 'Archived', date: '1 week ago', author: 'Admin' },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Published: 'bg-success-soft text-success border-green-200',
    Draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Archived: 'bg-background text-text-secondary border-border'
  };

  return (
    <span className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-md border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function RecentContentTable() {
  return (
    <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-background border-b border-black/5">
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Name</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Type</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Last Updated</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Author</th>
              <th className="px-6 py-4 text-right text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {MOCK_DATA.map((item, index) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                key={item.id} 
                className="hover:bg-background/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-text-primary">{item.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-text-secondary">{item.type}</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-text-muted">{item.date}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#ECEAE6] border border-black/10 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-text-secondary">{item.author.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{item.author}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors">
                      <FiEdit2 size={14} />
                    </button>
                    <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded transition-colors">
                      <FiMoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
