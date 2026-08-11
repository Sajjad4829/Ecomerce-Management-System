import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';

export default function AttributePreview({ attribute, isOpen, onClose }) {
  if (!attribute) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between p-6 bg-surface border-b border-border">
              <div>
                <h2 className="font-serif font-bold text-xl text-text-primary">{attribute.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <CatalogStatusBadge status={attribute.status} />
                  <span className="font-mono text-xs text-text-secondary bg-stone-100 px-1.5 py-0.5 rounded uppercase">
                    {attribute.type}
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-text-muted hover:text-text-primary hover:bg-stone-100 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              <div className="bg-surface rounded-xl border border-border p-5">
                <h3 className="text-xs font-mono font-bold text-text-muted uppercase mb-4">Configuration</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-text-muted">Group</dt>
                    <dd className="text-sm font-medium text-text-primary">{attribute.group}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-text-muted">Slug</dt>
                    <dd className="text-sm font-mono text-text-primary">/{attribute.slug}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-text-muted">Usage Count</dt>
                    <dd className="text-sm font-medium text-text-primary">{attribute.usageCount} Products</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-text-muted">Last Updated</dt>
                    <dd className="text-sm font-medium text-text-primary">{attribute.updatedAt}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-surface rounded-xl border border-border p-5">
                <h3 className="text-xs font-mono font-bold text-text-muted uppercase mb-4">Behavior</h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Filterable', active: attribute.filterable },
                    { label: 'Variant Enabled', active: attribute.variantEnabled },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${item.active ? 'bg-warning-soft text-warning' : 'bg-stone-100 text-text-muted'}`}>
                        {item.active ? <FiCheck size={12} /> : <FiX size={12} />}
                      </div>
                      <span className={`text-sm ${item.active ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface rounded-xl border border-border p-5">
                <h3 className="text-xs font-mono font-bold text-text-muted uppercase mb-4">Values ({attribute.values?.length || 0})</h3>
                {attribute.values?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {attribute.values.map((v, i) => (
                      <span key={i} className="px-3 py-1.5 bg-background border border-border rounded text-sm text-text-secondary">
                        {v}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-muted italic">No values defined.</p>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
