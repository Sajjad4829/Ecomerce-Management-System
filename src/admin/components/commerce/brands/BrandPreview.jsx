import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiEdit2 } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';
import { useNavigate } from 'react-router-dom';

export default function BrandPreview({ brand, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!brand) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-2xl z-50 border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-background/50">
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-text-primary text-lg">Brand Preview</h2>
                <CatalogStatusBadge status={brand.status} />
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-stone-200 rounded-lg transition-colors text-text-muted"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="bg-stone-100 relative border-b border-border py-12 flex items-center justify-center">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="w-32 h-32 rounded-full object-contain bg-surface shadow-md p-2" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-stone-200 flex items-center justify-center text-text-muted font-serif shadow-md">
                    No Logo
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h1 className="font-serif text-2xl font-bold text-text-primary">{brand.name}</h1>
                  <p className="font-mono text-xs text-text-muted mt-1">/{brand.slug}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Products</p>
                    <p className="text-sm text-text-primary mt-0.5">{brand.productCount} Assigned</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Featured</p>
                    <p className="text-sm text-text-primary mt-0.5">{brand.featured ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Last Updated</p>
                    <p className="text-sm text-text-primary mt-0.5">{brand.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-100 bg-background flex gap-3">
              <button 
                onClick={() => {
                  onClose();
                  navigate(`/admin/catalog/brands/${brand.id}`);
                }}
                className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FiEdit2 size={16} /> Edit Brand
              </button>
              <button className="px-4 py-2.5 bg-surface border border-border text-text-secondary text-sm font-semibold rounded-lg hover:bg-background transition-colors flex items-center justify-center shadow-sm">
                <FiExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
